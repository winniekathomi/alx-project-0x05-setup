import React, { useEffect, useState } from "react";
import ImageCard from "@/components/common/ImageCard";
import useFetchData from "@/hooks/useFetchData";
import { ImageProps } from "@/interfaces";

const Gallery: React.FC = () => {
  const {
    responseData,
    isLoading,
    fetchData,
    generatedImages,
  } = useFetchData<{ message: string }, { prompt: string }>();

  const [selectedImage, setSelectedImage] = useState<string>("");

  // Automatically fetch an image when the Gallery loads
  useEffect(() => {
    fetchData("/api/generate-image", { prompt: "sunset over the mountains" });
  }, []);

  // Update selected image when response data comes in
  useEffect(() => {
    if (responseData?.message) {
      setSelectedImage(responseData.message);
    }
  }, [responseData]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Gallery</h1>

      {isLoading && (
        <p className="text-center text-blue-600">Loading image...</p>
      )}

      {selectedImage && (
        <div className="mb-6">
          <h2 className="text-center mb-2 text-xl">Last Generated</h2>
          <ImageCard
            imageUrl={selectedImage}
            prompt="sunset over the mountains"
            action={() => setSelectedImage(selectedImage)}
          />
        </div>
      )}

      {generatedImages.length > 0 && (
        <div>
          <h3 className="text-xl text-center mb-4">History</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {generatedImages.map(({ imageUrl, prompt }: ImageProps, index) => (
              <ImageCard
                key={index}
                imageUrl={imageUrl}
                prompt={prompt}
                action={() => setSelectedImage(imageUrl)}
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

export default Gallery;


