import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "9fb$3Kf&b9x!q3Nv2sTz5@vQ6mC*wX1h";

// Extend Request type to include `user`
interface AuthenticatedRequest extends Request {
  user?: { id: string; role: string; exp: number };
}

export const authenticateUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Access token is missing or invalid" });
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      id: string;
      role: string;
      exp: number;
    };

    // Check if token has expired
    if (Date.now() >= payload.exp * 1000) {
      res.status(401).json({ error: "Token has expired" });
      return;
    }

    req.user = payload; // Attach user data to the request object
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Middleware to check admin role
export const authenticateAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  authenticateUser(req, res, (err) => {
    if (err) {
      next(err);
      return;
    }
    if (req.user?.role !== "ADMIN") {
      res.status(403).json({ error: "Access denied: Admins only" });
      return;
    }
    next();
  });
};
