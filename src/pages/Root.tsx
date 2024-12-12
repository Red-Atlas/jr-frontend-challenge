import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Modal from "../components/ui/Modal";
import ModalRootContent from "../components/root/ModalRootContent";
import useProperties from "../hooks/useProperties";
import useMap from "../hooks/useMap";
import LoadingPage from "../components/ui/LoadingPage";
import PropertiesListWrapper from "../components/root/PropertiesListWrapper";
import FilterInput from "../components/root/FilterInput";
import AddIcon from "../components/ui/icons/AddIcon";

const Root = () => {
  const [showModal, setShowModal] = useState(true);
  const [filter, setFilter] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const {
    loading,
    properties,
    propertiesAmount,
    handleNextPage,
    pagination,
    handlePrevPage,
    filterPropertiesByTitle,
    filterPropertiesByAddress,
    propertiesByTitle,
    propertiesByAddress,
  } = useProperties();
  const { mapDiv } = useMap(properties.slice(0, 10));

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <main>
      <div className="lg:m-5 mt-2 ml-2 relative flex flex-row justify-between">
        <FilterInput
          filter={filter}
          setFilter={setFilter}
          filterProperties={
            isChecked ? filterPropertiesByTitle : filterPropertiesByAddress
          }
          properties={isChecked ? propertiesByTitle : propertiesByAddress}
          isChecked={isChecked}
          handleToggle={handleToggle}
        />

        <button className="px-4 py-2 mx-2 bg-white rounded hover:bg-gray-100" onClick={() => navigate('/create')}>
          <AddIcon className="fill-gray-950 w-6 h-6 rotate-180" />
        </button>
      </div>

      <PropertiesListWrapper
        propertiesAmount={propertiesAmount}
        properties={properties.slice(0, 10)}
        handleNextPage={handleNextPage}
        pagination={pagination}
        handlePrevPage={handlePrevPage}
      />
      {mapDiv && (
        <div
          ref={mapDiv}
          className="h-screen w-full fixed top-0 left-0 -z-10"
        ></div>
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
