import React, { useEffect } from "react";
import { useParams, NavLink } from "react-router";
import Grid from "@mui/material/Grid2";
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHook";
import {
  fetchPropertyById,
  clearSelectedProperty,
} from "../../store/selectedPropertySlice";
import InfoCard from "../card/InfoCard";
import MapboxMapComponent from "../google_maps/MapboxComponent";

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { property, status, error } = useAppSelector(
    (state) => state.selectedProperty
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchPropertyById(id));
    }
    return () => {
      dispatch(clearSelectedProperty());
    };
  }, [dispatch, id]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!property) {
    return <div>No property found</div>;
  }

  return (
    <>
      {!status ? (
        <Box
          flex={1}
          justifyContent="center"
          alignContent="center"
          height={"86vh"}
        >
          <CircularProgress color="error" size="4rem" />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <NavLink to="/" style={{ display: "flex", alignItems: "center" }}>
              <ArrowBackIcon color="error" />
              <Typography color="error">Volver</Typography>
            </NavLink>
          </Box>
          <Grid container spacing={5} size={12}>
            <Grid container size={{ lg: 8 }} spacing={2} sx={{ marginTop: 2 }}>
              <Grid size={12}>
                <Box sx={{ height: 300, width: "100%" }}>
                  <img
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                    src={property.images[0]}
                    alt={property.title}
                  />
                </Box>
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Stack direction="row">
                    <IconButton href="#Mapbox" color="error">
                      <LocationOnIcon color="error" />
                    </IconButton>
                    <IconButton color="error">
                      <DescriptionIcon color="error" />
                    </IconButton>
                  </Stack>
                  <Stack direction="row" spacing={1} marginRight={2}>
                    <Chip color="error" label={property.type} size="small" />
                    <Chip color="error" label={property.status} size="small" />
                    <Chip
                      color="error"
                      label={property.isActive ? "Activo" : "Inactivo"}
                      size="small"
                    />
                  </Stack>
                </Card>
              </Grid>
              <Grid size={12}>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                  color="error"
                  sx={{ textAlign: "start" }}
                >
                  {property.title}
                </Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  marginBottom={2}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    sx={{ textAlign: "start", color: "#888" }}
                  >
                    {property.address}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    sx={{ textAlign: "start", color: "#888" }}
                  >
                    Área: {property.area} m²
                  </Typography>
                </Stack>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "17px",
                  }}
                >
                  <Typography variant="body2">Precio de venta: </Typography>
                  <Typography variant="h4" color="error">
                    USD {property.price.toLocaleString()}
                  </Typography>
                </Card>
                <Typography
                  variant="body2"
                  sx={{ fontSize: 18, textAlign: "start", marginTop: 2 }}
                >
                  {property.description}
                </Typography>
                <Typography
                  id="Mapbox"
                  variant="h4"
                  color="error"
                  sx={{ marginTop: 3 }}
                >
                  Ubicación
                </Typography>
                <MapboxMapComponent
                  latitude={property.location.lat}
                  longitude={property.location.lng}
                />
              </Grid>
            </Grid>
            <Grid
              container
              size={{ lg: 4 }}
              sx={{
                width: "100%",
                height: { lg: "20%", sm: "auto" }, 
                paddingTop: { lg: 2, sm: 0 },
              }}
            >
              <InfoCard property={property} />
              <NavLink style={{ width: '100%' }} to={`/edit-property/${property.id}`}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#d31216",
                    marginTop: 2,
                  }}
                  fullWidth
                >
                  Editar Propiedad
                </Button>
              </NavLink>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default PropertyDetail;
