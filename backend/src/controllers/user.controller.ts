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


export const fetchUsers = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    const users = await userServices.getAllUsers()
    res.status(HttpStatus.OK).json({ users });
}
);


export const login = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    const { email, password } = req.body;
    const user = await userServices.signIn(email, password)
    res.status(HttpStatus.OK).json({message: "login successfully", user });
});


export const fetchUserByEmail = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    const { email } = req.body;
    const user = await userServices.getUserByEmail(email)
    res.status(HttpStatus.OK).json({ user });
});


export const fetchUserById = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    const { id } = req.params;
    const user = await userServices.getUserById(id)
    res.status(HttpStatus.OK).json({ user });
});


export const updateUser = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    const { id } = req.params;
    const data = req.body;
    const updatedUser = await userServices.updateUser(id, data)
    res.status(HttpStatus.OK).json({ updatedUser });
});


export const deleteUser = catchAsync(async(
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    const { id } = req.params;
    await userServices.deleteUser(id)
    res.status(HttpStatus.NO_CONTENT).end();
});

