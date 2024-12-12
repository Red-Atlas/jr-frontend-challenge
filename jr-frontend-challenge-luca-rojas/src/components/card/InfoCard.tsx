import { Card, Stack, Typography } from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import SellIcon from "@mui/icons-material/Sell";
import UpdateIcon from "@mui/icons-material/Update";

import { Property } from "../../interfaces/property.interface";

interface Props {
  property: Property;
}

const InfoCard = ({ property }: Props) => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px",
        marginTop: 2,
        width: "100%",
      }}
    >
      <Stack spacing={1.5}>
        <Typography color="error" variant="h6" sx={{ fontSize: "1rem" }}>
          Datos de dueño
        </Typography>
        <Stack direction="row" spacing={1.5}>
          <AccountCircleIcon color="error" fontSize="small" />
          <Typography variant="body2">Owner: {property.owner.name}</Typography>
        </Stack>
        <Stack direction="row" spacing={1.5}>
          <AlternateEmailIcon color="error" fontSize="small" />
          <Typography variant="body2">
            Contact: {property.owner.contact}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1.5}>
          <SellIcon color="error" fontSize="small" />
          <Typography variant="body2">
            Published: {new Date(property.createdAt).toLocaleDateString()}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1.5}>
          <UpdateIcon color="error" fontSize="small" />
          <Typography variant="body2">
            Last Updated: {new Date(property.updatedAt).toLocaleDateString()}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default InfoCard;
