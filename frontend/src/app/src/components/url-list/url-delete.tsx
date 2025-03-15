import { useCallback } from "react";

import { fetchData } from "@utils/api/fetch-data";
import { ENDPOINTS, METHODS } from "@utils/endpoints";
import urlStore from "@store/links-store";

interface DeleteUrlProps {
  shortUrl: string;
}

export default function DeleteUrl({ shortUrl }: DeleteUrlProps) {
  const { removeUrl } = urlStore();

  const removeUrlFromDb = useCallback(async () => {
    try {
      await fetchData(ENDPOINTS.BACKEND.DELETE(shortUrl), METHODS.DELETE);
      removeUrl(shortUrl);
    } catch (err) {
      console.log(err);
    }
  }, [removeUrl, shortUrl]);

  return (
    <div
      className="bg-red-700 p-2 rounded-xl cursor-pointer"
      onClick={() => {
        removeUrlFromDb();
      }}
    >
      <p className="text-white">Удалить</p>
    </div>
  );
}
