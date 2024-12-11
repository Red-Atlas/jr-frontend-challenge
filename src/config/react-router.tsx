import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Property from "../pages/Property";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: ":id",
        element: <Property />,
      }
    ]
  },
]);

export default router;
