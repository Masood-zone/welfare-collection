import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";
import prisma from "../config/db";

export const getAllAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [
      recentPayments,
      totalRevenue,
      totalMembers,
      monthlyPayments,
      weeklyPayments,
      dailyPayments,
    ] = await Promise.all([
      prisma.payment.findMany({
        take: 10,
        orderBy: { paymentDate: "desc" },
        include: { user: true, welfareProgram: true },
      }),
      prisma.payment.aggregate({ _sum: { amount: true } }),
      prisma.user.count({ where: { role: "MEMBER" } }),
      prisma.$queryRaw`
        SELECT DATE_TRUNC('month', "paymentDate") as month, SUM(amount) as total
        FROM "Payment"
        GROUP BY DATE_TRUNC('month', "paymentDate")
        ORDER BY month DESC
        LIMIT 12
      `,
      prisma.$queryRaw`
        SELECT DATE_TRUNC('week', "paymentDate") as week, SUM(amount) as total
        FROM "Payment"
        WHERE "paymentDate" >= NOW() - INTERVAL '4 weeks'
        GROUP BY DATE_TRUNC('week', "paymentDate")
        ORDER BY week DESC
      `,
      prisma.$queryRaw`
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
      monthlyPayments,
      weeklyPayments,
      dailyPayments,
    });
  } catch (error) {
    next(new AppError("Error fetching analytics data", 500));
  }
};
