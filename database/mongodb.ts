import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

console.log("🔍 MONGODB_URI:", MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error(
    "❌ Please define the MONGODB_URI environment variable in .env.local"
  );
}

/**
 * Cache connection untuk menghindari multiple connection saat development
 * karena Next.js reload modul pada setiap perubahan file.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

/**
 * Fungsi koneksi yang bisa dipanggil di mana saja (API route, action, server component)
 */
export async function connectDB() {
  if (cached.conn) {
    // 🧠 Sudah ada koneksi aktif → langsung pakai cache
    return cached.conn;
  }

  if (!cached.promise) {
    // 🧩 Buat koneksi baru jika belum ada
    const opts = {
      bufferCommands: false,
      maxPoolSize: 5,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ MongoDB Connected");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }

  return cached.conn;
}
