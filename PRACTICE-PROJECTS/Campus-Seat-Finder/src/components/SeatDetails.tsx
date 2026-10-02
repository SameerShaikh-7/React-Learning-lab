import { useState } from 'react';
import BookingForm from './BookingForm';
import type { Seat } from './types';

interface SeatDetailsProps {
  seat: Seat;
  refreshData: () => void;
}

export default function SeatDetails({ seat, refreshData }: SeatDetailsProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm sticky top-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Seat Details</h3>

      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-6 border">
        <span className="text-3xl font-bold text-gray-800">{seat.seatId}</span>
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
          ${seat.status === 'available' ? 'bg-green-100 text-green-700' :
            seat.status === 'occupied' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
          {seat.status}
        </span>
      </div>

      <div className="space-y-3 text-sm text-gray-600 mb-6">
        <p className="flex justify-between border-b pb-2">
          <span>Type</span> <span className="font-medium text-gray-800">{seat.type}</span>
        </p>
        <p className="flex justify-between border-b pb-2">
          <span>Row</span> <span className="font-medium text-gray-800">{seat.row}</span>
        </p>
      </div>

      {seat.status === 'available' ? (
        showForm ? (
          <BookingForm seat={seat} setShowForm={setShowForm} refreshData={refreshData} />
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Book This Seat
          </button>
        )
      ) : (
        <button disabled className="w-full bg-gray-100 text-gray-400 py-2.5 rounded-lg font-medium cursor-not-allowed">
          Not Available
        </button>
      )}
    </div>
  );
}