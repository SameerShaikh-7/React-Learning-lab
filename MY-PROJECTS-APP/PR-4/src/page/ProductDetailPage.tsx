import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { fetchSingleProduct } from "../Services/ProductService";
import { addToCartServer } from "../Services/CartServices";
import type { ProductFetchType } from "../utils/global";
import { toast } from "react-toastify";

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductFetchType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;
    let cancelled = false;
    const load = async () => {
      setIsLoading(true);
      const data = await fetchSingleProduct(productId);
      if (!cancelled) {
        setProduct(data);
        setIsLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product) return;
    const status = await addToCartServer(product);
    if (status) {
      toast.success("Added to selection");
      window.dispatchEvent(new Event("cartUpdated"));
    } else {
      toast.error("Failed to add. Please try again.");
    }
  };

  if (isLoading)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-t-2 border-[#c9a69a] rounded-full animate-spin"></div>
        <p className="text-[10px] tracking-[0.5em] text-[#c9a69a] mt-6 uppercase">
          Syncing Archives...
        </p>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
        <h2 className="text-3xl font-serif text-white italic opacity-30">
          Product not found
        </h2>
        <p className="text-zinc-500 uppercase tracking-widest text-xs max-w-sm px-6">
          The artifact you are looking for is missing or the ID is corrupted.
        </p>
        <button
          onClick={() => navigate("/")}
          className="text-[10px] uppercase tracking-[0.4em] text-[#c9a69a] border-b border-[#c9a69a] pb-1 hover:text-white hover:border-white transition-all mt-4"
        >
          Return to Archives
        </button>
      </div>
    );

  return (
    <div className="text-white py-12 md:py-20 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="relative group">
          <div className="absolute inset-0 bg-[#c9a69a]/10 blur-[100px] rounded-full group-hover:bg-[#c9a69a]/20 transition-all"></div>
          <img
            src={product.p_image}
            className="relative z-10 w-full max-w-sm md:max-w-none mx-auto aspect-square object-cover rounded-full border border-white/10 shadow-2xl"
            alt={product.p_name}
          />
        </div>
        <div className="space-y-6 md:space-y-8 text-center md:text-left">
          <span className="text-[#c9a69a] text-[10px] uppercase tracking-[0.8em] font-bold">
            {product.p_category}
          </span>
          <h1 className="text-4xl md:text-6xl font-serif italic">{product.p_name}</h1>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-serif italic border-l-0 md:border-l border-[#c9a69a]/30 pl-0 md:pl-6">
            {product.p_description}
          </p>
          <div className="flex flex-col sm:flex-row items-center md:items-baseline justify-center md:justify-start gap-4 md:gap-6">
            <span className="text-4xl md:text-5xl font-serif text-[#c9a69a]">
              ₹{product.p_price.toLocaleString()}
            </span>
            <span className="text-zinc-600 text-[10px] uppercase tracking-widest">
              Stock: {product.p_stock} units
            </span>
          </div>
          <div className="pt-6 md:pt-10 flex flex-col sm:flex-row gap-4 md:gap-6">
            <button
              onClick={handleAddToCart}
              disabled={product.p_stock === 0}
              className="w-full sm:flex-1 bg-[#c9a69a] text-white py-4 md:py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {product.p_stock === 0 ? "Out of Stock" : "Acquire Piece"}
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-10 py-4 md:py-0 border border-white/10 rounded-full text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all text-white"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}