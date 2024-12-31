export interface Option<T> {
  label: string;
  value: T;
}

export interface SelectProps<T> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

export function Select<T>({
  options,
  value,
  onChange,
  label,
  placeholder = "Select an option",
  className = "",
}: SelectProps<T>) {
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    console.log("wat");

    const selectedOption = options.find(
      (option) => String(option.value) === e.target.value
    );
    if (selectedOption) {
      onChange(selectedOption.value);
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="relative">
        <select
          value={String(value)}
          onChange={handleChange}
          className="appearance-none w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={String(option.value)} value={String(option.value)}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Select;
