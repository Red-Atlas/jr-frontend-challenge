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
    <Card sx={{ padding: "17px", marginTop: 2 }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <AccountCircleIcon color="error" />
          <Typography variant="body2">Owner: {property.owner.name}</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <AlternateEmailIcon color="error" />
          <Typography variant="body2">
            Contact: {property.owner.contact}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <SellIcon color="error" />
          <Typography variant="body2">
            Published: {new Date(property.createdAt).toLocaleDateString()}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <UpdateIcon color="error" />
          <Typography variant="body2">
            Last Updated: {new Date(property.updatedAt).toLocaleDateString()}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default InfoCard;
