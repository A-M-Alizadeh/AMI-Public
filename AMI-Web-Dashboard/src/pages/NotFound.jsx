import { Grid } from "@mui/material";
import { StyledText } from "../components/text/Text.styles.js";
import { COLORS } from "../styles/colors.js";
import { Icons } from "../components/fontIcons/index.jsx";

const NotFound = () => {
  return (
    <Grid container backgroundColor={COLORS.darkBackground}>
      <Grid
        item
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50dvh",
          width: "100%",
        }}
      >
        <StyledText
          variant="textTitle"
          style={{ color: `${COLORS.danger}`, fontSize: "2rem" }}
        >
          PAGE NOT FOUND :({" "}
          <Icons iconColor={"red"} name={"verySad"} size={100} />
        </StyledText>
      </Grid>
    </Grid>
  );
};

export default NotFound;
