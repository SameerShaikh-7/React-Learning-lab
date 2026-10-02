import type { Seat } from './types';

interface StatsCardsProps {
  seats: Seat[];
  bookingsCount: number;
}

export default function StatsCards({ seats, bookingsCount }: StatsCardsProps) {
  const total = seats.length;
  const available = seats.filter(s => s.status === 'available').length;
  const occupied = seats.filter(s => s.status === 'occupied').length;
  const reserved = seats.filter(s => s.status === 'reserved').length;

  const Card = ({ title, count, subtitle, bgColor }: { title: string, count: number, subtitle: string, bgColor: string }) => (
    <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-4">
      <div className={`w-12 h-12 rounded-lg ${bgColor}`}></div>
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{count}</p>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <Card title="Total Seats" count={total} subtitle="Across all rows" bgColor="bg-blue-100" />
      <Card title="Available" count={available} subtitle="Seats free now" bgColor="bg-green-100" />
      <Card title="Occupied" count={occupied} subtitle="Currently in use" bgColor="bg-red-100" />
      <Card title="Reserved" count={reserved} subtitle="Pre-booked" bgColor="bg-yellow-100" />
      <Card title="Today's Bookings" count={bookingsCount} subtitle="Total active" bgColor="bg-purple-100" />
    </div>
  );
}