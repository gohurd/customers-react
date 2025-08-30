import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  title: string;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  titleClassName?: HTMLHeadingElement["className"];
};

export const Page = ({
  children,
  title,
  leftAddon,
  rightAddon,
  titleClassName,
}: Props) => {
  return (
    <main className="h-full w-full flex justify-center">
      <div className="h-full flex flex-col max-w-[1200px] w-full md:py-8">
        <h1
          className={twMerge(
            "text-2xl font-semibold flex justify-between",
            titleClassName
          )}
        >
          {leftAddon}
          {title}
          {rightAddon}
        </h1>
        {children}
      </div>
    </main>
  );
};
