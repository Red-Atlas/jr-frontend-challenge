import { Link } from 'react-router-dom'
import '../styles/error.css'

function Error(): JSX.Element {
  return (
    <div className="contentError">
      <h3 className="titleError">Error</h3>
      <p className="textError">La página que estás buscando no existe.</p>
      <Link to={'/'} className="btnError">
        Volver al inicio
      </Link>
    </div>
  )
}

export default Error
