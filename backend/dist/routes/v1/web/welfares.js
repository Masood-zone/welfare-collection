"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const welfares_controller_1 = require("../../../controllers/welfares.controller");
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const welfare_validations_1 = require("../../../middleware/validations/welfare.validations");
const validations_middleware_1 = require("../../../middleware/validations/validations.middleware");
const welfareProgramRoutes = (0, express_1.Router)();
welfareProgramRoutes.get("/", auth_middleware_1.authenticateUser, welfares_controller_1.getAllWelfarePrograms);
welfareProgramRoutes.post("/", auth_middleware_1.authenticateAdmin, (0, validations_middleware_1.validateRequest)(welfare_validations_1.createWelfareProgramSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, welfares_controller_1.createWelfareProgram)(req, res, next);
    }
    catch (error) {
        next(error);
    }
}));
welfareProgramRoutes.get("/:id", auth_middleware_1.authenticateUser, welfares_controller_1.getWelfareProgramById);
welfareProgramRoutes.patch("/:id", auth_middleware_1.authenticateAdmin, (0, validations_middleware_1.validateRequest)(welfare_validations_1.updateWelfareProgramSchema), welfares_controller_1.updateWelfareProgram);
welfareProgramRoutes.get("/:id/totals", auth_middleware_1.authenticateAdmin, welfares_controller_1.getWelfareProgramTotals);
welfareProgramRoutes.get("/:id/expenses", auth_middleware_1.authenticateAdmin, welfares_controller_1.getWelfareProgramExpenses);
welfareProgramRoutes.delete("/:id", auth_middleware_1.authenticateAdmin, welfares_controller_1.deleteWelfareProgram);
exports.default = welfareProgramRoutes;
