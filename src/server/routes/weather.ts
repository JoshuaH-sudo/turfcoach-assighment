import express from "express";
import { get_weather } from "../controllers/weather";
const router = express.Router()

router.get("/", get_weather)

export default router
