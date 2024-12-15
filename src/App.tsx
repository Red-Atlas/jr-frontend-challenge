import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import PropertyDetails from './components/PropertyDetails/PropertyDetails';
import EditProperty from './components/EditProperty/EditProperty';
import Favorites from './components/Favorites/Favorites'
import AddProperty from './components/AddProperty/AddProperty'

function App() {
  
  return (
    <>
       <Router>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<PropertyDetails />} />
        <Route path="/edit/:id" element={<EditProperty />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/addproperty" element={<AddProperty />} />
      </Routes>
      
      <Footer />
    </Router>
    </>
  )
}

export default App