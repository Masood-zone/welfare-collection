"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 8080;
const httpServer = http_1.default.createServer(app_1.default);
httpServer.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map