import express from "express";
import { addActivity } from "../UtilitiFunctions/extra.js";

const router = express.Router();
router.post("/", addActivity);

export default router;
