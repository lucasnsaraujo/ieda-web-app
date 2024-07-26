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

  let data;

  const { call_id, transcripts } = body;

  const transcription = String(
    transcripts.map((line: Line) => `${line.user}: ${line.text}`).join("\n")
  );

  try {
    const interviewee = await db.interviewee.create({ data: {} });

    const call = await db.call.create({
      data: {
        callId: call_id,
        data: body,
        transcription: transcription,
        intervieweeId: interviewee.id,
      },
    });

    const structuredData = await generateQuestionnaireJson(transcription);

    data = structuredData;

    await db.answers.create({
      data: {
        data: structuredData,
        callId: call.id,
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(`Webhook error: ${JSON.stringify(error)}`, {
      status: 400,
    });
  }

  return new NextResponse(data, { status: 200 });
}
