import { Grid } from '@mui/material'
import React from 'react'
import {COLORS} from '../../styles/colors'
const ChartWrapper = ({children, gap,spacing}) => {
  return (
   <Grid item gap={gap} spacing={spacing} sx={{backgroundColor:"#27283f",margin:1, borderRadius:'5px'}}>
    {children}
   </Grid>
  )
}

export default ChartWrapper