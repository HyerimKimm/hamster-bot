"use client";

import { GPTMessageType } from "@/src/shared/type/gpt";
import SpeechBubble from "@/src/shared/ui/speech-bubble/SpeechBubble";

import styles from "./ChatList.module.scss";

export default function ChatList({
  messageList,
}: {
  messageList: GPTMessageType[];
}) {
  return (
    <div
      className={`${styles.chat_list_wrap} ${messageList.length > 0 ? styles.active : styles.no_message}`}
    >
      {messageList.map((message, index) => (
        <SpeechBubble key={index} isUser={message.role === "user"}>
          {message.content}
        </SpeechBubble>
      ))}
    </div>
  );
}
