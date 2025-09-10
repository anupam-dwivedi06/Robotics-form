import { NextResponse } from "next/server";
import connectDB from "@/DBConnect/config";
import User from "@/model/user";

await connectDB();

export async function POST(req) {
  try {
    const formData = await req.json();
    
    // This endpoint should only handle non-MANIT students
    if (formData.college === 'MANIT') {
      return NextResponse.json(
        { success: false, message: "MANIT students should use the login endpoint for ERP verification" }, 
        { status: 400 }
      );
    }
    
    // For non-MANIT students, ensure scNumber and password are not provided/stored
    const { scNumber, password, ...cleanData } = formData;
    const savedUser = new User(cleanData);
    await savedUser.save();
    return NextResponse.json({ success: true, data: savedUser }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}