import React, { useState } from "react";
import Container from "../common/Container";
import { Divider, Grid } from "@mui/material";

import { StyledText } from "../text/Text.styles";
import PatientRecords from "./PatientRecords";
import PatientRecordsDescription from "./PatientRecordsDescription";
import { COLORS } from "../../styles/colors";
const PatientDiary = () => {
  const userRecords = JSON.parse(localStorage.getItem("records"));
  const [singleRecord, setSingleRecord] = useState({});

  const propTestHandler = (event) => {
    setSingleRecord(event);
  };

  return (
    <Container height={"90vh"}>
      <Grid component={"div"} item container sx={{ display: "flex" }} gap={2}>
        <Grid
          item
          container
          component={"div"}
          xs={12}
          md={3}
          height={"83vh !important"}
        >
          <Grid
            item
            component={"div"}
            container
            xs={12}
            sx={{ marginBottom: 1 }}
          >
            <Grid
              item
              component={"div"}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 1,
              }}
            >
              <StyledText variant="textTitle">Patient Records</StyledText>
            </Grid>
          </Grid>

          <Grid
            item
            gap={1}
            height={"83vh !important"}
            sx={{
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "8px",
                backgroundColor: "#000",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: COLORS.darkBorder,
                borderRadius: "4px",
              },
            }}
          >
            {userRecords?.map((record, index) => {
              return (
                <PatientRecords
                  key={index}
                  record={record}
                  userRecords={userRecords}
                  propTest={propTestHandler}
                />
              );
            })}
          </Grid>
        </Grid>
        <Grid
          item
          component={"div"}
          xs={12}
          md={7}
          lg={8.8}
          height={"87.5vh"}
          sx={{
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "8px",
              backgroundColor: "#000",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: COLORS.darkBorder,
              borderRadius: "4px",
            },
          }}
        >
          <PatientRecordsDescription propDesDetail={singleRecord} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PatientDiary;
