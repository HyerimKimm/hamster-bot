"use client";

import { useState } from "react";
import Image from "next/image";

import ChatList from "@/src/widgets/chat-list/ChatList";

import { GPTMessageType } from "@/src/shared/type/gpt";

import SendIcon from "@/src/shared/icon/SendIcon";

import styles from "./page.module.scss";

export default function ChatPage() {
  const [messageList, setMessageList] = useState<GPTMessageType[]>([]);

  const [message, setMessage] = useState("");

  async function handleSubmit() {
    if (!message) return;

    const newMessageList: GPTMessageType[] = [
      ...messageList,
      {
        role: "user",
        content: message,
      },
    ];

    setMessageList(newMessageList);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message, messageList }),
    });

    const data = await res.json();

    if (data.success) {
      setMessageList([
        ...newMessageList,
        { role: "assistant", content: data.data },
      ]);
      setMessage("");
    }
  }

  return (
    <main className={styles.page_wrap}>
      {/* 타이틀 */}
      <div
        className={`${styles.titleWrap} ${messageList.length > 0 ? styles.active : ""}`}
      >
        <Image
          src={
            messageList.length > 0
              ? "/images/hamster-face.png"
              : "/images/hamster.png"
          }
          alt="hamster"
          width={80}
          height={80}
          priority
          className={`${styles.image} ${messageList.length > 0 ? styles.active : ""}`}
        />
        <h1
          className={`${styles.title} ${messageList.length > 0 ? styles.active : ""}`}
        >
          햄스터봇과 떠들기
        </h1>
      </div>
      <ChatList messageList={messageList} />
      {/* 인풋 */}
      <div
        className={`${styles.input_wrap} ${messageList.length > 0 ? styles.active : ""}`}
      >
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
