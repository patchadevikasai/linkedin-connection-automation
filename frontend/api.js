import axios from "axios";

const API_URL = "http://127.0.0.1:5000/";

export const startAutomation = async (query, maxPages) => {
  try {
    const response = await axios.post(`${API_URL}start`, { query, max_pages: Number(maxPages) });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const cancelAutomation = async () => {
  try {
    const response = await axios.post(`${API_URL}cancel`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
