import RedAtlasBrand from "../../assets/logo-red-atlas.png";
import { IProperty } from "../../interface/IProperty";

interface FilterInputProps {
  filter: string;
  setFilter: (filter: string) => void;
  filterPropertiesByTitle: (filter: string) => void;
  propertiesByTitle: IProperty[];
}

const FilterInput = ({
  filter,
  filterPropertiesByTitle,
  propertiesByTitle,
  setFilter,
}: FilterInputProps) => {
  return (
    <>
      <div className="w-full max-w-lg flex flex-row p-3 bg-white gap-4 rounded-md">
        <img src={RedAtlasBrand} alt="" height={25} width={30} />
        <input
          type="text"
          className="w-full h-8 outline-none text-lg"
          placeholder="Busca por titulo"
          value={filter}
          onChange={(e) => {
            filterPropertiesByTitle(e.target.value);
            setFilter(e.target.value);
          }}
        />
      </div>

      {propertiesByTitle.length > 0 && filter.length > 0 && (
        <div className="absolute z-10 w-full max-w-lg bg-white rounded-md mt-2">
          {propertiesByTitle.map((property) => (
            <div
              key={property.id}
              className="p-2 hover:bg-gray-100 cursor-pointer m-2"
            >
              {property.title}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FilterInput;
