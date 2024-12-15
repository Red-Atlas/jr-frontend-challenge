import { useState } from 'react'
import { FilterBarProps } from '../../../types/property'

export default function FilterBar({ onSearch, onSort }: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showOptions, setShowOptions] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar por titulo o direccion"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-400 rounded-md sm:rounded-r-md focus:outline-none focus:ring-1 focus:ring-black-800"

        />
        <button 
          type="submit" 
          className="w-full sm:w-auto bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          Buscar
        </button>

      </form>
      
      <div className="flex flex-col sm:flex-row justify-end gap-2">
        <select
          onChange={(e) => onSort(e.target.value as 'asc' | 'desc')}
          className="w-full sm:w-auto p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          <option value="default">Ordenar por precio</option>
          <option value="asc">Precio: Bajo a Alto</option>
          <option value="desc">Precio: Alto a Bajo</option>
        </select>
        
        {showOptions && (
          <div className="absolute mt-10 bg-white border border-gray-300 rounded-md shadow-lg z-50">
            <div className="filter-price">
              <button
                onClick={() => {
                  onSort('asc');
                  setShowOptions(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Precio: Bajo a Alto
              </button>
              <button
                onClick={() => {
                  onSort('desc');
                  setShowOptions(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Precio: Alto a Bajo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

