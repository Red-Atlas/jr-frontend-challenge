import { Box, CardMedia, Typography, Chip, Button } from '@mui/material';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useFetchPropertyById } from '../hooks/useFetchPropertiesById';
import MapComponent from './MapComponent';
import Header from './layout/Header';

const DetailContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  margin: 16px auto;
  max-width: 800px;
`;

const StyledCardMedia = styled(CardMedia)`
  height: 300px;
  width: 100%;
  margin-bottom: 16px;
  border-radius: 8px;
`;

const InfoBox = styled(Box)`
  width: 100%;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled(Typography)`
  margin-top: 16px;
  margin-bottom: 8px;
  font-weight: bold;
`;

const OwnerBox = styled(Box)`
  margin-top: 16px;
  padding: 16px;
  background-color: #e3f2fd;
  border-radius: 8px;
`;

const ChipStyled = styled(Chip)`
  margin: 4px;
`;

function Detail() {
  const { id } = useParams();
  const { property, error } = useFetchPropertyById(id!);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!property) return <Typography>Cargando...</Typography>;

  const {
    address,
    title,
    description,
    images,
    price,
    type,
    status,
    isActive,
    area,
    createdAt,
    location,
    owner,
  } = property;

  return (
    <>
    <Header />
    <DetailContainer>
       <Button variant="contained" onClick={handleGoBack}>
        Volver atrás
      </Button>
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>

      <StyledCardMedia
        image={images[0]}
        title={title}
      />

      <InfoBox>
        <Typography variant="body1">
          <strong>Dirección:</strong> {address}
        </Typography>
        <Typography variant="body1">
          <strong>Estado:</strong>{' '}
          <ChipStyled
            label={isActive ? 'Activo' : 'Inactivo'}
            color={isActive ? 'success' : 'error'}
          />
        </Typography>
        <Typography variant="body1">
          <strong>Tipo:</strong> {type.charAt(0).toUpperCase() + type.slice(1)}
        </Typography>
        <Typography variant="body1">
          <strong>Área:</strong> {area} m²
        </Typography>
        <Typography variant="body1">
          <strong>Precio:</strong> ${price.toLocaleString()}
        </Typography>
        <Typography variant="body1">
          <strong>Status:</strong>{' '}
          {status === 'sale' ? 'En venta' : 'En alquiler'}
        </Typography>
        <Typography variant="body1">
          <strong>Publicado el:</strong> {format(new Date(createdAt), 'dd/MM/yyyy')}
        </Typography>
      </InfoBox>

      <SectionTitle variant="h5">Descripción</SectionTitle>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>

      <MapComponent location={{ lat: location.lat, lng: location.lng }} title={title} />

      <OwnerBox>
        <Typography variant="h6">Propietario</Typography>
        <Typography variant="body1">
          <strong>Nombre:</strong> {owner.name}
        </Typography>
        <Typography variant="body1">
          <strong>Contacto:</strong> {owner.contact}
        </Typography>
      </OwnerBox>
    </DetailContainer>
    </>
  );
}

export default Detail;
