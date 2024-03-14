import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function Chart() {
  const [data] = useState([25, 50, 35, 15, 94, 10]);
  const svgRef = useRef();

  useEffect(() => {
    //setting up svg
    const w = 400;
    const h = 100;
    const svg = d3
      .select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('background', '#d3d3d3')
      .style('margin-top', '50')
      .style('overflow', 'visible');
    //setting up the scaling
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, w]);
    const yScale = d3.scaleLinear().domain([0, h]).range([h, 0]);
    const generateScaledLine = d3
      .line()
      .x((d, i) => xScale(i))
      .y(yScale);
    //.curve(d3.curveCardinal);
    //setting the axes
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((i) => i + 1);
    const yAxis = d3.axisLeft(yScale).ticks(5);
    svg.append('g').call(xAxis).attr('transform', `translate(0,${h})`);
    svg.append('g').call(yAxis);

    //setting up the data for the svg
    svg
      .selectAll('.line')
      .data([data])
      .join('path')
      .attr('d', (d) => generateScaledLine(d))
      .attr('fill', 'none')
      .attr('stroke', 'black');
  }, [data]);
  return <svg ref={svgRef}></svg>;
}
