import React, { createContext, useContext, useState, ReactNode } from "react";
import { ImageProps } from "@/interfaces";

interface ImageContextProps {
  generatedImages: ImageProps[];
  addImage: (image: ImageProps) => void;
}

const ImageContext = createContext<ImageContextProps | undefined>(undefined);

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImageContext must be used within ImageProvider");
  }
  return context;
};

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [generatedImages, setGeneratedImages] = useState<ImageProps[]>([]);

  const addImage = (image: ImageProps) => {
    setGeneratedImages((prev) => [...prev, image]);
  };

  return (
    <ImageContext.Provider value={{ generatedImages, addImage }}>
      {children}
    </ImageContext.Provider>
  );
};
