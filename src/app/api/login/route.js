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
      return NextResponse.json({ message: "Scholar number and password required" }, { status: 400 });
    }

    const agent = new https.Agent({ rejectUnauthorized: false });
    const res = await axios.post(
      "https://erpapi.manit.ac.in/api/login",
      { username: scNumber, password },
      { httpsAgent: agent, headers: { "Content-Type": "application/json" } }
    );

    if (!res.data) throw new Error("ERP login failed");

    const savedUser = new User(data);
    await savedUser.save();
    return NextResponse.json({ message: "Login success", user: savedUser });
  } catch (err) {
    return NextResponse.json({ message: "Login error", error: err.message }, { status: 500 });
  }
}