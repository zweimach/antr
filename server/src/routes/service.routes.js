import { Router } from "express";

import { ServiceController } from "../controllers";

const router = Router();

router.get("/service", ServiceController.getAllServices);

router.get("/service/:id", ServiceController.getService);

router.post("/service", ServiceController.addService);

router.put("/service", ServiceController.updateService);

router.delete("/service/:id", ServiceController.deleteService);

export default router;
