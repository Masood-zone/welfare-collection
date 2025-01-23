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
exports.getAllAnalytics = void 0;
const app_error_1 = require("../utils/app-error");
const db_1 = __importDefault(require("../config/db"));
const getAllAnalytics = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [recentPayments, totalRevenue, totalMembers, totalEnrollments, totalWelfares, monthlyPayments, weeklyPayments, dailyPayments,] = yield Promise.all([
            db_1.default.payment.findMany({
                take: 10,
                orderBy: { paymentDate: "desc" },
                include: { user: true, welfareProgram: true },
            }),
            db_1.default.payment.aggregate({ _sum: { amount: true } }),
            db_1.default.user.count({ where: { role: "MEMBER" } }),
            db_1.default.enrollment.count(),
            db_1.default.welfareProgram.count(),
            db_1.default.$queryRaw `
        SELECT DATE_TRUNC('month', "paymentDate") as month, SUM(amount) as total
        FROM "Payment"
        GROUP BY DATE_TRUNC('month', "paymentDate")
        ORDER BY month DESC
        LIMIT 12
      `,
            db_1.default.$queryRaw `
        SELECT DATE_TRUNC('week', "paymentDate") as week, SUM(amount) as total
        FROM "Payment"
        WHERE "paymentDate" >= NOW() - INTERVAL '4 weeks'
        GROUP BY DATE_TRUNC('week', "paymentDate")
        ORDER BY week DESC
      `,
            db_1.default.$queryRaw `
        SELECT DATE_TRUNC('day', "paymentDate") as day, SUM(amount) as total
        FROM "Payment"
        WHERE "paymentDate" >= NOW() - INTERVAL '30 days'
        GROUP BY DATE_TRUNC('day', "paymentDate")
        ORDER BY day DESC
      `,
        ]);
        res.status(200).json({
            recentPayments,
            totalRevenue: totalRevenue._sum.amount,
            totalMembers,
            totalEnrollments,
            totalWelfares,
            monthlyPayments,
            weeklyPayments,
            dailyPayments,
        });
    }
    catch (error) {
        next(new app_error_1.AppError("Error fetching analytics data", 500));
    }
});
exports.getAllAnalytics = getAllAnalytics;
