import { useState } from "react";
import { Outlet } from "react-router-dom";
import Modal from "../components/ui/Modal";
import ModalRootContent from "../components/root/ModalRootContent";
import LoadingPage from "./LoadingPage";
import useProperties from "../hooks/UseProperties";

const Root = () => {
  const [showModal, setShowModal] = useState(true);
  const { loading } = useProperties();

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <main>
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
