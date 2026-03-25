import { useState } from "react";


function App() {
const quotes = [
  { text: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
  { text: "Do something today that your future self will thank you for.", author: "Unknown" },

  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Happiness depends upon ourselves.", author: "Aristotle" },
  { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
  { text: "Everything you can imagine is real.", author: "Pablo Picasso" },
];

  const [quote, setQuote] = useState(quotes[0]);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] text-white flex flex-col items-center justify-center p-6">

      {/* Dynamic Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>


      <main className="relative z-10 w-full max-w-lg">
        <div className="group relative">
          {/* Outer Border Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

          <div className="relative bg-gray-900/40 border border-white/10 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl flex flex-col items-center">


            <div className="min-h-[120px] flex items-center">
              <p className="text-2xl md:text-3xl font-semibold leading-snug text-center text-gray-100 tracking-tight">
                "{quote.text}"
              </p>
            </div>

            <div className="mt-8 flex items-center justify-center">
              <h3 className="text-blue-400 font-medium tracking-wide uppercase text-sm">
                {quote.author}
              </h3>
            </div>

            <button
              onClick={getRandomQuote}
              className="mt-10 group/btn relative inline-flex items-center justify-center w-full px-8 py-4 font-bold text-white transition-all duration-200 bg-blue-600 rounded-2xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.3)] active:scale-95"
            >
              <span className="relative flex items-center gap-2">
                Get New Quote
                <i className="fas fa-arrow-right text-xs group-hover/btn:translate-x-1 transition-transform"></i>
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;