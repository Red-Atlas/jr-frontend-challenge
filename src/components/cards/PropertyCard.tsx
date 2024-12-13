import { Property } from "../../types/types";
import propertieImage from "../../assets/properties/propertie1.jpeg";

interface Props {
  property: Property;
}

const PropertyCard: React.FC<Props> = ({ property }) => {
  const updatedAt = new Date(property.updatedAt);

  const day = updatedAt.getDate().toString().padStart(2, "0");
  const month = (updatedAt.getMonth() + 1).toString().padStart(2, "0"); // Recordar que los meses empiezan en 0
  const year = updatedAt.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  return (
    <div className="w-[200px] h-[300px] rounded-xl flex flex-col items-start shadow-xl ">
      <img className="rounded-xl" src={propertieImage} alt="#property-image" />
      <div className="flex flex-col items-start p-2">
        <span className="font-bold">{property.title.slice(0, 40)}</span>
        <span>Adress : {property.address}</span>
        <span className="bg-gray text-white rounded p-1">
          Type : {property.type}
        </span>
        <span className="text-green">{property.price}$</span>
        <span className="bg-red text-white rounded p-1">{property.status}</span>
        <span>{property.isActive}</span>
        <span>{property.area}</span>
        <span>Publicada el {formattedDate}</span>
      </div>
    </div>
  );
};

export default PropertyCard;
