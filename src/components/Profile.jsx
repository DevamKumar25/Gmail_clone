import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { auth, googleAuthProvider } from "../firebase/setup.jsx";
import { Avatar } from "@mui/material";
import logout from "../image/logout.png"
import {signOut} from "firebase/auth"
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "22%",
  left: "80%",
  transform: "translate(-50%, -50%)",
  width: "22vw",
//   height: "20vh",
  bgcolor: "#D8E4F0",
  boxShadow: 24,
  borderRadius:"3vw",
  p: "1vw",
};

export default function Profile() {

    const navigate = useNavigate();

    const logoutAccount = async() =>{
        try {
            await signOut(auth, googleAuthProvider);
            auth.currentUser=== null && navigate("/");
        } catch (error) {
            console.log(error)
        }
    
    }

    console.log(auth.currentUser);
    


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Avatar
        onClick={handleOpen}
        src={auth.currentUser?.photoURL}
        sx={{
          marginLeft: "18vw",
          height: "3vw",
          width: "3vw",
          cursor: "pointer",
        }}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography style={{ textAlign: "center", fontSize: "1.4vw" }}>
            {auth.currentUser?.email}
          </Typography>
          <Avatar
            src={auth.currentUser?.photoURL}
            style={{ marginLeft: "10vw", width: "5vw", height: "5vw" }}
          />
          <Typography
            sx={{ textAlign: "center", fontSize: "1.7vw", marginTop: "1vw" }}
          >
            Hi, {auth.currentUser?.displayName}
          </Typography>
          <button
            onClick={logoutAccount}
            style={{
              fontSize: "1vw",
              border: "1px solid white",
              borderRadius: "2vw",
              marginTop: "2vw",
              width: "12vw",
              height: "3.5vw",
              marginLeft: "5vw",
              cursor:"pointer",
            }}
          >
            <img src={logout} style={{ width: "0.8vw" }} />
            Signout
          </button>
          <Typography
            style={{
              fontSize: "1vw",
              fontWeight: "100",
              textAlign: "center",
              marginTop: "1vw",
            }}
          >
            Privacy Policy Terms of Service
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
