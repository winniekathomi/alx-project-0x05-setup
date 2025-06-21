import React, { useState, useEffect } from "react";
import ImageCard from "@/components/common/ImageCard";
import useFetchData from "@/hooks/useFetchData";
import { ImageProps } from "@/interfaces";

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const {
    isLoading,
    responseData,
    fetchData,
    generatedImages,
  } = useFetchData<{ message: string }, { prompt: string }>();

  const handleGenerateImage = () => {
    if (prompt.trim() !== "") {
      fetchData("/api/generate-image", { prompt });
    }
  };

  // Whenever a new image is returned, update the main display image
  useEffect(() => {
    if (!isLoading && responseData?.message) {
      setImageUrl(responseData.message);
    }
  }, [responseData, isLoading]);

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

      {generatedImages.length > 0 && (
        <div className="mt-6 w-full max-w-6xl">
          <h3 className="text-xl text-center mb-4">Generated Images</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 border p-2 overflow-y-scroll h-96">
            {generatedImages.map(({ imageUrl, prompt }: ImageProps, index) => (
              <ImageCard
                key={index}
                action={() => setImageUrl(imageUrl)}
                imageUrl={imageUrl}
                prompt={prompt}
                width="w-full"
                height="h-40"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
