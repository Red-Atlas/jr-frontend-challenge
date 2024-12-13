import { AppRoutes } from "./routes/AppRoutes";
import { getAllProperties } from "./services/getAllProperties";

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center ">
      <AppRoutes />
    </div>
  );
};
