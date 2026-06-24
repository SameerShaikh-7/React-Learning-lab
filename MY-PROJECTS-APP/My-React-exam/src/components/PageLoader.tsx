import React from 'react';

const PageSpinner: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center py-28 gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-emerald-600 rounded-full animate-spin"></div>
      </div>
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">
        Syncing Market Data...
      </span>
    </div>
  );
};

export default PageSpinner;