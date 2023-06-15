import mongoose from "mongoose"

// The pitches the tasks can be preformed on
const pitch_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

const Pitch = mongoose.model("Pitch", pitch_schema)

export const setup_pitch_collection = async () => {
  const count = await Pitch.countDocuments()

  if (count === 0) {
    return Promise.all([
      new Pitch({ name: "Pitch 1" }).save(),
      new Pitch({ name: "Pitch 2" }).save(),
      new Pitch({ name: "Pitch 3" }).save(),
    ])
  }

  return Promise.resolve()
}

export default Pitch
