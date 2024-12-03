import { Box, Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledText } from "../text/Text.styles";
import SentimentDissatisfiedSharpIcon from "@mui/icons-material/SentimentDissatisfiedSharp";
import SportsRugbySharpIcon from "@mui/icons-material/SportsRugbySharp";
import SnoozeSharpIcon from "@mui/icons-material/SnoozeSharp";
import Image from "../avatar/Image";
import PatientGalary from "./PatientGalary";
import SubContainer from "../common/SubContainer";
import { COLORS } from "../../styles/colors";
import {
  feelingIcons,
  weathers,
  badHabits,
  edibles,
  activities,
} from "../../utils/utils";
import { Icons } from "../fontIcons";

const PatientRecordsDescription = ({ propDesDetail }) => {
  const [detailRecord, setDetailRecord] = useState({});

  let feelingIcon = findIcon(propDesDetail.feeling, feelingIcons);
  let weatherIcon = findIcon(propDesDetail.weather, weathers);

  function findIcon(id, arr) {
    const foundItem = arr.find((item) => item.id === id);
    return foundItem ? foundItem : null;
  }

  function isIncluded(item, itemsList) {
    return itemsList.includes(item);
  }

  return (
    <>
      {propDesDetail?.description == null || undefined ? (
        <Grid item sx={{ textAlign: "center", marginTop: 20 }}>
          <StyledText
            variant="textTitle"
            style={{
              fontSize: "1rem",
              color: `${COLORS.primary}`,
            }}
          >
            Please Select a Record from the Patient Records List
          </StyledText>
        </Grid>
      ) : (
        <SubContainer enableHover boxShadow={"2px 4px 4px rgba(0,0,0,0.5)"}>
          <Grid item container component={"div"} gap={2}>
            <Grid item container component={"div"}>
              <Grid
                item
                container
                xs={12}
                component={"div"}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Grid item sx={{ display: "flex", alignContent: "center" }}>
                  <Grid item component={"div"} display={"flex"}>
                    {feelingIcon ? (
                     <>
                      <Icons
                        iconColor={feelingIcon.color}
                        name={feelingIcon.icon}
                        size={24}
                      />
                     </>
                    ) : null}
                    {weatherIcon ? (
                      <Icons
                        iconColor={weatherIcon.color}
                        name={weatherIcon.icon}
                        size={24}
                      />
                    ) : null}
                  </Grid>
                  <StyledText
                    variant="textTitle"
                    style={{ color: "crimson", fontSize: "1.5rem" }}
                  >
                    {detailRecord.drugReason}
                  </StyledText>
                </Grid>
                <Grid item component={"div"}>
                <StyledText style={{color:'gray'}}>{new Date(propDesDetail.date.seconds * 1000).toDateString()}</StyledText>
                </Grid>
              </Grid>
              {/* <Grid
                item
                component={"div"}
                xs={6}
                md={2}
                lg={1.5}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
              </Grid> */}
              <Divider style={{ width: "100%", backgroundColor: "#acacac", marginTop:5 }} />
            </Grid>

            <Grid item container component={"div"} xs={12} gap={3}>
              {/* {questions.map((item, index) => {
          return ( */}
              <Grid item container component={"div"}>
                <StyledText variant="textTitle">Name of the Day:</StyledText>
                <Grid item component={"div"} sx={{ paddingLeft: 2 }} xs={12}>
                  <StyledText component={"p"}>
                    {propDesDetail.dayName}
                  </StyledText>
                </Grid>
              </Grid>

              <Grid item container component={"div"}>
                <StyledText variant="textTitle">Sleep Time:</StyledText>
                <Grid item component={"div"} sx={{ paddingLeft: 2 }} xs={12}>
                <StyledText component={"p"}>
                  {/* item.sleepStart.slice(0,5) + ' - ' + item.sleepEnd.slice(0,5)) */}
                    From: {propDesDetail.sleepEnd.slice(0,5)} - To: {propDesDetail.sleepStart.slice(0,5)}
                  </StyledText>
                </Grid>
              </Grid>

              <Grid item container component={"div"}>
                <StyledText variant="textTitle">Describe Your Day:</StyledText>
                <Grid item component={"div"} sx={{ paddingLeft: 2 }} xs={12}>
                  <StyledText component={"p"}>
                    {propDesDetail.description}
                  </StyledText>
                </Grid>
              </Grid>

              <Grid item container component={"div"}>
                <StyledText variant="textTitle">
                  Describe Your Feelings:
                </StyledText>
                <Grid item component={"div"} sx={{ paddingLeft: 2 }} xs={12}>
                  <StyledText component={"p"}>
                    {propDesDetail.feelingDescription}
                  </StyledText>
                </Grid>
              </Grid>

              <Grid item container component={"div"}>
                <StyledText variant="textTitle">
                  Describe the reason of the Feeling:
                </StyledText>
                <Grid item component={"div"} sx={{ paddingLeft: 2 }} xs={12}>
                  <StyledText component={"p"}>
                    {propDesDetail.feelingReason}
                  </StyledText>
                </Grid>
              </Grid>

              <Grid item container component={"div"}>
                <StyledText variant="textTitle">Your Activities:</StyledText>
                <Grid
                  item
                  component={"div"}
                  sx={{ display: "flex", marginTop:'10px' }}
                  xs={12}
                >
                  {activities.map((item,index) => {
                    return (
                      <Icons
                      key={index}
                        iconColor={
                          isIncluded(item.id, propDesDetail.activityIds)
                            ? item.color
                            : "gray"
                        }
                        name={item.icon}
                        size={24}
                      />
                    );
                  })}
                </Grid>
              </Grid>
              <Grid item container component={"div"}>
                <StyledText variant="textTitle">What You had Today:</StyledText>
                <Grid
                  item
                  component={"div"}
                  sx={{  display: "flex" }}
                  xs={12}
                >
                  {edibles.map((item,index) => {
                    return (
                      <Icons
                      key={index}
                        iconColor={
                          isIncluded(item.id, propDesDetail.foodIds)
                            ? item.color
                            : "gray"
                        }
                        name={item.icon}
                        size={24}
                      />
                    );
                  })}
                </Grid>
              </Grid>

              <Grid item container component={"div"}>
                <StyledText variant="textTitle">
                  Did you have Drugs or Alchohol? how did it Feel?
                </StyledText>
                <Grid
                  item
                  component={"div"}
                  sx={{  display: "flex" }}
                  xs={12}
                >
                  {badHabits.map((item, index) => {
                    return (
                      <Icons
                      key={index}
                        iconColor={
                          isIncluded(item.id, propDesDetail.drugIds)
                            ? item.color
                            : "gray"
                        }
                        name={item.icon}
                        size={24}
                      />
                    );
                  })}
                </Grid>
                <StyledText variant="textTitle" style={{marginRight: 10, color: 'gray'}}>Drug Reason:</StyledText>
                <StyledText variant="textTitle" style={{marginRight: 10, color: 'white'}}>{propDesDetail.drugReason} </StyledText>
                  
              </Grid>
              {/* );
        })} */}
            </Grid>
            <Divider style={{ width: "100%" }} />
            <Grid item container component={"div"}>
                <StyledText variant="textTitle">Todays Photos:</StyledText>
                <Grid item component={"div"} sx={{ paddingLeft: 2 }} xs={12}>
                  <PatientGalary photos={propDesDetail.photoIds} />
                </Grid>
              </Grid>
          </Grid>
        </SubContainer>
      )}
    </>
  );
};

export default PatientRecordsDescription;
