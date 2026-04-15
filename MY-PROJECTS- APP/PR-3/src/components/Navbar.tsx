const MedicalNavbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-[#7ba6c3]/95 backdrop-blur-xl border-b border-white/20 px-8 py-4 shadow-lg shadow-blue-900/5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo Section */}
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-all">
             <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
             </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-white leading-none italic">SAMEER</span>
            <span className="text-[9px] font-bold text-blue-100 uppercase tracking-[0.25em] opacity-80">Medical Systems</span>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          <a href="#" className="text-[11px] font-bold text-white uppercase tracking-widest hover:text-blue-200 transition-colors">Dashboard</a>
          <a href="#" className="text-[11px] font-bold text-blue-100/70 uppercase tracking-widest hover:text-white transition-colors">Staff Directory</a>
          <a href="#" className="text-[11px] font-bold text-blue-100/70 uppercase tracking-widest hover:text-white transition-colors">Schedules</a>
        </div>

        {/* Status & Profile */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:block text-right border-r border-white/20 pr-6">
            <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest">System Status</p>
            <div className="flex items-center justify-end gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              <p className="text-xs font-bold text-white tracking-tight">Active Portal v2.0</p>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default MedicalNavbar;