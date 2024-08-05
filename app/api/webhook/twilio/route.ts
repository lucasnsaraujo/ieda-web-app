import { generateQuestionnaireJson } from "@/lib/ai";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

type Line = {
  id: number;
  created_at: string;
  text: string;
  user: string;
  c_id: string;
};

export async function POST(req: Request) {
  const body = await req.json();

  console.log(body);
  console.log(req);

  return new NextResponse(null, { status: 200 });
}
