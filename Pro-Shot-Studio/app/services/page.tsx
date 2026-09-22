import Card from "../components/Card";
import { servicePackages } from "../utils/type";

export default function ServicesPage() {
  return (
    <main className="min-h-screen px-6 pt-32 pb-24" style={{ background: "#0a0a0a" }}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.4em] mb-4"
            style={{ color: "#d4af37" }}
          >
            Pricing
          </p>
          <h1
            className="text-5xl md:text-7xl font-bold italic"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#ffffff" }}
          >
            Our Services.
          </h1>
          <p className="mt-5 text-base max-w-xl" style={{ color: "#555", fontWeight: 300 }}>
            Choose the package that fits your goals. Every tier includes our
            authenticity-first editing philosophy — no heavy filters, no artificial results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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