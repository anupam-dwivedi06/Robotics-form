import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    wpNumber: String,
    college: String,
    year: String,
    know: String,
    scNumber:{
      type: String,
      unique: true,
      sparse: true, // This allows multiple null/undefined values but ensures uniqueness for actual values
      required: false,
    },
    password:{
      type: String,
      required: false,
    },
    otherCollege: String,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
