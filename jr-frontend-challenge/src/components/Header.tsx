import { useLocation, useNavigate } from 'react-router-dom'
import '../styles/header.css'
import Search from './Home/Search'
import { IoIosArrowBack } from 'react-icons/io'
import { AiOutlinePlus, AiOutlineEdit } from 'react-icons/ai'

interface HeaderProps {
  onFilter: (query: string) => void
}

function Header({ onFilter }: HeaderProps): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  const handleCreate = () => {
    navigate('/create')
  }

  const handleEdit = () => {
    const propertyId = location.pathname.split('/').pop()
    if (propertyId) {
      navigate(`/edit/${propertyId}`)
    }
  }

  return (
    <header className="header">
      {location.pathname === '/' ? (
        <>
          <h1 className="h1 visibility">Red Atlas</h1>
          <Search onFilter={onFilter} />
          <button className="createBtn" onClick={handleCreate}>
            <AiOutlinePlus className="icon" />
            <span className="visibility">Crear</span>
          </button>
        </>
      ) : location.pathname.startsWith('/detail/') ? (
        <>
          <button className="backButton" onClick={handleBack}>
            <IoIosArrowBack className="arrowIcon" />
            Volver
          </button>
          <button className="editBtn" onClick={handleEdit}>
            <AiOutlineEdit className="icon" />
            Editar
          </button>
        </>
      ) : (
        <button className="backButton" onClick={handleBack}>
          <IoIosArrowBack className="arrowIcon" />
          Volver
        </button>
      )}
    </header>
  )
}

export default Header
