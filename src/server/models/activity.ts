import mongoose from "mongoose"

// The pitches the tasks can be preformed on
const pitch_schema = new mongoose.Schema({
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

const Pitch = mongoose.model("Pitch", pitch_schema)

export default Pitch
