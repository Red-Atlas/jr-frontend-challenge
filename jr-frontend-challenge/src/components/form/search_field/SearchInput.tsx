import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  onSearchAction: any;
  setSearchParam: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchInput({ onSearchAction, setSearchParam }: Props) {
  
  return (
    <Paper component="form" sx={{ display: "flex", alignItems: "center" }}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Buscar Propiedad..."
        inputProps={{ "aria-label": "search properties" }}
        onChange={(e) => setSearchParam(e.target.value)}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        onClick={onSearchAction}
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
