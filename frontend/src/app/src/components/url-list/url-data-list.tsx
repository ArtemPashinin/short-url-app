import UrlData from "./url-data";
import { ShortUrl } from "../../types/data.interface";

interface UrlDataListProps {
  urlsData: ShortUrl[];
}

export default function UrlDataList({ urlsData }: UrlDataListProps) {
  return (
    <div className="flex flex-col justify-center gap-2 w-150">
      {urlsData.map((urlData, index) => (
        <UrlData key={index} {...urlData} />
      ))}
    </div>
  );
}
