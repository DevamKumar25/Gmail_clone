import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, Button } from "@mui/material";
import { database } from "../firebase/setup";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../firebase/setup";
import Pen from "../image/Pen.png";

const style = {
  position: "absolute",
  top: "62%",
  left: "70%",
  transform: "translate(-50%, -50%)",
  width: "30vw",
  height: "30vw",
  bgcolor: "background.paper",
  p: "1vw",
  borderRadius: "1vw",
  minHeight: "505px",
};

export default function Message() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [mailId, setMailId] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const send = async (messageContent) => {
    if (!auth.currentUser) return;

    const messageRef = collection(
      database,
      "Users",
      auth.currentUser.email,
      "Send"
    );

    try {
      await addDoc(messageRef, {
        receiverEmail: mailId,
        subject,
        content: message,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const inbox = async () => {
    if (!auth.currentUser) return;

    const inboxRef = collection(database, "Users", mailId, "Inbox");

    try {
      await addDoc(inboxRef, {
        senderEmail: auth.currentUser.email,
        subject,
        content: message,
        sender: auth.currentUser?.displayName || "Anonymous",
        timestamp: new Date(),
      });

      await send(message);

      setSuccessMessage("Message sent successfully");

      // Close Modal
      handleClose();

      // Show success message at the bottom-left
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);

      // RESET THE FIELDS
      setMailId("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <div
        onClick={handleOpen}
        style={{
          height: "4.5vw",
          marginLeft: "1vw",
          width: "12vw",
          alignItems: "center",
          display: "flex",
          borderRadius: "15px",
          backgroundColor: "#BEE0FF",
          fontSize: "1.4vw",
          cursor: "pointer",
        }}
      >
        <img
          src={Pen}
          alt="Compose new message"
          style={{ width: "1.1vw", marginLeft: "1vw" }}
        />
        <h4 style={{ marginLeft: "1.1vw", fontWeight: "400" }}>Compose</h4>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography
            sx={{
              backgroundColor: "#EDF9FF",
              position: "absolute",
              top: "0",
              left: "0",
              width: "31vw",
              padding: "0.5vw",
            }}
          >
            New Message
          </Typography>

          <TextField
            value={mailId}
            onChange={(e) => setMailId(e.target.value)}
            variant="standard"
            label="To"
            sx={{ width: "31vw", marginTop: "2vw" }}
          />
          <TextField
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            variant="standard"
            label="Subject"
            sx={{ width: "31vw" }}
          />
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            multiline
            rows={12}
            sx={{ width: "30.5vw", "& fieldset": { border: "none" } }}
          />
          <Button
            onClick={inbox}
            variant="contained"
            sx={{
              borderRadius: "6vw",
              fontSize: "1vw",
              width: "4vw",
              height: "3vw",
              top: "1vw",
            }}
          >
            Send
          </Button>
        </Box>
      </Modal>

      {/* Success Message at Bottom Left */}
      {successMessage && (
        <Box
          sx={{
            position: "fixed",
            bottom: "2vw",
            left: "2vw",
            backgroundColor: "#747380",
            color: "white",
            padding: "0.5vw 1vw",
            borderRadius: "0.5vw",
            fontSize: "1vw",
            fontWeight: "bold",
            textAlign: "center",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
          }}
        >
          {successMessage}
        </Box>
      )}
    </div>
  );
}
