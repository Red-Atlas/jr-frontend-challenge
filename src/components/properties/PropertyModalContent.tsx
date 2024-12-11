import { useNavigate } from "react-router-dom";
import { IProperty, PropertyStatus } from "../../interface/IProperty";
import ArrowIcon from "../ui/icons/ArrowIcon";

interface IPropertyModalContentProps {
  property: IProperty | null;
}

const PropertyModalContent = ({ property }: IPropertyModalContentProps) => {
  const navigate = useNavigate();


  return (
    <section className="bg-white w-full max-w-3xl flex flex-col rounded-lg p-5">
      <div className="flex flex-row justify-between items-center mb-3">
        <button onClick={() => navigate("/")}>
          <ArrowIcon className="fill-gray-950 w-12 h-12" />
        </button>

        <div>
          <span
            className={`font-semibold text-lg rounded-lg ${
              property?.isActive ? "bg-green-600" : "bg-secondary"
            } text-white px-2 py-1`}
          >
            {property?.isActive ? "Activo" : "Pausado"}
          </span>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full">
          {property?.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={property?.title}
              width={340}
              height={320}
              className="object-cover w-full h-[300px] rounded-lg"
            />
          ))}
        </div>
        <div>
          <div className="flex flex-row items-start justify-between py-4">
            <div className="flex flex-col">
              <span className="font-semibold text-lg">{property?.title}</span>
              <div className="flex flex-row items-center gap-2">
                <span className="">{property?.address}</span>
                <div className="h-5 w-[1px] bg-secondary"></div>
                <span className="">Area {property?.area}</span>
                <div className="h-5 w-[1px] bg-secondary"></div>
                <span className="capitalize">{property?.type}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <span className="font-semibold text-xl rounded-full bg-secondary text-white px-2 py-1">
                {property?.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
              <span
                className={`font-semibold rounded-full ${
                  property?.status === PropertyStatus.RENT
                    ? "bg-orange-600"
                    : "bg-green-500"
                } text-white px-2 py-1 capitalize`}
              >
                {property?.status === PropertyStatus.RENT
                  ? "Alquiler"
                  : "En venta"}
              </span>
            </div>
          </div>
          <div>
            <span className="text-gray-500">{property?.description}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyModalContent;
