import RedAtlasLogo from "../../assets/complete-logo-red-atlas.png";
import RedAtlasLogoAnimated from "../../assets/logo-animated-red-atlas.gif";
import RedAtlasBrand from "../../assets/logo-red-atlas.png";

interface ModalRootContentProps {
  toggleModal: () => void;
}

const ModalRootContent = ({ toggleModal }: ModalRootContentProps) => {
  return (
    <section className="flex flex-col p-6 bg-white border shadow-sm rounded-md w-full max-w-sm lg:max-w-lg items-center gap-7">
      <div className="flex flex-col items-center">
        <img src={RedAtlasLogo} alt="Red Atlas Logo" height={60} width={250} />

        <span className="font-bold text-secondary">Conozca su propiedad</span>
      </div>
      <div className="flex flex-col items-center gap-5">
        <button
          className="text-sm text-white px-2.5 py-1 border border-gray-700 w-[calc(100%-2rem)] h-9 max-w-[385px] font-semibold uppercase bg-gray-700 rounded-md hover:hover:bg-gray-600 transition-all duration-200 ease-in"
          onClick={toggleModal}
        >
          Ir a la plataforma
        </button>

        <span className="text-xs text-gray-400 text-center">
          Al ingresar a la plataforma, acepto los{" "}
          <span className="font-semibold underline cursor-pointer">
            Términos y Condiciones
          </span>{" "}
          de Red Atlas.
        </span>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <div className="bg-white border border-gray-700 text-gray-700 px-2.5 py-1.5 font-semibold rounded-md flex flex-row items-center justify-center gap-1 flex-1 cursor-pointer">
          <img src={RedAtlasLogoAnimated} alt="" height={30} width={30} />
          Valor de propiedad
        </div>
        <div className="bg-white border border-gray-700 text-gray-700 px-2.5 py-1.5 font-semibold rounded-md flex flex-row items-center justify-center gap-1 flex-1 cursor-pointer">
          <img src={RedAtlasBrand} alt="" height={20} width={20} />
          Atlas API
        </div>
      </div>
    </section>
  );
};

export default ModalRootContent;
