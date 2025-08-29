import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
  titleRightAddon?: ReactNode;
};

export const Page = ({ children, title, titleRightAddon }: Props) => {
  return (
    <main className="h-full w-full flex justify-center">
      <div className="h-full flex flex-col max-w-[1200px] w-full md:py-8">
        <h1 className="text-2xl font-semibold flex justify-between">
          {title}
          {titleRightAddon}
        </h1>
        {children}
      </div>
    </main>
  );
};
