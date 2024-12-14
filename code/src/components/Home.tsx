import { useState, useEffect } from 'react';
import '../App.css';
import { useFetchProperties } from '../hooks/useFetchProperties';
import Header from './layout/Header';
import DynamicCard from './DynamicCard';
import Pagination from './Pagination';
import { Box, Typography, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import InputSearch from './InputSearch';
import { Property } from '../types';

function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);
    const [searchInput, setSearchInput] = useState('');
    const [searchType, setSearchType] = useState<'title' | 'address'>('title');
    const [filteredData, setFilteredData] = useState<Property[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const totalRecords = 10000;
    const totalPages = Math.ceil(totalRecords / resultsPerPage);

    const { data, error } = useFetchProperties(currentPage, resultsPerPage);

    const handlePageChange = (page: number) => setCurrentPage(page);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    useEffect(() => {
        if (!data) return;

        setIsLoading(true);

        const debounce = setTimeout(() => {
            if (searchInput.trim()) {
                const filtered = data.filter((property) =>
                    property[searchType]?.toLowerCase().includes(searchInput.toLowerCase())
                );
                setFilteredData(filtered);
            } else {
                setFilteredData(data);
            }
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(debounce);
    }, [data, searchInput]);

    const handleResultsPerPageChange = (e: any) => {
        setResultsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    if (error) {
        return (
            <Box textAlign="center" mt={5}>
                <Typography variant="h6" color="error">
                    Hubo un error al cargar las propiedades. Por favor, intenta nuevamente más tarde.
                </Typography>
            </Box>
        );
    }

    if (!data) return <CircularProgress />;

    return (
        <>
            <Header />

            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} px={3}>
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
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {isLoading ? (
                    <CircularProgress />
                ) : filteredData.length > 0 ? (
                    filteredData.map((property) => <DynamicCard key={property.id} {...property} />)
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
