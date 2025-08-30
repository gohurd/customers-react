import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  onClick: () => void;
  className?: HTMLButtonElement["className"];
  children: ReactNode;
  disabled?: boolean;
};

export const Button = ({ onClick, children, className, disabled }: Props) => {
  const handleClick = () => {
    if (disabled) {
      return;
    }
    onClick();
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={twMerge(
        " bg-white border border-gray-300 rounded-md px-4 py-2 text-left shadow-sm w-fit hover:bg-zinc-50 cursor-pointer disabled:cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
};
