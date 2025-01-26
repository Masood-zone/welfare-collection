import { Router } from "express";
import userRoutes from "./users";
import enrollmentRoutes from "./enrollments";
import analyticsRoutes from "./analytics";
import expenseRoutes from "./expenses";
import paymentRoutes from "./payments";
import paymentTrackerRoutes from "./payment-tracker";
import welfareProgramRoutes from "./welfares";

const webRoute = Router();

// Define feature-specific sub-routes
webRoute.use("/user", userRoutes);
webRoute.use("/welfare-programs", welfareProgramRoutes);
webRoute.use("/enrollments", enrollmentRoutes);
webRoute.use("/analytics", analyticsRoutes);
webRoute.use("/expenses", expenseRoutes);
webRoute.use("/payments", paymentRoutes);
webRoute.use("/payment-tracker", paymentTrackerRoutes);

export default webRoute;
