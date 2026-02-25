import Image from "next/image";
import styles from "./page.module.scss";
import { Input } from "@/src/shared/ui/input";

export default function ChatPage() {
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
        <Input />
        <button type="submit">전송</button>
      </div>
    </main>
  );
}
