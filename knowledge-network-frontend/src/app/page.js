"use client";

import { useState } from "react";
import axios from "axios";
import KnowledgeGraph from "./components/KnowledgeGraph";
import NodeExplorer from "./components/NodeExplorer";
import { Box, TextField, Button, Typography, Slider } from "@mui/material";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [graphData, setGraphData] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [threshold, setThreshold] = useState(0.2); // Default threshold
  const [resetGraph, setResetGraph] = useState(false); // Trigger for recentering graph

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/generate_graph", {
        user_input: userInput,
      });

      const links = response.data.links;

      // Derive unique nodes from the links
      const uniqueNodes = Array.from(
        new Set(
          links.flatMap((link) => [link.source, link.target]) // Extract unique source and target
        )
      ).map((id) => ({ id })); // Create node objects with an `id` field

      setGraphData({ nodes: uniqueNodes, links });
      setSelectedNode(null); // Reset selection when a new graph is generated
    } catch (error) {
      console.error("Error generating graph:", error);
      alert("Failed to generate the graph. Please try again.");
    }
  };

  // Handle threshold slider change
  const handleThresholdChange = (event, newValue) => {
    setThreshold(newValue);
  };

  // Filter links based on the threshold
  const filteredGraphData = graphData
    ? {
        nodes: graphData.nodes,
        links: graphData.links.filter((link) => link.weight >= threshold),
      }
    : null;

  // Trigger recentering of the graph
  const handleRecenter = () => {
    setResetGraph(true);
    setTimeout(() => setResetGraph(false), 100); // Reset the trigger
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
      {/* Sidebar */}
      <NodeExplorer
        graphData={filteredGraphData}
        selectedNode={selectedNode}
        setSelectedNode={setSelectedNode}
        sx={{
          width: "20%",
          minWidth: "300px",
          borderRight: "1px solid #ddd",
          overflowY: "auto",
        }}
      />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Medical Knowledge Network Generator
        </Typography>

        {/* Threshold Slider */}
        <Box sx={{ width: "80%", marginBottom: "20px" }}>
          <Typography variant="body1" gutterBottom>
            Set Threshold for Linking Nodes: {threshold.toFixed(2)}
          </Typography>
          <Slider
            value={threshold}
            min={0}
            max={1}
            step={0.01}
            onChange={handleThresholdChange}
            valueLabelDisplay="auto"
          />
        </Box>

        {/* Recenter Button */}
        <Box sx={{ marginBottom: "20px" }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleRecenter}
          >
            Recenter Graph
          </Button>
        </Box>

        <Box
          sx={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid #3f51b5",
            width: "1000px", // Increased graph container width
            height: "800px", // Increased graph container height
          }}
        >
          {filteredGraphData ? (
            <KnowledgeGraph graphData={filteredGraphData} resetGraph={resetGraph} />
          ) : (
            <Typography variant="body1">Enter data below to generate a graph</Typography>
          )}
        </Box>

        {/* Input Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <TextField
            id="userInput"
            label="Enter text (comma-separated)"
            variant="outlined"
            multiline
            rows={4}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Generate Knowledge Network
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;