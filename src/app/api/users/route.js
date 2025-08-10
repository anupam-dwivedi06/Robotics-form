import connectDB from "@/DBConnect/config";
import User from "@/model/user";

export async function GET() {
  try {
    await connectDB();

    const users = await User.find({});
    const manit = await User.find({college: "MANIT"});
    const other = await User.find ({college:{ $ne: "MANIT" } });


    return new Response(
      JSON.stringify({ users, manit, other, manitCount: manit.length, otherCount: other.length}),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
