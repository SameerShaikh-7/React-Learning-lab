import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../page/HomePage";
import AddProductPage from "../page/AddProductPage";
import ViewProductPage from "../page/ViewProductPage";
import NotFoundPage from "../page/NotFoundPage";
import EditProductPage from "../page/EditProductPage";
import ProductDetailPage from "../page/ProductDetailPage";
import CartPage from "../page/CartPage";
 
export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: HomePage },
      { path: "add-product", Component: AddProductPage },
      { path: "view-product", Component: ViewProductPage },
      { path: "edit-product/:productId", Component: EditProductPage },
      { path: "product/:productId", Component: ProductDetailPage },
      { path: "cart", Component: CartPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
 