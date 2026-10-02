import type { TabType } from '../App';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold flex items-center gap-2">
        <span className="text-blue-500">🏛️</span> Campus Seat
      </div>
      <nav className="flex-1 px-4 space-y-2 mt-4">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
        >
          🏠 Dashboard
        </button>
        <button 
          onClick={() => setActiveTab('myBookings')}
          className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'myBookings' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
        >
          📅 My Bookings
        </button>
      </nav>
    </div>
  );
}