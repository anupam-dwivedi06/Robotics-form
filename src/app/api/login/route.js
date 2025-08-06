import { NextResponse } from "next/server";
import connectDB from "@/DBConnect/config";
import axios from "axios";
import https from "https";
import formidable from 'formidable';
import dotenv from "dotenv";
import User from "@/model/user"; // You need to define this schema

dotenv.config(); // ✅ Load env vars

await connectDB();

export async function POST(req) {
  try {
    console.log("Run")


    const body = await req.json();
    console.log(body);
    const {
      name,
      email,
      wpNumber,
      college,
      year,
      know,
      scNumber,
      password,
      otherCollege
    } = body;
   
    // const {scNumber , password} = formData ;
    console.log("Received credentials:", scNumber, password);
    if (!scNumber || !password) {
      return NextResponse.json(
        { message: "scNumber and password required" },
        { status: 401 }
      );
    }

    

    const agent = new https.Agent({ rejectUnauthorized: false });

    try {
      console.log("Chala hai")
      const response = await axios.post(
        `https://erpapi.manit.ac.in/api/login`,
        { username: scNumber, password: password },
        {
          httpsAgent: agent,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response)

      if (response) {
        try {
          const user = new User({
            name,
            email,
            wpNumber,
            college,
            year,
            know,
            scNumber,
            password,
            otherCollege,
          });
          console.log(user)
          await user.save();
          console.log(response);
          return NextResponse.json(
            { message: "Login successful", user },
            { status: 200 }
          );
        } catch (error) {
          console.log(error.message);
        }
      }
    } catch (error) {
      console.error("Failed in ERP Login:", error.message);
      return NextResponse.json(
        { message: "ERP Login Failed", error: error.message },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error", error: error.message||"Error" },
      { status: 499 }
    );
  }
}
