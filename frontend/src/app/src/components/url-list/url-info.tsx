import { useRouter } from "next/navigation";

import { AppRoute } from "@utils/consts";

interface UrlInfoProps {
  shortUrl: string;
}

export default function UrlInfo({ shortUrl }: UrlInfoProps) {
  const router = useRouter();

  return (
    <div
      className="bg-indigo-500 p-2 rounded-xl cursor-pointer"
      onClick={() => {
        router.push(`${AppRoute.STATISTIC}${shortUrl}`);
      }}
    >
      <p className="text-white">Инфо</p>
    </div>
  );
}
