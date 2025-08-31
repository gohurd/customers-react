import { memo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { getFallbackColor } from "../utils/shared/get-fallback-color";

const COLORS = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-orange-500",
] as const;

type Props = {
  url?: string;
  fallback: string;
  className?: HTMLDivElement["className"];
};

export const UserAvatar = memo(({ url, fallback, className }: Props) => {
  const [error, setError] = useState(false);

  const showImage = !error && !!url;

  const color = getFallbackColor(fallback, [...COLORS]);

  return (
    <div
      className={twMerge("w-10 h-10 rounded-full overflow-hidden", className)}
    >
      {showImage && (
        <img
          src={url}
          onError={() => setError(true)}
          className="w-full h-full object-cover"
        />
      )}
      {!showImage && (
        <div
          className={`w-full h-full relative flex items-center justify-center ${color}`}
        >
          <span className="text-white font-normal">{fallback}</span>
        </div>
      )}
    </div>
  );
});
