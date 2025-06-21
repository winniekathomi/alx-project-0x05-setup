import React from "react";

const About: React.FC = () => {
  return (
    <div className="p-6 min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">About ImageGen</h1>
      <p className="text-lg text-gray-700 max-w-2xl text-center">
        ImageGen is a powerful AI-based image generator powered by GPT-4's image generation API.
        Simply enter a prompt and get a unique image created just for you. This app is built with
        Next.js, React, and Tailwind CSS, and is designed to showcase the power of custom hooks,
        global state management, and API integration in a modern frontend application.
      </p>
    </div>
  );
};

export default About;
