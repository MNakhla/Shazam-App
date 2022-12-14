import Keycloak from "keycloak-js";
const keycloak: Keycloak = new Keycloak({
  url: process.env.REACT_APP_KEYCLOAK_URL as string,
  realm: process.env.REACT_APP_KEYCLOAK_REALM as string,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID as string,
});

export default keycloak;
