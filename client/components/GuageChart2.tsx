import React, { PureComponent } from 'react';
import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  ResponsiveContainer,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

type GuageChartProps = {
  metric: string;
  value: number;
  time: string;
};

// const data = [
//   {
//     name: 'Target (5%)',
//     uv: 5,
//     pv: 4567,
//     fill: '#777',
//   },
//   {
//     name: 'Growth %',
//     uv: 8.3,
//     pv: 2400,
//     fill: '#22AA22',
//   },
// ];

const GuageChart2 = ({ metric, value, time }: GuageChartProps) => {
  return (
    <ResponsiveContainer width="95%" height={400}>
      <RadialBarChart
        innerRadius="80%"
        outerRadius="100%"
        barSize={10}
        data={[value]}
      >
        <PolarAngleAxis
          type="number"
          domain={[360, 180]}
          allowDataOverflow={true}
          tick={false}
        />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
        <RadialBar
          label={{ fill: '#666', position: 'insideStart' }}
          background
          dataKey="value"
        />
        <text
          x="50%"
          y="50%"
          dy={+12}
          style={{ fontSize: 48, fontWeight: 'bold', fill: '#22AA22' }}
          width={200}
          textAnchor="middle"
        >
          8.3%
        </text>
        <text
          x="50%"
          y="60%"
          style={{ fontSize: 24, fontWeight: 'bold', fill: '#777' }}
          width={200}
          textAnchor="middle"
        >
          Target: 5%
        </text>
        <Legend
          iconSize={20}
          width={120}
          height={100}
          layout="vertical"
          verticalAlign="bottom"
          align="center"
        />
        <Tooltip />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default GuageChart2;

// import React, { PureComponent } from 'react';
// import { PieChart, Pie, Cell, Label } from 'recharts';

// const RADIAN = Math.PI / 180;
// const data: any = [
//   { name: 'A', value: 80, color: '#ffffff' },
//   { name: 'B', value: 45, color: '#FFFF00' },
//   { name: 'C', value: 25, color: '#FF0000' },
// ];
// const cx = 150;
// const cy = 200;
// const iR = 50;
// const oR = 100;
// const value = data[0].value;
// const chartValue = data[0].value;

// const needle = (
//   value: number,
//   data: any[],
//   cx: number,
//   cy: number,
//   iR: number,
//   oR: number,
//   color: string
// ) => {
//   let total = 0;
//   data.forEach((v) => {
//     total += v.value;
//   });
//   const ang = 180.0 * (1 - value / total);
//   const length = (iR + 2 * oR) / 3;
//   const sin = Math.sin(-RADIAN * ang);
//   const cos = Math.cos(-RADIAN * ang);
//   const r = 5;
//   const x0 = cx + 5;
//   const y0 = cy + 5;
//   const xba = x0 + r * sin;
//   const yba = y0 - r * cos;
//   const xbb = x0 - r * sin;
//   const ybb = y0 + r * cos;
//   const xp = x0 + length * cos;
//   const yp = y0 + length * sin;

//   return [
//     <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
//     <path
//       d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
//       stroke="#none"
//       fill={color}
//     />,
//   ];
// };

// export default class Example extends PureComponent {
//   render() {
//     return (
//       <PieChart width={400} height={500}>
//         <Pie
//           dataKey="value"
//           startAngle={180}
//           endAngle={0}
//           data={data}
//           cx={cx}
//           cy={cy}
//           innerRadius={iR}
//           outerRadius={oR}
//           fill="#8884d8"
//           stroke="none"
//         >
//           {data.map((entry: { color: string }, index: any) => (
//             <Cell key={`cell-${index}`} fill={entry.color} />
//           ))}

//           <Label
//             value={chartValue}
//             position="centerBottom"
//             offset={-40}
//             className="gauge-label"
//             color="white"
//             fontSize="30px"
//             fontWeight="bold"
//           />
//         </Pie>
//         {/* {needle(value, data, cx, cy, iR, oR, '#d0d000')} */}
//       </PieChart>
//     );
//   }
// }
