import { Grid } from "@mui/material";
import React from "react";
import { COLORS } from "../../styles/colors";
const SubContainer = ({
  children,
  xs,
  sx,
  sm,
  md,
  gap,
  spacing,
  boxShadow,
  onClick,
  style,
  enableHover,
  marginTop,
  marginBlock,
  height,
  enableOverflow,
  notifBackground,
  cleanPadding,
}) => {
  return (
    <Grid
      onClick={onClick}
      boxShadow={boxShadow}
      spacing={spacing}
      gap={gap}
      marginTop={marginTop}
      marginBlock={marginBlock}
      item
      container
      height={height}
      xs={xs}
      sm={sm}
      md={md}
      overflow={enableOverflow ? "scroll" : "auto"}
      sx={{
        backgroundColor: notifBackground ? "#080912" : `${COLORS.darkCard}`,
        color: "#fff",
        borderRadius: 2,
        padding: cleanPadding ? 0 : 2,
        wordBreak: "break-all",
        "&:hover": {
          backgroundColor: enableHover ? `${COLORS.darkCard}` : "#1d1e2f",
          cursor: enableHover ? "pointer" : "pointer",
          transition: "background-color 0.5s ease-in-out",
        },
      }}
      style={style}
    >
      {children}
    </Grid>
  );
};

export default SubContainer;
