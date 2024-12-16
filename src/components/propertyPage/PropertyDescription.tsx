import { H2 } from "../../ui/Text";

type PropertyDescriptionProps = {
    title: string;
    area: number;
    description: string;
};

export function PropertyDescription({ title, area, description }: PropertyDescriptionProps) {
    return (
        <div className="mb-8">
            <H2 className="text-2xl font-bold mb-4">{title}</H2>
            <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">{area} m²</span>
                <span className="text-gray-400">•</span>
                <span className="text-lg">Superficie total</span>
            </div>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    );
}
