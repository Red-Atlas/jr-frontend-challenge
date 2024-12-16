import { Property } from "../../types/types";

interface Props {
  property: Property;
}

const PropertyCard: React.FC<Props> = ({ property }) => {
  const updatedAt = new Date(property.updatedAt);

  const day = updatedAt.getDate().toString().padStart(2, "0");
  const month = (updatedAt.getMonth() + 1).toString().padStart(2, "0");
  const year = updatedAt.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  return (
    <div className="w-[300px] h-[400px] rounded-xl flex flex-col items-start shadow-xl ">
      <img
        className="rounded-xl"
        src={property.images[0]}
        alt="#property-image"
      />
      <div className="flex flex-col items-start gap-2 p-2">
        <div className="flex flex-row items-center justify-between w-full gap-2">
          <span className="text-green">{property.price}$</span>
          <span>{property.area} m2</span>
        </div>
        <span>{property.address.slice(0, 30)}</span>
        <div className="flex flex-row items-center gap-2 ">
          <span className="bg-grayCards text-white rounded-lg p-1 ">
            {property.type}
          </span>
          <span
            className={
              property.status === "rent"
                ? "bg-orange text-white rounded-lg p-1 "
                : "bg-red text-white rounded-lg p-1 "
            }
          >
            {property.status}
          </span>
          <span
            className={
              property.isActive === true
                ? "bg-green rounded-lg p-1 text-white"
                : ""
            }
          >
            {property.isActive ? "Active" : ""}
          </span>
        </div>

        <span>Publication date : {formattedDate}</span>
      </div>
      {/* <button
        onClick={handleEditClick}
        className="bg-red p1 rounded text-white"
      >
        Editar
      </button> */}
    </div>
  );
};

export default PropertyCard;
