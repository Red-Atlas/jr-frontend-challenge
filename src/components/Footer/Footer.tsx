import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white-800 py-8 border-t border-black-300 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between mb-4">
          <div className="flex justify-center sm:justify-start space-x-4 mb-1">
            <a className="redes" href="https://www.facebook.com/redatlaslatam" target="_blank" rel="noopener noreferrer">
              <Facebook size={24} color="black" />
            </a>
            <a className="redes" href="https://www.instagram.com/redatlaslatam" target="_blank" rel="noopener noreferrer">
              <Instagram size={24} color="black" />
            </a>
            <a className="redes" href="https://www.linkedin.com/company/redatlas/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
              <Linkedin size={24} color="black" />
            </a>
            <a className="redes" href="https://www.youtube.com/@redatlas3463" target="_blank" rel="noopener noreferrer">
              <Youtube size={24} color="black" />
            </a>
            <a className="redes" href="mailto:info@atlas.red" target="_blank" rel="noopener noreferrer">
              <Mail size={24} color="black" />
            </a>
          </div>

          {/* Secciones: Desarrolladores y Compañía */}
          <div className="flex flex-col sm:flex-row sm:space-x-8 text-center sm:text-left">
            <div className="mb-6 sm:mb-0">
              <h4 className="font-bold text-black mb-2">Desarrolladores</h4>
              <Link to="https://docs.atlas.red/" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">API</Link>
            </div>
            <div className="mb-6 sm:mb-0">
              <h4 className="font-bold text-black mb-2">Compañía</h4>
              <Link to="https://valuations.atlas.red/es-AR/faq" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline block">Preguntas Frecuentes</Link>
              <Link to="https://atlas.red/home" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline block">Políticas de Datos</Link>
              <Link to="https://valuations.atlas.red/es-AR/terms" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline block">Términos y Condiciones</Link>
            </div>
          </div>
        </div>

        <div className="text-center border-t border-gray-300 mt-4">
          <p className="text-sm mt-5">&copy; 2024 RED Atlas. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
