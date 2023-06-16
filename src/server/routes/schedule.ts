import express from "express";
import { schedule_new_activity, get_schedule } from "../controllers/schedule";
const router = express.Router()

router.get("/", get_schedule)

router.post("/", schedule_new_activity)

export default router

