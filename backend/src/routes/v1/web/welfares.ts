import { Router } from "express";
import {
  createWelfareProgram,
  getAllWelfarePrograms,
  getWelfareProgramById,
  updateWelfareProgram,
  deleteWelfareProgram,
  getEnrolledWelfareProgramsByUserId,
} from "../../../controllers/welfares.controller";
import {
  authenticateAdmin,
  authenticateUser,
} from "../../../middleware/auth.middleware";
import {
  createWelfareProgramSchema,
  updateWelfareProgramSchema,
} from "../../../middleware/validations/welfare.validations";
import { validateRequest } from "../../../middleware/validations/validations.middleware";

const welfareProgramRoutes = Router();

welfareProgramRoutes.get("/", authenticateUser, getAllWelfarePrograms);
// Get user enrolled welfare programs
welfareProgramRoutes.get(
  "/enrolled/:id",
  authenticateUser,
  getEnrolledWelfareProgramsByUserId
);
welfareProgramRoutes.post(
  "/",
  authenticateAdmin,
  validateRequest(createWelfareProgramSchema),
  async (req, res, next) => {
    try {
      await createWelfareProgram(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);
welfareProgramRoutes.get("/:id", authenticateUser, getWelfareProgramById);
welfareProgramRoutes.patch(
  "/:id",
  authenticateAdmin,
  validateRequest(updateWelfareProgramSchema),
  updateWelfareProgram
);
welfareProgramRoutes.delete("/:id", authenticateAdmin, deleteWelfareProgram);

export default welfareProgramRoutes;
