import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logoAtlas from "../../assets/LogoREDAtlas.png";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="transparent" position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}
          >
            <img className="atlas-logo" src={logoAtlas} alt="atlas logo" />
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
