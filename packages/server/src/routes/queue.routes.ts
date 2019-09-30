import { Router } from "express";

import { QueueController } from "../controllers";

const router = Router();

router.get("/queue", QueueController.getAllQueues);

router.get("/queue/:id", QueueController.getQueue);

router.post("/queue", QueueController.addQueue);

router.put("/queue", QueueController.updateQueue);

router.delete("/queue/:id", QueueController.deleteQueue);

export default router;
