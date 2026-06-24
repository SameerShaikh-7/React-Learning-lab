import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MarketOverview from './pages/MarketOverview';
import AssetProfile from './pages/AssetProfile';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50/60 text-slate-900 font-sans antialiased">
      
        <header className="bg-white border-b border-slate-100 sticky top-0 z-50 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

            
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white font-extrabold text-sm border border-slate-800 shadow-sm transition-transform duration-300 group-hover:scale-105">
                AP
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black tracking-tight text-slate-900 leading-none">
                  AssetPulse
                </span>
                <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase mt-0.5">
                  Institutional Platform
                </span>
              </div>
            </Link>

           
            <div className="flex items-center gap-4">
              <div className="flex flex-col text-right hidden sm:block">
              </div>

              <div className="h-6 w-[1px] bg-slate-200 hidden sm:block"></div>

              <div className="flex items-center gap-2 bg-indigo-50/50 border border-indigo-100/70 px-3 py-1.5 rounded-xl">
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                  USD Terminal
                </span>
              </div>
            </div>

          </div>
        </header>

      
        <main className="max-w-6xl mx-auto px-6 py-12">
          <Routes>
            <Route path="/" element={<MarketOverview />} />
            <Route path="/coin/:id" element={<AssetProfile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;