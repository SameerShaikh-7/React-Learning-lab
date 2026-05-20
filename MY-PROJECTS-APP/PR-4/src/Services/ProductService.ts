import type { ProductFetchType, ProductType } from "../utils/global";
 
const productURL = "http://localhost:3000/product/";
 
export const addProduct = async (body: ProductType): Promise<boolean> => {
  try {
    const res = await fetch(productURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch (error) {
    console.error("addProduct error:", error);
    return false;
  }
};
 
export const fetchAllProducts = async (): Promise<ProductFetchType[]> => {
  try {
    const res = await fetch(productURL);
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("fetchAllProducts error:", error);
    return [];
  }
};
 
export const fetchSingleProduct = async (
  id: string
): Promise<ProductFetchType | null> => {
  try {
    const res = await fetch(productURL + id);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("fetchSingleProduct error:", error);
    return null;
  }
};
 
export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    const res = await fetch(productURL + id, { method: "DELETE" });
    return res.ok;
  } catch (error) {
    console.error("deleteProduct error:", error);
    return false;
  }
};
 
export const updateProduct = async (body: ProductFetchType): Promise<boolean> => {
  try {
    const res = await fetch(productURL + body.id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch (error) {
    console.error("updateProduct error:", error);
    return false;
  }
};