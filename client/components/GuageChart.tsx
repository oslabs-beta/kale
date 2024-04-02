import React from 'react';
import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

type GuageChartProps = {
  metric: string;
  value: number;
  time: string;
  id: string;
};

export default function GuageChart({
  metric,
  value,
  time,
  id,
}: GuageChartProps) {
  console.log('GuageChart', metric, value, time);

  const data = [value, 1 - value];
  const svgRef = useRef();

  useEffect(() => {
    //setting up svg container
    const w = 320;
    const h = 180;
    const radius = +w / 2;
    const svg = d3
      .select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('display', 'block')
      .style('margin', '40px')
      .style('overflow', 'visible');
    // .style('background-color', 'white');

    //setting up pie chart
    const pieGenerator = d3
      .pie()
      .startAngle(-0.5 * Math.PI)
      .endAngle(0.5 * Math.PI)
      .sort(null);
    const instructions = pieGenerator(data);
    const arcGenerator: any = d3
      .arc()
      .innerRadius(radius / 2)
      .outerRadius(radius);

    const color = d3.scaleOrdinal(d3.schemeSet2);

    //setting up svg data
    svg
      .selectAll()
      .data(instructions)
      .join('path')
      .attr('d', arcGenerator)
      .attr('fill', (insctruction, i) => (i === 0 ? '#1E8A5A' : '#e11d48'))
      .attr('opacity', 0.7)
      .style('transform', `translate(${radius}px, ${radius}px)`);

    // setting up text
    svg
      .append('text')
      .attr('transform', `translate(${radius}, ${radius})`)
      .attr('text-anchor', 'middle')
      .style('font-size', 30)
      .style('fill', '#e4e4e7')
      .text(+data[0].toFixed(4) * 100 + '%');
  }, [data]);

  return (
    <div
      className="flex flex-col h-auto w-1/3 items-center justify-center"
      id={id}
    >
      <p className="text-lg text-center dark:text-kalegreen-300">{metric}</p>
      <svg ref={svgRef}></svg>
    </div>
  );
}
