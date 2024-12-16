import { useState, useEffect } from 'react';
import '../App.css';
import { useFetchProperties } from '../hooks/useFetchProperties';
import { useFetchPropertyCount } from '../hooks/useFetchPropertyCount';
import Header from './layout/Header';
import DynamicCard from './DynamicCard';
import Pagination from './Pagination';
import { Box, Typography, CircularProgress, FormControl, InputLabel, Select, MenuItem, Button, Modal } from '@mui/material';
import InputSearch from './InputSearch';
import { EditProperty, Property } from '../types';
import CreatePropertyForm from './CreatePropertyForm';
import EditPropertyModal from './EditPropertyModal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: 24,
};

function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);
    const [searchInput, setSearchInput] = useState('');
    const [searchType, setSearchType] = useState<'title' | 'address'>('title');
    const [filteredData, setFilteredData] = useState<Property[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sortOrder, setSortOrder] = useState<string>('');
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<EditProperty | null>(null);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    
    const handleOpenEditModal = (property: EditProperty) => {
        setSelectedProperty(property);
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedProperty(null);
    };

    const { data, error } = useFetchProperties(currentPage, resultsPerPage);
    const { count: totalRecords, error: countError } = useFetchPropertyCount();

    const totalPages = totalRecords ? Math.ceil(totalRecords / resultsPerPage) : 0;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      
      };

    useEffect(() => {
        setIsLoading(true);

        let filtered = data || [];

        if (searchInput) {
            filtered = filtered.filter((property) =>
                property[searchType]?.toLowerCase().includes(searchInput.toLowerCase())
            );
        }

        filtered = sortProperties(filtered, sortOrder);
        setFilteredData(filtered);

        setIsLoading(false);
    }, [data, searchInput, searchType, sortOrder]);

    const sortProperties = (properties: Property[], order: string) => {
        const sortedProperties = [...properties];
        return sortedProperties.sort((a, b) =>
            order === 'asc' ? Number(a.price) - Number(b.price) : order === 'desc' ? Number(b.price) - Number(a.price) : 0
        );
    };

    const handleResultsPerPageChange = (e: any) => {
        setResultsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handleSortOrderChange = (e: any) => {
        setSortOrder(e.target.value);
    };

    const handleDeleteProperty = (deletedProperty: string) => {
        setFilteredData((prev) =>
            prev.filter((property) => property.id !== deletedProperty)
        );
    };

    const handleUpdateProperty = (updatedProperty: Partial<Property>) => {
        setFilteredData((prevData) =>
          prevData.map((property) =>
            property.id === updatedProperty.id ? { ...property, ...updatedProperty } : property
          )
        );
        handleCloseEditModal();
    };

    if (error || countError) {
        return (
            <Box textAlign="center" mt={5}>
                <Typography variant="h6" color="error">
                    Hubo un error al cargar las propiedades. Por favor, intenta nuevamente más tarde.
                </Typography>
            </Box>
        );
    }

    if (isLoading) return <CircularProgress />;

    return (
        <>
            <Header />

            <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ margin: '10px' }}>
                Crear Propiedad
            </Button>

            <Modal open={openModal} onClose={handleCloseModal}>
                <Box sx={style}>
                    <Typography variant="h5" mb={3}>Formulario de Propiedad</Typography>
                    <CreatePropertyForm refetch={handleCloseModal} />
                </Box>
            </Modal>

            {selectedProperty && (
                <EditPropertyModal
                    open={openEditModal}
                    onClose={handleCloseEditModal}
                    property={selectedProperty}
                    onUpdate={handleUpdateProperty}
                />
            )}

            <Box display="flex" justifyContent="center" alignItems="center" mb={3} px={3} gap='10px' flexWrap='wrap' >
                <InputSearch
                    onSearch={setSearchInput}
                    searchType={searchType}
                    setSearchType={setSearchType}
                />

                {!searchInput && (
                    <FormControl sx={{ width: '150px' }}>
                        <InputLabel id="results-per-page-label">Resultados por página</InputLabel>
                        <Select
                            label="Resultados por página"
                            labelId="results-per-page-label"
                            value={resultsPerPage}
                            onChange={handleResultsPerPageChange}
                        >
                            {[10, 20, 50, 100, 150, 200].map((val) => (
                                <MenuItem key={val} value={val}>
                                    {val}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}

                <FormControl sx={{ width: '180px' }}>
                    <InputLabel id="sort-order-label">Ordenar por precio</InputLabel>
                    <Select
                        label="Ordenar por precio"
                        labelId="sort-order-label"
                        value={sortOrder}
                        onChange={handleSortOrderChange}
                    >
                        <MenuItem value="">Sin orden</MenuItem>
                        <MenuItem value="asc">Ascendente</MenuItem>
                        <MenuItem value="desc">Descendente</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {filteredData.length > 0 ? (
                    filteredData.map((property) => (
                        <DynamicCard
                            key={property.id}
                            {...property}
                            onDelete={handleDeleteProperty}
                            onUpdate={handleOpenEditModal}
                        />
                    ))
                ) : (
                    <Typography>No se encontraron propiedades.</Typography>
                )}
            </Box>

            {!searchInput && !isLoading && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </>
    );
}

export default Home;
