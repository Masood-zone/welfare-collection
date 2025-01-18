import { Router } from "express";
import userRoutes from "./users";

const route = Router();

// Define feature-specific sub-routes
route.use("/user", userRoutes);
// route.use("/enrollments", enrollmentRoutes);
// route.use("/analytics", analyticsRoutes);
// route.use("/welfare-programs", welfareRoutes);
// route.use("/expenses", expensesRoutes);
// route.use("/payments", paymentsRoutes);
// route.use("/payment-tracker", paymentTrackerRoutes);

export default route;
