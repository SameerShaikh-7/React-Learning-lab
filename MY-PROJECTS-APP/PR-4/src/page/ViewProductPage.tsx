import { useEffect, useState } from "react";
import type { ProductFetchType } from "../utils/global";
import { deleteProduct, fetchAllProducts } from "../Services/ProductService";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function ViewProductPage() {
  const [allProducts, setAllProduct] = useState<ProductFetchType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      const data = await fetchAllProducts();
      setAllProduct(data || []);
      setIsLoading(false);
    };
    loadProducts();
  }, []);

  const refetchProducts = async () => {
    setIsLoading(true);
    const data = await fetchAllProducts();
    setAllProduct(data || []);
    setIsLoading(false);
  };


  const handleDelete = async (id: string) => {
    const status = await deleteProduct(id);
    if (status) {
      toast.success("Archive updated (Item deleted)");
      await refetchProducts();
    } else {
      toast.error("Failed to delete. Please try again.");
    }
  };

  if (isLoading)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-t-2 border-[#c9a69a] rounded-full animate-spin"></div>
        <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mt-6 font-bold animate-pulse">
          Loading Archives...
        </p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto py-20 px-6">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif text-white italic">
            Archive <span className="text-[#c9a69a]">Gallery</span>
          </h1>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] mt-2">
            Manage your curated pieces
          </p>
        </div>
      </div>

      {allProducts.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900/40 rounded-[3rem] border border-white/5">
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em]">
            The archive is currently empty.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-zinc-900/40 rounded-[3rem] border border-white/5 shadow-2xl backdrop-blur-sm p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-8 py-6 text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">
                  Designation
                </th>
                <th className="px-8 py-6 text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">
                  Classification
                </th>
                <th className="px-8 py-6 text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">
                  Valuation
                </th>
                <th className="px-8 py-6 text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {allProducts.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={p.p_image}
                        className="w-12 h-12 rounded-full object-cover border border-white/10"
                        alt={p.p_name}
                      />
                      <span className="text-sm font-medium text-white">
                        {p.p_name}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-zinc-500 text-xs italic">
                    {p.p_category}
                  </td>
                  <td className="px-8 py-6 text-[#c9a69a] font-serif">
                    ₹{p.p_price.toLocaleString()}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center gap-6">
                      <button
                        onClick={() => navigate(`/edit-product/${p.id}`)}
                        className="text-[10px] uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => void handleDelete(p.id)}
                        className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-red-400 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}