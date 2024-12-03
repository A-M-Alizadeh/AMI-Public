import { Grid } from "@mui/material";
import React from "react";
import { COLORS } from "../../styles/colors";
const Wrapper = ({
  children,
  justifyItems,
  alignItems,
  justifyContent,
  alignContent,
}) => {
  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        backgroundColor: COLORS.darkBackground,
      }}
      justifyItems={justifyItems}
      alignItems={alignItems}
      justifyContent={justifyContent}
      alignContent={alignContent}
    >
      {children}
    </Grid>
  );
};

export default Wrapper;
