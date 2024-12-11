import { useState } from "react";
import { Outlet } from "react-router-dom";
import Modal from "../components/ui/Modal";
import ModalRootContent from "../components/root/ModalRootContent";
import LoadingPage from "./LoadingPage";
import useProperties from "../hooks/useProperties";
import useMap from "../hooks/useMap";

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
      <div ref={mapDiv} className="h-screen w-full fixed top-0 left-0"></div>
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
