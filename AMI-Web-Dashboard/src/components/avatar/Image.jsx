import { Box, Grid } from "@mui/material";
import React from "react";

const Image = ({ src,height,width }) => {
  return (
    <Grid
      component="img"
      // height={height}
      // width={width}
      sx={{
        height: 32,
        width: 32,
        maxHeight: { xs: 75, md: 167 },
        maxWidth: { xs: 75, md: 250 },
        borderRadius: "50%",
        boxShadow: "1px 2px 3px rgba(19, 19, 19, 0.5)",
        margin:'5px'

      }}
      alt="user avatar"
      src={src}
    ></Grid>
  );
};

export default Image;
