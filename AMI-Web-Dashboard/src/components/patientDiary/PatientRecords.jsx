import { Box, Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledText } from "../text/Text.styles";
import SubContainer from "../common/SubContainer";
import Image from "../avatar/Image";
import SnoozeSharpIcon from "@mui/icons-material/SnoozeSharp";
import TagFacesSharpIcon from "@mui/icons-material/TagFacesSharp";
import AcUnitSharpIcon from "@mui/icons-material/AcUnitSharp";
import LocalPizzaSharpIcon from "@mui/icons-material/LocalPizzaSharp";
import SportsRugbySharpIcon from "@mui/icons-material/SportsRugbySharp";
import RollerSkatingSharpIcon from "@mui/icons-material/RollerSkatingSharp";
import { Icons } from "../fontIcons/index";
import "./PatientsRecord.css";
import {
  feelingIcons,
  weathers,
  badHabits,
  edibles,
  activities,
} from "../../utils/utils";

const PatientRecords = ({ propTest, record, userRecords }) => {
  const [recordDetail, setRecordDetail] = useState({});
  const [isClicked, setIsClicked] = useState(false);

  let feelingIcon = findIcon(record.feeling, feelingIcons);
  let weatherIcon = findIcon(record.weather, weathers);
  let badHabitIcon = record.drugIds.length > 0 ? findIcon(record.drugIds[0], badHabits) : null;
  let edibleIcon = record.foodIds.length > 0 ? findIcon(record.foodIds[0], edibles) : null;
  let activityIcon = record.activityIds.length > 0 ? findIcon(record.activityIds[0], activities) : null;

  function findIcon(id, arr) {
    const foundItem = arr.find((item) => item.id === id);
    return foundItem ? foundItem : null;
  }

  useEffect(() => {
    propTest(recordDetail);
  }, [recordDetail]);

  const recordShowDetailHandler = (dayName) => {
    const detail = userRecords.find((item) => {
      return item.dayName === dayName;
    });
    localStorage.setItem("record-description-detail", JSON.stringify(detail));
    setRecordDetail(detail);
  };

  return (
    <Grid
      container
      style={{ alignItems: "start" }}
      className="patients-records"
    >
      <Grid
        item
        xs={12}
        marginBlock={1}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <StyledText style={{ fontSize: "0.7rem" }}>
          {new Date(record.date.seconds * 1000).toDateString()}
        </StyledText>
      </Grid>
      <SubContainer
        enableHover={false}
        boxShadow={"2px 4px 4px rgba(0,0,0,0.5)"}
        onClick={() => recordShowDetailHandler(record.dayName)}
      >
        <Grid
          item
          container
          component={"div"}
          xs={12}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            marginBottom: '10px'
          }}
        >
          <Grid item component={"div"} display={"flex"}>
            {feelingIcon ? (
              <Icons
                iconColor={feelingIcon.color}
                name={feelingIcon.icon}
                size={24}
              />
            ) : null}
            {weatherIcon ? (
              <Icons
                iconColor={weatherIcon.color}
                name={weatherIcon.icon}
                size={24}
              />
            ) : null}
          </Grid>
          <Grid item component={"div"} display={'flex'}>
            {badHabitIcon ? (
              <Icons
                iconColor={badHabitIcon.color}
                name={badHabitIcon.icon}
                size={24}
              />
            ) : null}
            {edibleIcon ? (
              <Icons
                iconColor={edibleIcon.color}
                name={edibleIcon.icon}
                size={24}
              />
            ) : null}
            {activityIcon ? (
              <Icons
                iconColor={activityIcon.color}
                name={activityIcon.icon}
                size={24}
              />
            ) : null}
          </Grid>
        </Grid>
        <Divider style={{ width: "100%", backgroundColor: "#acacac" }} />
        <Grid
          item
          container
          component={"div"}
          xs={12}
          sx={{ marginBlock: 1.5 }}
        >
          <Grid item component={"div"} xs={12}>
            <StyledText variant="textTitle">{record.dayName}</StyledText>
          </Grid>
        </Grid>
        <Grid item component={"div"} xs={12} sx={{ marginBottom: 1 }}>
          <StyledText>{record.description}</StyledText>
        </Grid>
        <Grid item display={"flex"} flexDirection={"row"}>
          {record.photoIds.map((item, index) => {
            return (
              <Grid
                item
                key={index}
                component={"div"}
                xs={12}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Image src={item} />
              </Grid>
            );
          })}
        </Grid>
      </SubContainer>
    </Grid>
  );
};

export default PatientRecords;
