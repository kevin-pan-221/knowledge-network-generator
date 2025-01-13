"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

const KnowledgeGraph = ({ graphData, resetGraph, selectedNode }) => {
  const svgRef = useRef();
  const zoomRef = useRef(); // Store zoom reference across renders

  useEffect(() => {
    if (!graphData) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous graph

    const { nodes, links } = graphData;

    const width = 1200; // Increased canvas width
    const height = 800; // Increased canvas height

    // Initialize zoom behavior
    const zoom = d3.zoom().on("zoom", (event) => {
      svgGroup.attr("transform", event.transform);
    });
    zoomRef.current = zoom; // Store zoom reference

    svg.call(zoom).on("dblclick.zoom", null); // Disable double-click zoom

    const svgGroup = svg.append("g");

    // Initialize force simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance((d) => {
            const maxDistance = 200; // Reduced maximum distance
            const minDistance = 50;  // Increased minimum distance
            const weight = d.weight;
            return minDistance + (maxDistance - minDistance) * (1 - weight); // Linear scaling
          })
      )
      .force("charge", d3.forceManyBody().strength(-100)) // Lower node repulsion
      .force("x", d3.forceX(width / 2).strength(0.02)) // Center horizontally
      .force("y", d3.forceY(height / 2).strength(0.02)) // Center vertically
      .force("center", d3.forceCenter(width / 2, height / 2))
      .alphaDecay(0.08); // Faster stabilization

    const link = svgGroup
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .style("stroke", (d) => d3.interpolateBlues(Math.pow(d.weight, 2)))
      .style("stroke-width", 2);

    const node = svgGroup
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 12) // Slightly larger nodes
      .style("fill", "skyblue")
      .call(
        d3
          .drag()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    const label = svgGroup
      .append("g")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("dx", 14)
      .attr("dy", 4)
      .text((d) => d.id);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

      label.attr("x", (d) => d.x).attr("y", (d) => d.y);
    });

    simulation.on("end", () => {
      simulation.alphaTarget(0); // Ensure forces stop after stabilization
    });

    const zoomToNode = (nodeId) => {
      if (!nodeId) {
        // Reset fade and zoom
        node.style("opacity", 1);
        link.style("opacity", 1);
        svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity);
        return;
      }

      const targetNode = nodes.find((n) => n.id === nodeId);
      if (!targetNode) return;

      // Fade unrelated nodes and links
      const connectedNodes = new Set(
        links
          .filter((l) => l.source.id === nodeId || l.target.id === nodeId)
          .flatMap((l) => [l.source.id, l.target.id])
      );

      node.style("opacity", (d) => (connectedNodes.has(d.id) ? 1 : 0.2));
      link.style("opacity", (l) => (l.source.id === nodeId || l.target.id === nodeId ? 1 : 0.2));

      // Zoom to node position
      const scale = 2; // Adjust zoom level
      svg.transition()
        .duration(500)
        .call(
          zoom.transform,
          d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(scale)
            .translate(-targetNode.x, -targetNode.y)
        );
    };

    if (selectedNode) zoomToNode(selectedNode);
  }, [graphData, resetGraph, selectedNode]);

  return <svg ref={svgRef} width={1200} height={800} style={{ border: "1px solid #ddd" }}></svg>;
};

export default KnowledgeGraph;
