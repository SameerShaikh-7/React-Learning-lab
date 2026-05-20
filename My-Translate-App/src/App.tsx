import { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const translateText = async () => {
    if (!input.trim()) return;

    // Seedha API Call bina kisi loading ya error handling ke
    const response = await axios.post(
      "https://deep-translate1.p.rapidapi.com/language/translate/v2",
      {
        q: input,
        source: "en",
        target: "hi"
      },
      {
        headers: {
          "x-rapidapi-key": "d866718eacmsh643aafc9124fdf8p1f16cbjsn6e80b10719cd",
          "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
          "Content-Type": "application/json"
        }
      }
    );

    setOutput(response.data.data.translations.translatedText);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-3xl p-8 border border-slate-200">

        <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">
          Translation Web
        </h1>

        <div className="space-y-4">
          {/* Input Area */}
          <div>
            <label className="block text-sm font-semibold text-slate-500 mb-2 ml-1">Input</label>
            <textarea
              placeholder="Enter text..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
              rows={5}
            />
          </div>

          {/* Action Button */}
          <button
            onClick={translateText}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg active:scale-[0.97] transition-all"
          >
            Translate
          </button>

          {/* Output*/}
          <div>
            <label className="block text-sm font-semibold text-slate-500 mb-2 ml-1">Output</label>
            <textarea
              placeholder="Translation..."
              value={output}
              readOnly
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-blue-600 font-medium outline-none resize-none"
              rows={1}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;