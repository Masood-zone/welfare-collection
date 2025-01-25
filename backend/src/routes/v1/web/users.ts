import { Router } from "express";
import * as user from "../../../controllers/users.controller";
import {
  authenticateAdmin,
  authenticateUser,
} from "../../../middleware/auth.middleware";

const userRoutes = Router();

// Admin Routes
userRoutes.post("/admin/register", user.adminRegisterUser);

// User Routes
userRoutes.post("/register", async (req, res, next) => {
  try {
    await user.registerUser(req, res, next);
  } catch (error) {
    next(error);
  }
});
userRoutes.post("/login", async (req, res, next) => {
  try {
    await user.loginUser(req, res, next);
  } catch (error) {
    next(error);
  }
});
// List all users routes
userRoutes.get("/admin/list", authenticateAdmin, async (req, res, next) => {
  try {
    await user.getAllAdmins(req, res, next);
  } catch (error) {
    next(error);
  }
});
userRoutes.get("/list", authenticateUser, async (req, res, next) => {
  try {
    await user.getAllMembers(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Get user info
userRoutes.get("/:id", authenticateUser, async (req, res, next) => {
  try {
    await user.getUserInfo(req, res, next);
  } catch (error) {
    next(error);
  }
});
// Delete user route
userRoutes.delete("/:id", authenticateAdmin, async (req, res, next) => {
  try {
    await user.deleteUser(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Update user data route
userRoutes.patch("/update/:id", authenticateUser, async (req, res, next) => {
  try {
    await user.updateUserData(req, res, next);
  } catch (error) {
    next(error);
  }
});
export default userRoutes;
