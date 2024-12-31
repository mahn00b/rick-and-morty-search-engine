import { ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number" | "email" | "password" | "tel" | "url"; // Common input types
  placeholder?: string;
  className?: string;
}

export function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  className = "",
  ...rest
}: InputProps) {
  return (
    <div
      className={`max-w-xs w-full relative overflow-hidden text-gray-500 ${className}`}
    >
      {label && (
        <label className="text-sm font-medium text-white">{label}</label>
      )}
      <div className="relative bg-white rounded-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-full block pl-10 pr-3 py-4 rounded-full focus:outline-none"
          {...rest}
        />
      </div>
    </div>
  );
}

export default Input;
