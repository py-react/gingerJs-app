import React from 'react'

function Loading() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      <span className="ml-3">Loading...</span>
    </div>
  );
}

export default Loading