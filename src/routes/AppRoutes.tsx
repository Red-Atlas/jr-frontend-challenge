import { Route, Routes } from "react-router-dom";
import { ShowAllProperties } from "../views/ShowAllProperties";
// import UpdatePropertyForm from '../components/forms/updateProperty/UpdateProperty';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<ShowAllProperties />}></Route>
      {/* <Route path="/edit-property/:id" element={<UpdatePropertyForm />}></Route> */}
    </Routes>
  );
};
