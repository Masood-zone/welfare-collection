"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoute_1 = __importDefault(require("./userRoute"));
const webRouter = (0, express_1.Router)();
webRouter.use("/users", userRoute_1.default);
exports.default = webRouter;
