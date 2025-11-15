import axios from "axios";

export async function fetchProblemDetails(problemId) {
  try {
    const res = await axios.get(`http://localhost:3002/api/v1/problems/${problemId}`);
    return res.data.data; 
  } catch (err) {
    console.error("Error fetching problem details:", err.response?.data || err.message);
    throw new Error("Failed to fetch problem details");
  }
}
