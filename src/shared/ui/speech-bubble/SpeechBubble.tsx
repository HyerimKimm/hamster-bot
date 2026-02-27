"use client";

import styles from "./SpeechBubble.module.scss";

export default function SpeechBubble({
  children,
  isUser = false,
}: {
  isUser?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${styles.speech_bubble} ${isUser ? styles.user : styles.bot}`}
    >
      <span className={styles.content}>{children}</span>
      <span className={styles.tail} aria-hidden />
    </div>
  );
}
