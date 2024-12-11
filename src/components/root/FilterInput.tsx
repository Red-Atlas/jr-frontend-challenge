import RedAtlasBrand from "../../assets/logo-red-atlas.png";
import { IProperty } from "../../interface/IProperty";

interface FilterInputProps {
  filter: string;
  setFilter: (filter: string) => void;
  filterProperties: (filter: string) => void;
  properties: IProperty[];
  isChecked: boolean;
  handleToggle: () => void;
}

const FilterInput = ({
  filter,
  filterProperties,
  properties,
  setFilter,
  isChecked,
  handleToggle,
}: FilterInputProps) => {
  return (
    <>
      <div className="w-full max-w-xl flex flex-row p-3 bg-white gap-4 rounded-md">
        <img src={RedAtlasBrand} alt="" height={25} width={30} />
        <input
          type="text"
          className="w-full h-8 outline-none text-lg"
          placeholder={`${
            isChecked ? "Busca por titulo" : "Busca por direccion"
          }`}
          value={filter}
          onChange={(e) => {
            filterProperties(e.target.value);
            setFilter(e.target.value);
          }}
        />
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value="0"
            className="sr-only peer"
            checked={isChecked}
            onChange={() => {
              handleToggle();
              setFilter("");
            }}
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-transparent peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      </div>

      {properties.length > 0 && filter.length > 0 && (
        <div className="absolute z-10 w-full max-w-xl bg-white rounded-md mt-2">
          {properties.map((property) => (
            <div
              key={property.id}
              className="p-2 hover:bg-gray-100 cursor-pointer m-2 flex flex-col"
            >
              <span>
                {property.title}
              </span>
              <span className="text-sm text-gray-500">
                {property.address}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FilterInput;
