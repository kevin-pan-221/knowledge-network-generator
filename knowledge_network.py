import numpy as np
import networkx as nx
import matplotlib.pyplot as plt
from typing import List
from embedding_utils import get_cos_sim

class Node:
    def __init__(self, name: str = "", _type: str = "", embedding: np.ndarray = None):
        self.name = name
        self._type = _type
        self.embed = embedding if embedding is not None else np.zeros(768)
        self.connections = {} 

    def connect(self, other: 'Node', strength: float):
        self.connections[other] = strength
        other.connections[self] = strength

    def __repr__(self):
        connections_info = {node.name: strength for node, strength in self.connections.items()}
        return f"Node: {self.name}, Type: {self._type}, connections: {connections_info}"

class KN:
    def __init__(self, nodes: List[Node] = None, threshold: float = 0.5):
        self.nodes = nodes if nodes is not None else []
        self.threshold = threshold
        self.connect_all_nodes()

    def add_node(self, node: Node):
        for existing_node in self.nodes:
            strength = get_cos_sim(node.embed, existing_node.embed)
            node.connect(existing_node, strength)
        self.nodes.append(node)

    def connect_all_nodes(self):
        for i, node in enumerate(self.nodes):
            for j in range(i + 1, len(self.nodes)):
                strength = get_cos_sim(node.embed, self.nodes[j].embed)
                node.connect(self.nodes[j], strength)

    def display_connections(self):
        for node in self.nodes:
            connections = {connected_node.name: round(strength, 2) for connected_node, strength in node.connections.items()}
            print(f"Node {node.name} connections: {connections}")

    def display_graphically(self):
        import networkx as nx 
        import matplotlib.pyplot as plt 
    
        G = nx.Graph()
    
        for node in self.nodes:
            G.add_node(node.name, label=node._type)
    
        for node in self.nodes:
            for connected_node, strength in node.connections.items():
                G.add_edge(node.name, connected_node.name, weight=strength)
    
        edges = G.edges(data=True)
        edge_colors = ["green" if attr["weight"] > self.threshold else "gray" for _, _, attr in edges]
        edge_weights = [attr["weight"] * 2 for _, _, attr in edges]
    
        pos = nx.spring_layout(G, weight='weight', scale=2, seed=42)
    
        plt.figure(figsize=(12, 8))
    
        nx.draw_networkx_nodes(G, pos, node_size=700, node_color="skyblue")
        nx.draw_networkx_labels(G, pos, font_size=10)
    
        nx.draw_networkx_edges(G, pos, edge_color=edge_colors, width=edge_weights)
    
        green_patch = plt.Line2D([0], [0], color="green", lw=2, label="Strong Connection")
        gray_patch = plt.Line2D([0], [0], color="gray", lw=2, label="Weak Connection")
        plt.legend(handles=[green_patch, gray_patch])
    
        plt.title("Knowledge Network Graph with Connection Strengths")
        plt.show()