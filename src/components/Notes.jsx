import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import tasks from "../image/tasks.png";
import remove from "../image/bin.png";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { auth, database } from "../firebase/setup";

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

export default function Notes() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [notes, setNotes] = React.useState("");
  const [notesData, setNotesData] = React.useState([]);
  const [showNotes, setShowNotes] = React.useState(false); // State to control whether notes are shown

  const addNote = async () => {
    if (!auth.currentUser?.email) {
      console.error("User not authenticated");
      return;
    }

    if (!notes.trim()) {
      alert("Please enter your Notes!");
      return;
    }

    const userDoc = doc(database, "Users", auth.currentUser.email);
    const messageRef = collection(userDoc, "Notes");
    try {
      await addDoc(messageRef, {
        notes: notes,
      });
      setNotes(""); // Clear the input field after adding a note
      alert("Note added successfully!"); // Notify the user
    } catch (err) {
      console.error(err);
    }
  };

  const fetchNotes = async () => {
    if (!auth.currentUser?.email) {
      console.error("User not authenticated");
      return;
    }

    const userDoc = doc(database, "Users", auth.currentUser.email);
    const messageRef = collection(userDoc, "Notes");
    try {
      const data = await getDocs(messageRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNotesData(filteredData);
      setShowNotes(true); // Show the notes after fetching
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNote = async (noteId) => {
    if (!auth.currentUser?.email) {
      console.error("User not authenticated");
      return;
    }

    const userDoc = doc(database, "Users", auth.currentUser.email);
    const messageRef = collection(userDoc, "Notes");
    try {
      await deleteDoc(doc(messageRef, noteId));
      fetchNotes(); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <img
        onClick={handleOpen}
        src={tasks}
        style={{ cursor: "pointer", width: "1.4vw", paddingTop: "2vw" }}
        alt="tasks"
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
            Add Notes
          </Typography>
          <input
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
            placeholder="Notes"
            style={{
              outline: "none",
              fontSize: "1vw",
              width: "11vw",
              height: "1.5vw",
            }}
          />
          <Button
            onClick={addNote}
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
            onClick={fetchNotes}
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
          {showNotes && (
            <div style={{ marginTop: "1vw" }}>
              {notesData.map((data) => (
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
                  <span>{data.notes}</span>
                  
                  <img
                    onClick={() => deleteNote(data.id)}
                    src={remove}
                    style={{
                      width: "1.1vw",
                      height: "1.1vw",
                      marginLeft: "1vw",
                      cursor: "pointer",
                      display: "none",
                    }}
                    alt="Remove"
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
