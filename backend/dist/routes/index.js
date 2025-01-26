"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const web_1 = __importDefault(require("./v1/web"));
const mainRouter = (0, express_1.Router)();
mainRouter.use("/web", web_1.default);
exports.default = mainRouter;
//# sourceMappingURL=index.js.map