import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../Utils/AuthUtils';
import { AuthenticatedRequest } from './type';

export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];
  
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, '4b3e57d1b12e9837c9f7e4a2f9b8e6c7d1e5b9f3a4c8d7f6e2b3c4f5');
      req.user = decoded; // Assign the decoded token to req.user
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };