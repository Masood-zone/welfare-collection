import { Router } from "express";
import userRoutes from "./users";
import enrollmentRoutes from "./enrollments";
import analyticsRoutes from "./analytics";
import expenseRoutes from "./expenses";
import paymentRoutes from "./payments";
import paymentTrackerRoutes from "./payment-tracker";
import welfareProgramRoutes from "./welfares";

const route = Router();

// Define feature-specific sub-routes
route.use("/user", userRoutes);
route.use("/enrollments", enrollmentRoutes);
route.use("/welfare-programs", welfareProgramRoutes);
route.use("/analytics", analyticsRoutes);
route.use("/expenses", expenseRoutes);
route.use("/payments", paymentRoutes);
route.use("/payment-tracker", paymentTrackerRoutes);

export default route;
