// import { NextFunction, Request, Response } from "express";
// import { Role } from "@prisma/client";

// export const authorize = (...roles: Role[]) => {
//   return (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     if (!req.user) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({
//         success: false,
//         message: "Forbidden",
//       });
//     }

//     next();
//   };
// };

import { NextFunction, Request, Response } from "express";
import { Role } from "@prisma/client";

export const authorize = (...roles: Role[]) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log("Required Roles:", roles);
    console.log("Logged-in User:", req.user);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    next();
  };
};