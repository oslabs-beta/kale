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
      .style('margin-left', '50')
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

    const tooltip = d3
      .select('svg')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    const focus = svg
      .append('g')
      .attr('class', 'focus')
      .style('display', 'none');

    focus
      .append('circle')
      .attr('r', 3)
      .attr('class', 'circle')
      .style('pointer-events', 'none');

    svg
      .append('rect')
      .attr('class', 'overlay')
      .attr('width', w)
      .attr('height', h)
      .style('opacity', 0)
      .on('mouseover', () => {
        focus.style('display', null);
      })
      .on('mouseout', () => {
        tooltip.transition().duration(150).style('opacity', 0);
      })
      .on('mousemove', mousemove);

    function mousemove(event) {
      const bisect = d3.bisector((d) => d).left;
      const xPos = d3.pointer(event)[0];
      const x0 = bisect(data, xScale.invert(xPos)); // Update x0 on every mousemove

      if (x0 !== undefined) {
        // Check if a data point is found
        const d0 = data[x0];
        focus.attr('transform', `translate(${xScale(x0)},${yScale(d0)})`);
        tooltip.transition().duration(150).style('opacity', 0.9);
        tooltip
          .html(d0)
          .style(
            'transform',
            `translate(${xScale(x0) + 30}px,${yScale(d0) - 30}px)`
          );
      }
    }
  }, [data]);

  return <svg ref={svgRef}></svg>;
}
