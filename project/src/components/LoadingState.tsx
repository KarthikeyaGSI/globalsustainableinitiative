import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function LoadingState() {
  return (
    <div className="space-y-4 p-4">
      <Skeleton height={40} width="60%" />
      <Skeleton count={3} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Skeleton height={200} />
        <Skeleton height={200} />
      </div>
    </div>
  );
}