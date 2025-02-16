// import { ListItem, Paper } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import star from "../image/star.png";
// import refresh from "../image/refresh.png";
// import {
//   collection,
//   deleteDoc,
//   doc,
//   getDocs,
//   setDoc,
// } from "firebase/firestore";
// import { auth, database } from "../firebase/setup";
// import remove from "../image/bin.png";
// import yellow from "../image/yellow.png";
// import snooze from "../image/snooze.png";

// function Middle(props) {
//   const [mailData, setMailData] = useState([]);
//   const [show, setShow] = useState(false);

//   const deleteMail = async (data) => {
//     if (!auth.currentUser) return;

//     const userEmail = auth.currentUser.email;

//     const messageDoc = doc(database, "Users", userEmail, "Inbox", data.id);
//     const starredDoc = doc(database, "Users", userEmail, "Starred", data.id);
//     const snoozedDoc = doc(database, "Users", userEmail, "Snoozed", data.id);

//     try {
//       await deleteDoc(messageDoc);
//       await deleteDoc(starredDoc);
//       await deleteDoc(snoozedDoc);
//       setMailData((prev) => prev.filter((mail) => mail.id !== data.id));
//     } catch (err) {
//       console.error("Error deleting mail:", err);
//     }
//   };

//  const getMail = async () => {
//    if (!auth.currentUser) return;
//    const userDoc = doc(database, "Users", auth.currentUser.email);
//    const messageDoc = collection(userDoc, props.subCollect || "Inbox");
//    try {
//      const data = await getDocs(messageDoc);
//      const filteredData = data.docs
//        .map((doc) => {
//          const mail = { ...doc.data(), id: doc.id };
//          console.log("Fetched Mail:", mail); // Debugging line
//          return mail;
//        })
//        .sort(
//          (a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0)
//        );
//      setMailData(filteredData);
//    } catch (err) {
//      console.error("Error fetching mail:", err);
//    }
//  };

// const starred = async (data) => {
//   if (!auth.currentUser) return;
//   const userDoc = doc(database, "Users", auth.currentUser.email);
//   const messageDoc = doc(userDoc, "Starred", data.id);
//   try {
//     console.log("Starring email:", data); // Debugging line
//     await setDoc(messageDoc, {
//       sender: data.sender || "Unknown Sender", 
//       email: data.email || "", // Ensure email exists
//       subject: data.subject || "No Subject",
//       timestamp: data.timestamp || new Date(),
//       starred: "true",
//     });
//   } catch (err) {
//     console.error("Error starring mail:", err);
//   }
// };

// const snoozed = async (data) => {
//   if (!auth.currentUser) return;
//   const userDoc = doc(database, "Users", auth.currentUser.email);
//   const messageDoc = doc(userDoc, "Snoozed", data.id);
//   const snoozeDoc = doc(userDoc, "Inbox", data.id);
//   try {
//     console.log("Snoozing email:", data); // Debugging line
//     await deleteDoc(snoozeDoc);
//     await setDoc(messageDoc, {
//       sender: data.sender || "Unknown Sender",
//       email: data.email || "",
//       subject: data.subject || "No Subject",
//       timestamp: data.timestamp || new Date(),
//     });
//   } catch (err) {
//     console.error("Error snoozing mail:", err);
//   }
// };


//   useEffect(() => {
//     getMail();
//   }, [props.subCollect]);

//   const formatTimestamp = (timestamp) => {
//     if (!timestamp) return "Invalid Date";

//     let date = timestamp.seconds
//       ? new Date(timestamp.seconds * 1000)
//       : new Date(timestamp);

//     const currentTime = new Date();
//     const timeDifference = currentTime - date;

//     if (timeDifference > 24 * 60 * 60 * 1000) {
//       return date.toLocaleDateString("en-IN", {
//         day: "numeric",
//         month: "short",
//       });
//     }

//     return date.toLocaleString("en-IN", {
//       hour: "numeric",
//       minute: "numeric",
//       hour12: true,
//     });
//   };

