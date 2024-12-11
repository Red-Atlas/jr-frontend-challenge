import { useState } from "react";
import { Outlet } from "react-router-dom";
import Modal from "../components/ui/Modal";
import ModalRootContent from "../components/root/ModalRootContent";
import useProperties from "../hooks/useProperties";
import useMap from "../hooks/useMap";
import LoadingPage from "../components/ui/LoadingPage";

const Root = () => {
  const [showModal, setShowModal] = useState(true);
  const { loading, properties } = useProperties();
  const { mapDiv } = useMap(properties, loading);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <main>
      {mapDiv && properties.length > 0 && (
        <div ref={mapDiv} className="h-screen w-full fixed top-0 left-0"></div>
      )}
      {showModal && (
        <Modal>
          <ModalRootContent toggleModal={toggleModal} />
        </Modal>
      )}
      <Outlet />
    </main>
  );
};

export default Root;
