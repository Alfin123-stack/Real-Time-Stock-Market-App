// app/api/send-welcome/route.ts
import { sendWelcomeEmail } from "@/lib/nodemailer";

export async function POST(req: Request) {
  const { email, name, intro } = await req.json();

  await sendWelcomeEmail({ email, name, intro });
  return Response.json({ success: true });
}
