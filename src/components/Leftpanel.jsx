import React from "react";

import Snoozed from "../image/snooze.png";
import Send from "../image/send.png";
import Inbox from "../image/inbox.png"; // Capitalized for consistency
import Star from "../image/star.png";
import Message from "./Message";

function Leftpanel({ setSubcollect }) {
  return (
    <div
      style={{
        backgroundColor: "#F9F9F9",
        minHeight: "100vh",
        paddingTop: "6vw",
        position: "fixed",
        width: "19vw",
      }}
    >
      <Message />

      <div
        style={{
          marginTop: "1vw",
          marginLeft: "0.8vw",
          width: "12vw",
          alignItems: "center",
          display: "flex",
          fontSize: "1.4vw",
          cursor: "pointer", // Making the whole div clickable
        }}
        onClick={() => setSubcollect("Inbox")}
      >
        <img
          src={Inbox}
          alt="Inbox"
          style={{ width: "1.1vw", marginLeft: "1vw" }}
        />
        <span
          style={{ marginLeft: "1.1vw", fontWeight: "400", fontSize: "1.3vw" }}
        >
          Inbox
        </span>
      </div>

      <div
        style={{
          marginTop: "1vw",
          marginLeft: "0.8vw",
          width: "12vw",
          alignItems: "center",
          display: "flex",
          fontSize: "1.4vw",
          cursor: "pointer",
        }}
        onClick={() => setSubcollect("Starred")}
      >
        <img
          src={Star}
          alt="Starred"
          style={{ width: "1.1vw", marginLeft: "1vw" }}
        />
        <span
          style={{ marginLeft: "1.1vw", fontWeight: "400", fontSize: "1.3vw" }}
        >
          Starred
        </span>
      </div>

      <div
        style={{
          marginTop: "1vw",
          marginLeft: "0.8vw",
          width: "12vw",
          alignItems: "center",
          display: "flex",
          fontSize: "1.4vw",
          cursor: "pointer",
        }}
        onClick={() => setSubcollect("Snoozed")}
      >
        <img
          src={Snoozed}
          alt="Snoozed"
          style={{ width: "1.1vw", marginLeft: "1vw" }}
        />
        <span
          style={{ marginLeft: "1.1vw", fontWeight: "400", fontSize: "1.3vw" }}
        >
          Snoozed
        </span>
      </div>

      <div
        style={{
          marginTop: "1vw",
          marginLeft: "0.8vw",
          width: "12vw",
          alignItems: "center",
          display: "flex",
          fontSize: "1.4vw",
          cursor: "pointer",
        }}
        onClick={() => setSubcollect("Send")}
      >
        <img
          src={Send}
          alt="Send"
          style={{ width: "1.1vw", marginLeft: "1vw" }}
        />
        <span
          style={{ marginLeft: "1.1vw", fontWeight: "400", fontSize: "1.3vw" }}
        >
          Send
        </span>
      </div>
    </div>
  );
}

export default Leftpanel;
