import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: HTMLButtonElement["className"];
};

export const IconButton = ({
  children,
  onClick,
  disabled,
  className,
}: Props) => {
  return (
    <button
      disabled={disabled}
      className={twMerge(
        "bg-white border border-gray-300 rounded-full p-2 text-left shadow-sm w-fit hover:bg-zinc-50 cursor-pointer disabled:cursor-not-allowed",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
