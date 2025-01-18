import { Router } from "express";
import {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
  approveEnrollment,
} from "../../../controllers/enrollments.controller";
import {
  authenticateUser,
  authenticateAdmin,
} from "../../../middleware/auth.middleware";

const enrollmentRoutes = Router();

// CRUD routes
enrollmentRoutes.post("/", authenticateUser, createEnrollment);
enrollmentRoutes.get("/list", authenticateAdmin, getAllEnrollments);
enrollmentRoutes.get("/:id", authenticateUser, getEnrollmentById);
enrollmentRoutes.patch("/:id", authenticateUser, updateEnrollment);
enrollmentRoutes.delete("/:id", authenticateAdmin, deleteEnrollment);

// Approval route
enrollmentRoutes.patch("/approve/:id", authenticateAdmin, approveEnrollment);

export default enrollmentRoutes;
