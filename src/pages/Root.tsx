import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { IProperty } from "../interface/IProperty";
import { apiService } from "../services/api.service";
import propertiesData from "../../properties.json";
import Modal from "../components/ui/Modal";
import ModalRootContent from "../components/root/ModalRootContent";
import LoadingPage from "./LoadingPage";

const typedPropertiesData: IProperty[] = propertiesData as IProperty[];

const Root = () => {
  const [properties, setProperties] = useState<IProperty[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(true);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    apiService
      .get<IProperty[]>("properties?page=1&limit=10")
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch(() => {
        setProperties(typedPropertiesData);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <Outlet />
      {properties.length > 0 && (
        <div>
          <h2>Properties</h2>
          <ul>
            {properties.map((property) => (
              <li key={property.id}>
                <h3>{property.address}</h3>
                <p>{property.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {showModal && (
        <Modal>
          <ModalRootContent toggleModal={toggleModal} />
        </Modal>
      )}
    </div>
  );
};

export default Root;
