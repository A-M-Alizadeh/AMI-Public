import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import NewspaperSharpIcon from "@mui/icons-material/NewspaperSharp";
import { StyledText } from "../components/text/Text.styles";
import Image from "../components/avatar/Image";
import {
  getDocs,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../auth/Firebase";
import { getAnalytics, logEvent } from "firebase/analytics";
import { app } from "../auth/Firebase";
import { COLORS } from "../styles/colors";

const Dashboard = () => {
  const analytics = getAnalytics(app);
  logEvent(analytics, "Dashboard Log event succesfull");
  const [myPatients, setMyPatients] = useState([]);
  const navigate = useNavigate();

  const usersCollectionRef = collection(db, "Users");
  const recordsCollectionRef = collection(db, "records");
  useEffect(() => {
    const doctor = JSON.parse(localStorage.getItem("doctor"));
    let patients = doctor.patientsUsernames;
    let myPatients = [];
    getDocs(usersCollectionRef)
      .then((data) => {
        data.docs.map((doc) => {
          if (patients.includes(doc.data().username)) {
            myPatients.push({ docId: doc.id, ...doc.data() });
          }
        });
      })
      .then(() => {
        setMyPatients(myPatients);
      })
      .catch((error) => {
        console.log("Error Message:", error);
      });
    localStorage.removeItem("userdata");
  }, []);

  const getUsersRecords = (item) => {
    const itemUserData = localStorage.setItem("userdata", JSON.stringify(item));

    let userRecords = [];
    getDocs(query(recordsCollectionRef, orderBy("date", "desc")))
      .then((data) => {
        data.docs.map((doc, index) => {
          if (doc.data().username === item.email) {
            userRecords.push(doc.data());
          }
        });
      })
      .then(() => {
        localStorage.setItem("records", JSON.stringify(userRecords));
        navigate("/patient-diary");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid
      container
      sx={{ height: "", backgroundColor: `${COLORS.darkBackground}` }}
    >
      <Grid container spacing={4} flex={1} height="100%">
        {myPatients.map((item, index) => {
          return (
            <Grid
              key={index}
              item
              xs={12}
              md={6}
              lg={3}
              onClick={() => getUsersRecords(item)}
            >
              <Box
                width="100%"
                height="200px"
                borderRadius={2}
                sx={{
                  boxShadow: "2px 2px 5px rgba(0,0,0,0.5)",
                  backgroundColor: `${COLORS.darkCard}`,
                  "&:hover": {
                    backgroundColor:"#1d1e2f",
                    cursor:"pointer",
                    transition: "background-color 0.5s ease-in-out",
                  },
                }}
              >
                <Grid item container sx={{ padding: 2 }}>
                  <Grid
                    item
                    container
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Grid item sx={{ marginRight: 1 }}>
                      <Image src={"https://picsum.photos/200"} />
                    </Grid>
                    <Grid item>
                      <StyledText variant="textTitle">{item.email}</StyledText>
                      <Grid
                        item
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {/* <Box component={"div"} style={{ color: "#bbbbbb" }}>
                          Last Entry:
                        </Box> */}
                        <StyledText style={{color:'gray', fontSize: 14, marginRight: 2}}>Last Entry:</StyledText>
                        <StyledText style={{color:'gray', fontSize: 14}}>22/02/2024</StyledText>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider
                    style={{
                      backgroundColor: "#acacac",
                      width: "100%",
                      margin: "auto",
                    }}
                  />
                  <Grid
                    item
                    xs={7}
                    sm={8}
                    md={9}
                    sx={{ paddingBlock: "0.8rem" }}
                  >
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "5px",
                      }}
                    >
                      <Box component={"div"} style={{ color: "#aaaaaa" }}>
                        Last Session:
                      </Box>
                      <Box component={"div"} style={{ color: "#ffffff" }}>
                        10/02/2024
                      </Box>
                    </Grid>

                    <Grid
                      item
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box component={"div"} style={{ color: "#aaaaaa" }}>
                        Next Session:
                      </Box>
                      <Box component={"div"} style={{ color: "#ffffff" }}>
                        10/03/2024
                      </Box>
                    </Grid>
                  </Grid>
                  <Divider
                    style={{
                      backgroundColor: "#acacac",
                      width: "100%",
                      margin: "auto",
                    }}
                  />
                  <Grid
                    item
                    container
                    component={"div"}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 3,
                    }}
                  >
                    <Grid item component={"div"}>
                      <DeleteIcon
                        sx={{
                          color: "crimson",
                          fontSize: "1.5rem",
                          cursor: "pointer",
                          "&:hover": {
                            color: "#ff002f",
                            transition: "all 1s ease",
                            transform: "scale(1.1)",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item component={"div"}>
                      <NewspaperSharpIcon
                        sx={{
                          color: "#28bbff",
                          fontSize: "1.5rem",
                          cursor: "pointer",
                          "&:hover": {
                            color: "#0069f3",
                            transition: "all 1s ease",
                            transform: "scale(1.1)",
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default Dashboard;
