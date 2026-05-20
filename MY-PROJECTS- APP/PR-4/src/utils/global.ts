export interface ProductType {
  p_name: string;
  p_category: string;
  p_price: number;
  p_stock: number;
  p_image: string;
  p_description: string;
}
 
export interface ProductFetchType extends ProductType {
  id: string;
}
 
export interface CartItem extends ProductFetchType {
  quantity: number;
}
