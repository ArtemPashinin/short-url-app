"use client";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { ShortUrl } from "../../types/data.interface";

import { fetchData } from "@utils/api/fetch-data";
import { API_BACKEND_URL, ENDPOINTS, METHODS } from "@utils/endpoints";

export default function Statistic() {
  const { path } = useParams<{ path: string }>();
  const [urlData, setUrlData] = useState<ShortUrl | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUrlData = useCallback(async () => {
    try {
      const url = await fetchData<ShortUrl>(
        ENDPOINTS.BACKEND.INFO(path),
        METHODS.GET
      );
      setUrlData(url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [path]);

  useEffect(() => {
    fetchUrlData();
  }, [fetchUrlData]);

  if (loading) return <p>Loading...</p>;
  if (!loading && !urlData) return <h1>Не найдено</h1>;

  if (urlData)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="grid grid-cols-2 gap-2 bg-gray-900 p-3 rounded-xl">
          <div>Оригинальный url:</div>
          <div>{urlData.originalUrl}</div>
          <div>Сокращённый url:</div>
          <div>{`${API_BACKEND_URL}/${path}`}</div>
          <div>Количество кликов</div>
          <div>{urlData.clickCount}</div>
        </div>
      </div>
    );
}
