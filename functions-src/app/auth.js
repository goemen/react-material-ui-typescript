import { bearerToken } from 'express-bearer-token';
import * as admin from 'firebase-admin';

export const authenticate = async (req, res, next) => {
  const token = req.token;
  const noAuthMessage = 'User not authenticated';
  if (!token) {
     next({error: true, message: noAuthMessage});
  } else {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token, true);
      const user = await admin.auth().getUser(decodedToken.uid);
      if (!user) {
        next({error: true, message: noAuthMessage});
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  } 
}

export const administratorsOnly = (req, res, next) => {
  if (req.user && req.user.customClaims.admin) {
    next();
  } else {
    next({error: true, message: 'Not authorized.'});
  }
}