import { Grid } from '@mui/material'
import React from 'react'

const RegisterContainer = ({children,sx}) => {
  return (
    <Grid
    item
    container
    alignContent={"flex-start"}
    justifyContent={"center"}
    border={'1px solid rgba(255,255,255,0.5)'}
    borderRadius={3}
    sx={sx}
  >
    {children}
  </Grid>
  )
}

export default RegisterContainer;