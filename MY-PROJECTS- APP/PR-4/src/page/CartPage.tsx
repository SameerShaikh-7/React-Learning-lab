import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import type { CartItem } from "../utils/global";
import {
  getCartItems,
  removeFromCartServer,
  updateCartQuantity,
} from "../Services/CartServices";

export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const loadCart = async () => {
      setIsLoading(true);
      const data = await getCartItems();
      if (!cancelled) {
        setCartItems(data || []);
        setIsLoading(false);
      }
    };
    loadCart();
    return () => {
      cancelled = true;
    };
  }, []);

  const refetchCart = async () => {
    const data = await getCartItems();
    setCartItems(data || []);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleRemove = async (id: string) => {
    const status = await removeFromCartServer(id);
    if (status) {
      toast.success("Piece removed from selection");
      await refetchCart();
    } else {
      toast.error("Failed to remove. Please try again.");
    }
  };

  const handleQuantityChange = async (item: CartItem, delta: number) => {
    const newQty = item.quantity + delta;
    if (newQty < 1) {
      await handleRemove(item.id);
      return;
    }
    if (newQty > item.p_stock) {
      toast.error("Not enough stock available.");
      return;
    }
    const status = await updateCartQuantity(item.id, newQty);
    if (status) {
      await refetchCart();
    } else {
      toast.error("Failed to update quantity.");
    }
  };

  const handleClearAll = async () => {
    const results = await Promise.all(
      cartItems.map((item) => removeFromCartServer(item.id))
    );
    await refetchCart();
    if (results.every(Boolean)) {
      toast.success("Collection cleared");
    } else {
      toast.error("Some items could not be removed.");
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.p_price * item.quantity,
    0
  );

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-t-2 border-[#c9a69a] rounded-full animate-spin"></div>
        <p className="text-[10px] tracking-[0.5em] text-[#c9a69a] mt-6 uppercase">
          Retrieving Selection...
        </p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center space-y-6 px-4">
        <p className="text-zinc-600 uppercase tracking-[0.5em] text-[10px]">
          Your selection is empty
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-12 py-4 border border-[#c9a69a]/30 text-[#c9a69a] text-[10px] uppercase tracking-[0.3em] rounded-full hover:bg-[#c9a69a] hover:text-white transition-all duration-500"
        >
          Browse Archives
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-20">
      <div className="mb-10 md:mb-12 text-center sm:text-left">
        <h1 className="text-3xl md:text-4xl font-serif text-white italic">
          Your <span className="text-[#c9a69a]">Selection</span>
        </h1>
        <p className="text-zinc-500 text-[9px] md:text-[10px] uppercase tracking-[0.3em] mt-2">
          Curated pieces awaiting acquisition
        </p>
      </div>

      <div className="hidden md:block overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/40 backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/5 text-[#c9a69a] text-[10px] uppercase tracking-[0.4em]">
            <tr>
              <th className="px-8 py-6 font-bold">Piece</th>
              <th className="px-8 py-6 font-bold">Category</th>
              <th className="px-8 py-6 font-bold">Quantity</th>
              <th className="px-8 py-6 font-bold">Valuation</th>
              <th className="px-8 py-6 font-bold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {cartItems.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.p_image}
                      className="w-12 h-12 rounded-full object-cover border border-white/10 cursor-pointer"
                      alt={item.p_name}
                      onClick={() => navigate(`/product/${item.id}`)}
                    />
                    <span className="text-sm font-medium text-white">
                      {item.p_name}
                    </span>
                  </div>
                </td>

                <td className="px-8 py-6 text-zinc-500 text-xs italic">
                  {item.p_category}
                </td>

                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => void handleQuantityChange(item, -1)}
                      className="w-7 h-7 rounded-full border border-white/10 text-zinc-400 hover:border-[#c9a69a]/50 hover:text-[#c9a69a] transition-all flex items-center justify-center text-base leading-none"
                    >
                      −
                    </button>
                    <span className="text-white text-sm w-5 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => void handleQuantityChange(item, +1)}
                      disabled={item.quantity >= item.p_stock}
                      className="w-7 h-7 rounded-full border border-white/10 text-zinc-400 hover:border-[#c9a69a]/50 hover:text-[#c9a69a] transition-all flex items-center justify-center text-base leading-none disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                </td>

                <td className="px-8 py-6 text-[#c9a69a] font-serif">
                  ₹{(item.p_price * item.quantity).toLocaleString()}
                </td>

                <td className="px-8 py-6">
                  <div className="flex justify-center">
                    <button
                      onClick={() => void handleRemove(item.id)}
                      className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-red-400 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="block md:hidden space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-white/5 bg-zinc-900/40 backdrop-blur-md p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.p_image}
                className="w-14 h-14 rounded-full object-cover border border-white/10 cursor-pointer shrink-0"
                alt={item.p_name}
                onClick={() => navigate(`/product/${item.id}`)}
              />
              <div>
                <h3
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="text-white font-serif text-base tracking-wide cursor-pointer hover:text-[#c9a69a] transition-colors"
                >
                  {item.p_name}
                </h3>
                <p className="text-zinc-500 text-xs italic mt-0.5">{item.p_category}</p>
                <p className="text-[#c9a69a] font-serif text-xs mt-1">
                  ₹{item.p_price.toLocaleString()} each
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t border-white/5 sm:border-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => void handleQuantityChange(item, -1)}
                  className="w-8 h-8 rounded-full border border-white/10 text-zinc-400 flex items-center justify-center text-base"
                >
                  −
                </button>
                <span className="text-white font-medium text-sm w-4 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => void handleQuantityChange(item, +1)}
                  disabled={item.quantity >= item.p_stock}
                  className="w-8 h-8 rounded-full border border-white/10 text-zinc-400 flex items-center justify-center text-base disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>

              <div className="text-right flex flex-col items-end">
                <span className="text-[#c9a69a] font-serif text-base font-medium">
                  ₹{(item.p_price * item.quantity).toLocaleString()}
                </span>
                <button
                  onClick={() => void handleRemove(item.id)}
                  className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-red-400 transition-colors mt-0.5"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-white/5 mt-8">
        <button
          onClick={() => void handleClearAll()}
          className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-red-400 transition-colors order-2 sm:order-1"
        >
          Clear All Selection
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 w-full sm:w-auto order-1 sm:order-2 text-center sm:text-right">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-1">
              Total
            </p>
            <p className="text-3xl font-serif text-[#c9a69a]">
              ₹{total.toLocaleString()}
            </p>
          </div>
          <button
            onClick={() =>
              toast.success("Order placed — thank you for your acquisition")
            }
            className="w-full sm:w-auto bg-[#c9a69a] text-white px-12 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-xl shadow-[#c9a69a]/10"
          >
            Acquire All
          </button>
        </div>
      </div>

      <div className="pt-8 text-center sm:text-left">
        <button
          onClick={() => navigate("/")}
          className="text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
        >
          ← Continue Browsing
        </button>
      </div>
    </div>
  );
}



