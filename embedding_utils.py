import numpy as np 
import torch 
from tqdm.auto import tqdm 
from transformers import AutoTokenizer, AutoModel   
from typing import List, Union, Dict, Tuple
from scipy.spatial.distance import cosine 
import networkx as nx 
import matplotlib.pyplot as plt 

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
tokenizer = AutoTokenizer.from_pretrained("cambridgeltl/SapBERT-from-PubMedBERT-fulltext")  
model = AutoModel.from_pretrained("cambridgeltl/SapBERT-from-PubMedBERT-fulltext").to(device)

def generate_embedding_map(all_names: List[str], bs: int = 128) -> Dict[str, np.ndarray]:
    all_embs = {}
    for i in tqdm(range(0, len(all_names), bs)):
        toks = tokenizer.batch_encode_plus(
            all_names[i:i + bs],
            padding="max_length",
            max_length=25,
            truncation=True,
            return_tensors="pt"
        )
        
        toks_device = {k: v.to(device) for k, v in toks.items()}
        
        cls_rep = model(**toks_device)[0][:, 0, :]
        
        np_embeddings = cls_rep.cpu().detach().numpy()
        for name, embedding in zip(all_names[i:i + bs], np_embeddings):
            all_embs[name] = embedding
    
    return all_embs

def get_cos_sim(embed1, embed2):
    e1_norm = embed1 / np.linalg.norm(embed1)
    e2_norm = embed2 / np.linalg.norm(embed2)
    return np.dot(e1_norm, e2_norm)
    
def closest_embedding(root_s: str, s_to_embed: Dict[str, np.ndarray]) -> Tuple[str, np.ndarray]:
    root_embed = s_to_embed[root_s]
    
    closest_str = None
    closest_embedding = None
    max_similarity = -1  

    for string, embed in s_to_embed.items():
        if string == root_s:
            continue  

        similarity = get_cos_sim(root_embed, embed)

        if similarity > max_similarity:
            max_similarity = similarity
            closest_str = string
            closest_embedding = embed

    return closest_str, closest_embedding