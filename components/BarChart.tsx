import React from 'react';
import { BarChart as BarChartCore, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const BarChart = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <BarChartCore width={600} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
        <XAxis dataKey="name" stroke="#F3F4F6"/>
        <YAxis stroke="#F3F4F6"/>
        <Tooltip cursor={false}/>
        <Bar dataKey="age" fill="#41ABFF" />
      </BarChartCore>
    </div>
  );
}

export default BarChart;