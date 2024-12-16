import { Button } from "../ui/Button";

export function DeleteConfirmationPopup({ isOpen, onClose, onConfirm }: { isOpen: boolean; onClose: () => void; onConfirm: () => void }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
                <p className="mb-6 text-gray-700">¿Estás seguro de que deseas eliminar esta propiedad? Esta acción es permanente y no se puede deshacer.</p>
                <div className="flex justify-end gap-4">
                    <Button variant="secondary" onClick={onClose} className="px-4 py-2">
                        Cancelar
                    </Button>
                    <Button variant="tertiary" onClick={onConfirm}>
                        Eliminar
                    </Button>
                </div>
            </div>
        </div>
    );
}
