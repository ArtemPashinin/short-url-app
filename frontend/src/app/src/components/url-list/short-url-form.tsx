import { useCallback } from "react";

import Input from "./input";

import { fetchData } from "@utils/api/fetch-data";
import { ENDPOINTS, METHODS } from "@utils/endpoints";
import urlStore from "@store/links-store";

export default function ShortUrlForm() {
  const { clearUrls } = urlStore();
  const createShortUrl = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);

      const formValues = {
        originalUrl: formData.get("originalUrl") as string,
        alias: formData.get("alias") === "" ? null : formData.get("alias"),
        expiresAt:
          formData.get("expiresAt") === "" ? null : formData.get("expiresAt"),
      };

      console.log(formValues);
      try {
        await fetchData(
          ENDPOINTS.BACKEND.SHORTEN,
          METHODS.POST,
          {},
          formValues
        );
        clearUrls();
      } catch (err) {
        alert("Невалидный URL или такой алиас уже сущетсвует");
        console.error(err);
      }
    },
    [clearUrls]
  );

  return (
    <form className="flex gap-5" onSubmit={createShortUrl}>
      <Input name="originalUrl" placeholder="Url" type="text" required />
      <Input name="alias" placeholder="Alias" type="text" maxLength={20} />
      <Input name="expiresAt" placeholder="Дата истечения" type="date" />
      <button className="bg-blue-600 p-2 rounded-xl" type="submit">
        Создать
      </button>
    </form>
  );
}
