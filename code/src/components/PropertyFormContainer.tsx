import CreatePropertyForm from './CreatePropertyForm';
import Header from './layout/Header';

const PropertyFormContainer = ({ refetch }: { refetch: () => void }) => {
  return (
    <>
    <Header />
      <CreatePropertyForm refetch={refetch} />
    </>
  );
};

export default PropertyFormContainer;
