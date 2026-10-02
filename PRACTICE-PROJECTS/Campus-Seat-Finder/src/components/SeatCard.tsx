import type { Seat } from './types';

interface SeatCardProps {
  seat: Seat;
  isSelected: boolean;
  onClick: (seat: Seat) => void;
}

export default function SeatCard({ seat, isSelected, onClick }: SeatCardProps) {
  const statusColors = {
    available: 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200',
    occupied: 'bg-red-100 text-red-700 border-red-300 cursor-not-allowed',
    reserved: 'bg-yellow-100 text-yellow-700 border-yellow-300 cursor-not-allowed'
  };

  return (
    <button
      onClick={() => onClick(seat)}
      className={`p-3 rounded-lg border font-medium transition-all
        ${statusColors[seat.status]} 
        ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
      `}
    >
      {seat.seatId}
    </button>
  );
}