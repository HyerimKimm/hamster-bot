import { OpenAIClient, SYSTEM_PROMPT } from "@/src/shared/lib/openai";
import { NextResponse } from "next/server";
import { GPTMessageType } from "@/src/shared/type/gpt";

export async function POST(req: Request) {
  try {
    const { message, messageList = [] as GPTMessageType[] } = await req.json();

    const stream = await OpenAIClient.responses.create({
      model: "gpt-4.1-mini", // 가성비 좋음
      input: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messageList.map((item: GPTMessageType) => ({
          role: item.role,
          content: item.content,
        })),
        { role: "user", content: message },
      ],
      stream: true,
    });

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === "response.output_text.delta") {
              controller.enqueue(encoder.encode(event.delta));
            }
          }
        } catch (e) {
          controller.error(e);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
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
