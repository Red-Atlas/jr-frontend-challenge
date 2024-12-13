import { Route, Routes } from "react-router-dom";
import { ShowAllProperties } from "../views/ShowAllProperties";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<ShowAllProperties />}></Route>
    </Routes>
  );
};
