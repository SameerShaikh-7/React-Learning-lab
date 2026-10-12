import Card from "../components/Card";
import { servicePackages } from "../utils/type";

export default function ServicesPage() {
  return (
    <main className="min-h-screen px-4 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-24" style={{ background: "#0a0a0a" }}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 sm:mb-16">
          <p
            className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-3 sm:mb-4"
            style={{ color: "#d4af37" }}
          >
            Pricing
          </p>
          <h1
            className="text-3xl sm:text-5xl md:text-7xl font-bold italic"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#ffffff" }}
          >
            Our Services.
          </h1>
          <p className="mt-3 sm:mt-5 text-sm sm:text-base max-w-xl" style={{ color: "#777", fontWeight: 300 }}>
            Choose the package that fits your goals. Every tier includes our
            authenticity-first editing philosophy — no heavy filters, no artificial results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {servicePackages.map((pkg, idx) => (
            <Card
              key={idx}
              title={pkg.title}
              price={pkg.price}
              features={pkg.features}
              tag={pkg.tag}
              highlighted={idx === 1}
            />
          ))}
        </div>
      </div>
    </main>
  );
}