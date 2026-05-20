import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchAllProducts } from "../Services/ProductService";
import { addToCartServer } from "../Services/CartServices";
import type { ProductFetchType } from "../utils/global";
import { toast } from "react-toastify";

export default function HomePage() {
  const [products, setProducts] = useState<ProductFetchType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addingId, setAddingId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    const loadProducts = async () => {
      setIsLoading(true);
      const data = await fetchAllProducts();
      if (!cancelled) {
        setProducts(data || []);
        setIsLoading(false);
      }
    };
    loadProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleAddToCart = async (e: React.MouseEvent, product: ProductFetchType) => {
    e.stopPropagation();
    
    if (addingId === product.id) return;
    setAddingId(product.id);
    
    const status = await addToCartServer(product);
    if (status) {
      toast.success("Piece added to your collection");
      window.dispatchEvent(new Event("cartUpdated"));
    } else {
      toast.error("Failed to add piece. Try again.");
    }
    setAddingId(null);
  };

  if (isLoading)
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-t-2 border-[#c9a69a] rounded-full animate-spin"></div>
        <p className="text-[10px] tracking-[0.5em] text-[#c9a69a] mt-6 uppercase">
          Syncing Archives...
        </p>
      </div>
    );

  return (
    <div className="space-y-20 md:space-y-32 py-12 md:py-20 px-4 md:px-6">
      <div className="text-center space-y-4 md:space-y-6">
        <h1 className="text-5xl sm:text-7xl md:text-9xl font-serif text-white tracking-tight">
          The <span className="italic text-[#c9a69a]">Analogy</span>
        </h1>
        <p className="text-[#8c7e7a] uppercase tracking-[0.4em] md:tracking-[0.6em] text-[9px] md:text-[10px]">
          Curated Heritage Timepieces
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-zinc-500 uppercase tracking-[0.4em] text-[10px]">
            No products in archives yet.
          </p>
          <button
            onClick={() => navigate("/add-product")}
            className="mt-6 text-[10px] uppercase tracking-[0.4em] text-[#c9a69a] border-b border-[#c9a69a] pb-1 hover:text-white hover:border-white transition-all"
          >
            Archive the first piece
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-16 gap-y-16 md:gap-y-32 max-w-7xl mx-auto">
          {products.map((item: ProductFetchType, index: number) => (
            <div
              key={item.id}
              className={`flex flex-col items-center group transition-all duration-1000 ${
                index % 2 !== 0 ? "md:mt-32" : ""
              }`}
            >
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 rounded-full border border-white/5 group-hover:border-[#c9a69a]/30 transition-all duration-1000 scale-125 group-hover:scale-100 pointer-events-none"></div>

                <div
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="w-full h-full rounded-full overflow-hidden border border-white/10 group-hover:border-[#c9a69a]/50 cursor-pointer z-10 relative bg-zinc-900"
                >
                  <img
                    src={item.p_image}
                    alt={item.p_name}
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                  />
                </div>

                <div className="absolute -bottom-4 right-4 md:right-8 z-20 bg-[#c9a69a] text-white px-4 md:px-6 py-2 rounded-full font-serif text-base md:text-xl opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 shadow-2xl pointer-events-none">
                  ₹{item.p_price.toLocaleString()}
                </div>
              </div>

              <div className="mt-10 md:mt-12 text-center space-y-3">
                <h3
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="text-xl md:text-2xl font-serif text-white tracking-wide cursor-pointer hover:text-[#c9a69a] transition-colors"
                >
                  {item.p_name}
                </h3>

                <button
                  onClick={(e) => void handleAddToCart(e, item)}
                  disabled={addingId === item.id || item.p_stock === 0}
                  className="
                    mt-1 px-6 py-2 rounded-full border border-[#c9a69a]/40
                    text-[10px] uppercase tracking-[0.4em] font-bold
                    text-[#c9a69a] hover:bg-[#c9a69a] hover:text-white hover:border-[#c9a69a]
                    transition-all duration-300
                    disabled:opacity-40 disabled:cursor-not-allowed
                    opacity-100 md:opacity-0 md:group-hover:opacity-100
                  "
                >
                  {item.p_stock === 0
                    ? "Out of Stock"
                    : addingId === item.id
                    ? "Adding..."
                    : "+ Acquire Piece"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}