"use client";

import styles from "./Title.module.scss";
import Image from "next/image";
import { GPTMessageType } from "@/src/shared/type/gpt";

export default function Title({
  messageList,
}: {
  messageList: GPTMessageType[];
}) {
  return (
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
  );
}
