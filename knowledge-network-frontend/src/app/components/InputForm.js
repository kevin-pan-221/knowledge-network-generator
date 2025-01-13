"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const InputForm = () => {
  const [userInput, setUserInput] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/generate_graph", {
        user_input: userInput,
      });

      const dataString = encodeURIComponent(JSON.stringify(response.data));
      router.push(`/graph?data=${dataString}`);
    } catch (error) {
      console.error("Error generating graph:", error);
      alert("Failed to generate the graph. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="userInput">Enter text (comma-separated):</label>
      <textarea
        id="userInput"
        rows="4"
        cols="50"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      ></textarea>
      <br />
      <button type="submit">Generate Knowledge Network</button>
    </form>
  );
};

export default InputForm;