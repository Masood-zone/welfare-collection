import { Router } from "express";
import {
  createWelfareProgram,
  getAllWelfarePrograms,
  getWelfareProgramById,
  updateWelfareProgram,
  deleteWelfareProgram,
} from "../../../controllers/welfares.controller";
import { authenticateAdmin } from "../../../middleware/auth.middleware";
import {
  createWelfareProgramSchema,
  updateWelfareProgramSchema,
} from "../../../middleware/validations/welfare.validations";
import { validateRequest } from "../../../middleware/validations/validations.middleware";

const welfareProgramRoutes = Router();

welfareProgramRoutes.get("/", authenticateAdmin, getAllWelfarePrograms);
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
welfareProgramRoutes.get("/:id", authenticateAdmin, getWelfareProgramById);
welfareProgramRoutes.patch(
  "/:id",
  authenticateAdmin,
  validateRequest(updateWelfareProgramSchema),
  updateWelfareProgram
);
welfareProgramRoutes.delete("/:id", authenticateAdmin, deleteWelfareProgram);

export default welfareProgramRoutes;
