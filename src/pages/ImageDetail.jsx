import React from 'react';
import { motion } from 'framer-motion';

const ImageDetail = ({ label, imageData, status, onVerify, onReject }) => {
  const getImageSource = () => {
    if (!imageData) return null;
    if (typeof imageData === "string" && imageData.startsWith("data:image/")) {
      return imageData;
    }
    return `data:image/png;base64,${imageData}`;
  };

  return (
    <div className="border-b border-gray-100 pb-3 flex flex-col items-center">
      <p className="text-sm text-gray-500 mb-2">{label}</p>
      <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-md overflow-hidden relative">
        {imageData ? (
          <motion.img
            src={getImageSource()}
            alt={label}
            className="max-w-full max-h-full object-contain"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        ) : (
          <p className="font-medium text-gray-500">No Image</p>
        )}
        {status && (
          <div className="absolute top-2 right-2 bg-white p-2 rounded shadow text-xs">
            {status}
          </div>
        )}
      </div>
      <div className="mt-2 flex space-x-2">
        <button
          className={`px-3 py-1 text-sm ${status === 'APPROVED' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'} rounded-md`}
          onClick={onVerify}
          disabled={status === 'APPROVED'}
        >
          Verify
        </button>
        <button
          className={`px-3 py-1 text-sm ${status === 'REJECTED' ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700'} rounded-md`}
          onClick={onReject}
          disabled={status === 'REJECTED'}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default ImageDetail;
