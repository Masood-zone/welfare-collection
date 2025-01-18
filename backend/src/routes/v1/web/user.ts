import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/list", (req, res) => {
  res.json({ message: "Users list endpoint" });
});

userRoutes.post("/register", (req, res) => {
  res.json({ message: "Register endpoint" });
});

export default userRoutes;
