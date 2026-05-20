import { useState } from "react";
import type { ProductType } from "../utils/global";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { addProduct } from "../Services/ProductService";

export default function AddProductPage() {
  const navigate = useNavigate();
  const [productData, setProductData] = useState<ProductType>({
    p_name: "",
    p_price: 0,
    p_stock: 0,
    p_image: "",
    p_category: "",
    p_description: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const productCategory = [
    "Heritage",
    "Contemporary",
    "Limited Edition",
    "Minimalist",
  ];

  const onHandleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setProductData((prev) => ({
      ...prev,
      [name]: name === "p_price" || name === "p_stock" ? Number(value) : value,
    }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    if (!productData.p_name.trim()) {
      newErrors.p_name = "Designation is required.";
      isValid = false;
    }
    if (!productData.p_description.trim()) {
      newErrors.p_description = "Description is required.";
      isValid = false;
    }
    if (!productData.p_price || productData.p_price <= 0) {
      newErrors.p_price = "Please enter a valid valuation.";
      isValid = false;
    }
    if (productData.p_stock === undefined || productData.p_stock === null || productData.p_stock <= 0) {
      newErrors.p_stock = "Please enter a valid availability number.";
      isValid = false;
    }
    if (!productData.p_category) {
      newErrors.p_category = "Please select a classification.";
      isValid = false;
    }
    if (!productData.p_image.trim()) {
      newErrors.p_image = "Visual reference URL is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onHandleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 
    
    if (!validateForm()) {
      toast.error("Please resolve the errors below.");
      return;
    }

    const status = await addProduct(productData);
    if (status) {
      toast.success("New masterpiece added to archives");
      navigate("/view-product");
    } else {
      toast.error("Failed to add product. Please try again.");
    }
  };

  const inputStyle =
    "w-full bg-zinc-900/50 border rounded-xl py-4 px-6 outline-none transition-all text-white placeholder:text-zinc-700";
  const labelStyle =
    "text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold mb-2 block ml-2";

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <div className="bg-zinc-900/40 p-12 rounded-[3rem] border border-white/5 shadow-2xl backdrop-blur-sm">
        <div className="mb-12">
          <h1 className="text-4xl font-serif text-white italic">
            Archive <span className="text-[#c9a69a]">New Piece</span>
          </h1>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] mt-2">
            Enter the details of the new acquisition
          </p>
        </div>

        <form onSubmit={onHandleSubmit} className="space-y-8" noValidate>
          <div>
            <label className={labelStyle}>Designation</label>
            <input
              type="text"
              name="p_name"
              value={productData.p_name}
              onChange={onHandleChange}
              placeholder="Product Name"
              className={`${inputStyle} ${errors.p_name ? 'border-red-500/50 focus:border-red-500/50' : 'border-white/5 focus:border-[#c9a69a]/50'}`}
            />
            {errors.p_name && <p className="text-red-500 text-xs mt-2 ml-2">{errors.p_name}</p>}
          </div>

          <div>
            <label className={labelStyle}>Description</label>
            <textarea
              name="p_description"
              value={productData.p_description}
              onChange={onHandleChange}
              placeholder="Narrative of the piece..."
              className={`${inputStyle} h-32 resize-none ${errors.p_description ? 'border-red-500/50 focus:border-red-500/50' : 'border-white/5 focus:border-[#c9a69a]/50'}`}
            />
            {errors.p_description && <p className="text-red-500 text-xs mt-2 ml-2">{errors.p_description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className={labelStyle}>Valuation (₹)</label>
              <input
                type="number"
                name="p_price"
                min={0}
                value={productData.p_price || ""}
                onChange={onHandleChange}
                placeholder="0"
                className={`${inputStyle} [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${errors.p_price ? 'border-red-500/50 focus:border-red-500/50' : 'border-white/5 focus:border-[#c9a69a]/50'}`}
                style={{ MozAppearance: 'textfield' }}
              />
              {errors.p_price && <p className="text-red-500 text-xs mt-2 ml-2">{errors.p_price}</p>}
            </div>
            <div>
              <label className={labelStyle}>Availability</label>
              <input
                type="number"
                name="p_stock"
                min={0}
                value={productData.p_stock || ""}
                onChange={onHandleChange}
                placeholder="Units"
                className={`${inputStyle} [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${errors.p_stock ? 'border-red-500/50 focus:border-red-500/50' : 'border-white/5 focus:border-[#c9a69a]/50'}`}
                style={{ MozAppearance: 'textfield' }}
              />
              {errors.p_stock && <p className="text-red-500 text-xs mt-2 ml-2">{errors.p_stock}</p>}
            </div>
          </div>

          <div>
            <label className={labelStyle}>Classification</label>
            <select
              name="p_category"
              value={productData.p_category}
              onChange={onHandleChange}
              className={`${inputStyle} appearance-none cursor-pointer ${errors.p_category ? 'border-red-500/50 focus:border-red-500/50' : 'border-white/5 focus:border-[#c9a69a]/50'}`}
            >
              <option value="">Select Category</option>
              {productCategory.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.p_category && <p className="text-red-500 text-xs mt-2 ml-2">{errors.p_category}</p>}
          </div>

          <div>
            <label className={labelStyle}>Visual Reference (URL)</label>
            <input
              type="url"
              name="p_image"
              value={productData.p_image}
              onChange={onHandleChange}
              placeholder="https://..."
              className={`${inputStyle} ${errors.p_image ? 'border-red-500/50 focus:border-red-500/50' : 'border-white/5 focus:border-[#c9a69a]/50'}`}
            />
            {errors.p_image && <p className="text-red-500 text-xs mt-2 ml-2">{errors.p_image}</p>}
          </div>

          <div className="flex items-center justify-between pt-10">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
            >
              ← Abandon
            </button>
            <button
              type="submit"
              className="bg-[#c9a69a] text-white px-12 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-xl shadow-[#c9a69a]/10"
            >
              Publish to Gallery
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}