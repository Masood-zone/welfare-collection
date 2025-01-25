import { Router } from "express";
import * as enrollments from "../../../controllers/enrollments.controller";
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
  async (req, res, next) => {
    try {
      await enrollments.createEnrollment(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);
enrollmentRoutes.get("/", authenticateAdmin, async (req, res, next) => {
  try {
    await enrollments.getAllEnrollments(req, res, next);
  } catch (error) {
    next(error);
  }
});
enrollmentRoutes.get("/:id", authenticateUser, async (req, res, next) => {
  try {
    await enrollments.getEnrollmentById(req, res, next);
  } catch (error) {
    next(error);
  }
});
enrollmentRoutes.get("/user/:id", authenticateUser, async (req, res, next) => {
  try {
    await enrollments.getEnrollmentByUserId(req, res, next);
  } catch (error) {
    next(error);
  }
});
enrollmentRoutes.patch(
  "/:id",
  validateRequest(updateEnrollmentSchema),
  authenticateUser,
  async (req, res, next) => {
    try {
      await enrollments.updateEnrollment(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);
enrollmentRoutes.delete("/:id", authenticateAdmin, async (req, res, next) => {
  try {
    await enrollments.deleteEnrollment(req, res, next);
  } catch (error) {
    next(error);
  }
});
// Re-submission route
enrollmentRoutes.patch(
  "/resubmit/:id",
  authenticateUser,
  async (req, res, next) => {
    try {
      await enrollments.resubmitEnrollment(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);
// Approval route
enrollmentRoutes.patch(
  "/approve/:id",
  authenticateAdmin,
  async (req, res, next) => {
    try {
      await enrollments.approveEnrollment(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);
// Rejection route
enrollmentRoutes.patch(
  "/reject/:id",
  authenticateAdmin,
  async (req, res, next) => {
    try {
      await enrollments.rejectEnrollment(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

export default enrollmentRoutes;
