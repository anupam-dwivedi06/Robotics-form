import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { uploadOnCloudinary } from "@/cloudinary/cloudinary";

// Best practice: Use process.cwd() for root path in Next.js
// And ensure the directory exists before attempting to write.
const UPLOAD_DIR = "/temp"; 

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("image"); // Get the file directly using its name 'file' from formData

    

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded." },
        { status: 400 }
      );
    }

    // Ensure UPLOAD_DIR exists
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true }); // recursive: true creates parent directories if they don't exist
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name; // Use the original file name from the File object
    const filePath = path.join(UPLOAD_DIR, fileName);

    fs.writeFileSync(filePath, buffer);

    // Upload to Cloudinary
    const imageUri = await uploadOnCloudinary(filePath);

    // Optional: Delete the local file after successful upload to Cloudinary
    // fs.unlinkSync(filePath); // Uncomment this line if you don't need local storage

    return NextResponse.json(
      {
        success: true,
        name: fileName,
        cloudinary_uri: imageUri.url, // Assuming imageUri is an object with a 'url' property
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { success: false, message: "File upload failed.", error: error.message },
      { status: 500 }
    );
  }
}