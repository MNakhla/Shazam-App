import React from "react";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Keycloak from "keycloak-js";
import { ReactComponent as ListIcon } from "../../assets/ListIcon.svg";
import { ReactComponent as HeartIcon } from "../../assets/HeartIcon.svg";
import { ReactComponent as PlaylistIcon } from "../../assets/PlaylistIcon.svg";
import { ReactComponent as SearchIcon } from "../../assets/SearchIcon.svg";
import { useKeycloak } from "@react-keycloak/web";
import { ISideBar } from "../../interfaces/Interfaces";
import "./styles.css";

const SideBar: React.FC<ISideBar> = ({ setTab, tab }) => {
  const { keycloak }: { keycloak: Keycloak } = useKeycloak();

  return (
    <>
      <Stack gap={4} className="myStack">
        {/* Home */}
        <Button
          className={tab === "home" ? "myButtonActive" : "myButton"}
          onClick={() => setTab("home")}
        >
          <div className="myDivButSidebar">
            <div className="myDivIconSidebar">
              <ListIcon />
            </div>
            <div>Home</div>
          </div>
        </Button>
        {/* Search */}
        <Button
          className={tab === "search" ? "myButtonActive" : "myButton"}
          onClick={() => setTab("search")}
        >
          <div className="myDivButSidebar">
            <div className="myDivIconSidebar">
              <SearchIcon />
            </div>
            <div>Search</div>
          </div>
        </Button>
        {/* Favourites */}
        <Button
          className={tab === "favourites" ? "myButtonActive" : "myButton"}
          onClick={() => setTab("favourites")}
        >
          <div className="myDivButSidebar">
            <div className="myDivIconSidebar">
              <HeartIcon />
            </div>
            <div>Favourites</div>
          </div>
        </Button>
        {/* Playlists */}
        <Button
          className={tab === "playlists" ? "myButtonActive" : "myButton"}
          onClick={() => setTab("playlists")}
        >
          <div className="myDivButSidebar">
            <div className="myDivIconSidebar">
              <PlaylistIcon />
            </div>
            <div>Playlists</div>
          </div>
        </Button>
      </Stack>
      <div className="myDivLogoutBut">
        {!!keycloak.authenticated && (
          <Button
            className="myButton"
            type="button"
            onClick={() => {
              keycloak.logout();
            }}
          >
            Logout ({keycloak.tokenParsed?.preferred_username})
          </Button>
        )}
      </div>
    </>
  );
};

export default SideBar;
