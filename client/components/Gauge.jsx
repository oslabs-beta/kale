import React from 'react';
import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export default function Gauge() {
  const data = [0.4, 0.6];
  const svgRef = useRef();

  useEffect(() => {
    //setting up svg container
    const w = 500;
    const h = 500;
    const radius = w / 2;
    const svg = d3
      .select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('display', 'block')
      .style('margin', '200px')
      .style('background-color', 'white');

    //setting up pie chart
    const pieGenerator = d3
      .pie()
      .startAngle(-0.5 * Math.PI)
      .endAngle(0.5 * Math.PI)
      .sort(null);
    const instructions = pieGenerator(data);
    const arcGenerator = d3
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
      .text(data[0] * 100 + '%');
  }, [data]);

  return (
    <div className="pie-chart">
      <svg ref={svgRef}></svg>
    </div>
  );
}
