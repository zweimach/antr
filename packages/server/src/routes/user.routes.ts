import { Router } from "express";

import { UserController } from "../controllers";

const router = Router();

router.get("/user", UserController.getAllUsers);

router.get("/user/:id", UserController.getUser);

router.post("/user", UserController.addUser);

router.put("/user", UserController.updateUser);

router.delete("/user/:id", UserController.deleteUser);

export default router;
