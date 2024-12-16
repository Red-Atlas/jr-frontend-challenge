import { useState } from "react";
import { Owner } from "../../../types";
import { Button } from "../../../ui/Button";
import { DetailsIcon, MailIcon } from "../../../ui/Icons";
import { Link, useNavigate } from "react-router-dom";
import { DeleteConfirmationPopup } from "../../DeleteConfirmationPopup";
import { deleteProperty } from "../../../api";

type PropertyActionsProps = {
    id: string;
    owner: Owner;
    isOwner: boolean;
};

export function PropertyActions({ id, owner, isOwner }: PropertyActionsProps) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        setIsPopupOpen(false);
        await deleteProperty(id);
        alert("Propiedad eliminada.");
        navigate(0);
    };

    return (
        <div className="mt-auto flex items-center justify-end">
            <div className="flex gap-2">
                <Link to={`/property/${id}`} target="_blank">
                    <Button variant="tertiary" className="flex gap-2 px-4 py-2">
                        <DetailsIcon className="w-5 h-5" />
                        Ver detalles
                    </Button>
                </Link>
                {isOwner ? (
                    <div className="flex gap-2">
                        <Link to={`/user/properties/edit/${id}`}>
                            <Button variant="secondary" className="flex gap-2 px-4 py-2">
                                Editar
                            </Button>
                        </Link>
                        <Button onClick={() => setIsPopupOpen(true)} variant="tertiary" className="flex gap-2 px-4 py-2">
                            Borrar
                        </Button>
                    </div>
                ) : (
                    <Link to={`mailto:${owner.contact}`}>
                        <Button variant="secondary" className="flex gap-2 px-4 py-2">
                            <MailIcon className="w-5 h-5" />
                            Contactar
                        </Button>
                    </Link>
                )}
            </div>
            <DeleteConfirmationPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} onConfirm={handleDelete} />
        </div>
    );
}
