import { NextResponse } from "next/server";
import connectDB from "@/DBConnect/config";
import { uploadOnCloudinary } from "@/cloudinary/cloudinary";
import fs from "fs";
import path from "path";
import User from "@/model/user"; // You need to define this schema

connectDB();

export async function POST(req) {
  try {
    const formData = await req.json();

    // const imageFile = formData.get("image");
    const {
      name,
      email,
      wpNumber,
      college,
      year,
      know,
      scNumber,
      password,
      otherCollege,
      image,
    } = formData;

    // let imageUrl = "";

    // if (user.college !== "MANIT" && imageFile) {
    //   const uploadResult = await uploadOnCloudinary(req.file.path);
    //   fs.unlinkSync(req.file.path); // cleanup
    // }

    // user.image = imageUrl;
    console.log(name,email,wpNumber,college,year,know,scNumber,password,otherCollege ,image )
    const savedUser = new User({
      name,
      email,
      wpNumber,
      college,
      year,
      know,
      scNumber,
      password,
      otherCollege,
      image
    });
    await savedUser.save();

    return NextResponse.json(
      { message: "Registration successful", data: savedUser },
      { status: 201 }
    );
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { message: "Registration failed", error: err.message },
      { status: 500 }
    );
  }
}