//   return (
//     <div style={{ marginLeft: "2.9vw", width: "75vw", paddingTop: "4vw" }}>
//       <img
//         src={refresh}
//         onClick={getMail}
//         style={{
//           width: "1.5vw",
//           height: "1.5vw",
//           marginLeft: "2vw",
//           marginTop: "2vw",
//           cursor: "pointer",
//         }}
//         alt="Refresh"
//       />
//       {mailData.map((data) => (
//         <Paper
//           key={data.id}
//           onMouseEnter={() => setShow(true)}
//           onMouseLeave={() => setShow(false)}
//           elevation={0}
//           style={{
//             backgroundColor: "#F8FCFF",
//             borderBottom: "1px solid #EFEFEF",
//             borderTop: "1px solid #EFEFEF",
//           }}
//         >
//           <ListItem>
//             {data.starred ? (
//               <img
//                 src={yellow}
//                 style={{ cursor: "pointer", width: "1.4vw", height: "1.4vw" }}
//                 alt="Starred"
//               />
//             ) : (
//               <img
//                 onClick={() => starred(data)}
//                 src={star}
//                 style={{ cursor: "pointer", width: "1.4vw", height: "1.4vw" }}
//                 alt="Star"
//               />
//             )}
//             <span
//               style={{
//                 fontSize: "1.3vw",
//                 marginLeft: "1.2vw",
//                 fontWeight: "500",
//               }}
//             >
//               {props.subCollect === "Send"
//                 ? `To: ${data.receiverEmail}`
//                 : `From: ${data.sender}`}
//               <span
//                 style={{
//                   marginLeft: "12vw",
//                   fontWeight: "200",
//                   cursor: "pointer",
//                 }}
//               >
//                 {data.subject}
//               </span>

//               <span style={{ marginLeft: "12vw", fontWeight: "500" }}>
//                 {formatTimestamp(data.timestamp)}
//               </span>
//             </span>
//             {show && (
//               <>
//                 <img
//                   onClick={() => snoozed(data)}
//                   src={snooze}
//                   style={{
//                     marginLeft: "1vw",
//                     width: "1.3vw",
//                     height: "1.3vw",
//                     cursor: "pointer",
//                   }}
//                   alt="Snooze"
//                 />
//                 <img
//                   onClick={() => deleteMail(data)}
//                   src={remove}
//                   style={{
//                     width: "1.1vw",
//                     height: "1.1vw",
//                     marginLeft: "1vw",
//                     cursor: "pointer",
//                   }}
//                   alt="Delete"
//                 />
//               </>
//             )}
//           </ListItem>
//         </Paper>
//       ))}
//       <h6 style={{ fontWeight: "400", marginLeft: "28vw", fontSize: "1vw" }}>
//         Terms · Privacy · Program Policies
//       </h6>
//     </div>
//   );
  
// }
// export default Middle;


