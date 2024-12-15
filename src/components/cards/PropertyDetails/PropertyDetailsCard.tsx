import { Property } from "../../../types/types";
import "./PropertyDetails.css";
import { IoIosCloseCircle } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { BsCalendar2DateFill } from "react-icons/bs";

interface Props {
  property: Property;
  onClose: () => void;
}

const PropertyDetailsCard: React.FC<Props> = ({ property, onClose }) => {
  return (
    <div id="modal-backdrop">
      <div className="bg-white w-[60%] h-[650px] rounded flex flex-col items-start p-6">
        <div className="flex flex-row w-full justify-between items-center">
          <span className="text-green">
            $
            {`${property.price} ${property.status === "rent" ? "mensual" : ""}`}
          </span>

          <button onClick={onClose}>
            <IoIosCloseCircle className="text-red" size={32} />
          </button>
        </div>

        <div className="flex flex-row items-center justify-start gap-2 ">
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

          <span>{property.area}m2</span>
        </div>

        <div className="flex flex-row justify-between items-star gap-4 mt-10 w-full">
          <div className="w-[50%]">
            <img
              className="rounded w-full"
              src={property.images[0]}
              alt="#property-image"
            />
          </div>
          <div className="flex flex-col gap-4 w-[50%]">
            <div className="flex flex-row gap-6">
              <div className="flex flex-col">
                <div className="flex flex-row items-center gap-2">
                  <BsCalendar2DateFill size={20} className="text-red" />
                  <span className="font-bold">Fecha de publicación</span>
                </div>
                <span className="text-gray">{property.createdAt}</span>
              </div>
              <div className="flex flex-col ">
                <div className="flex flex-row items-center gap-2">
                  <IoLocation size={24} className="text-red" />
                  <span className="font-bold">Dirección</span>
                </div>
                <span className="text-gray">{property.address}</span>
              </div>
            </div>
            <span className="mt-6">{property.description}</span>

            <div className="flex flex-row gap-6">
              <div className="flex flex-col mt-6">
                <div className="flex flex-row items-center gap-2">
                  <IoLocation size={24} className="text-red" />
                  <span className="font-bold">Propietario</span>
                </div>
                <span className="text-gray">{property.owner.name}</span>
              </div>

              <div className="flex flex-col mt-6">
                <div className="flex flex-row items-center gap-2">
                  <IoLocation size={24} className="text-red" />
                  <span className="font-bold">Contacto</span>
                </div>
                <span className="text-gray">{property.owner.contact}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsCard;
