import type { CartItem, ProductFetchType } from "../utils/global";
 
const CART_URL = "http://localhost:3000/cart/";
 
export const getCartItems = async (): Promise<CartItem[]> => {
  try {
    const res = await fetch(CART_URL);
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("getCartItems error:", error);
    return [];
  }
};
 
export const addToCartServer = async (
  product: ProductFetchType
): Promise<boolean> => {
  try {
    const cartItems: CartItem[] = await getCartItems();
    const existingItem = cartItems.find((item) => item.id === product.id);
 
    if (existingItem) {
      const res = await fetch(CART_URL + existingItem.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: existingItem.quantity + 1 }),
      });
      return res.ok;
    } else {
      const newCartItem: CartItem = { ...product, quantity: 1 };
      const res = await fetch(CART_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCartItem),
      });
      return res.ok;
    }
  } catch (error) {
    console.error("addToCartServer error:", error);
    return false;
  }
};


 
export const removeFromCartServer = async (id: string): Promise<boolean> => {
  try {
    const res = await fetch(CART_URL + id, { method: "DELETE" });
    return res.ok;
  } catch (error) {
    console.error("removeFromCartServer error:", error);
    return false;
  }
};
 
export const updateCartQuantity = async (
  id: string,
  q: number
): Promise<boolean> => {
  try {
    const res = await fetch(CART_URL + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: q }),
    });
    return res.ok;
  } catch (error) {
    console.error("updateCartQuantity error:", error);
    return false;
  }
};