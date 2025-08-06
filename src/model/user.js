import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    wpNumber: String,
    college: String,
    year: String,
    know: String,
    scNumber: String,
    password: String,
    otherCollege: String,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
