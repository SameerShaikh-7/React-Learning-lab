"use client";

import { useEffect, useState } from "react";
import { BookingType } from "@/app/utils/type";
import { Camera, Trash2, Edit3, LayoutGrid, Users, Zap, Monitor } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ViewBookings() {
    const router = useRouter();
    const [allBookings, setAllBookings] = useState<BookingType[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("proshots_bookings") || "[]");
        setTimeout(() => {
            setAllBookings(data);
            setIsMounted(true);
        }, 0);
    }, []);

    const uniquePlatforms = new Set(allBookings.map((b) => b.platformIntent || "")).size;
    const uniqueServices = new Set(allBookings.map((b) => b.serviceType || "")).size;
    const naturalCount = allBookings.filter((b) => b.keepOriginal).length;

    const deleteBooking = (id: number) => {
        const updated = allBookings.filter((b) => b.id !== id);
        localStorage.setItem("proshots_bookings", JSON.stringify(updated));
        setAllBookings(updated);
        toast.error("Booking removed!");
    };

    if (!isMounted) return null;

    const filtered = allBookings.filter((b) => {
        return (
            (b.clientName || "").toLowerCase().includes(search.toLowerCase()) ||
            (b.clientEmail || "").toLowerCase().includes(search.toLowerCase()) ||
            (b.platformIntent || "").toLowerCase().includes(search.toLowerCase())
        );
    });

    const getInitials = (name: string) =>
        (name || "").split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "?";

    return (
        <div className="min-h-screen" style={{ background: "#0a0a0a" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-24">

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-12">
                    <div>
                        <p
                            className="text-[10px] font-semibold uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-2 sm:mb-3"
                            style={{ color: "#d4af37" }}
                        >
                            Session Log
                        </p>
                        <h1
                            className="text-3xl sm:text-4xl md:text-5xl font-bold italic leading-none"
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff" }}
                        >
                            All Bookings.
                        </h1>
                    </div>
                    <button
                        onClick={() => router.push("/addBooking")}
                        className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 text-center shadow-lg"
                        style={{
                            background: "linear-gradient(135deg, #d4af37, #b8962e)",
                            color: "#0a0a0a",
                            letterSpacing: "0.05em",
                        }}
                    >
                        + New Session
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">

                    <aside className="lg:w-64 shrink-0 grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
                        {[
                            { icon: <LayoutGrid className="w-4 h-4" />, label: "Total Sessions", value: allBookings.length, accent: "#d4af37" },
                            { icon: <Monitor className="w-4 h-4" />, label: "Platforms", value: uniquePlatforms, accent: "#60a5fa" },
                            { icon: <Zap className="w-4 h-4" />, label: "Service Types", value: uniqueServices, accent: "#f97316" },
                            { icon: <Users className="w-4 h-4" />, label: "Natural Look", value: naturalCount, accent: "#4ade80" },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 sm:gap-4 p-3.5 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl"
                                style={{
                                    background: "rgba(255,255,255,0.02)",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                }}
                            >
                                <div
                                    className="p-2 rounded-xl shrink-0"
                                    style={{ background: `${stat.accent}18`, color: stat.accent }}
                                >
                                    {stat.icon}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[9px] font-semibold uppercase tracking-wider truncate" style={{ color: "#777" }}>
                                        {stat.label}
                                    </p>
                                    <p
                                        className="text-xl sm:text-2xl font-bold italic leading-none mt-1"
                                        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff" }}
                                    >
                                        {stat.value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </aside>

                    <div className="flex-1 min-w-0">

                        {/* Search input & session count */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                            <input
                                type="text"
                                placeholder="Search by name, email, or platform..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full sm:max-w-xs px-4 py-2.5 rounded-xl text-xs outline-none transition-all"
                                style={{
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.07)",
                                    color: "#e0e0e0",
                                }}
                            />
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-right sm:text-left" style={{ color: "#555" }}>
                                {filtered.length} {filtered.length === 1 ? "session" : "sessions"} found
                            </p>
                        </div>

                        {filtered.length > 0 ? (
                            <div className="space-y-3">
                                {filtered.map((booking, idx) => (
                                    <div
                                        key={booking.id}
                                        className="group flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:px-6 sm:py-5 rounded-xl sm:rounded-2xl transition-all duration-300"
                                        style={{
                                            background: "rgba(255,255,255,0.02)",
                                            border: "1px solid rgba(255,255,255,0.05)",
                                        }}
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.borderColor = "rgba(212,175,55,0.2)")
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")
                                        }
                                    >
                                        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                                            <span
                                                className="text-[10px] font-semibold w-5 text-right"
                                                style={{ color: "#444" }}
                                            >
                                                {String(idx + 1).padStart(2, "0")}
                                            </span>
                                            <div
                                                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                                                style={{
                                                    background: "rgba(212,175,55,0.1)",
                                                    border: "1px solid rgba(212,175,55,0.2)",
                                                    color: "#d4af37",
                                                    fontFamily: "'Cormorant Garamond', serif",
                                                    fontSize: "15px",
                                                }}
                                            >
                                                {getInitials(booking.clientName)}
                                            </div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mb-1">
                                                <h3
                                                    className="text-base font-bold italic"
                                                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff" }}
                                                >
                                                    {booking.clientName}
                                                </h3>
                                                
                                                {booking.packageTier && (
                                                    <span
                                                        className={`text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                                            booking.packageTier === "Premium"
                                                                ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                                                                : booking.packageTier === "Corporate Team"
                                                                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                                                : "bg-white/5 text-zinc-400"
                                                        }`}
                                                    >
                                                        {booking.packageTier || "Basic"}
                                                    </span>
                                                )}

                                                {booking.keepOriginal && (
                                                    <span
                                                        className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                                                        style={{ background: "rgba(74,222,128,0.08)", color: "#4ade80" }}
                                                    >
                                                        ✦ Natural
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-zinc-400 break-words leading-relaxed sm:truncate">
                                                {booking.clientEmail} · {booking.serviceType} · {booking.platformIntent}
                                            </p>

                                            {booking.editingStyles && booking.editingStyles.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 mt-2">
                                                    {booking.editingStyles.map((s, i) => (
                                                        <span
                                                            key={i}
                                                            className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded"
                                                            style={{
                                                                background: "rgba(255,255,255,0.04)",
                                                                color: "#777",
                                                                border: "1px solid rgba(255,255,255,0.06)",
                                                            }}
                                                        >
                                                            {s}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-end sm:justify-start gap-2 pt-2.5 sm:pt-0 border-t border-white/[0.04] sm:border-t-0 shrink-0">
                                            <button
                                                onClick={() => router.push(`/editBooking/${booking.id}`)}
                                                title="Edit booking"
                                                aria-label="Edit booking"
                                                className="p-2 sm:p-2.5 rounded-xl transition-all duration-200"
                                                style={{
                                                    background: "rgba(255,255,255,0.04)",
                                                    border: "1px solid rgba(255,255,255,0.07)",
                                                    color: "#888",
                                                }}
                                                onMouseEnter={(e) => {
                                                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,55,0.1)";
                                                    (e.currentTarget as HTMLButtonElement).style.color = "#d4af37";
                                                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,175,55,0.2)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
                                                    (e.currentTarget as HTMLButtonElement).style.color = "#888";
                                                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.07)";
                                                }}
                                            >
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => deleteBooking(booking.id)}
                                                title="Remove booking"
                                                aria-label="Remove booking"
                                                className="p-2 sm:p-2.5 rounded-xl transition-all duration-200"
                                                style={{
                                                    background: "rgba(255,255,255,0.04)",
                                                    border: "1px solid rgba(255,255,255,0.07)",
                                                    color: "#888",
                                                }}
                                                onMouseEnter={(e) => {
                                                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.08)";
                                                    (e.currentTarget as HTMLButtonElement).style.color = "#ef4444";
                                                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(239,68,68,0.15)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
                                                    (e.currentTarget as HTMLButtonElement).style.color = "#888";
                                                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.07)";
                                                }}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div
                                className="flex flex-col items-center justify-center py-20 sm:py-32 rounded-2xl sm:rounded-3xl px-4"
                                style={{
                                    background: "rgba(255,255,255,0.01)",
                                    border: "1px dashed rgba(255,255,255,0.07)",
                                }}
                            >
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                                    style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.1)" }}
                                >
                                    <Camera className="w-7 h-7" style={{ color: "#333" }} />
                                </div>
                                <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "#333" }}>
                                    {search ? "No results match your filter" : "No sessions booked yet"}
                                </p>
                                {!search && (
                                    <button
                                        onClick={() => router.push("/addBooking")}
                                        className="text-xs font-semibold uppercase tracking-widest transition-all hover:opacity-70"
                                        style={{ color: "#d4af37" }}
                                    >
                                        + Book Your First Session
                                    </button>
                                )}
                                {search && (
                                    <button
                                        onClick={() => setSearch("")}
                                        className="text-xs font-semibold uppercase tracking-widest transition-all hover:opacity-70"
                                        style={{ color: "#d4af37" }}
                                    >
                                        Clear filters
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}