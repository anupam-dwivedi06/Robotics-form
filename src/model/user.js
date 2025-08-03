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
    image: String, // cloudinary URL or empty for MANIT
  },
  { timestamps: true }
);

export default mongoose.models.users || mongoose.model("users", userSchema);
