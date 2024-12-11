
import RedAtlasBrand from "../../assets/logo-red-atlas.png";
import LoadingComponent from "./LoadingComponent";

const LoadingPage = () => {
  return (
    <section className="w-full h-screen  flex items-center justify-center">
      <div className="relative">
      <img src={RedAtlasBrand} alt="Red Atlas Brand" width={50} height={50}/>
        <LoadingComponent className="w-28 h-28 absolute -top-6 -right-8" />
    </div>
    </section>
  );
};

export default LoadingPage;
