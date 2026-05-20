// import { NavLink, Link } from "react-router";
// import { useEffect, useState } from "react";
// import { getCartItems } from "../Services/CartServices";

// export default function Header() {
//   const [cartCount, setCartCount] = useState(0);

//   useEffect(() => {
//     const updateCount = async () => {
//       const items = await getCartItems();
//       setCartCount(items?.length || 0);
//     };

//     void updateCount();

//     const handleCartUpdate = () => { void updateCount(); };
//     window.addEventListener("cartUpdated", handleCartUpdate);
//     return () => window.removeEventListener("cartUpdated", handleCartUpdate);
//   }, []);

//   return (
//     <header className="sticky top-0 z-50 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5">
//       <nav className="mx-auto max-w-7xl px-8 h-24 flex items-center justify-between">
//         <div className="flex items-center gap-16">
//           <Link
//             to="/"
//             className="text-2xl font-serif tracking-tighter text-white hover:opacity-70 transition-opacity"
//           >
//             THE <span className="italic text-[#c9a69a]">ANALOGY</span>
//           </Link>
//           <ul className="hidden md:flex items-center gap-10">
//             <li>
//               <NavLink
//                 to="/"
//                 end
//                 className={({ isActive }) =>
//                   `text-[9px] uppercase tracking-[0.4em] font-bold transition-all ${
//                     isActive ? "text-[#c9a69a]" : "text-zinc-500 hover:text-white"
//                   }`
//                 }
//               >
//                 Archives
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/view-product"
//                 className={({ isActive }) =>
//                   `text-[9px] uppercase tracking-[0.4em] font-bold transition-all ${
//                     isActive ? "text-[#c9a69a]" : "text-zinc-500 hover:text-white"
//                   }`
//                 }
//               >
//                 Curate
//               </NavLink>
//             </li>
//           </ul>
//         </div>

//         <div className="flex items-center gap-8">
//           <NavLink
//             to="/cart"
//             className={({ isActive }) =>
//               `relative text-[9px] uppercase tracking-[0.4em] font-bold transition-all ${
//                 isActive ? "text-[#c9a69a]" : "text-zinc-500 hover:text-white"
//               }`
//             }
//           >
//             Selection
//             {cartCount > 0 && (
//               <span className="absolute -top-3 -right-4 bg-[#c9a69a] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-sans">
//                 {cartCount}
//               </span>
//             )}
//           </NavLink>
//           <Link
//             to="/add-product"
//             className="bg-white/5 border border-white/10 text-white px-8 py-3 rounded-full text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-[#c9a69a] hover:border-[#c9a69a] transition-all"
//           >
//             Archive New
//           </Link>
//         </div>
//       </nav>
//     </header>
//   );
// }
import { NavLink, Link } from "react-router";
import { useEffect, useState } from "react";
import { getCartItems } from "../Services/CartServices";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateCount = async () => {
      const items = await getCartItems();
      setCartCount(items?.length || 0);
    };

    void updateCount();

    const handleCartUpdate = () => { void updateCount(); };
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-[#09090b]/90 backdrop-blur-xl border-b border-white/5">
      <nav className="mx-auto max-w-7xl px-6 md:px-8 h-20 md:h-24 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="text-xl md:text-2xl font-serif tracking-tighter text-white hover:opacity-70 transition-opacity"
        >
          THE <span className="italic text-[#c9a69a]">ANALOGY</span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-10">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-[9px] uppercase tracking-[0.4em] font-bold transition-all ${
                  isActive ? "text-[#c9a69a]" : "text-zinc-500 hover:text-white"
                }`
              }
            >
              Archives
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/view-product"
              className={({ isActive }) =>
                `text-[9px] uppercase tracking-[0.4em] font-bold transition-all ${
                  isActive ? "text-[#c9a69a]" : "text-zinc-500 hover:text-white"
                }`
              }
            >
              Curate
            </NavLink>
          </li>
        </ul>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative text-[9px] uppercase tracking-[0.4em] font-bold transition-all ${
                isActive ? "text-[#c9a69a]" : "text-zinc-500 hover:text-white"
              }`
            }
          >
            Selection
            {cartCount > 0 && (
              <span className="absolute -top-3 -right-4 bg-[#c9a69a] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-sans">
                {cartCount}
              </span>
            )}
          </NavLink>
          <Link
            to="/add-product"
            className="bg-white/5 border border-white/10 text-white px-8 py-3 rounded-full text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-[#c9a69a] hover:border-[#c9a69a] transition-all"
          >
            Archive New
          </Link>
        </div>

        {/* Mobile right — cart icon + hamburger */}
        <div className="flex md:hidden items-center gap-5">

          {/* Cart icon */}
          <NavLink
            to="/cart"
            onClick={closeMenu}
            className={({ isActive }) =>
              `relative transition-all ${isActive ? "text-[#c9a69a]" : "text-zinc-400 hover:text-white"}`
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#c9a69a] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-sans">
                {cartCount}
              </span>
            )}
          </NavLink>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-zinc-400 hover:text-white transition-colors flex flex-col gap-[5px] justify-center items-center w-6"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[1.5px] bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`}></span>
            <span className={`block w-5 h-[1.5px] bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-5 h-[1.5px] bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-[#09090b]/95 backdrop-blur-xl border-t border-white/5`}
      >
        <ul className="flex flex-col px-8 py-6 gap-6">
          <li>
            <NavLink
              to="/"
              end
              onClick={closeMenu}
              className={({ isActive }) =>
                `text-[10px] uppercase tracking-[0.5em] font-bold transition-all ${
                  isActive ? "text-[#c9a69a]" : "text-zinc-400 hover:text-white"
                }`
              }
            >
              Archives
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/view-product"
              onClick={closeMenu}
              className={({ isActive }) =>
                `text-[10px] uppercase tracking-[0.5em] font-bold transition-all ${
                  isActive ? "text-[#c9a69a]" : "text-zinc-400 hover:text-white"
                }`
              }
            >
              Curate
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              onClick={closeMenu}
              className={({ isActive }) =>
                `relative inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] font-bold transition-all ${
                  isActive ? "text-[#c9a69a]" : "text-zinc-400 hover:text-white"
                }`
              }
            >
              Selection
              {cartCount > 0 && (
                <span className="bg-[#c9a69a] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-sans">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </li>
          <li className="pt-2 border-t border-white/5">
            <Link
              to="/add-product"
              onClick={closeMenu}
              className="inline-block bg-white/5 border border-white/10 text-white px-8 py-3 rounded-full text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-[#c9a69a] hover:border-[#c9a69a] transition-all"
            >
              Archive New
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
 

