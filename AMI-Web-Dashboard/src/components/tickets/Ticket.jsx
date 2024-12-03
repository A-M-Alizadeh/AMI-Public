import React, { useEffect, useState } from "react";
import SubContainer from "../common/SubContainer";
import { Divider, Grid } from "@mui/material";
import { StyledText } from "../text/Text.styles";
import Image from "../avatar/Image";
import { StyledTextarea } from "../textarea/Textarea.styles";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import { COLORS } from "../../styles/colors";

const Ticket = ({ note, updater }) => {
  const [answer, setAnswer] = useState("");

  const onSubmitHandler = (docId) => {
    if (answer.trim() !== "") {
      updater(docId, answer, note.senderUsername);
      setAnswer("");
    }
  };

  return (
    <Grid item xs={12} container>
      <Grid item xs={12} sx={{ marginBlock: 2 }}>
        <StyledText>{new Date(note.created_at).toDateString().slice(0, 10)}</StyledText>
      </Grid>
      <SubContainer xs={12}>
        <Grid
          item
          container
          component={"div"}
          xs={12}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Grid item sx={{ paddingRight: 2 }}>
            <Image src={"https://picsum.photos/200"} />
          </Grid>
          <Grid item>
            <StyledText variant="textTitle">{note.senderUsername}</StyledText>
          </Grid>
          <Divider
            style={{
              backgroundColor: "#acacac",
              width: "100%",
              margin: "auto",
            }}
          />
        </Grid>
        <Grid item container sx={{ marginTop: 1 }}>
          <Grid item>
            <StyledText variant="textTitle">{note.title}</StyledText>
          </Grid>
          <Grid item xs={12} sx={{ paddingLeft: 2, marginBlock: "15px" }}>
            <StyledText>{note.description}</StyledText>
          </Grid>
        </Grid>
        {note.status === "pending" ? (
          <Grid item xs={12} sx={{ position: "relative" }}>
            <StyledTextarea
              disabled={note.status === "pending" ? false : true}
              placeholder="Type some answers"
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
            />
            <SendSharpIcon
              onClick={() => onSubmitHandler(note.docId)}
              sx={{
                position: "absolute",
                top: 60,
                right: 20,
                color: `${COLORS.warning}`,
                cursor: "pointer",
                "&:hover": {
                  color: `${COLORS.primary}`,
                  transition: "all 0.5s ease",
                  transform: "scale(1.1)",
                },
              }}
            />
          </Grid>
        ) : (
          <Grid>
            <StyledText variant="textTitle">Answer:</StyledText>
            <StyledText style={{ marginTop: "10px" }}>{note.answer}</StyledText>
          </Grid>
        )}
      </SubContainer>
    </Grid>
  );
};

export default Ticket;
