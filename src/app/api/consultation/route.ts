import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ For now: log on server (Vercel function logs)
    console.log("Consultation Request:", body);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request payload" },
      { status: 400 }
    );
  }
}
