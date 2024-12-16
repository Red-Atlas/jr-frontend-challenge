import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropertyList from "./pages/PropertyList";
import PropertyDetail from "./pages/PropertyDetail";
import AddProperty from "./pages/AddPropetyPage";
import EditPropertyPage from "./pages/EditPropertyPage";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />

        <Routes>
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/" element={<PropertyList />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/edit-property/:id" element={<EditPropertyPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
