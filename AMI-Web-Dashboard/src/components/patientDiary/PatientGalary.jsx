import { Box, Grid } from "@mui/material";
import React from "react";

const PatientGalary = ({ photos }) => {
  return (
    <Grid item container component={"div"}>
      {photos.map((item) => {
        return (
          <Box
          key={item}
            component="img"
            sx={{
              borderRadius:'5px', 
              height: 400,
              width: 150,
              maxHeight: { xs: 75, md: 167 },
              maxWidth: { xs: 350, md: 250 },
              marginRight: 1,
            }}
            alt="The house from the offer."
            src={item}
          />
        );
      })}
      <Grid
        item
        component={"div"}
        container
        sx={{
          justifyContent: { xs: "center", md: "flex-start", lg: "flex-start" },
        }}
      ></Grid>
    </Grid>
  );
};

export default PatientGalary;
