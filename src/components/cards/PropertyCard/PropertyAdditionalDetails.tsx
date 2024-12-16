import { SpanPopUp } from "../../../ui/Text";

type PropertyAdditionalDetailsProps = {
    area: number;
    isActive: boolean;
    description: string;
};
export function PropertyAdditionalDetails({ area, isActive, description }: PropertyAdditionalDetailsProps) {
    return (
        <>
            <div className="flex flex-wrap gap-4 my-4 text-sm">
                <span className="flex items-center gap-1">
                    <span>{area}</span> m² tot.
                </span>
                <span className={`flex items-center relative group gap-1 px-2 rounded-full text-white cursor-default ${isActive ? "bg-green-500" : "bg-red-500"}`}>
                    {isActive ? "Activo" : "Inactivo"}
                    <SpanPopUp>Disponibilidad</SpanPopUp>
                </span>
            </div>
            <p className="text-gray-600 text-sm mb-4 text-ellipsis overflow-hidden">{description}</p>
        </>
    );
}
