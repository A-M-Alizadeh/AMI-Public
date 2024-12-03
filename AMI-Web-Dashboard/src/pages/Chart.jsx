import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";
const Chart = ({ chartData }) => {
  // const data = [
  //     { uv: 4000, pv: 2400,},
  //     { uv: 3000, pv: 1398,},
  //     { uv: 2000, pv: 9800,},
  //     { uv: 2780, pv: 3908,},
  //     { uv: 1890, pv: 4800,},
  //     { uv: 2390, pv: 3800,},
  //     { uv: 3490, pv: 4300,},
  //   ];

  return (
    <div>
      <div>
        <LineChart width={500} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sleep" stroke="red" />
          <Line type="monotone" dataKey="feeling" stroke="#82ca9d" />
        </LineChart>
      </div>
    </div>
  );
};

export default Chart;
