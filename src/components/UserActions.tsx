import { Tab } from "../ui/Tab";

export function UserActions() {
    return (
        <div className="flex flex-col md:flex-row w-full justify-center items-center gap-4">
            <Tab title="Crear propiedad" link="/properties/new" icon="🏠" description="Crea una nueva propiedad" />
            <Tab title="Editar propiedad" link="/properties/new" icon="🛠️" description="Edita una propiedad" className="hover:!text-green-600" />
            <Tab title="Eliminar propiedad" link="/properties/new" icon="❌" description="Elimina una propiedad" className="hover:!text-red-600" />
        </div>
    );
}
