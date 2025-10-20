import { connectDB } from "@/database/mongodb";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({
      success: true,
      message: "✅ MongoDB Connected!",
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    return NextResponse.json({
      success: false,
      message: "❌ Failed to connect MongoDB",
    });
  }
}
