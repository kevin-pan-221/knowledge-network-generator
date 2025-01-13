import { useState } from "react";
import { Box, TextField, Typography, List, ListItem, ListItemText, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NodeExplorer = ({ graphData, selectedNode, setSelectedNode }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const getAllNodes = () => {
    if (!graphData || !graphData.nodes) return [];
    return graphData.nodes.map((node) => node.id);
  };

  const getTopClosestNodes = () => {
    if (!graphData || !graphData.links || !selectedNode) return [];

    const uniqueLinks = new Map();

    graphData.links.forEach((link) => {
      const source = typeof link.source === "string" ? link.source : link.source.id;
      const target = typeof link.target === "string" ? link.target : link.target.id;

      const key = [source, target].sort().join("-");
      if (!uniqueLinks.has(key)) {
        uniqueLinks.set(key, { source, target, weight: link.weight });
      }
    });

    return Array.from(uniqueLinks.values())
      .filter((link) => link.source === selectedNode || link.target === selectedNode)
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 10);
  };

  const nodesToDisplay = selectedNode ? getTopClosestNodes() : getAllNodes();

  return (
    <Box
      sx={{
        width: "25%",
        padding: "20px",
        borderRight: "1px solid #ddd",
        overflowY: "auto",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Node Explorer
      </Typography>
      <TextField
        label="Search Nodes"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: "20px" }}
      />
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="body1" gutterBottom>
          {selectedNode
            ? `Closest Nodes to "${selectedNode}"`
            : "All Nodes (Select a root node)"}
        </Typography>
        {selectedNode && (
          <IconButton
            size="small"
            onClick={() => setSelectedNode(null)} 
            sx={{ marginLeft: "10px" }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
      </Box>
      <List>
        {nodesToDisplay
          .filter((item) => {
            const name = selectedNode
              ? item.source === selectedNode
                ? item.target
                : item.source
              : item;
            return name.toLowerCase().includes(searchTerm.toLowerCase());
          })
          .map((item, index) => {
            const displayName = selectedNode
              ? item.source === selectedNode
                ? item.target
                : item.source
              : item;

            return (
              <ListItem
                key={index}
                button={true.toString()} 
                onClick={() => setSelectedNode(displayName)}
              >
                <ListItemText
                  primary={
                    selectedNode
                      ? `${displayName} (${item.weight.toFixed(2)})`
                      : displayName
                  }
                />
              </ListItem>
            );
          })}
      </List>
    </Box>
  );
};

export default NodeExplorer;