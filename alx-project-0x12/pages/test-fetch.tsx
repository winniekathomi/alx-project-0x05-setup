// pages/test-fetch.tsx
import React, { useEffect } from 'react';
import useFetchData from '@/hooks/useFetchData';

const TestFetchPage: React.FC = () => {
  const {
    responseData,
    isLoading,
    generatedImages,
    fetchData,
  } = useFetchData<any, { prompt: string }>();

  useEffect(() => {
    // Simulate sending a payload to trigger fetch
    fetchData('https://jsonplaceholder.typicode.com/posts?_limit=5', { prompt: 'test' });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Test Fetch Data</h1>

      {isLoading && <p className="text-blue-600">Loading data...</p>}

      {responseData && (
        <div className="space-y-2">
          {(Array.isArray(responseData) ? responseData : [responseData]).map((item: any) => (
            <div key={item.id} className="p-4 border rounded shadow">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      )}

      {generatedImages.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Generated Images</h2>
          <div className="grid grid-cols-2 gap-4">
            {generatedImages.map((src, index) => (
              <img key={index} src={src} alt={`Generated ${index}`} className="w-full h-auto rounded" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestFetchPage;
