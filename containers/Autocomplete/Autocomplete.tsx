import React, { useState } from "react";
import Input from "../../components/Input";
import { useClickOutside } from "@/utils";

interface AutocompleteProps {
  label?: string;
  onChange: (value: string) => void;
  suggestions?: string[];
  placeholder?: string;
  className?: string;
}

export function Autocomplete({
  label,
  onChange,
  suggestions = [],
  placeholder = "",
  className = "",
}: AutocompleteProps) {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const ref = useClickOutside(() => {
    setIsFocused(false);
  });

  const handleInputChange = (inputValue: string) => {
    setText(inputValue);
    onChange(inputValue);
  };

  const handleSuggestionClick = (suggestion: string) => {
    console.log("clicked suggestion ===>", suggestion);
    setText(suggestion);
  };

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      onFocus={() => setIsFocused(true)}
    >
      <Input
        label={label}
        value={text}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        placeholder={placeholder}
        className="mb-1"
      />
      {isFocused && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-gray-500"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Autocomplete;
