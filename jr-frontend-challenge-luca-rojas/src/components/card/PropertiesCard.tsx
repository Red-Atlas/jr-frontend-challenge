import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { Property } from "../../interfaces/property.interface";
import { NavLink } from "react-router";

interface Props {
  property: Property;
}

const PropertiesCard = ({ property }: Props) => {
  return (
    <Card id={property.id}>
      <CardMedia
        sx={{ height: 140 }}
        image={property.images[0]}
        title={property.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {property.title}
        </Typography>
        <Typography gutterBottom variant="subtitle1" component="div">
          {property.address}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {property.description}
          </Typography>
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ flexWrap: "wrap", marginTop: 2 }}
        >
          <Stack direction="row" spacing={1}>
            <Chip color="error" label={property.type} size="small" />
            <Chip color="error" label={property.status} size="small" />
            <Chip
              color="error"
              label={property.isActive ? "Activo" : "Inactivo"}
              size="small"
            />
          </Stack>
          <Stack direction="row" spacing={1}>
            <Chip label={`Área ${property.area} m²`} size="small" />
          </Stack>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ flexWrap: "wrap", marginTop: 2 }}
        >
          <Stack sx={{ marginTop: 2 }} direction="row" spacing={1}>
            <Chip
              label={`Precio: USD ${property.price.toLocaleString()}`}
              size="small"
              variant="outlined"
            />
          </Stack>
          <CardActions>
            <NavLink to={`/property/${property.id}`}>
              <Button
                variant="contained"
                size="small"
                sx={{ backgroundColor: "#d31216" }}
              >
                Ver más
              </Button>
            </NavLink>
          </CardActions>
        </Stack>
        <Typography
          sx={{ color: "#888" }}
          variant="overline"
        >{`Publicado: ${property.createdAt.slice(0, 10)}`}</Typography>
      </CardContent>
    </Card>
  );
};

export default PropertiesCard;
