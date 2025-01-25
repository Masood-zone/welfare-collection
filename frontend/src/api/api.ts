import axios from "axios";
const user = localStorage.getItem("user");
const token = user ? JSON.parse(user).token : "";

export const api = axios.create({
  // baseURL: "http://localhost:8080/api/v1/web",
  // baseURL: "https://welfare-backend.onrender.com/api/v1/web",
  baseURL: "https://welfare-backend.onrender.com/api/web",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
