import { NextFunction, Request, Response } from "express"
import Activity, { Schedule_activity } from "../models/activity"

import debug from "debug"
const debug_log = debug("app:schedule_controller:debug")
const error_log = debug("app:schedule_controller:error")

export const get_activities = async (
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

export const create_activity = async (
  req: Request<{}, {}, { data: Schedule_activity }, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    debug_log("Scheduling new activity")
    const { data } = req.body

    const new_activity = await new Activity(data).save()

    res.status(201).send(new_activity)
  } catch (error) {
    next(error)
  }
}

export const edit_activity = async (
  req: Request<{ _id: string }, {}, { data: Schedule_activity }, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    debug_log("Edit scheduled activity")

    const { data } = req.body
    const { _id } = req.params

    const updated_activity = await Activity.findByIdAndUpdate(_id, data)

    res.status(200).send(updated_activity)
  } catch (error) {
    next(error)
  }
}

export const delete_activity = async (
  req: Request<{ _id: string }, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    debug_log("Deleting scheduled activity")

    const { _id } = req.params

    await Activity.findByIdAndDelete(_id)

    res.status(200)
  } catch (error) {
    next(error)
  }
}
