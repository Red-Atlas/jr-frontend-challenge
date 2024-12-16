import { Button } from "../../ui/Button";
import { MailIcon } from "../../ui/Icons";
import { SpanPopUp } from "../../ui/Text";

type PropertyContactProps = {
    owner: {
        name: string;
        contact: string;
    };
    active: boolean;
};

export function PropertyContact({ owner, active }: PropertyContactProps) {
    return (
        <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Información del anunciante</h2>
            <div className="mb-4">
                <p className="font-medium">{owner.name}</p>
                <p className="text-gray-600">{owner.contact}</p>
            </div>
            <div className="flex w-fit items-center relative group gap-4">
                <Button disabled={!active} variant="secondary" onClick={() => (window.location.href = `mailto:${owner.contact}`)} className="flex items-center gap-2">
                    <MailIcon className="w-5 h-5" />
                    Contactar
                </Button>
                <SpanPopUp className="!left-16 !bg-red-400 !text-white !p-2 w-[120px]">Propiedad Inactiva</SpanPopUp>
            </div>
        </div>
    );
}
