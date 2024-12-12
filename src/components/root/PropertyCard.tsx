import { useNavigate } from "react-router-dom";
import { IProperty } from "../../interface/IProperty";
import NotImg from '../../assets/not-img.jpg';

interface PropertyCardProps {
  property: IProperty;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      key={property.id}
      className="shadow-md transition ease-in-out duration-300 bg-gray-50 rounded-md mb-6 cursor-pointer w-[250px] hover:shadow-2xl flex flex-col"
      onClick={() => navigate(`/${property.id}`)}
    >
      <div className="relative w-full h-44 rounded-t-lg">
        {property.images.length ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover object-center rounded-t-lg"
          />
        ) : (
          <img
            src={NotImg}
            alt={property.title}
            className="w-full h-full object-cover object-center rounded-t-lg"
          />
        )}
        <div>
          <p className="text-white text-sm font-bold absolute top-3 right-3 bg-secondary px-2 py-1 rounded-2xl">
            {property.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>
      </div>
      <div className="p-4 flex flex-col items-start gap-2 justify-between h-full">
        <p className="text-sm text-gray-500">{property.title}</p>
        <p className="text-xs text-gray-400">{property.address}</p>
        <p className="text-white text-sm font-bold bg-secondary px-3 py-1 rounded-full capitalize">
          {property.type}
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
