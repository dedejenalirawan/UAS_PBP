import express from "express";
import userController from "../controller/user-controller.js";
import carController from "../controller/car-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

// Car API
userRouter.post("/api/cars", carController.create);
userRouter.get("/api/cars/:carId", carController.get);
userRouter.put("/api/cars/:carId", carController.update);
userRouter.delete("/api/cars/:carId", carController.remove);
userRouter.get("/api/cars", carController.search);

export { userRouter };
