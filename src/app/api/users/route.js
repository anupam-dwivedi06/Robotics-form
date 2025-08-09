import connectDB from "@/DBConnect/config";
import User from "@/model/user";

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({});
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
