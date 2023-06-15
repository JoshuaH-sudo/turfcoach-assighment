import mongoose from "mongoose"

// The pitches the tasks can be preformed on
const pitch_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

const Pitch = mongoose.model("Pitch", pitch_schema)

export default Pitch
