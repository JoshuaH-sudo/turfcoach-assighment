import mongoose from "mongoose"

// The task performers / users
const user_schema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["John", "Tom", "Tony"],
    required: true,
  },
})

const User = mongoose.model("User", user_schema)

export default User
