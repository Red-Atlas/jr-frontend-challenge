import './styles/Header.scss';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar">
      <Link to={`/`}><img className='logo-img' src={logo} alt="Logo" /></Link>
    </nav>
  );
};

export default Header;
