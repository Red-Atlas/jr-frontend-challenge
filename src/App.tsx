import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { SearchResultsPage } from "./pages/SearchResultsPage";
import { PropertyPage } from "./pages/PropertyPage";
import { UserPropertiesPage } from "./pages/UserPropertiesPage";
import { CreatePropertiesPage } from "./pages/CreatePropertiesPage.tsx";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Layout } from "./components/Layout";
import { FavoritesPage } from "./pages/FavoritesPage.tsx";
import { EditPropertyPage } from "./pages/EditPropertiesPage.tsx";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/property/:id" element={<PropertyPage />} />
                <Route path="/user/properties" element={<UserPropertiesPage />} />
                <Route path="/user/properties/create" element={<CreatePropertiesPage />} />
                <Route path="/user/properties/favorites" element={<FavoritesPage />} />
                <Route path="/user/properties/edit/:id" element={<EditPropertyPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Layout>
    );
}

export default App;
