import { useState, useRef, useEffect } from "react";
import type { SelectOption, SelectOptionValue } from "../types/common";

type Props<TValue extends SelectOptionValue> = {
  options: SelectOption[];
  value: TValue;
  onChange: (value: TValue) => void;
  label: string;
};

export const Select = <TValue extends SelectOptionValue>({
  value,
  onChange,
  options,
  label,
}: Props<TValue>) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selected = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: SelectOption) => {
    onChange(option.value as TValue);
    setOpen(false);
  };

  const renderOption = (option: SelectOption) => (
    <li
      key={option.value}
      onClick={() => handleSelect(option)}
      className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
        value === option.value ? "bg-blue-50 font-medium" : ""
      }`}
    >
      {option.label}
    </li>
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="cursor-pointer w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-zinc-50"
      >
        {selected?.label || label}
        <span className="float-right">&#9662;</span>
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {renderOption({ label: "Clear", value: null })}
          {options.map(renderOption)}
        </ul>
      )}
    </div>
  );
};
