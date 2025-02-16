import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Avatar, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import gmail from "../image/gmail.png";
import lens from "../image/lens.png";
// import {auth} from "../firebase/setup.jsx";
import Profile from "./Profile.jsx";

export default function Navbar(props) {
  return (
    <Grid container>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
        elevation={0}
          position="static"
          sx={{
            backgroundColor: "#F9F9F9",
            minHeight: "5vw",
            minWidth: "10vw",
            paddingTop: "7px",
            paddingRight: "30px",
            position:"fixed",
            top:0,
            zIndex:"2",
            
          }}
        >
          <div style={{display:"flex", alignItems:"center"}}>
            <Grid item xs={2}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: "0.8vw", color: "#3C3C3C" }}
                >
                  <MenuIcon  sx={{width:"3vw"}}/>
                </IconButton>
                <img style={{ width: "2.5vw" }} src={gmail} alt="gmailimage" />
                <Typography
                  sx={{ color: "#3C3C3C", marginLeft: "1.2vw",
                    fontSize:"1.9vw"
                   }}
                  variant="h6"
                  component="div"
                >
                  Gmail
                </Typography>
              </div>
            </Grid>

            <Grid item xs={9}>
              <div
                style={{
                  marginLeft:"2vw",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "40px",
                  backgroundColor: "#E4EFFA",
                  width: "55vw",
                  height: "3.7vw",
                }}
              >
                <img
                  style={{
                    width: "1.3vw",
                    height: "1.3vw",
                    alignItems: "center",
                    marginLeft: "3px",
                  }}
                  src={lens}
                  alt="l"
                />
                <input
                onChange={(e) => props.setSearch(e.target.value)}
                  placeholder="Search mail"
                  style={{
                    height: "3vw",
                    width: "45vw",
                    backgroundColor: "#E4EFFA",
                    border: "none",
                    outline:"none",
                    marginLeft: "3px",
                  }}
                />
              </div>
            </Grid>

          
            <Grid
              item
              xs={1}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              {/* <Avatar
                src={auth.currentUser?.photoURL}
                sx={{ marginLeft:"18vw",
                  height:"3vw",
                  width:"3vw"
                }}
              /> */}



              <Profile/>
            </Grid>
          </div>
        </AppBar>
      </Box>
    </Grid>
  );
}




// import React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import { Avatar, Grid } from "@mui/material";
// import Typography from "@mui/material/Typography";
// import MenuIcon from "@mui/icons-material/Menu";
// import gmail from "../image/gmail.png";
// import lens from "../image/lens.png";
// import Profile from "./Profile.jsx";

// export default function Navbar(props) {
//   return (
//     <Grid container>
//       <Box sx={{ flexGrow: 1 }}>
//         <AppBar
//           elevation={0}
//           position="static"
//           sx={{
//             backgroundColor: "#F9F9F9",
//             minHeight: "5vw",
//             paddingTop: "7px",
//             paddingRight: "30px",
//             position: "fixed",
//             top: "0",
//             zIndex: "2",
//           }}
//         >
//           <Toolbar sx={{ display: "flex", alignItems: "center" }}>
//             <Grid item xs={2}>
//               <div style={{ display: "flex", alignItems: "center" }}>
//                 <IconButton
//                   edge="start"
//                   color="inherit"
//                   aria-label="menu"
//                   sx={{ mr: "0.8vw", color: "#3C3C3C" }}
//                 >
//                   <MenuIcon sx={{ width: "3vw" }} />
//                 </IconButton>
//                 <img style={{ width: "2.5vw" }} src={gmail} alt="gmail logo" />
//                 <Typography
//                   sx={{
//                     color: "#3C3C3C",
//                     marginLeft: "1.2vw",
//                     fontSize: "1.9vw",
//                   }}
//                   variant="h6"
//                 >
//                   Gmail
//                 </Typography>
//               </div>
//             </Grid>

//             <Grid item xs={9}>
//               <div
//                 style={{
//                   marginLeft: "2vw",
//                   display: "flex",
//                   alignItems: "center",
//                   borderRadius: "40px",
//                   backgroundColor: "#E4EFFA",
//                   width: "55vw",
//                   height: "3.7vw",
//                 }}
//               >
//                 <img
//                   style={{ width: "1.3vw", height: "1.3vw", marginLeft: "3px" }}
//                   src={lens}
//                   alt="search icon"
//                 />

//                 {/* Input field for searching emails */}
//                 <input
//                   onChange={(e) => props.setSearch(e.target.value)}
//                   placeholder="Search mail"
//                   style={{
//                     height: "3vw",
//                     width: "45vw",
//                     backgroundColor: "#E4EFFA",
//                     border: "none",
//                     outline: "none",
//                     marginLeft: "3px",
//                   }}
//                 />
//               </div>
//             </Grid>

//             {/* Profile Section */}
//             <Grid
//               item
//               xs={1}
//               sx={{
//                 display: "flex",
//                 justifyContent: "flex-end",
//                 alignItems: "center",
//               }}
//             >
//               {/* Uncomment below line to show avatar */}
//               {/* <Avatar src={auth.currentUser?.photoURL} sx={{ height:"3vw", width:"3vw"}} /> */}
//               <Profile />
//             </Grid>
//           </Toolbar>
//         </AppBar>
//       </Box>
//     </Grid>
//   );
// }

