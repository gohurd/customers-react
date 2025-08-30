import { twMerge } from "tailwind-merge";

type InputType = "string" | "number";

type Props<
  TInputType extends InputType,
  TInputValue = (TInputType extends "string" ? string : number) | null
> = {
  placeholder?: string;
  type?: TInputType;
  value: TInputValue;
  onChange: (value: TInputValue) => void;
  name: string;
  className?: HTMLInputElement["className"];
};

export const Input = <TInputType extends InputType>({
  onChange,
  value,
  placeholder,
  type,
  name,
  className,
}: Props<TInputType>) => {
  return (
    <input
      className={twMerge(
        "bg-white border border-gray-300 rounded-md px-4 py-2 text-left shadow-sm hover:bg-zinc-50 w-full",
        className
      )}
      name={name}
      value={value || ""}
      onChange={(e) => {
        const value = e.target.value;
        if (type === "string") {
          onChange(value as TInputType extends "string" ? string : number);
          return;
        }

        if (value) {
          onChange(
            parseInt(value) as TInputType extends "string" ? string : number
          );
        } else {
          onChange(null);
        }
      }}
      type={type}
      placeholder={placeholder}
    />
  );
};
