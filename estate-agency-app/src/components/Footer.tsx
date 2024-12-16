import "./styles/Footer.scss";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <Link to={`/add-property/`} className="footer__add">
        <button className="button">Agregar Propiedad</button>
      </Link>
      <div className="footer__social-media">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__social-icon"
          aria-label="Facebook"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__social-icon"
          aria-label="Twitter"
        >
          <FaTwitter />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__social-icon"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__social-icon"
          aria-label="LinkedIn"
        >
          <FaLinkedinIn />
        </a>
      </div>
      <div className="footer__title">© 2024 RED Atlas Inc.</div>
    </footer>
  );
};

export default Footer;
