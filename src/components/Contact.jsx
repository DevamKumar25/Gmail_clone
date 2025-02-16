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
import User from "../image/user.png";
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

export default function Contact() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [contactsData, setContactsData] = React.useState([]);
  const [showContacts, setShowContacts] = React.useState(false); // State to control whether contacts are shown

  const addContact = async () => {
    if (!auth.currentUser?.email) {
      console.error("User not authenticated");
      return;
    }

    // Validate if name and contact fields are filled
    if (!name.trim() || !contact.trim()) {
      alert("Please enter both name and contact!");
      return;
    }

    const userDoc = doc(database, "Users", auth.currentUser.email);
    const contactsRef = collection(userDoc, "Contacts");
    try {
      await addDoc(contactsRef, {
        name: name,
        contact: contact,
      });
      setName(""); // Clear the name input field
      setContact(""); // Clear the contact input field
      alert("Contact added successfully!"); // Notify the user
    } catch (err) {
      console.error(err);
    }
  };

  const fetchContacts = async () => {
    if (!auth.currentUser?.email) {
      console.error("User not authenticated");
      return;
    }

    const userDoc = doc(database, "Users", auth.currentUser.email);
    const contactsRef = collection(userDoc, "Contacts");
    try {
      const data = await getDocs(contactsRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setContactsData(filteredData);
      setShowContacts(true); // Show the contacts after fetching
    } catch (err) {
      console.error(err);
    }
  };

  const deleteContact = async (contactId) => {
    if (!auth.currentUser?.email) {
      console.error("User not authenticated");
      return;
    }

    const userDoc = doc(database, "Users", auth.currentUser.email);
    const contactsRef = collection(userDoc, "Contacts");
    try {
      await deleteDoc(doc(contactsRef, contactId));
      fetchContacts(); // Refresh the contacts list after deletion
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <img
        onClick={handleOpen}
        src={User}
        style={{ cursor: "pointer", width: "1.4vw", paddingTop: "2vw" }}
        alt="User"
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
            Add Contacts
          </Typography>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name"
            style={{
              outline: "none",
              fontSize: "1vw",
              width: "11vw",
              height: "1.5vw",
              marginBottom: "1vw",
            }}
          />
          <input
            onChange={(e) => setContact(e.target.value)}
            value={contact}
            placeholder="Contact"
            style={{
              outline: "none",
              fontSize: "1vw",
              width: "11vw",
              height: "1.5vw",
              marginBottom: "1vw",
            }}
          />
          <Button
            onClick={addContact}
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
            onClick={fetchContacts}
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
          {showContacts && (
            <div style={{ marginTop: "1vw" }}>
              {contactsData.map((data) => (
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
                    {data.name} - {data.contact}
                  </span>
                  <img
                    onClick={() => deleteContact(data.id)}
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
