import OpenAI from "openai";
import { NextResponse } from "next/server";

import type { Response } from "@/src/shared/type/response";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(
  req: Request,
): Promise<NextResponse<Response<string | null>>> {
  try {
    const { message } = await req.json();

    const response = await openai.responses.create({
      model: "gpt-4.1-mini", // 가성비 좋음
      input: message,
    });

    return NextResponse.json(
      {
        success: true,
        message: "OpenAI 연결에 성공했습니다.",
        data: response.output_text,
      },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      {
        success: false,
        message: "OpenAI 연결에 실패했습니다.",
        data: null,
      },
      { status: 500 },
    );
  }
}
