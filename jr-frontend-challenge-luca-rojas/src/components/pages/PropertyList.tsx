import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import Grid from "@mui/material/Grid2";
import { Box, Button, CircularProgress, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { fetchLengthProperties, fetchProperties } from "../../store/propertiesSlice";
import { Property } from "../../interfaces/property.interface";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHook";
import PropertiesCard from "../card/PropertiesCard";
import SearchInput from "../form/search_field/SearchInput";
import SelectInput from "../form/select_field/SelectInput";
import PaginationOutlined from "../pagination/Pagination";

const MenuItems = [
  { name: "Menor valor", value: "less_price" },
  { name: "Mayor Valor", value: "more_price" },
  { name: "Pequeños (menos m2)", value: "less_m2" },
  { name: "Amplios (más m2)", value: "more_m2" },
  { name: "Más antiguos", value: "oldest" },
  { name: "Más nuevos", value: "newest" },
];

const PropertyList: React.FC = () => {
  const [searchParam, setSearchParam] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [propertiesPerPage] = useState<number>(3);
  const dispatch = useAppDispatch();
  const { items: properties, status, total } = useAppSelector(
    (state) => state.properties
  );
  const [findedProperties, setFindedProperties] = useState<Array<Property>>(
    properties
  );

  useEffect(() => {
    if (status === false) {
      dispatch(fetchLengthProperties());
      dispatch(fetchProperties({ page: currentPage, limit: propertiesPerPage }));
    }
    setFindedProperties(properties);
  }, [status, dispatch, currentPage, propertiesPerPage]);
  
  useEffect(() => {
    dispatch(fetchProperties({ page: currentPage, limit: propertiesPerPage }));
  }, [currentPage])

  const handleFilterChange = (event: string) => {
    setFilter(event);
    setCurrentPage(1);
  };

  const onSearchProperty = () => {
    const findedProperties = properties.filter(
      (prop) =>
        prop.title.includes(searchParam) || prop.address.includes(searchParam)
    );
    setFindedProperties(findedProperties);
    setCurrentPage(1);
  };

  const filteredProperties = React.useMemo(() => {
    let sortedProperties = [...findedProperties];

    switch (filter) {
      case "less_price":
        sortedProperties.sort((a, b) => a.price - b.price);
        break;
      case "more_price":
        sortedProperties.sort((a, b) => b.price - a.price);
        break;
      case "less_m2":
        sortedProperties.sort((a, b) => a.area - b.area);
        break;
      case "more_m2":
        sortedProperties.sort((a, b) => b.area - a.area);
        break;
      case "oldest":
        sortedProperties.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "newest":
        sortedProperties.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default:
        break;
    }

    return sortedProperties;
  }, [filter, findedProperties]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    console.log(event)
  };
  
  return (
    <>
      {!status ? (
        <Box flex={1} justifyContent="center" alignContent="center" height={"86vh"}>
          <CircularProgress color="error" size="4rem" />
        </Box>
      ) : (
        <Container>
          <h1 className="atlas-title">Propiedades</h1>
          <Grid container justifyContent="center" alignItems="center">
            <Grid size={12}>
              <SearchInput
                setSearchParam={setSearchParam}
                onSearchAction={onSearchProperty}
              />
            </Grid>
            <Grid size={12} marginTop={2}>
              <SelectInput
                text="Filtrar"
                label="Filtro"
                menuItems={MenuItems}
                onChange={handleFilterChange}
              />
            </Grid>
            <Grid size={12}>
              <NavLink to="/add-property">
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: "#d31216",
                    marginTop: 2,
                    width: "100%",
                  }}
                  startIcon={<AddIcon />}
                >
                  Nueva Propiedad
                </Button>
              </NavLink>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: 2 }} justifyContent="center">
            {filteredProperties.map((prop: Property) => (
              <Grid key={prop.id} size={{ xs: 12, sm: 6, md: 4, xl: 4 }}>
                <PropertiesCard property={prop} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", width: "100%", marginTop: 5 }}>
            <PaginationOutlined
              count={Math.ceil(total / propertiesPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        </Container>
      )}
    </>
  );
};

export default PropertyList;
