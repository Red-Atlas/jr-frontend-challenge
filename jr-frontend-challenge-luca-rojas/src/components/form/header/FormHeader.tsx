import React from "react";
import { NavLink } from "react-router";
import { Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const FormHeader: React.FC<{ id?: string }> = ({ id }) => (
  <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", mb: 2, flexDirection: "column" }}>
    <NavLink to="/" style={{ display: "flex", alignItems: "center", alignSelf: "flex-start", marginBottom: "1rem" }}>
      <ArrowBackIcon color="error" />
      <Typography color="error" sx={{ ml: 1 }}>
        Volver
      </Typography>
    </NavLink>
    <Typography variant="h4" color="error" ml={2}>
      {id ? "Editar Propiedad" : "Agregar Propiedad"}
    </Typography>
  </Box>
);

export default FormHeader;
