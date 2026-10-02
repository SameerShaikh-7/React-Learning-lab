import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import MyBookings from './components/MyBookings';

export type TabType = 'dashboard' | 'myBookings';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {activeTab === 'dashboard' ? <Dashboard /> : <MyBookings />}
        </main>
      </div>
    </div>
  );
}