"use client";

import { useState } from "react";
import Image from "next/image";

import SendIcon from "@/src/shared/icon/SendIcon";

import styles from "./page.module.scss";
import { GPTMessageType } from "@/src/shared/type/gpt";

export default function ChatPage() {
  const [messageList, setMessageList] = useState<GPTMessageType[]>([]);

  const [message, setMessage] = useState("");

  function handleSubmit() {
    if (!message) return;

    fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message, messageList }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessageList([
            ...messageList,
            { role: "user", content: message },
            {
              role: "assistant",
              content: data.data,
            },
          ]);
          setMessage("");
        }
      });
  }

  return (
    <main className={styles.page_wrap}>
      {/* 타이틀 */}
      <div className={styles.titleWrap}>
        <Image
          src="/images/hamster.png"
          alt="hamster"
          width={80}
          height={80}
          priority
          style={{ width: 100, height: "auto" }}
        />
        <h1 className={styles.title}>햄스터봇과 떠들기</h1>
      </div>
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
