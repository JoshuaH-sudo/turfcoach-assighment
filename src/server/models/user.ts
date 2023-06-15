import mongoose from "mongoose"

// The task performers / users
const user_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

const User = mongoose.model("User", user_schema)

export const setup_user_collection = async () => {
  const count = await User.countDocuments()

  if (count === 0) {
    return Promise.all([
      await new User({ name: "John" }).save(),
      await new User({ name: "Tom" }).save(),
      await new User({ name: "Tony" }).save(),
    ])
  }

  return Promise.resolve()
}

export default User
