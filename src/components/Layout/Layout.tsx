import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import coverPhoto from "../../assets/cover-photo.png";
import SideBar from "../SideBar/SideBar";
import PrivateRoute from "../../helpers/PrivateRoute";
import { ILayout } from "../../interfaces/Interfaces";

const Layout: React.FC<ILayout> = ({ children, setTab, tab }) => {
  return (
    <Row style={{ margin: 0 }}>
      {/* Side Bar */}
      <Col
        style={{
          background: "#564EDA",
          position: "fixed",
          height: "100vh",
          width: "12%",
        }}
      >
        <SideBar setTab={setTab} tab={tab} />
      </Col>
      {/* Right Content Side */}
      <Col style={{ width: "88%", marginLeft: "12%" }}>
        <Row>
          <img
            style={{ padding: 0, width: "100%", height: "100%" }}
            src={coverPhoto}
            alt="cover"
          />
        </Row>
        <PrivateRoute>
          <Row
            style={{
              paddingTop: "30px",
              paddingBottom: "93px",
              paddingLeft: "30px",
              paddingRight: "50px",
            }}
          >
            {children}
          </Row>
        </PrivateRoute>
      </Col>
    </Row>
  );
};

export default Layout;
