"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./middlewares/errorHandler");
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4500;
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
app.use("/api", routes_1.default);
app.use(errorHandler_1.ErrorHandler);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
