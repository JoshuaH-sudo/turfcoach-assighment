import { NextFunction, Request, Response } from "express"
import Activity, { Schedule_activity } from "../models/activity"

import debug from "debug"
import moment from "moment"
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

    const overlapping_activity = await check_overlapping_date(data)
    if (overlapping_activity) {
      res.status(409).send({
        message: "Another activity on this pitch occurs at the same time.",
      })
      return
    }
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

    const overlapping_activity = await check_overlapping_date(data, _id)
    if (overlapping_activity) {
      res.status(409).send({
        message: "Another activity on this pitch occurs at the same time.",
      })
      return
    }
    const updated_activity = await Activity.findByIdAndUpdate(_id, data)

    res.status(200).send(updated_activity)
  } catch (error) {
    next(error)
  }
}

const check_overlapping_date = async (data: Schedule_activity, _id?: string) => {
  if (_id) {
    const doc = await Activity.findById(_id)
    if (!doc) throw "Could not find document with provided id"
    //Check if activity on this pitch is already in use.
    return await Activity.findOne({
      _id: {
        $ne: doc._id,
      },
      pitch: data.pitch,
      start_date: {
        // Assuming that the exact time and date needs to be check, as no requirement to set an end date was asked.
        // Check if an activity starts at the same time.
        $gte: moment(data.end_date).toDate(),
      },
      end_date: {
        $lte: moment(data.start_date).toDate(),
      }
    })
  }

  //Check if activity on this pitch is already in use.
  return await Activity.findOne({
    pitch: data.pitch,
    start_date: {
      // Assuming that the exact time and date needs to be check, as no requirement to set an end date was asked.
      // Check if an activity starts at the same time.
      $gte: moment(data.start_date).toDate(),
    },
    end_date: {
      $lte: moment(data.end_date).toDate(),
    },
  })
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

    res.status(200).send()
  } catch (error) {
    next(error)
  }
}
