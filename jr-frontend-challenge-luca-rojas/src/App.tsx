import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store";

import AppTemplate from "./components/template/AppTemplate";
import AppRoutes, { CustomRoute } from "./routes/AppRoutes";

const renderRoutes = (routes: Array<CustomRoute>) => (
  <>
    {routes.map((route) => {
      const element = route.element && route.element();

      return (
        <Route key={route.path} path={route.path} element={element} />
      )
    })}
  </>
);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppTemplate>
          <Routes>
            {renderRoutes(AppRoutes)}
          </Routes>
        </AppTemplate>
      </Router>
    </Provider>
  );
};

export default App;
