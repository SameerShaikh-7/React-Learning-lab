import HeroSlider from "./components/Slider";
import Card from "./components/Card";
import { servicePackages } from "./utils/type";

export default function Home() {
  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Services Section */}
      <section className="py-28 px-6" id="services">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-xs font-semibold tracking-[0.4em] uppercase mb-4"
              style={{ color: "#d4af37" }}
            >
              What We Offer
            </p>
            <h2
              className="text-5xl md:text-6xl font-bold italic"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#ffffff",
              }}
            >
              Our Packages.
            </h2>
            <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: "#555", fontWeight: 300 }}>
              Transparent pricing, premium results. Every package includes natural retouching
              that respects your original appearance.
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
      </section>

      {/* Footer strip */}
      <div
        className="py-8 text-center text-xs tracking-widest uppercase"
        style={{
          color: "#333",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        © 2025 ProShots — Premium Studio. All rights reserved.
      </div>
    </main>
  );
}