// SkeletonCard.js
import React from 'react';

const Skeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-profile">
        <div className="skeleton-avatar"></div>
        <div className="skeleton-line skeleton-line-short"></div>
      </div>
      <div className="skeleton-image"></div>
      <div className="skeleton-line skeleton-line-long"></div>
      <div className="skeleton-line skeleton-line-medium"></div>
      <div className="skeleton-line skeleton-line-short"></div>
    </div>
  );
};

export default Skeleton;
