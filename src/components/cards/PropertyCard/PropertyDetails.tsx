import { SpanPopUp, SpanToggle } from "../../../ui/Text";
import { NewIcon } from "../../../ui/Icons";

type PropertyDetailsProps = {
    price: number;
    createdAt: string;
    title: string;
    address: string;
    type: "house" | "apartment" | "land" | "office";
    status: "sale" | "rent";
};

export function PropertyDetails({ price, createdAt, title, address, type, status }: PropertyDetailsProps) {
    const mappedType = {
        house: "Casa",
        apartment: "Departamento",
        land: "Terreno",
        office: "Oficina",
    };
    const mappedStatus = {
        sale: "Venta",
        rent: "Alquiler",
    };
    function calculateNew() {
        const today = new Date();
        const created = new Date(createdAt);
        const diffTime = today.getTime() - created.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const isNew = diffDays <= 60;
        return { diffDays, isNew };
    }

    const { diffDays, isNew } = calculateNew();
    return (
        <div className="flex flex-col w-full mb-2">
            <div className="flex items-center justify-between w-full">
                <span className="text-2xl font-bold">USD {price.toLocaleString()}</span>
                <div className="flex gap-3">
                    {isNew && (
                        <div className="relative group">
                            <NewIcon fill="red" className="w-10 h-10 rotate-45" />
                            <SpanPopUp className="min-w-[130px]">Nuevo hace {diffDays} días</SpanPopUp>
                        </div>
                    )}
                    <span className="flex items-center text-md gap-1">{new Date(createdAt).toLocaleDateString()}</span>
                </div>
            </div>
            <h3 className="text-lg mt-1">{title}</h3>
            <p className="text-gray-600 text-sm">{address}</p>
            <div className="flex gap-2 mt-1">
                <SpanToggle variant="primary">{mappedType[type]}</SpanToggle>
                <SpanToggle variant="secondary">{mappedStatus[status]}</SpanToggle>
            </div>
        </div>
    );
}
