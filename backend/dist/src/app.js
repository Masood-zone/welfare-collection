"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const app_error_1 = require("./utils/app-error");
const error_middleware_1 = require("./middleware/errors/error.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use("/api", routes_1.default);
// Handle unmatched routes
app.use((req, res, next) => {
    next(new app_error_1.AppError("Route not found", 404));
});
// Error handling middleware
app.use((err, req, res, next) => {
    (0, error_middleware_1.errorHandler)(err, req, res, next);
});
exports.default = app;
