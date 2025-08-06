import { NextResponse } from "next/server";
import connectDB from "@/DBConnect/config";
import User from "@/model/user";

await connectDB();

export async function POST(req) {
  try {
    const formData = await req.json();
    const savedUser = new User(formData);
    await savedUser.save();
    return NextResponse.json({ success: true, data: savedUser }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}