import { TextField, MenuItem, FormControl, InputLabel, Select, Box } from '@mui/material';

interface InputSearchProps {
    onSearch: (input: string) => void; 
    searchType: 'title' | 'address'; 
    setSearchType: (type: 'title' | 'address') => void; 
}

const InputSearch: React.FC<InputSearchProps> = ({ onSearch, searchType, setSearchType }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value); 
    };

    return (
        <Box style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <TextField
                label={`Buscar por ${searchType === 'title' ? 'Título' : 'Dirección'}`}
                onChange={handleInputChange}
                variant="outlined"
            />
            <FormControl>
                <InputLabel id="search-type-label">Buscar por</InputLabel>
                <Select
                    label="Buscar por"
                    labelId="search-type-label"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value as 'title' | 'address')}
                >
                    <MenuItem value="title">Título</MenuItem>
                    <MenuItem value="address">Dirección</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default InputSearch;
