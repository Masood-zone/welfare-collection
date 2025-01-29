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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePayload = void 0;
const allowedFields_json_1 = __importDefault(require("../../allowedFields.json"));
const http_status_1 = require("../utils/http-status");
const validatePayload = (model) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const modelFields = yield allowedFields_json_1.default.find((field) => field.modelName === model);
    const payload = req.body;
    const dataFields = Object.keys(payload);
    const unwantedFields = dataFields.filter((field) => !(modelFields === null || modelFields === void 0 ? void 0 : modelFields.fields.includes(field)));
    if (unwantedFields.length > 0) {
        res
            .status(http_status_1.HttpStatus.BAD_REQUEST)
            .json({
            message: "unwanted fields are not allowed",
            fields: unwantedFields,
        });
    }
    else {
        next();
    }
});
exports.validatePayload = validatePayload;
