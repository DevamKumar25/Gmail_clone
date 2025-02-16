import React, { useState } from "react";
import Navbar from "./Navbar";
import Leftpanel from "./Leftpanel";
import { Grid } from "@mui/material";
import Middle from "./Middle";
import RightPanel from "./RightPanel"; 
import Footer from "./Footer";

function Main() {
  const [subCollect, setSubcollect] = useState("Inbox"); 

  const [search,setSearch] = useState("")

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Navbar setSearch = {setSearch}/>
        </Grid>

        <Grid item xs={2}>
          <Leftpanel setSubcollect={setSubcollect} />
        </Grid>

        <Grid item xs={9}>
          <Middle search={search} subCollect={subCollect} />
        </Grid>

        <Grid item xs={1}>
          <RightPanel />
        </Grid>

        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </div>
  );
}

export default Main;
