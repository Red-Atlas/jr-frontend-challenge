import { MouseEvent } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { PropertyCard } from '../types';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDeleteProperty } from '../hooks/useDeleteProperty';

const DynamicCard: FunctionComponent<PropertyCard> = ({
  id,
  title,
  description,
  images,
  price,
  type,
  status,
  address,
  area,
  isActive,
  createdAt,
  location,
  onUpdate,
  onDelete,
}) => {
  const navigate = useNavigate();
  const { deleteProperty } = useDeleteProperty();

  const handleDetailsClick = (event: MouseEvent<HTMLElement>) => {
    if (event.target instanceof HTMLElement && !event.target.closest('button')) {
      navigate(`/detail/${id}`);
    }
  };

  const handleEdit = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (onUpdate) {
      onUpdate({ id, title, description, images, price, type, status, address, area, isActive, createdAt, location });
    }
  };

  const handleDelete = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      const confirmed = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¡Este cambio no se puede deshacer!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
      });

      if (confirmed.isConfirmed) {
        const success = await deleteProperty(id);
        if (success) {
          Swal.fire('Eliminado', 'La propiedad ha sido eliminada.', 'success');
          if (onDelete) {
            onDelete(id);
          }
        }
      }
    } catch (err) {
      Swal.fire('Error', 'Hubo un problema al eliminar la propiedad.', 'error');
    }
  };

  return (
    <Card
      onClick={handleDetailsClick}
      sx={{
        cursor: 'pointer',
        width: '100%',
        maxWidth: 345,
        margin: '16px auto',
        boxShadow: 4,
        borderRadius: 2,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 6,
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={images[0]}
          alt={title}
          sx={{ borderRadius: '4px 4px 0 0' }}
        />
        <Typography
          variant="body2"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: isActive ? 'green' : 'red',
            color: 'white',
            fontWeight: 'bold',
            padding: '4px 8px',
            borderRadius: 1,
          }}
        >
          {isActive ? 'Activo' : 'Inactivo'}
        </Typography>
       { type && (<Typography
          variant="body2"
          sx={{
            position: 'absolute',
            bottom: 8,
            left: 8,
            backgroundColor: '#1976d2',
            color: 'white',
            fontWeight: 'bold',
            padding: '4px 8px',
            borderRadius: 1,
          }}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Typography>)}
      </Box>

      <CardContent sx={{ padding: 2 }}>
        <Typography
          variant="h6"
          sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 1 }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center', marginBottom: 1 }}
        >
          {address}
        </Typography>

        <Grid2 container spacing={1} justifyContent="space-between">
          <Grid2>
            <Typography
              variant="h6"
              sx={{
                color: '#4caf50',
                fontWeight: 'bold',
              }}
            >
              ${price.toLocaleString()}
            </Typography>
          </Grid2>
          <Grid2 sx={{ textAlign: 'right' }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 'bold',
                color: status === 'sale' ? '#ff9800' : '#2196f3',
              }}
            >
              {status === 'sale' ? 'En venta' : 'En alquiler'}
            </Typography>
          </Grid2>
        </Grid2>

        <Box sx={{ marginTop: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Área: {area} m²
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontStyle: 'italic', marginBottom: 1 }}
          >
            Publicado: {createdAt ? format(new Date(createdAt), 'dd/MM/yyyy') : 'Fecha no disponible'}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {description}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'center' }}>
        <IconButton onClick={handleEdit} sx={{ color: 'primary.main', '&:hover': { color: 'primary.dark' } }}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDelete} sx={{ color: 'error.main', '&:hover': { color: 'error.dark' } }}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default DynamicCard;
