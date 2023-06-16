import express from "express"
import {
  create_activity,
  delete_activity,
  edit_activity,
  get_activities,
} from "../controllers/activity"
const router = express.Router()

router.get("/", get_activities)

router.post("/", create_activity)

router.put("/", edit_activity)

router.delete("/", delete_activity)

export default router
