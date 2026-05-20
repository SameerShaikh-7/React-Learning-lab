import { Link } from "react-router";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#09090b] border-t border-white/5 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link
              to="/"
              className="text-xl font-serif tracking-tighter text-white hover:opacity-70 transition-opacity"
            >
              THE <span className="italic text-[#c9a69a]">ANALOGY</span>
            </Link>
            <p className="mt-4 text-zinc-500 text-[10px] leading-relaxed uppercase tracking-[0.2em] max-w-xs">
              A curated archive of timeless objects, merging digital 
              precision with tactile soul.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white text-[9px] uppercase tracking-[0.4em] font-bold mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-zinc-500 hover:text-[#c9a69a] text-[9px] uppercase tracking-[0.3em] transition-colors">
                  Archives
                </Link>
              </li>
              <li>
                <Link to="/view-product" className="text-zinc-500 hover:text-[#c9a69a] text-[9px] uppercase tracking-[0.3em] transition-colors">
                  Curate
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-zinc-500 hover:text-[#c9a69a] text-[9px] uppercase tracking-[0.3em] transition-colors">
                  Selection
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h4 className="text-white text-[9px] uppercase tracking-[0.4em] font-bold mb-6">
              Social
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-zinc-500 hover:text-white text-[9px] uppercase tracking-[0.3em] transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-500 hover:text-white text-[9px] uppercase tracking-[0.3em] transition-colors">
                  Pinterest
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Tightened */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          <p className="text-zinc-600 text-[7px] md:text-[8px] uppercase tracking-[0.5em]">
            © {currentYear} THE ANALOGY.
          </p>
          
          <div className="flex gap-8">
            <span className="text-zinc-600 text-[8px] uppercase tracking-[0.3em] cursor-help hover:text-zinc-400 transition-colors">
              Privacy
            </span>
            <span className="text-zinc-600 text-[8px] uppercase tracking-[0.3em] cursor-help hover:text-zinc-400 transition-colors">
              Terms
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}