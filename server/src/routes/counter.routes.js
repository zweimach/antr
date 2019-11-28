import { Router } from "express";

import { CounterController } from "../controllers";

const router = Router();

router.get("/counter", CounterController.getAllCounters);

router.get("/counter/:id", CounterController.getCounter);

router.post("/counter", CounterController.addCounter);

router.put("/counter", CounterController.updateCounter);

router.delete("/counter/:id", CounterController.deleteCounter);

export default router;
