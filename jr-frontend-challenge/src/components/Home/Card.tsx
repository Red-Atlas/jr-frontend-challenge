import { FC } from 'react'
import { CardProperty } from '../../types/Property'
import { formatDate } from '../../utils/formatDate'
import '../../styles/card.css'
import { Link } from 'react-router-dom'

const Card: FC<CardProperty> = ({
  title,
  isActive,
  images,
  price,
  address,
  type,
  status,
  area,
  createdAt,
  id,
}) => {
  const formattedDate = formatDate(createdAt)

  const defaultImage = `https://dummyimage.com/800x600/cccccc/000000&text=Created+Property`

  return (
    <Link to={`/detail/${id}`} key={id} className="card">
      <div className="headerCard">
        <h3 className="title">{title}</h3>
        <p className={`isActive ${isActive ? 'active' : 'inactive'}`}>
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
        <img className="imgDetail" src={defaultImage} alt="Created Property" />
      )}
      <div className="contentTags">
        <p className="tag">{type}</p>
        <p className="tag">{status}</p>
      </div>
      <div className="contentInfo">
        <p className="price">Precio: ${price}</p>
        <p className="address">{address}</p>
        <p className="area">Área: {area}</p>
        <p className="createdAt">{formattedDate}</p>
      </div>
    </Link>
  )
}

export default Card
