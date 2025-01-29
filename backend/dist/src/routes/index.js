"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subRouter_1 = __importDefault(require("./v1/subRouter"));
const appRouter = (0, express_1.Router)();
appRouter.get("/", (req, res) => {
    res.send("Hello from App");
});
appRouter.use("/v1", subRouter_1.default);
// Import routes
exports.default = appRouter;
