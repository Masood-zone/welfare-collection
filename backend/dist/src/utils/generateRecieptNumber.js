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
const db_1 = __importDefault(require("../config/db"));
/**
 * Generates a random 6-digit number as a string.
 */
const generateReceiptNumber = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Ensures 6 digits
};
const generateUniqueReceiptNumber = () => __awaiter(void 0, void 0, void 0, function* () {
    let receiptNumber = "";
    let isUnique = false;
    while (!isUnique) {
        receiptNumber = generateReceiptNumber();
        const existingPayment = yield db_1.default.payment.findUnique({
            where: { receiptNumber },
        });
        if (!existingPayment) {
            isUnique = true;
        }
    }
    return receiptNumber;
});
exports.default = generateUniqueReceiptNumber;
