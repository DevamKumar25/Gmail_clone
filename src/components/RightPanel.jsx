import React from "react";
import calender from "../image/calendar.png"
import user from "../image/user.png"
import Notes from "./Notes";
import Contact from "./Contact"
import Event from "./Event";

function Rightpanel() {
  return (
    <div
      style={{
        backgroundColor: "#F9F9F9",
        minHeight: "100vh",
        position: "fixed",
        right: "0",
        width: "5vw",
        textAlign: "center",
        paddingTop: "9vw",
      }}
    >
      
      <Contact />
      <br />
      <Event />
      <br />
      <Notes />
    </div>
  );
}

export default Rightpanel;
