import { Router } from "express";
import * as welfares from "../../../controllers/welfares.controller";
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

welfareProgramRoutes.get("/", authenticateUser, welfares.getAllWelfarePrograms);

welfareProgramRoutes.post(
  "/",
  authenticateAdmin,
  validateRequest(createWelfareProgramSchema),
  async (req, res, next) => {
    try {
      await welfares.createWelfareProgram(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);
welfareProgramRoutes.get(
  "/:id",
  authenticateUser,
  welfares.getWelfareProgramById
);
welfareProgramRoutes.patch(
  "/:id",
  authenticateAdmin,
  validateRequest(updateWelfareProgramSchema),
  welfares.updateWelfareProgram
);
welfareProgramRoutes.get(
  "/:id/totals",
  authenticateAdmin,
  welfares.getWelfareProgramTotals
);
welfareProgramRoutes.get(
  "/:id/expenses",
  authenticateAdmin,
  welfares.getWelfareProgramExpenses
);
welfareProgramRoutes.delete(
  "/:id",
  authenticateAdmin,
  welfares.deleteWelfareProgram
);

export default welfareProgramRoutes;
