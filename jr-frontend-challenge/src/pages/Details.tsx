import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DetailsProperty } from '../types/Property'
import { getPropertyById } from '../services/apiService'
import '../styles/details.css'
import Header from '../components/Header'
import LocationMap from '../components/Details/LocationMap'
import OwnerDetails from '../components/Details/OwnerDetails'
import DateDetail from '../components/Details/DateDetail'

const Details: FC = () => {
  const { id } = useParams<{ id: string }>()
  const [property, setProperty] = useState<DetailsProperty | null>(null)

  useEffect(() => {
    const fetchProperty = async () => {
      if (id) {
        try {
          const data = await getPropertyById(id)
          setProperty(data)
        } catch (error) {
          console.error('Error al cargar la propiedad:', error)
        }
      }
    }
    fetchProperty()
  }, [id])

  if (!property) {
    return <p className="loadingText">Cargando detalles de la propiedad...</p>
  }

  const {
    title,
    description,
    isActive,
    price,
    images,
    address,
    location,
    type,
    status,
    area,
    createdAt,
    updatedAt,
    owner,
  } = property

  const defaultImage = `https://dummyimage.com/800x600/cccccc/000000&text=Created+Property`

  return (
    <>
      <Header onFilter={() => {}} />
      <div key={id} className="contentDetail">
        <div className="headerCardDetail">
          <h3 className="titleDetail">{title}</h3>
          <p
            className={`isActiveDetail ${
              isActive ? 'activeDetail' : 'inactiveDetail'
            }`}
          >
            {isActive ? 'Activo' : 'Inactivo'}
          </p>
        </div>
        {images.length > 0 ? (
          images.map((image, index) => (
            <img
              key={index}
              className="imgDetail"
              src={image}
              alt={`Property ${index + 1}`}
            />
          ))
        ) : (
          <img
            className="imgDetail"
            src={defaultImage}
            alt="Created Property"
          />
        )}
        <div className="contentTagsDetail">
          <p className="tagDetail">{type}</p>
          <p className="tagDetail">{status}</p>
        </div>
        <p className="areaDetail">Área: {area}</p>
        <p className="priceDetail">Precio: ${price}</p>
        <p className="addressDetail">Dirreción: {address}</p>
        <LocationMap lat={location.lat} lng={location.lng} />
        <p className="descriptionDetail">Descripción: {description}</p>
        <div className="contentdatesDetail">
          <DateDetail label="Fecha de publicación:" date={createdAt} />
          <DateDetail label="Fecha de actualización:" date={updatedAt} />
        </div>
        <OwnerDetails owner={owner} />
      </div>
    </>
  )
}

export default Details
