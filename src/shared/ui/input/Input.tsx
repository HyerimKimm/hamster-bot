"use client";

import styles from "./Input.module.scss";

export default function Input({
  type = "text",
  placeholder = "",
  value = "",
  onChange = () => {},
  onKeyDown = () => {},
  onKeyUp = () => {},
  onKeyPress = () => {},
  onFocus = () => {},
  onBlur = () => {},
}: {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onKeyPress={onKeyPress}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}
