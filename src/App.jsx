import React  from "react";
import Signin from "./components/signin.jsx";
import Main from "./components/Main.jsx";
import {  Route, Routes } from "react-router-dom";

function App() {
  return(
    <>
    <Routes>
      <Route path="/" element={<Signin/>}/>
      <Route path="/main" element= {<Main/>}/>
    </Routes>
    </>
  )
}

export default App