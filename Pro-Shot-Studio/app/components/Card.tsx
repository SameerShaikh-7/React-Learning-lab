import { Check } from "lucide-react";

type CardProps = {
  title: string;
  price: string;
  features: string[];
  tag?: string;
  highlighted?: boolean;
};

export default function Card({ title, price, features, tag, highlighted = false }: CardProps) {
  return (
    <div
      className="relative flex flex-col rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1"
      style={{
        background: highlighted
          ? "linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.04))"
          : "rgba(255,255,255,0.03)",
        border: highlighted
          ? "1px solid rgba(212,175,55,0.35)"
          : "1px solid rgba(255,255,255,0.07)",
        boxShadow: highlighted
          ? "0 20px 60px rgba(212,175,55,0.08)"
          : "0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      {/* Tag */}
      {tag && (
        <div
          className="absolute -top-3 left-8 px-4 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest"
          style={{
            background: highlighted ? "#d4af37" : "rgba(255,255,255,0.08)",
            color: highlighted ? "#0a0a0a" : "#a0a0a0",
          }}
        >
          {tag}
        </div>
      )}

      {/* Title */}
      <h3
        className="text-2xl font-bold italic mb-1"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          color: highlighted ? "#d4af37" : "#ffffff",
        }}
      >
        {title}
      </h3>

      {/* Price */}
      <p
        className="text-4xl font-bold mt-3 mb-6"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          color: "#ffffff",
        }}
      >
        {price}
        <span className="text-sm font-normal ml-1" style={{ color: "#555" }}>
          / session
        </span>
      </p>

      {/* Divider */}
      <div
        className="mb-6"
        style={{
          height: "1px",
          background: highlighted
            ? "rgba(212,175,55,0.2)"
            : "rgba(255,255,255,0.06)",
        }}
      />

      {/* Features */}
      <ul className="flex flex-col gap-3 flex-1">
        {features.map((f, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm" style={{ color: "#a0a0a0" }}>
            <Check
              className="w-4 h-4 mt-0.5 shrink-0"
              style={{ color: highlighted ? "#d4af37" : "#555" }}
            />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="/addBooking"
        className="mt-8 block text-center py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
        style={{
          background: highlighted
            ? "linear-gradient(135deg, #d4af37, #b8962e)"
            : "rgba(255,255,255,0.06)",
          color: highlighted ? "#0a0a0a" : "#e0e0e0",
          border: highlighted ? "none" : "1px solid rgba(255,255,255,0.08)",
          letterSpacing: "0.04em",
        }}
      >
        Choose {title}
      </a>
    </div>
  );
}