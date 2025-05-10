'use client';

import { useState } from 'react';
import { Icons } from './Icons';
import { mockData } from '@/lib/support/mockData';

const EducationTab = () => {
  const [activeCategory, setActiveCategory] = useState('financial-literacy');
  const [activeVideo, setActiveVideo] = useState(null);

  const openVideo = (videoUrl: string): void => {
    setActiveVideo(videoUrl);
  };

  const closeVideo = (): void => {
    setActiveVideo(null);
  };

  // Function to extract YouTube video ID
  const getYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Function to get YouTube thumbnail URL
  const getYouTubeThumbnail = (url: string): string | null => {
    const videoId = getYouTubeId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null;
  };

  return (
    <div className="mt-12">
      <div className="flex border-b mb-8 overflow-x-auto">
        {mockData.education.categories.map(category => (
          <button 
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`pb-2 px-4 whitespace-nowrap ${
              activeCategory === category.id 
                ? 'border-b-2 border-blue-700 font-medium text-blue-800' 
                : 'text-gray-600'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockData.education.resources
          .filter(resource => resource.category === activeCategory)
          .map(resource => (
            <div key={resource.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div 
                className="relative h-40 bg-gray-100 cursor-pointer overflow-hidden"
                onClick={() => openVideo(resource.videoUrl)}
              >
                {/* Display YouTube thumbnail */}
                {getYouTubeThumbnail(resource.videoUrl) ? (
                  <img 
                    src={getYouTubeThumbnail(resource.videoUrl)} 
                    alt={`Thumbnail for ${resource.title}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Thumbnail unavailable</span>
                  </div>
                )}
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-30 transition-opacity">
                  <div className="text-white bg-blue-700 bg-opacity-90 rounded-full p-3 shadow-lg">
                    <Icons.PlayButton />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">{resource.title}</h3>
                <p className="text-sm text-gray-600">{resource.author}</p>
              </div>
            </div>
          ))}
      </div>
      
      <div className="flex items-center justify-between mt-8 text-sm text-gray-600">
        <div>1 of 100 row(s) selected.</div>
        <div className="flex items-center">
          <span className="mr-2">Rows per page</span>
          <select className="border rounded p-1 mr-4">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
          <span className="mr-4">Page 1 of 10</span>
          <div className="flex">
            <button className="p-1 border rounded-l">&laquo;</button>
            <button className="p-1 border-t border-b">&lsaquo;</button>
            <button className="p-1 border-t border-b">&rsaquo;</button>
            <button className="p-1 border rounded-r">&raquo;</button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button 
              onClick={closeVideo}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 18L18 6M6 6L18 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="aspect-w-16 aspect-h-9 bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(activeVideo)}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationTab;