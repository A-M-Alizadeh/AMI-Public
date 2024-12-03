import React, { useEffect, useState } from "react";
import {
  collection,
  updateDoc,
  onSnapshot,
  doc,
  addDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../auth/Firebase";
import { Grid } from "@mui/material";
import { COLORS } from "../../styles/colors";
import { StyledButton } from "../button/Button.styles";
import { StyledText } from "../text/Text.styles";
import SubContainer from "../common/SubContainer";
import Container from "../common/Container";
import { StyledInput } from "../input/Input.styles";



export const requestPDF = () => {
  const doctorData = JSON.parse(localStorage.getItem("doctor"));
  const userData = JSON.parse(localStorage.getItem("userdata"));

  fetch("http://localhost:3000/api/v1/users/report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/pdf",
    },
    body: JSON.stringify({
      doctorUsername: doctorData.username,
      patientUsername: userData.username,
    }),
  })
    .then((response) => {
      console.log(response);
      return response.blob();
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", userData.username + "-report.pdf");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    })
    .catch((error) => {
      console.log(error);
    });
};





const Notification = () => {

  const [conectedUser, setConectedUserReq] = useState("");
  const notifsCollectionRef = collection(db, "Notifs");
  const [notifications, setNotifications] = useState([]);

  // get all notifications for the doctor -> only for this doctor - from all patients
  const NotifList = () => {
    const doctorData = JSON.parse(localStorage.getItem("doctor"));
    // const userData = JSON.parse(localStorage.getItem("userdata"));
    const q = query(
      collection(db, "Notifs"),
      orderBy('created_at','desc') // Change "timestamp" to the field you want to order by
    );
    onSnapshot(q, (snapshot) => {
      let tempNotifs = [];
      snapshot.docs.map((doc) => {
        if (doc.data().receiverUsername === doctorData.username) {
          tempNotifs.push({ id: doc.id, ...doc.data() });
        }
      });
      setNotifications(tempNotifs);
    });
  };

  // update the notification status to read when the doctor clicks on it
  const updateNotification = async (id) => {
    await updateDoc(doc(db, "Notifs", id), {
      status: "read",
      updated_at: new Date(),
    });
  };

  // request a pdf report for the patient -> select the patient from the list and then click on 
  // the button ->  patient needs to be selected first

  // search a username and send a connection request to the patient - this connection request 
  // will be shown in the patient's notification list
  const connectionRequest = async () => {
    const doctorData = JSON.parse(localStorage.getItem("doctor"));
    try {
      await addDoc(notifsCollectionRef, {
        type: "connection",
        message: `Connection request from ${doctorData.username}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: "unread",
        senderUsername: doctorData.username,
        receiverUsername: conectedUser, // this is the patient's username that you entered or searched
        senderId: doctorData.docId,
        receiverId: "", // this is the patient's id that you entered or searched
      });
      // here you need to send a notification to the patient's phone !!! TODO

      fetch("http://localhost:3000/api/v1/users/notif", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: conectedUser, // this is the patient's username that you entered or searched
          title: `Connection Request`,
          message: `New Connectrion Request From ${doctorData.username}`,
        }),
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  useEffect(() => {
    NotifList();
  }, []);

  return (
    <Grid container backgroundColor={"none !important"}>
      <Grid item xs={12} sx={{ paddingBlock: "1rem", textAlign: "center" }}>
        <StyledText
          variant="textTitle"
          style={{ color: COLORS.darkTitle, fontSize: "1.5rem" }}
        >
          Notifications
        </StyledText>
      </Grid>

      <Grid
        item
        container
        gap={1}
        sx={{
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {/* <Grid item xs={12} md={5.5}>
          <StyledButton
            variant="radius"
            buttons="buttons"
            onClick={sendNotificationToPhone}
          >
            Send Notification
          </StyledButton>
        </Grid> */}
      <Grid
            item
            container
            xs={12}
            gap={1}
            textAlign={"center"}
            sx={{
              display: "flex",
              justifyContent:"flex-end",
            }}
          >
            <Grid item xs={12} md={4}>
              <StyledInput
                onChange={(event) => {
                  setConectedUserReq(event.target.value);
                }}
                placeholder={"Patient Email"}
                value={conectedUser}
                variant={"input-height"}
              />
            </Grid>
        <Grid item xs={12} md={2}>
          <StyledButton onClick={connectionRequest} variant={"radius"} buttons="buttons">
            Connection Request
          </StyledButton>
        </Grid>
          </Grid>
      </Grid>
      <Grid item height={"75vh"} style={{ overflow: "scroll"}} xs={12}>
        {notifications.map((notification) => {
          return (
            <SubContainer
              key={notification.id}
              onClick={() => updateNotification(notification.id)}
              enableHover={false}
              xs={12}
              marginBlock={1}
              >
              <Container xs={12} md={6}>
                <Grid item xs={12}>
                  <StyledText
                    variant="textTitle"
                    style={{ color: COLORS.white }}
                  >
                    {notification.message}
                  </StyledText>
                </Grid>
                <Grid item xs={12}>
                  <StyledText style={{ color: COLORS.darkText }}>
                    {notification.senderUsername}
                  </StyledText>
                </Grid>
              </Container>
              <Container xs={12} md={6}>
                <Grid item xs={12} textAlign={"right"}>
                  <StyledText
                    variant="textTitle"
                    style={{ color: COLORS.white }}
                  >
                    {new Date(notification.created_at)
                      .toDateString()
                      .slice(0, 10)}
                  </StyledText>
                </Grid>
                {notification.status === "unread" ? (
                  <Grid item xs={12} textAlign={"right"}>
                    <StyledText
                      variant="textTitle"
                      style={{ color: COLORS.primary }}
                    >
                      Unread
                    </StyledText>
                  </Grid>
                ) : (
                  <Grid item xs={12} textAlign={"right"}>
                    <StyledText
                      variant="textTitle"
                      style={{ color: COLORS.primaryLight }}
                    >
                      Read
                    </StyledText>
                  </Grid>
                )}
              </Container>
            </SubContainer>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default Notification;
