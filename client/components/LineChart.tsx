import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { MetricsData } from '../../types';

export default function LineChart({ metric, value, time }: MetricsData) {
  const svgRef = useRef();

  useEffect(() => {
    //setting up svg
    const w = 600;
    const h = 350;
    const svg = d3
      .select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('background', '#d3d3d3')
      .style('margin-top', '50')
      .style('margin-left', '50')
      .style('overflow', 'visible')
      .style('fill', '#ffffff');
    //setting up the scaling
    const xScale = d3
      .scaleLinear()
      .domain([0, time.length - 1])
      .range([0, w]);
    const yScale: any = d3.scaleLinear().domain([0, 1]).range([h, 0]);
    const generateScaledLine = d3
      .line()
      .x((d, i) => xScale(i))
      .y(yScale);
    //setting the axes
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(time.length)
      .tickFormat((i: any) => i + 1);
    const yAxis = d3.axisLeft(yScale).ticks(5);
    svg.append('g').call(xAxis).attr('transform', `translate(0,${h})`);
    svg.append('g').call(yAxis);

    //setting up the data for the svg
    svg
      .selectAll('.line')
      .data([value])
      .join('path')
      .attr('d', (d: any) => generateScaledLine(d))
      .attr('fill', 'none')
      .attr('stroke', 'black');

    // const tooltip = d3
    //   .select('body')
    //   .append('div')
    //   .attr('class', 'tooltip')
    //   .style('opacity', 0);

    // const focus = svg
    //   .append('g')
    //   .attr('class', 'focus')
    //   .style('display', 'none');

    // focus
    //   .append('circle')
    //   .attr('r', 3)
    //   .attr('class', 'circle')
    //   .style('pointer-events', 'none');

    // svg
    //   .append('rect')
    //   .attr('class', 'overlay')
    //   .attr('width', w)
    //   .attr('height', h)
    //   .style('opacity', 0)
    //   .on('mouseover', () => {
    //     focus.style('display', null);
    //   })
    //   .on('mouseout', () => {
    //     tooltip.transition().duration(150).style('opacity', 0);
    //   })
    //   .on('mousemove', mousemove);

    // function mousemove(event: any) {
    //   const bisect = d3.bisector((d) => d).left;
    //   const xPos = d3.pointer(event)[0];
    //   const x0 = bisect(time, yScale.invert(xPos)); // Update x0 on every mousemove

    //   if (x0 !== undefined) {
    //     // Check if a data point is found
    //     const d0: any = time[x0];
    //     focus.attr('transform', `translate(${xScale(x0)},${yScale(d0)})`);
    //     tooltip.transition().duration(150).style('opacity', 0.9);
    //     tooltip
    //       .html(d0)
    //       .style(
    //         'transform',
    //         `translate(${xScale(x0) + 30}px,${yScale(d0) - 30}px)`
    //       );
    //   }
    // }
  }, [time]);

  return (
    <div className="flex flex-col h-60 w-60 items-center justify-center">
      <p className="text-lg font-semibold text-center">{metric}</p>
      <svg ref={svgRef}></svg>
    </div>
  );
}
