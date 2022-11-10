/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { Button } from "react-bootstrap";
import "./styles.css";
import Keycloak from "keycloak-js";
import { db } from "../config/firebase";
import { ref, set, child, get } from "firebase/database";
import Loading from "../components/Loading";
import { IPrivate } from "../interfaces/Interfaces";

const PrivateRoute: React.FC<IPrivate> = ({ children }) => {
  const {
    keycloak,
    initialized,
  }: {
    keycloak: Keycloak;
    initialized: boolean;
  } = useKeycloak();

  const isLoggedIn = keycloak.authenticated;

  //get loggedin user id
  useEffect(() => {
    async function fetchUserProfile() {
      const profile = await keycloak.loadUserProfile();
      const userID = await profile?.id;
      if (userID) {
        localStorage.setItem("id", userID);

        const dbRef = ref(db);
        await get(child(dbRef, `users`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              if (!data[userID]) {
                set(ref(db, "users"), {
                  ...data,
                  [userID]: { favourites: "[]", playlists: "[]" },
                });
              }
            } else {
              set(ref(db, "users"), "");
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
    fetchUserProfile();
  }, [initialized]);

  return initialized ? (
    !isLoggedIn ? (
      <h3 className="myHeaderPrivateRoute">
        Login Now and Enjoy Listening to the Latest Hits!
        {!keycloak.authenticated && (
          <Button
            className="loginButton"
            type="button"
            onClick={() => keycloak.login()}
          >
            Login Now!
          </Button>
        )}
      </h3>
    ) : (
      children
    )
  ) : (
    <div className="myLoadingPrivateRoute">
      <Loading />
    </div>
  );
};

export default PrivateRoute;
