"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const webRouter_1 = __importDefault(require("./web/webRouter"));
const v1Router = (0, express_1.Router)();
v1Router.use("/web", webRouter_1.default);
exports.default = v1Router;
