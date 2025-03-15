import { create } from "zustand";

import { ShortUrl } from "../types/data.interface";

interface UrlState {
  urls: ShortUrl[];
  loading: boolean;
  setUrls: (urls: ShortUrl[]) => void;
  appendUrl: (urls: ShortUrl[]) => void;
  removeUrl: (shortUrl: string) => void;
  setLoading: (loading: boolean) => void;
  clearUrls: () => void;
}

const urlStore = create<UrlState>((set) => ({
  urls: [],
  loading: true,
  removeUrl: (shortUrl) =>
    set((state) => ({
      urls: state.urls.filter((url) => url.shortUrl !== shortUrl),
    })),
  setUrls: (urls) => set({ urls }),
  appendUrl: (newUrls) =>
    set((state) => ({
      urls: [...state.urls, ...newUrls],
    })),
  setLoading: (loading) => set({ loading }),
  clearUrls: () => set({ urls: [] }),
}));

export default urlStore;