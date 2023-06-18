import { Moment } from "moment"
import mongoose from "mongoose"
/**
 * @remarks The date object will be stored as a string allowing it to be parsed easier
 */
export interface Schedule_activity {
  type: string
  date: string
  user: string
  pitch: string
}

const activity_schema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["mowing", "fertilisation", "irrigation", "aeration"],
    required: true,
  },
  // Will hold the date and time of the activity
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: String,
    enum: ["john", "tom", "tony"],
    required: true,
  },
  pitch: {
    type: String,
    enum: ["pitch_1", "pitch_2", "pitch_3"],
    required: true,
  },
})

const Activity = mongoose.model("Activity", activity_schema)

export default Activity
