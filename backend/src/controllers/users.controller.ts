import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  createUser,
  deleteUserById,
  findUserByEmail,
  findUserById,
  findUsersByRole,
  updateUser,
} from "../helpers/user.helper";
import { AppError } from "../utils/app-error";

const JWT_SECRET = process.env.JWT_SECRET || "9fb$3Kf&b9x!q3";

// Admin controller functions
export const adminRegisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, phoneNumber } = req.body;

  try {
    const user = await createUser({
      name,
      email,
      password,
      phoneNumber,
      role: "ADMIN",
    });
    res.status(200).json({ message: "Admin registered successfully", user });
  } catch (error) {
    // res.status(500).json({ error: "Error registering admin", details: error });
    next(new AppError("Error registering admin", 500));
  }
};

// Get all admins
export const getAllAdmins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const admins = await findUsersByRole("ADMIN");
    const adminsWithoutPassword = admins.map((admin) => {
      return { ...admin, password: undefined };
    });
    res.status(200).json({ admins: adminsWithoutPassword });
  } catch (error) {
    // res.status(500).json({ error: "Error fetching admins", details: error });
    next(new AppError("Error fetching admins", 500));
  }
};

export const getAllMembers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const members = await findUsersByRole("MEMBER");
    const membersWithoutPassword = members.map((member) => {
      return { ...member, password: undefined };
    });
    res.json({
      members: membersWithoutPassword,
    });
  } catch (error) {
    // res.status(500).json({ error: "Error fetching members", details: error });
    next(new AppError("Error fetching members", 500));
  }
};

// User controller functions
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, phoneNumber } = req.body;

  try {
    const user = await createUser({ name, email, password, phoneNumber });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    // res.status(500).json({ error: "Error registering user", details: error });
    next(new AppError(`Error registering user ${error}`, 500));
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const expiresIn = "1d"; // Token expires in 1 day
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn,
    });

    const userWithoutPassword = { ...user, password: undefined };

    res.json({
      message: "Login successful",
      user: {
        ...userWithoutPassword,
        token,
        expiresIn,
      },
    });
  } catch (error) {
    // res.status(500).json({ error: "Error logging in user", details: error });
    next(new AppError("Error logging in user", 500));
  }
};

export const getUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;

  try {
    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userWithoutPassword = { ...user, password: undefined };

    res.json({
      user: userWithoutPassword,
    });
  } catch (error) {
    // res.status(500).json({ error: "Error fetching user", details: error });
    next(new AppError("Error fetching user", 500));
  }
};

export const updateUserData = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;
  const { name, email, phoneNumber, password } = req.body;

  try {
    const updatedData: {
      name?: string;
      email?: string;
      phoneNumber?: string;
      password?: string;
    } = {
      name,
      email,
      phoneNumber,
    };

    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await updateUser(userId, updatedData);
    res.json({
      message: "User data updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    // res
    //   .status(500)
    //   .json({ error: "Error updating user profile", details: error });
    next(new AppError("Error updating user profile", 500));
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;

  try {
    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    await deleteUserById(userId);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    // res.status(500).json({ error: "Error deleting user", details: error });
    next(new AppError("Error deleting user", 500));
  }
};
