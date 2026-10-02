import { useState } from 'react';
import SeatCard from './SeatCard';
import type { Seat } from './types';

interface SeatGridProps {
  seats: Seat[];
  onSeatSelect: (seat: Seat) => void;
  selectedSeat: Seat | null;
}

type FilterType = 'all' | 'available' | 'occupied' | 'reserved';

export default function SeatGrid({ seats, onSeatSelect, selectedSeat }: SeatGridProps) {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredSeats = seats.filter(seat => filter === 'all' || seat.status === filter);

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {(['all', 'available', 'occupied', 'reserved'] as FilterType[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border capitalize transition-colors ${filter === f ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
          >
            {f} {f === 'all' ? `(${seats.length})` : `(${seats.filter(s => s.status === f).length})`}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-10 gap-3">
        {filteredSeats.map(seat => (
          <SeatCard
            key={seat.id}
            seat={seat}
            isSelected={selectedSeat?.id === seat.id}
            onClick={onSeatSelect}
          />
        ))}
      </div>
    </div>
  );
}