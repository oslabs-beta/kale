import React from 'react';
import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

type GaugeChartProps = {
  metric: string;
  value: number;
  time: string;
};

export default function Gauge({ metric, value, time }: GaugeChartProps) {
  const data = [value, 1 - value];
  const svgRef = useRef();

  useEffect(() => {
    //setting up svg container
    const w = 400;
    const h = 400;
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
      .attr('fill', (insctruction, i) => (i === 0 ? 'green' : 'red'))
      .attr('opacity', 0.7)
      .style('transform', `translate(${radius}px, ${radius}px)`);

    // setting up text
    svg
      .append('text')
      .attr('transform', `translate(${radius}, ${radius})`)
      .attr('text-anchor', 'middle')
      .style('font-size', 50)
      .style('fill', '#ffffff')
      .text(data[0] * 100 + '%');
  }, [data]);

  return (
    <>
      <p className="text-lg font-semibold text-center">{metric}</p>
      <svg ref={svgRef}></svg>
    </>
  );
}
