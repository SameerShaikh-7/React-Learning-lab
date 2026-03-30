import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BlogList from "./components/BlogList";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Hero />
      <BlogList />
      <Footer />
    </div>
  );
}

export default App;