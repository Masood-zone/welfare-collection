import { Router } from "express";
import * as user from "../../../controllers/user.controller";
import { validatePayload } from "../../../middlewares/validate-payload";

const userRoute = Router();

// Add routes for user management here
userRoute.post("/signUp", 
    validatePayload("User"), 
    user.signUp
);

userRoute.get("/", 
    user.fetchUsers
);

userRoute.get("/getByEmail", 
    user.fetchUserByEmail
);

userRoute.get("/:id", 
    user.fetchUserById
);

userRoute.put("/:id", 
    user.updateUser
);

userRoute.delete("/:id", 
    user.deleteUser
);

export default userRoute;