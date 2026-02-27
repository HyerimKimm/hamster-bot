import { NextResponse } from "next/server";

import type { Response } from "@/src/shared/type/response";
import { openai } from "@/src/shared/lib/openai";
import { GPTMessageType } from "@/src/shared/type/gpt";

export async function POST(
  req: Request,
): Promise<NextResponse<Response<string | null>>> {
  try {
    const { message, messageList = [] as GPTMessageType[] } = await req.json();

    const input = [
      ...messageList.map((item: GPTMessageType) => ({
        role: item.role,
        content: item.content,
      })),
      { role: "user", content: message },
    ];

    const response = await openai.responses.create({
      model: "gpt-4.1-mini", // 가성비 좋음
      input: input,
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
        message: `OpenAI 연결에 실패했습니다 : ${e}`,
        data: null,
      },
      { status: 500 },
    );
  }
}
