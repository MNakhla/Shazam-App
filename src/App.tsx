import React from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./config/keycloak";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./pages/Main";

const App: React.FC = () => {
  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <Main />
    </ReactKeycloakProvider>
  );
};

export default App;
