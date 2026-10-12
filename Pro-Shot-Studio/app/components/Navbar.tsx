"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Camera, PlusCircle, Eye, BookOpen } from "lucide-react";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: "rgba(10,10,10,0.85)",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(255,255,255,0.06)",
        }}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex justify-between items-center h-16 sm:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <div
                className="p-2 rounded-full"
                style={{ background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.25)" }}
              >
                <Camera className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "#d4af37" }} />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-lg sm:text-xl font-bold italic"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "#ffffff", letterSpacing: "0.05em" }}
                >
                  ProShots
                </span>
                <span className="text-[8px] sm:text-[9px] font-medium tracking-[0.3em] uppercase" style={{ color: "#d4af37" }}>
                  Premium Studio
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {[
                { href: "/", label: "Home", icon: <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#d4af37" }} /> },
                { href: "/addBooking", label: "Book Session", icon: <PlusCircle className="w-4 h-4" style={{ color: "#d4af37" }} /> },
                { href: "/viewBookings", label: "My Bookings", icon: <Eye className="w-4 h-4" style={{ color: "#d4af37" }} /> },
                { href: "/services", label: "Services", icon: <BookOpen className="w-4 h-4" style={{ color: "#d4af37" }} /> },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group relative"
                  style={{ color: "#a0a0a0" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#a0a0a0";
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}

              <Link
                href="/addBooking"
                className="ml-4 px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #d4af37, #b8962e)",
                  color: "#0a0a0a",
                  letterSpacing: "0.05em",
                }}
              >
                Book Now
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2.5 rounded-xl transition-all touch-manipulation"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <Menu className="h-5 w-5 text-white" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div
              className="md:hidden py-4 border-t space-y-2 pb-6 animate-in fade-in slide-in-from-top-2 duration-200"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              {[
                { href: "/", label: "Home", sub: "Welcome", icon: <div className="w-2 h-2 rounded-full" style={{ background: "#d4af37" }} /> },
                { href: "/addBooking", label: "Book Session", sub: "Schedule a shoot", icon: <PlusCircle className="w-4 h-4" style={{ color: "#d4af37" }} /> },
                { href: "/viewBookings", label: "My Bookings", sub: "Browse your sessions", icon: <Eye className="w-4 h-4" style={{ color: "#d4af37" }} /> },
                { href: "/services", label: "Services", sub: "Packages & pricing", icon: <BookOpen className="w-4 h-4" style={{ color: "#d4af37" }} /> },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all active:scale-[0.98]"
                  style={{ background: "rgba(255,255,255,0.02)", color: "#a0a0a0" }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.15)" }}
                  >
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">{item.label}</span>
                    <span className="text-[11px]" style={{ color: "#777" }}>{item.sub}</span>
                  </div>
                </Link>
              ))}

              <div className="pt-2 px-1">
                <Link
                  href="/addBooking"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center py-3.5 rounded-xl text-sm font-semibold transition-all shadow-md active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #d4af37, #b8962e)",
                    color: "#0a0a0a",
                    letterSpacing: "0.05em",
                  }}
                >
                  Book Session Now
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}