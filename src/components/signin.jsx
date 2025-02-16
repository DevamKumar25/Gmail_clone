import React from "react";
import { Button } from "@mui/material";
import social from "../image/social.png";
import { signInWithPopup } from "firebase/auth";
import { auth, database, googleAuthProvider } from "../firebase/setup.jsx";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

function Signin() {
  const navigate = useNavigate();

  const addUser = async (user) => {
    if (!user) return; 

    const userDoc = doc(database, "Users", user.email);
    try {
      await setDoc(userDoc, {
        username: user.displayName,
        email: user.email,
        id: user.uid,
      });
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const googleSignin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      await addUser(result.user); 
      navigate("/main");
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "26%",
        left: "20%",
        paddingBlock: "10px",
      }}
    >
      <div
        style={{
          border: "1px solid grey",
          padding: "20px",
          textAlign: "center",
          borderRadius: "10px",
          minHeight: "310px",
          maxWidth: "350px",
        }}
      >
        <img style={{ width: "130px" }} src={social} alt="googleimg" />
        <h2 style={{ fontWeight: "200" }}>Create your Google account</h2>
        <h3 style={{ fontWeight: "200" }}>Click the Sign-in button</h3>
        <Button onClick={googleSignin} variant="contained">
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

export default Signin;
