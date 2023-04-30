import { Router } from "express";
import { streamUtils } from "./controllers";

const router = Router();
router.use("/stream", streamUtils);

export default router;
