import axios from "axios";
const user = localStorage.getItem("user");
const userObj = user ? JSON.parse(user) : "";
const token = userObj ? userObj.token : "";

export const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/web",
  // baseURL: "https://welfare-backend.onrender.com/api/v1/web",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
