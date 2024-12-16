import { Fragment, useEffect, useState } from "react";
import { fetchProperties } from "../services/api";
import { Property } from "../types/property.types";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import PropertyCard from "../components/PropertyCard";
import Pagination from "../components/Pagination";
import "./styles/PropertyList.scss";

const PropertyList = () => {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [displayedProperties, setDisplayedProperties] = useState<Property[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProperties(1, 100);
        setAllProperties(data);
        setFilteredProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...allProperties];
    if (searchTerm) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }
    setFilteredProperties(filtered);
    setCurrentPage(1);
  }, [searchTerm, sortOrder, allProperties]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    setDisplayedProperties(filteredProperties.slice(startIndex, endIndex));
  }, [filteredProperties, currentPage, limit]);

  return (
    <Fragment>
      <div className="container">
        <div className="searchBar">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <div className="filters">
          <Filters sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </div>

        <ul className="list">
          {displayedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </ul>

        <div className="pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredProperties.length / limit)}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default PropertyList;
