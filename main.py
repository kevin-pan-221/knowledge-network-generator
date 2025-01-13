from embedding_utils import generate_embedding_map
from knowledge_network import Node, KN

def create_KN(all_names):
    embedding_map = generate_embedding_map(all_names)
    nodes = [Node(name, "", embedding) for name, embedding in embedding_map.items()]
    knowledge_network = KN(nodes)
    return knowledge_network

if __name__ == "__main__":
    all_names = ["covid-19", "Coronavirus infection", "high fever", "Tumor of posterior wall of oropharynx"]
    knowledge_network = create_KN(all_names)
    knowledge_network.display_connections()
    knowledge_network.display_graphically()