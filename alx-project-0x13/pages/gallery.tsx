import ImageCard from "@/components/common/ImageCard";
import useFetchData from "@/hooks/useFetchData";
import { ImageProps } from "@/interfaces";
import React, { useEffect, useState } from "react";

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const { generatedImages } = useFetchData<any, { prompt: string }>();

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Image Gallery</h1>

      {generatedImages.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-[1100px]">
          {generatedImages.map((img: ImageProps, index: number) => (
            <ImageCard
              key={index}
              imageUrl={img.imageUrl}
              prompt={img.prompt}
              action={() => setSelectedImage(img.imageUrl)}
              width="w-full"
              height="h-40"
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No images have been generated yet.</p>
      )}

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-[80vh] rounded"
            />
            <button
              onClick={() => setSelectedImage("")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
