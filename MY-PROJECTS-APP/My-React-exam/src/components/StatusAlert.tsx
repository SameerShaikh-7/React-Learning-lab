import React from 'react';

interface StatusAlertProps {
  message: string;
}

const StatusAlert: React.FC<StatusAlertProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center py-20 px-6 animate-pulse">
      <div className="max-w-md w-full bg-rose-50/60 backdrop-blur-md border border-rose-100 text-rose-900 px-6 py-4 rounded-2xl shadow-xl shadow-rose-100/20 flex items-center gap-4">
        <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center text-lg shrink-0">
          ⚠️
        </div>
        <div>
          <p className="font-bold text-sm tracking-tight text-rose-950">System Notice</p>
          <p className="text-xs text-rose-700/90 font-medium mt-0.5">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default StatusAlert;