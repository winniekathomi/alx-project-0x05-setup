import React, { useEffect, useState } from "react";
import ImageCard from "@/components/common/ImageCard";
import useFetchData from "@/hooks/useFetchData";
import { useImageContext } from "@/context/ImageContext";
import { ImageProps } from "@/interfaces";

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const {
    isLoading,
    responseData,
    fetchData
  } = useFetchData<any, { prompt: string }>();

  const { addImage } = useImageContext();

  const handleGenerateImage = () => {
    if (!prompt.trim()) return;
    fetchData("/api/generate-image", { prompt });
  };

  useEffect(() => {
    if (!isLoading && responseData?.message) {
      setImageUrl(responseData.message);
      addImage({ imageUrl: responseData.message, prompt });
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-2">Image Generation App</h1>
        <p className="text-lg text-gray-700 mb-4">
          Generate stunning images based on your prompts!
        </p>

        <div className="w-full max-w-md">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />
          <button
            onClick={handleGenerateImage}
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {isLoading ? "Loading..." : "Generate Image"}
          </button>
        </div>

        {imageUrl && (
          <ImageCard
            action={() => setImageUrl(imageUrl)}
            imageUrl={imageUrl}
            prompt={prompt}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
