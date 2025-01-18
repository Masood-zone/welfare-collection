import { Router } from "express";
import {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
  approveEnrollment,
  getEnrollmentByUserId,
  rejectEnrollment,
} from "../../../controllers/enrollments.controller";
import {
  authenticateUser,
  authenticateAdmin,
} from "../../../middleware/auth.middleware";
import { validateRequest } from "../../../middleware/validations/validations.middleware";
import {
  createEnrollmentSchema,
  updateEnrollmentSchema,
} from "../../../middleware/validations/enrollment.validations";

const enrollmentRoutes = Router();

// CRUD routes
enrollmentRoutes.post(
  "/",
  authenticateUser,
  validateRequest(createEnrollmentSchema),
  createEnrollment
);
enrollmentRoutes.get("/", authenticateUser, getAllEnrollments);
enrollmentRoutes.get("/:id", authenticateUser, getEnrollmentById);
enrollmentRoutes.get("/user/:id", authenticateUser, getEnrollmentByUserId);
enrollmentRoutes.patch(
  "/:id",
  validateRequest(updateEnrollmentSchema),
  authenticateUser,
  updateEnrollment
);
enrollmentRoutes.delete("/:id", authenticateAdmin, deleteEnrollment);

// Approval route
enrollmentRoutes.patch("/approve/:id", authenticateAdmin, approveEnrollment);
// Rejection route
enrollmentRoutes.patch("/reject/:id", authenticateAdmin, rejectEnrollment);

export default enrollmentRoutes;
