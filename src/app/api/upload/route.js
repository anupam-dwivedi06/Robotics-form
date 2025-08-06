import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const { image } = await req.json();
    if (!image) return Response.json({ error: "No image provided" }, { status: 400 });

    const result = await cloudinary.uploader.upload(image, {
      folder: "nextjs_uploads",
    });

    return Response.json({ success: true, url: result.secure_url });
  } catch (err) {
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}