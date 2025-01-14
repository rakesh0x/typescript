import  {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv"
dotenv.config();


interface User {
    username: String,
    password: String
}


declare global {
    namespace Express {
      interface Request {
        user?: User;
      }
    }
  }
  
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.cookies.token
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        res.status(401).json({message: "Access denied. No token Provided"});
        return;
    }

    try {
        const secretKey = process.env.JWT_SECRET || "RakeshLovescharu";
        const decoded = jwt.verify(token, secretKey) as User;

        req.cookies = decoded;
        next();
    } catch(error) {
        res.json(403).json({message: "Invalid token"})
    }
}