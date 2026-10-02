import { useState, useEffect } from 'react';
import axios from 'axios';
import StatsCards from './StatsCards';
import SeatGrid from './SeatGrid';
import SeatDetails from './SeatDetails';
import type { Seat } from './types';

export default function Dashboard() {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [bookingsCount, setBookingsCount] = useState<number>(0);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  const fetchData = async () => {
    try {
      const seatsRes = await axios.get<Seat[]>('http://localhost:5000/seats');
      const bookingsRes = await axios.get('http://localhost:5000/bookings');
      setSeats(seatsRes.data);
      setBookingsCount(bookingsRes.data.length);
      
      if (selectedSeat) {
        const updatedSeat = seatsRes.data.find(s => s.id === selectedSeat.id);
        if (updatedSeat) setSelectedSeat(updatedSeat);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <StatsCards seats={seats} bookingsCount={bookingsCount} />
      <div className="flex gap-6 items-start">
        <div className="flex-1 bg-white p-6 rounded-xl border shadow-sm">
          <SeatGrid seats={seats} onSeatSelect={setSelectedSeat} selectedSeat={selectedSeat} />
        </div>
        {selectedSeat && (
          <div className="w-80 shrink-0">
            <SeatDetails seat={selectedSeat} refreshData={fetchData} />
          </div>
        )}
      </div>
    </div>
  );
}