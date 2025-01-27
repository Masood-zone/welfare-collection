import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../utils/http-status";
import { userServices } from "../services/user.service";
import { catchAsync } from "../utils/catchAsync";


export const signUp = catchAsync(async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    const data = req.body;
    const user = await userServices.createUser(data);
    res.status(HttpStatus.CREATED).json({ user });
});