import { useState } from "react";
import { Outlet } from "react-router-dom";
import Modal from "../components/ui/Modal";
import ModalRootContent from "../components/root/ModalRootContent";
import useProperties from "../hooks/useProperties";
import useMap from "../hooks/useMap";
import LoadingPage from "../components/ui/LoadingPage";
import PropertiesListWrapper from "../components/root/PropertiesListWrapper";
import LoadingComponent from "../components/ui/LoadingComponent";
import FilterInput from "../components/root/FilterInput";

const Root = () => {
  const [showModal, setShowModal] = useState(true);
  const [filter, setFilter] = useState("");
  const [isChecked, setIsChecked] = useState(false);

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
    allProperties,
    propertiesByAddress,
  } = useProperties();
  const { mapDiv } = useMap(properties, loading);

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
      <div className="lg:m-5 relative">
        {allProperties.length > 0 ? (
          <div>
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
          </div>
        ) : (
          <LoadingComponent className="w-14 h-14" />
        )}
      </div>

      <PropertiesListWrapper
        propertiesAmount={propertiesAmount}
        properties={properties}
        handleNextPage={handleNextPage}
        pagination={pagination}
        handlePrevPage={handlePrevPage}
      />
      {mapDiv && properties.length > 0 && (
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
