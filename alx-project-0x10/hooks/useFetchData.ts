import { useState } from "react";
import { ImageProps } from "@/interfaces";

function useFetchData<ResponseData = any, RequestData = any>() {
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedImages, setGeneratedImages] = useState<ImageProps[]>([]);

  const fetchData = async (url: string, data: RequestData) => {
    setIsLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Network response was not ok");
      const result = await res.json();

      const newImage: ImageProps = {
        imageUrl: result.message,
        prompt: (data as any).prompt || "N/A",
      };

      setResponseData(result);
      setGeneratedImages((prev) => [newImage, ...prev]);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { responseData, isLoading, fetchData, generatedImages };
}

export default useFetchData;
;
