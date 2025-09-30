import React from 'react';

const ProjectSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-calm-light animate-pulse">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="h-6 bg-calm-light rounded w-2/3"></div>
          <div className="h-5 bg-calm-light rounded-full w-16"></div>
        </div>

        {/* Description */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-calm-light rounded w-full"></div>
          <div className="h-4 bg-calm-light rounded w-5/6"></div>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-6 bg-calm-light rounded w-16"></div>
          <div className="h-6 bg-calm-light rounded w-20"></div>
          <div className="h-6 bg-calm-light rounded w-14"></div>
        </div>

        {/* Links */}
        <div className="flex gap-4">
          <div className="h-4 bg-calm-light rounded w-16"></div>
          <div className="h-4 bg-calm-light rounded w-20"></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSkeleton;