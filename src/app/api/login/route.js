import { NextResponse } from "next/server";
import connectDB from "@/DBConnect/config";
import User from "@/model/user";
import axios from "axios";
import https from "https";

await connectDB();

export async function POST(req) {
  try {
    const data = await req.json();
    const { scNumber, password } = data;

    if (!scNumber || !password) {
      return NextResponse.json(
        { message: "Scholar number and password required" },
        { status: 400 }
      );
    }

    // ERP API check
    const agent = new https.Agent({ rejectUnauthorized: false });
    const res = await axios.post(
      "https://erpapi.manit.ac.in/api/login",
      { username: scNumber, password },
      { httpsAgent: agent, headers: { "Content-Type": "application/json" } }
    );

    if (!res.data) {
      return NextResponse.json({ error: "ERP login failed" }, { status: 401 });
    }

    // Check for duplicate scholar number
    const existingUser = await User.findOne({ scNumber });
    if (existingUser) {
      return NextResponse.json(
        { message: "Scholar number already registered" },
        { status: 409 }
      );
    }

    // Save user
    const savedUser = new User(data);
    await savedUser.save();

    return NextResponse.json(
      { message: "User registered successfully", user: savedUser },
      { status: 201 }
    );

  } catch (err) {
    // Handle MongoDB duplicate key error
    if (err.code === 11000) {
      return NextResponse.json(
        { error: "Scholar number already registered" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}
