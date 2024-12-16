import { LocationIcon } from "../../ui/Icons";
import { SpanToggle } from "../../ui/Text";

type PropertyDetailsProps = {
    address: string;
    status: "rent" | "sale";
    price: number;
    area: number;
    active: boolean;
    type: "house" | "apartment" | "land" | "office";
};

export function PropertyDetails({ address, status, price, area, type, active }: PropertyDetailsProps) {
    const newType = {
        house: "Casa",
        apartment: "Departamento",
        land: "Terreno",
        office: "Oficina",
    };
    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-3 ml-2 text-md items-center text-gray-500">
                <span>{newType[type]}</span>
                <span className="text-gray-400/70 text-xs">•</span>
                <span>{area} m²</span>
                <span className="text-gray-400/70 text-xs">•</span>
                <span>{status === "sale" ? "Venta" : "Alquiler"}</span>
            </div>
            <div className="flex items-center gap-3">
                <SpanToggle variant="default" className={`${status === "sale" ? "bg-green-400" : "bg-blue-400"} text-base text-white px-4 py-2`}>
                    {status === "sale" ? "Venta" : "Alquiler"}
                </SpanToggle>
                <p className="text-2xl font-bold">USD {price.toLocaleString()}</p>
                <SpanToggle variant="default" className={`${active ? "bg-green-400" : "bg-red-400"} text-base text-white px-4 py-2`}>
                    {active ? "Activo" : "Inactivo"}
                </SpanToggle>
            </div>
            <p className="flex text-lg text-black mb-2">
                <LocationIcon className="w-5 h-5 mr-1" />
                {address}
            </p>
        </div>
    );
}
