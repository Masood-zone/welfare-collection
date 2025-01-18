import { Router } from "express";
import {
  registerUser,
  loginUser,
  updateUserData,
  adminRegisterUser,
  getAllAdmins,
  getAllMembers,
} from "../../../controllers/users.controller";
import {
  authenticateAdmin,
  authenticateUser,
} from "../../../middleware/auth.middleware";

const userRoutes = Router();

// Admin Routes
userRoutes.post("/admin/register", async (req, res, next) => {
  try {
    await adminRegisterUser(req, res, next);
  } catch (error) {
    next(error);
  }
});
// User Routes
userRoutes.post("/register", registerUser);
userRoutes.post("/login", async (req, res, next) => {
  try {
    await loginUser(req, res, next);
  } catch (error) {
    next(error);
  }
});
// List all users routes
userRoutes.get("/admin/list", authenticateAdmin, async (req, res, next) => {
  try {
    await getAllAdmins(req, res, next);
  } catch (error) {
    next(error);
  }
});
userRoutes.get("/list", authenticateUser, async (req, res, next) => {
  try {
    await getAllMembers(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Update user data route
userRoutes.patch("/update/:id", authenticateUser, async (req, res, next) => {
  try {
    await updateUserData(req, res, next);
  } catch (error) {
    next(error);
  }
});
export default userRoutes;
