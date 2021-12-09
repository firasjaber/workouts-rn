import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const auth = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(' ')[1];
  if (token) {
    jwt.verify(token, 'topsecret', (error, decoded) => {
      if (error) {
        return res.status(404).json({
          message: 'Token is not valid',
        });
      } else {
        res.locals.user = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      message: 'No Token, authorization denied',
      success: false,
    });
  }
};

export default auth;
