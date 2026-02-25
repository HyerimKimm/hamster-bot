"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import { Input } from "@/src/shared/ui/input";
import { useState } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");

  function handleSubmit() {
    fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
    });
  }

  return (
    <main className={styles.page_wrap}>
      <Image
        src="/images/hamster.png"
        alt="hamster"
        width={80}
        height={80}
        priority
        style={{ width: 100, height: "auto" }}
      />
      <div>
        <Input
          placeholder="메시지를 입력하세요."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          전송
        </button>
      </div>
    </main>
  );
}
