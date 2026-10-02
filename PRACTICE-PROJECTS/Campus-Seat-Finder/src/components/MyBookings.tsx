import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Booking, Seat } from './types';

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);

  const fetchData = async () => {
    try {
      const bRes = await axios.get<Booking[]>('http://localhost:5000/bookings');
      const sRes = await axios.get<Seat[]>('http://localhost:5000/seats');
      setBookings(bRes.data);
      setSeats(sRes.data);
    } catch (error) {
      console.error("Failed to fetch bookings data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCancel = async (booking: Booking) => {
    try {
      await axios.delete(`http://localhost:5000/bookings/${booking.id}`);

      const seatToUpdate = seats.find(s => s.seatId === booking.seatId);
      if (seatToUpdate) {
        await axios.patch(`http://localhost:5000/seats/${seatToUpdate.id}`, {
          status: 'available'
        });
      }
      fetchData();
    } catch (error) {
      console.error("Cancel failed:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">My Active Bookings</h2>
      {bookings.length === 0 ? (
        <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed">
          No active bookings found. Time to grab a seat!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-y text-gray-600 text-sm">
                <th className="p-4 font-medium">Seat ID</th>
                <th className="p-4 font-medium">Student Name</th>
                <th className="p-4 font-medium">Roll No</th>
                <th className="p-4 font-medium">Booking Date</th>
                <th className="p-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-bold text-gray-800">{b.seatId}</td>
                  <td className="p-4 text-gray-600">{b.studentName}</td>
                  <td className="p-4 text-gray-600">{b.rollNo}</td>
                  <td className="p-4 text-gray-600">{b.date}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleCancel(b)}
                      className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}