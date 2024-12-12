import { IProperty } from "../../interface/IProperty";
import ArrowIcon from "../ui/icons/ArrowIcon";
import FilledArrow from "../ui/icons/FilledArrow";
import PropertyCard from "./PropertyCard";

interface PropertiesListWrapperProps {
  propertiesAmount: number;
  properties: IProperty[];
  handleNextPage: () => void;
  handlePrevPage: () => void;
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
  };
  handleChangeOrder: () => void;
  propertiesOrder: boolean;
}

const PropertiesListWrapper = ({
  propertiesAmount,
  properties,
  handleNextPage,
  handlePrevPage,
  pagination,
  handleChangeOrder,
  propertiesOrder,
}: PropertiesListWrapperProps) => {
  return (
    <section className="fixed z-3 transform translate-z-0 lg:mx-8 lg:mb-24 bg-white right-0 bottom-0 h-[calc(100vh-205px)] shadow-md rounded p-2 max-w-xl w-full overflow-hidden">
      <div className="p-5 flex flex-row items-center justify-between">
        <span className="font-semibold text-gray-500">
          {propertiesAmount.toLocaleString("en-US")} Propiedades
        </span>

        <button
          onClick={handleChangeOrder}
          className="flex flex-row items-center"
        >
          <span className="font-semibold text-gray-500">
            {propertiesOrder ? "Mayor precio" : "Menor precio"}
          </span>
          <div className="flex flex-col">
            <FilledArrow
              className={`${
                propertiesOrder ? "fill-gray-950" : "fill-gray-200"
              } w-8`}
            />
            <FilledArrow
              className={`${
                propertiesOrder ? "fill-gray-200" : "fill-gray-950"
              } w-8 rotate-180 -mt-5`}
            />
          </div>
        </button>
      </div>

      <div className="flex items-center justify-center mb-3">
        <button
          onClick={handlePrevPage}
          className="px-4 py-2 mx-2 bg-gray-200 rounded hover:bg-gray-300"
          disabled={pagination.page === 1}
        >
          <ArrowIcon className="fill-gray-950 w-6 h-6" />
        </button>
        <span className="px-4 py-2 mx-2 bg-gray-100 rounded font-semibold">
          {pagination.page} / {pagination.totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 mx-2 bg-gray-200 rounded hover:bg-gray-300"
          disabled={pagination.page === pagination.totalPages}
        >
          <ArrowIcon className="fill-gray-950 w-6 h-6 rotate-180" />
        </button>
      </div>

      {Array.isArray(properties) && (
        <div className="overflow-scroll h-full pb-24 flex flex-wrap flex-row justify-evenly">
          {properties?.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </section>
  );
};

export default PropertiesListWrapper;
