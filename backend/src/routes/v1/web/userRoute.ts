import { Router } from "express";
import * as user from "../../../controllers/user.controller";
import { validatePayload } from "../../../middlewares/validate-payload";

const userRoute = Router();

// Add routes for user management here
userRoute.post("/signUp", 
    validatePayload("User"), 
    user.signUp
);


export default userRoute;