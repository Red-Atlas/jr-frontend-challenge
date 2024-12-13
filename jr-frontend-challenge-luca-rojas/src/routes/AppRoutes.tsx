import PropertyDetail from "../components/pages/PropertyDetail";
import PropertyForm from "../components/pages/PropertyForm";
import PropertyList from "../components/pages/PropertyList";

export interface CustomRoute {
  readonly name: string;
  readonly path: string;
  readonly children?: Array<any>;
  readonly checkAuth?: boolean;
  readonly element?: () => JSX.Element;
  readonly loader?: () => void;
}

export interface SubRoutes {
  readonly name?: string;
  readonly path: string;
  readonly children?: Array<any>;
  readonly element?: () => JSX.Element;
}

export const AppRoutes: Array<CustomRoute> = [
  {
    name: "default",
    path: "/",
    element: () => <PropertyList />,
  },
  {
    name: "properties",
    path: "/properties",
    element: () => <PropertyList />,
  },
  {
    name: "property_by_id",
    path: "/property/:id",
    element: () => <PropertyDetail />,
  },
  {
    name: "add_property",
    path: "/add-property",
    element: () => <PropertyForm />,
  },
  {
    name: "edit_property",
    path: "/edit-property/:id",
    element: () => <PropertyForm />,
  },
  {
    name: "any",
    path: "*",
    element: () => <PropertyList />,
  },
  
];

export default AppRoutes;
