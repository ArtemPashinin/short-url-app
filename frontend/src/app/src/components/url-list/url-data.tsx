import Link from "next/link";

import DeleteUrl from "@components/url-list/url-delete";
import UrlInfo from "@components/url-list/url-info";
import { ShortUrl } from "../../types/data.interface";

import { API_BACKEND_URL } from "@utils/endpoints";

type UrlDataProps = ShortUrl;

export default function UrlData({ shortUrl, alias }: UrlDataProps) {
  const link = `${API_BACKEND_URL}/${alias || shortUrl}`;
  return (
    <div className="bg-gray-900 p-3 rounded-xl flex items-center justify-between gap-3">
      <Link href={link} className="text-blue-400">
        {link}
      </Link>
      <div className="flex gap-2">
        <DeleteUrl shortUrl={shortUrl} />
        <UrlInfo shortUrl={shortUrl} />
      </div>
    </div>
  );
}