import { ListItem, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import star from "../image/star.png";
import refresh from "../image/refresh.png";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { auth, database } from "../firebase/setup";
import remove from "../image/bin.png";
import yellow from "../image/yellow.png";
import snooze from "../image/snooze.png";

function Middle(props) {
  const [mailData, setMailData] = useState([]);
  const [hoveredMailId, setHoveredMailId] = useState(null);

  const deleteMail = async (data) => {
    if (!auth.currentUser) return;

    const userEmail = auth.currentUser.email;

    const messageDoc = doc(database, "Users", userEmail, "Inbox", data.id);
    const starredDoc = doc(database, "Users", userEmail, "Starred", data.id);
    const snoozedDoc = doc(database, "Users", userEmail, "Snoozed", data.id);

    try {
      await deleteDoc(messageDoc);
      await deleteDoc(starredDoc);
      await deleteDoc(snoozedDoc);
      setMailData((prev) => prev.filter((mail) => mail.id !== data.id));
    } catch (err) {
      console.error("Error deleting mail:", err);
    }
  };

  const getMail = async () => {
    if (!auth.currentUser) return;
    const userDoc = doc(database, "Users", auth.currentUser.email);
    const messageDoc = collection(userDoc, props.subCollect || "Inbox");
    try {
      const data = await getDocs(messageDoc);
      const filteredData = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort(
          (a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0)
        );
      setMailData(filteredData);
    } catch (err) {
      console.error("Error fetching mail:", err);
    }
  };

  const starred = async (data) => {
    if (!auth.currentUser) return;
    const userDoc = doc(database, "Users", auth.currentUser.email);
    const messageDoc = doc(userDoc, "Starred", data.id);
    try {
      await setDoc(messageDoc, {
        sender: data.sender || "Unknown Sender",
        email: data.email || "",
        subject: data.subject || "No Subject",
        timestamp: data.timestamp || new Date(),
        starred: true,
      });
    } catch (err) {
      console.error("Error starring mail:", err);
    }
  };

  const snoozed = async (data) => {
    if (!auth.currentUser) return;
    const userDoc = doc(database, "Users", auth.currentUser.email);
    const messageDoc = doc(userDoc, "Snoozed", data.id);
    try {
      await deleteDoc(doc(userDoc, "Inbox", data.id));
      await setDoc(messageDoc, {
        sender: data.sender || "Unknown Sender",
        email: data.email || "",
        subject: data.subject || "No Subject",
        timestamp: data.timestamp || new Date(),
      });
    } catch (err) {
      console.error("Error snoozing mail:", err);
    }
  };

  useEffect(() => {
    getMail();
  }, [props.subCollect]);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Invalid Date";

    let date = timestamp.seconds
      ? new Date(timestamp.seconds * 1000)
      : new Date(timestamp);

    const currentTime = new Date();
    const timeDifference = currentTime - date;

    if (timeDifference > 24 * 60 * 60 * 1000) {
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      });
    }

    return date.toLocaleString("en-IN", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div style={{ marginLeft: "2.9vw", width: "75vw", paddingTop: "4vw" }}>
      <img
        src={refresh}
        onClick={getMail}
        style={{
          width: "1.5vw",
          height: "1.5vw",
          marginLeft: "2vw",
          marginTop: "2vw",
          cursor: "pointer",
        }}
        alt="Refresh"
      />
      {mailData.map((data) => (
        <Paper
          key={data.id}
          onMouseEnter={() => setHoveredMailId(data.id)}
          onMouseLeave={() => setHoveredMailId(null)}
          elevation={1}
          style={{
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid #EFEFEF",
            padding: "6px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          <ListItem style={{ flexGrow: 1 }}>
            <img
              onClick={() => starred(data)}
              src={data.starred ? yellow : star}
              style={{ cursor: "pointer", width: "20px", height: "20px" }}
              alt={data.starred ? "Starred" : "Star"}
            />
            <span
              style={{
                fontSize: "16px",
                fontWeight: "500",
                marginLeft: "10px",
              }}
            >
              {props.subCollect === "Send"
                ? `To: ${data.receiverEmail}`
                : `From: ${data.sender}`}
              <span
                style={{ marginLeft: "20px", fontWeight: "400", color: "#555" }}
              >
                {data.subject}
              </span>
            </span>
            <span
              style={{ marginLeft: "auto", fontWeight: "550", color: "#888" }}
            >
              {formatTimestamp(data.timestamp)}
            </span>
          </ListItem>
          {hoveredMailId === data.id && (
            <div
              style={{
                position: "absolute",
                right: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                onClick={() => snoozed(data)}
                src={snooze}
                style={{
                  marginLeft: "122px",
                  width: "20px",
                  height: "20px",
                  cursor: "pointer",
                  transition: "transform 0.3s",
                }}
                alt="Snooze"
              />
              <img
                onClick={() => deleteMail(data)}
                src={remove}
                style={{
                  width: "20px",
                  height: "20px",
                  marginLeft: "10px",
                  cursor: "pointer",
                  transition: "transform 0.3s",
                }}
                alt="Delete"
              />
            </div>
          )}
        </Paper>
      ))}
      <h6
        style={{
          fontWeight: "400",
          marginLeft: "28vw",
          fontSize: "14px",
          color: "#888",
        }}
      >
        Terms · Privacy · Program Policies
      </h6>
    </div>
  );
}

export default Middle;
