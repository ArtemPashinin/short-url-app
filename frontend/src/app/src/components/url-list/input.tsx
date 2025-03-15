import { HTMLInputTypeAttribute } from "react";

interface InputProps {
  placeholder: string;
  type: HTMLInputTypeAttribute;
  maxLength?: number;
  required?: boolean;
  name: string;
}

export default function Input({
  placeholder,
  type,
  maxLength,
  required = false,
  name,
}: InputProps) {
  return (
    <input
      name={name}
      className="bg-gray-900 rounded-xl px-2"
      type={type}
      placeholder={placeholder}
      maxLength={maxLength}
      required={required}
    />
  );
}
