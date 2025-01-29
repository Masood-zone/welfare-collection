import { Request, Response, NextFunction } from "express";
import jwt  from "jsonwebtoken";
import HttpException from "./http-error";
import { HttpStatus } from "./http-status";


// Define the payload to handle both students and tutors
export interface UserPayload {
  id: string;
  role: 'admin' | 'member'
  
}

declare global {
  namespace Express {
    interface Request {
      User?: UserPayload; // User payload with role
    }
  }
}



export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        return next(
          new HttpException(HttpStatus.FORBIDDEN, "Invalid token")
        );
      }
      // Attach the user to the request based on role
      if (decoded && (decoded as UserPayload).role === "admin") {
        req.User = decoded as UserPayload;
      } else if (decoded && (decoded as UserPayload).role === "member") {
        req.User = decoded as UserPayload;
      }
      next();
    });
  } else {
    next(new HttpException(HttpStatus.FORBIDDEN, "No token found"));
  }

};

export const signToken = (payload: UserPayload): string => {
  const secret = process.env.JWT_SECRET!;
  if (!secret) {
    throw new HttpException(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "JWT configuration is missing"
    );
  }

  return jwt.sign(payload, secret, {
    expiresIn: "8hr"
  });
};






// Function to create a short-lived invalid token
export const setInvalidToken = (): string => {
  if (!process.env.JWT_SECRET) {
    throw new HttpException(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "JWT secret is missing"
    );
  }
  return jwt.sign({ logout: "logout" }, process.env.JWT_SECRET, {
    expiresIn: "30s",   // Short-lived token
  });
};


export const authorizeRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.User
    
    if (!user || !allowedRoles.includes(user.role)) {
      return next(new HttpException(HttpStatus.FORBIDDEN, "Access denied"));
    }

    next();
  };
};


