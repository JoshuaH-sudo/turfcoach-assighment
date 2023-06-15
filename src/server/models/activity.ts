import mongoose from "mongoose"

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
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  pitch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pitch",
    required: true
  }
})

const Activity = mongoose.model("Activity", activity_schema)

export default Activity
