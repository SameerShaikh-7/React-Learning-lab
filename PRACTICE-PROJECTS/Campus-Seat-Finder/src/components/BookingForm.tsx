import { useState } from 'react';
import axios from 'axios';
import type { Seat } from './types';

interface BookingFormProps {
  seat: Seat;
  setShowForm: (show: boolean) => void;
  refreshData: () => void;
}

export default function BookingForm({ seat, setShowForm, refreshData }: BookingFormProps) {
  const [studentName, setStudentName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:5000/bookings', {
        seatId: seat.seatId,
        studentName,
        rollNo,
        date: new Date().toISOString().split('T')[0],
        status: 'active'
      });

      await axios.patch(`http://localhost:5000/seats/${seat.id}`, {
        status: 'reserved'
      });

      setShowForm(false);
      refreshData();
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleBook} className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <label className="block text-xs text-gray-500 mb-1">Student Name</label>
        <input
          required
          className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={studentName}
          onChange={e => setStudentName(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Roll Number</label>
        <input
          required
          className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={rollNo}
          onChange={e => setRollNo(e.target.value)}
        />
      </div>
      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Booking...' : 'Confirm'}
        </button>
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg font-medium hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}