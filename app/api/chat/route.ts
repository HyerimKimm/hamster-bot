import { NextResponse } from "next/server";

import type { Response } from "@/src/shared/type/response";
import { OpenAIClient, SYSTEM_PROMPT } from "@/src/shared/lib/openai";
import { GPTMessageType } from "@/src/shared/type/gpt";

export async function POST(
  req: Request,
): Promise<NextResponse<Response<string | null>>> {
  try {
    const { message, messageList = [] as GPTMessageType[] } = await req.json();

    const input = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messageList.map((item: GPTMessageType) => ({
        role: item.role,
        content: item.content,
      })),
      { role: "user", content: message },
    ];

    const response = await OpenAIClient.responses.create({
      model: "gpt-5-mini", // 가성비 좋음
      max_output_tokens: 1000, // 응답으로 나올 수 있는 최대 토큰 수 상한(보이는 출력 + reasoning 토큰 포함). 길이 제한용
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
