from flask import Flask, request, jsonify
from flask_cors import CORS
from embedding_utils import generate_embedding_map
from knowledge_network import Node, KN
import numpy as np
import torch
from transformers import AutoTokenizer, AutoModel
from tqdm.auto import tqdm
from typing import List, Dict
from main import create_KN

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# Flask Routes
@app.route("/api/generate_graph", methods=["POST"])
def generate_graph():
    try:
        # Get user input from the frontend
        data = request.json
        all_names = [name.strip() for name in data.get("user_input", "").split(",")]

        if not all_names:
            return jsonify({"error": "Invalid input. Please provide a comma-separated list of names."}), 400

        # Create the Knowledge Network
        knowledge_network = create_KN(all_names)

        # Convert the Knowledge Network to a format suitable for the frontend
        nodes = [{"id": node.name} for node in knowledge_network.nodes]
        links = [
            {"source": node.name, "target": connected_node.name, "weight": float(strength)}
            for node in knowledge_network.nodes
            for connected_node, strength in node.connections.items()
        ]

        return jsonify({"nodes": nodes, "links": links}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)