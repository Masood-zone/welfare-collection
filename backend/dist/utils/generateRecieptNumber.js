"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const generateReceiptNumber = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
const generateUniqueReceiptNumber = async () => {
    let receiptNumber = "";
    let isUnique = false;
    while (!isUnique) {
        receiptNumber = generateReceiptNumber();
        const existingPayment = await db_1.default.payment.findUnique({
            where: { receiptNumber },
        });
        if (!existingPayment) {
            isUnique = true;
        }
    }
    return receiptNumber;
};
exports.default = generateUniqueReceiptNumber;
//# sourceMappingURL=generateRecieptNumber.js.map