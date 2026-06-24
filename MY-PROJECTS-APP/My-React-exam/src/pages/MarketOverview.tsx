import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import type { CoinData } from '../types/market';
import PageSpinner from '../components/PageLoader';
import StatusAlert from '../components/StatusAlert';

const MarketOverview: React.FC = () => {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const response = await axios.get<CoinData[]>(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
        );
        setCoins(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <PageSpinner />;
  if (error) return <StatusAlert message={error} />;

  return (
    <div className="space-y-10">
     
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gradient-to-r from-slate-900 to-indigo-950 p-6 md:p-8 rounded-3xl shadow-xl shadow-indigo-950/10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="z-10">
          <h2 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            Global Digital Assets
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-2 max-w-md uppercase tracking-wider">
            Real-time market analytics and volume insights.
          </p>
        </div>
        
  
        <div className="relative w-full lg:w-96 z-10">
          <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search asset, token, ticker..."
            className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl text-sm font-medium text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all duration-300"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
        </div>
      </div>


      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
                <th className="py-5 px-8 w-20 text-center">Rank</th>
                <th className="py-5 px-6">Asset Name</th>
                <th className="py-5 px-6 text-right">Current Price</th>
                <th className="py-5 px-8 text-right">Market Cap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/70">
              {filteredCoins.length > 0 ? (
                filteredCoins.map((coin) => (
                  <tr
                    key={coin.id}
                    onClick={() => navigate(`/coin/${coin.id}`)}
                    className="hover:bg-slate-50/70 cursor-pointer transition-all duration-200 group"
                  >
                   
                    <td className="py-5 px-8 text-center">
                      <span className="inline-flex items-center justify-center bg-slate-100/80 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-lg group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                        {coin.market_cap_rank}
                      </span>
                    </td>
                    
                  
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <div className="p-1.5 bg-slate-50 border border-slate-100 rounded-xl group-hover:bg-white transition-colors">
                          <img src={coin.image} alt={coin.name} className="w-8 h-8 object-contain" />
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block group-hover:text-emerald-600 transition-colors tracking-tight">
                            {coin.name}
                          </span>
                          <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-widest bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                            {coin.symbol}
                          </span>
                        </div>
                      </div>
                    </td>
                    
                  
                    <td className="py-5 px-6 text-right font-bold text-sm text-slate-900 tracking-tight">
                      ${coin.current_price.toLocaleString()}
                    </td>
                    
                  
                    <td className="py-5 px-8 text-right font-semibold text-sm text-slate-500 tracking-tight">
                      ${coin.market_cap.toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-20 text-sm font-medium text-slate-400">
                    <span className="block text-2xl mb-2">💡</span> No matching digital assets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;