import { Grid } from "@mui/material";
import React from "react";
import { StyledText } from "../text/Text.styles";
import SubContainer from "../common/SubContainer";

const Note = ({ note, medicine, homework, date }) => {
  return (
    <Grid item xs={12} container>
      <Grid item xs={12} sx={{ marginBottom: 1 }}>
        <StyledText>{new Date(date.seconds * 1000).toDateString()}</StyledText>
      </Grid>
      <SubContainer xs={12} enableHover>
        <Grid item component={"div"} xs={12}>
          <StyledText variant="textTitle">Note:</StyledText>
        </Grid>
        <Grid>
          <StyledText component={"p"}>{note}</StyledText>
        </Grid>
        <Grid item component={"div"} xs={12} sx={{ marginBlock: 1 }}>
          <StyledText variant="textTitle">Medicine:</StyledText>
        </Grid>
        <Grid item component={"div"} xs={12}>
          <StyledText component={"p"}>{medicine}</StyledText>
        </Grid>
        <Grid item component={"div"} xs={12} sx={{ marginBlock: 1 }}>
          <StyledText variant="textTitle">Homework:</StyledText>
        </Grid>
        <Grid item component={"div"} xs={12}>
          <StyledText component={"p"}>{homework}</StyledText>
        </Grid>
      </SubContainer>
    </Grid>
  );
};

export default Note;
