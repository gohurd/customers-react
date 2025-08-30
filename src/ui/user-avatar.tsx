import { useState } from "react";

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
};

export const UserAvatar = ({ url, fallback }: Props) => {
  const [error, setError] = useState(false);

  const showImage = !error && !!url;

  return (
    <div className="w-10 h-10 rounded-full overflow-hidden">
      {showImage && (
        <img
          src={url}
          onError={() => setError(true)}
          className="w-full h-full object-cover"
        />
      )}
      {!showImage && (
        <div
          className={`w-full h-full relative flex items-center justify-center ${
            COLORS[Math.floor(Math.random() * COLORS.length)]
          }`}
        >
          <span className="text-white font-normal">{fallback}</span>
        </div>
      )}
    </div>
  );
};
