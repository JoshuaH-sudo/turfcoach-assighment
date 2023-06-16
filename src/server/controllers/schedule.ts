import { NextFunction, Request, Response } from "express"
import Activity, { Schedule_activity } from "../models/activity"

import debug from "debug"
const debug_log = debug("app:schedule_controller:debug")
const error_log = debug("app:schedule_controller:error")

export const get_schedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    debug_log("Getting schedule")
    const activities_list = await Activity.find()

    res.status(200).send(activities_list)
  } catch (error) {
    next(error)
  }
}

export const schedule_new_activity = async (
  req: Request<{}, {}, { data: Schedule_activity }, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    debug_log("Scheduling new activity")
    debug_log(req.body.data)
    const new_activity = await new Activity(req.body.data).save()

    res.status(201).send(new_activity)
  } catch (error) {
    next(error)
  }
}
