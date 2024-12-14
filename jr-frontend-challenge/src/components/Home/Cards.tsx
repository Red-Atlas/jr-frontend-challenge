import { useState } from 'react'
import { CardProperty } from '../../types/Property'
import Pagination from './Pagination'
import { getPaginatedData } from '../../utils/pagination'
import '../../styles/cards.css'
import Card from './Card'

interface CardsProps {
  properties: CardProperty[]
}

function Cards({ properties }: CardsProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const propertiesPerPage = 12
  const totalItems = properties.length
  const totalPages = Math.ceil(totalItems / propertiesPerPage)

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value as 'asc' | 'desc'
    setSortOrder(order)
  }

  const sortedProperties = [...properties].sort((a, b) =>
    sortOrder === 'asc' ? a.price - b.price : b.price - a.price
  )

  const currentProperties = getPaginatedData(
    sortedProperties,
    currentPage,
    propertiesPerPage
  )

  return (
    <main className="main">
      <div className="controls">
        <select
          className="sortSelect"
          value={sortOrder}
          onChange={handleSortChange}
        >
          <option value="asc">Precio: Menor a Mayor</option>
          <option value="desc">Precio: Mayor a Menor</option>
        </select>
      </div>
      <div className="contentCards">
        {currentProperties.length === 0 ? (
          <p className="textNoCards">No hay propiedades disponibles</p>
        ) : (
          currentProperties.map((property: CardProperty) => (
            <Card
              key={property.id}
              title={property.title}
              isActive={property.isActive}
              images={property.images}
              price={property.price}
              address={property.address}
              type={property.type}
              status={property.status}
              area={property.area}
              createdAt={property.createdAt}
              id={property.id}
            />
          ))
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </main>
  )
}

export default Cards
