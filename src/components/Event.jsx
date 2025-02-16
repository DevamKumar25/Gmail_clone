import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { auth, database } from "../firebase/setup";
import Calender from "../image/calendar.png";
import remove from "../image/bin.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "92%",
  transform: "translate(-50%, -50%)",
  width: "14vw",
  minHeight: "650px",
  bgcolor: "background.paper",
  padding: "1vw",
};

export default function Event() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    fetchEvents(); // Fetch events when the modal opens
  };
  const handleClose = () => setOpen(false);

  const [event, setEvent] = React.useState("");
  const [date, setDate] = React.useState("");
  const [eventData, setEventData] = React.useState([]);
  const [showEvents, setShowEvents] = React.useState(false); // State to control whether events are shown

  const addEvent = async () => {
    if (!auth.currentUser?.email) {
      console.error("User not authenticated");
      return;
    }

    if (!event.trim()) {
      alert("Please enter your event!");
      return;
    }

    const userDoc = doc(database, "Users", auth.currentUser.email);
    const eventRef = collection(userDoc, "Event");
    try {
      await addDoc(eventRef, {
        event: event,
        date: date,
      });
      setEvent(""); // Clear the input field after adding an event
      setDate(""); // Clear the date input field
      alert("Event added successfully!");
      fetchEvents(); // Refresh the events list after adding
    } catch (err) {
      console.error(err);
    }
  };

  const fetchEvents = async () => {
    if (!auth.currentUser?.email) {
      console.error("User not authenticated");
      return;
    }

    const userDoc = doc(database, "Users", auth.currentUser.email);
    const eventRef = collection(userDoc, "Event");
    try {
      const data = await getDocs(eventRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEventData(filteredData);
      setShowEvents(true);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteEvent = async (eventId) => {
    if (!auth.currentUser?.email) {
      console.error("User not authenticated");
      return;
    }

    const userDoc = doc(database, "Users", auth.currentUser.email);
    const eventRef = collection(userDoc, "Event");
    try {
      await deleteDoc(doc(eventRef, eventId));
      fetchEvents(); // Refresh the events list after deletion
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <img
        onClick={handleOpen}
        src={Calender}
        style={{ cursor: "pointer", width: "1.4vw", paddingTop: "2vw" }}
        alt="Calendar"
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ paddingTop: "3vw", fontSize: "1vw", color: "grey" }}
          >
            Add Events
          </Typography>
          <input
            onChange={(e) => setEvent(e.target.value)}
            value={event}
            placeholder="Enter your event..."
            style={{
              outline: "none",
              fontSize: "1vw",
              width: "11vw",
              height: "1.5vw",
              marginBottom: "1vw",
            }}
          />
          <input
            onChange={(e) => setDate(e.target.value)}
            value={date}
            type="date"
            style={{
              outline: "none",
              fontSize: "1vw",
              width: "11vw",
              height: "1.5vw",
              marginBottom: "1vw",
            }}
          />
          <Button
            onClick={addEvent}
            variant="contained"
            sx={{
              fontSize: "1vw",
              width: "4vw",
              height: "2vw",
              marginTop: "1vw",
              marginLeft: "0.2vw",
            }}
          >
            Add
          </Button>
          <Button
            onClick={fetchEvents}
            variant="contained"
            sx={{
              fontSize: "1vw",
              width: "4vw",
              height: "2vw",
              marginTop: "1vw",
              marginLeft: "0.2vw",
            }}
          >
            Show
          </Button>
          <br />
          {showEvents && (
            <div style={{ marginTop: "1vw" }}>
              {eventData.map((data) => (
                <div
                  key={data.id}
                  style={{
                    marginTop: "0.5vw",
                    fontSize: "1vw",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.5vw",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.querySelector("img").style.display =
                      "block";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.querySelector("img").style.display = "none";
                  }}
                >
                  <span>
                    {data.event} - {data.date}
                  </span>
                  <img
                    onClick={() => deleteEvent(data.id)}
                    src={remove}
                    style={{
                      width: "1.1vw",
                      height: "1.1vw",
                      marginLeft: "1vw",
                      cursor: "pointer",
                      display: "none",
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
