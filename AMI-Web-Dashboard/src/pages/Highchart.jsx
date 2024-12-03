import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { COLORS } from '../styles/colors';
import { Height } from '@mui/icons-material';
import { sizeWidth, sizing } from '@mui/system';

// Initialize Highcharts modules
// require('highcharts/modules/exporting')(Highcharts);

const Highchart = ({data}) => {
  const options = {
    chart: {
      type: 'pie',
      // backgroundColor: `${COLORS.darkCard}`,
      backgroundColor:'#27283f',
      borderRadius: 20,
    },
    title: {
      text: 'Activity Pie',
      style: {
        color: `${COLORS.white}`,
      },
    },
    series: [{
      name: 'Categories',
      sizeWidth: '50%',
      sizeHeight: '100%',
      innerSize: '50%',
      data:data,
    }],
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y}',
        },
      },
    },
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
};

export default Highchart;
