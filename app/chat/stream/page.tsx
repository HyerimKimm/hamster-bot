"use client";

import { GPTMessageType } from "@/src/shared/type/gpt";
import SendIcon from "@/src/shared/icon/SendIcon";
import styles from "./page.module.scss";
import { useState } from "react";
import ChatList from "@/src/widgets/chat-list/ChatList";
import Title from "@/src/widgets/title/Title";

export default function StreamPage() {
  const [message, setMessage] = useState("");

  const [messageList, setMessageList] = useState<GPTMessageType[]>([]);

  async function handleSubmit() {
    if (!message) return;

    setMessageList([...messageList, { role: "user", content: message }]);

    const res = await fetch("/api/chat/stream", {
      method: "POST",
      body: JSON.stringify({ message, messageList }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) return;

    setMessageList([
      ...messageList,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      setMessageList((prev) => {
        const lastMessage = prev[prev.length - 1];
        return [
          ...prev.slice(0, -1),
          { ...lastMessage, content: lastMessage.content + chunk },
        ];
      });
    }
  }

  return (
    <main className={styles.page_wrap}>
      {/* 타이틀 */}
      <Title messageList={messageList} />
      {/* 채팅 리스트 */}
      <ChatList messageList={messageList} />
      {/* 인풋 */}
      <div className={styles.input_wrap}>
        <input
          className={styles.input}
          placeholder="무엇이든 물어보세요!"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit} className={styles.button}>
          <SendIcon className={styles.icon} />
        </button>
      </div>
    </main>
  );
}
