import { Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
export default function App() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#1e293b]">
      <Header />
      
 
      {/* Page Content */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Outlet />
      </main>
 
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
      <Footer />
    </div>

  );
}