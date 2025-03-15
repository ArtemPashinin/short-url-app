import { useCallback, useEffect, useState } from "react";

import UrlDataList from "@components/url-list/url-data-list";
import ShortUrlForm from "./short-url-form";
import { ShortUrl } from "../../types/data.interface";

import { fetchData } from "@utils/api/fetch-data";
import { ENDPOINTS, METHODS } from "@utils/endpoints";
import urlStore from "@store/links-store";

export default function UrlList() {
  const { urls, loading, setUrls, appendUrl, setLoading } = urlStore();
  const [page, setPage] = useState<number>(1);

  const fetchUrl = useCallback(async () => {
    try {
      setLoading(true);
      const urls = await fetchData<ShortUrl[]>(
        ENDPOINTS.BACKEND.ALL(1),
        METHODS.GET
      );
      setUrls(urls);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setUrls]);

  const fetchNextPage = useCallback(async () => {
    try {
      setLoading(true);

      const urls = await fetchData<ShortUrl[]>(
        ENDPOINTS.BACKEND.ALL(page + 1),
        METHODS.GET
      );
      appendUrl(urls);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [appendUrl, page, setLoading]);

  useEffect(() => {
    if (urls.length === 0) {
      fetchUrl();
    }
  }, [fetchUrl, urls.length, loading]);

  if (loading) return <p>Загрузка....</p>;

  return (
    <div className="h-screen flex flex-col items-center gap-10 w-full p-10">
      <ShortUrlForm />
      <UrlDataList urlsData={urls} />
      <div
        className="p-2 bg-blue-500 rounded-xl cursor-pointer"
        onClick={fetchNextPage}
      >
        <p>Загрузить ещё...</p>
      </div>
    </div>
  );
}
