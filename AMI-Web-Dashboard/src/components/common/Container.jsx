import { Grid } from "@mui/material";
import React from "react";

const Container = ({ children, xs, md, sx, backgroundColor, height,style }) => {
  return (
    <Grid
      item
      xs={xs}
      md={md}
      component={"div"}
      container
      gap={2}
      style={style}
      sx={{ sx, padding: "10px" }}
      backgroundColor={backgroundColor}
      height={height}
    >
      {children}
    </Grid>
  );
};

export default Container;
