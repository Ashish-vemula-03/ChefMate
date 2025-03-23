import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // Change this if backend runs on a different port
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
