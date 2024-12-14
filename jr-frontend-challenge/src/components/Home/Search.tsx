import { ChangeEvent } from 'react'
import '../../styles/search.css'
import { FaSearch } from 'react-icons/fa'

interface SearchProps {
  onFilter: (query: string) => void
}

function Search({ onFilter }: SearchProps): JSX.Element {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    onFilter(query)
  }

  return (
    <form className="contentSearch">
      <input
        type="text"
        placeholder="Buscar propiedad por titulo o dirección..."
        className="search"
        onChange={handleInputChange}
      />
      <button type="button" className="searchBtn">
        <FaSearch />
      </button>
    </form>
  )
}

export default Search
