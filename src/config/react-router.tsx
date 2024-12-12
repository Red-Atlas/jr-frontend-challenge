import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Property from "../pages/Property";
import CreateProperty from "../pages/CreateProperty";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: ":id",
        element: <Property />,
      },
      {
        path: "create",
        element: <CreateProperty />,
      },
    ],
  },
]);

export default router;
