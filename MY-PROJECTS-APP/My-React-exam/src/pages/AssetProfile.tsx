import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import type { CoinData } from '../types/market';
import PageSpinner from '../components/PageLoader';
import StatusAlert from '../components/StatusAlert';

const AssetProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [coin, setCoin] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoinDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get<CoinData[]>(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
        );
        const selectedCoin = response.data.find((item) => item.id === id);

        if (!selectedCoin) {
          throw new Error('Coin details not found');
        }

        setCoin(selectedCoin);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCoinDetail();
  }, [id]);

  if (loading) return <PageSpinner />;
  if (error) return <StatusAlert message={error} />;
  if (!coin) return null;

  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
  
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center text-xs font-extrabold uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors gap-2 group"
      >
        <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Back to Analytics
      </button>

      
      <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/30 space-y-10 relative overflow-hidden">
        <div className={`absolute top-0 left-0 right-0 h-1.5 ${isPositive ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
        
      
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-100 pb-8">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl shadow-inner">
              <img src={coin.image} alt={coin.name} className="w-14 h-14 object-contain" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">{coin.name}</h1>
              <span className="inline-flex items-center bg-indigo-50 text-indigo-700 text-[10px] uppercase font-extrabold tracking-widest px-2.5 py-1 rounded-md mt-2 border border-indigo-100">
                {coin.symbol}
              </span>
            </div>
          </div>
          <div className="sm:text-right bg-slate-50/80 border border-slate-100 p-4 rounded-2xl min-w-[180px]">
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-widest">Live Spot Rate</span>
            <span className="text-3xl font-black text-slate-900 tracking-tight">${coin.current_price.toLocaleString()}</span>
          </div>
        </div>

  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          <div className="bg-slate-50/40 border border-slate-100 rounded-2xl p-5 flex flex-col justify-between h-28 hover:border-slate-200 transition-colors">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Market Capitalization</span>
            <span className="text-lg font-extrabold text-slate-900 tracking-tight">${coin.market_cap.toLocaleString()}</span>
          </div>

          <div className="bg-slate-50/40 border border-slate-100 rounded-2xl p-5 flex flex-col justify-between h-28 hover:border-slate-200 transition-colors">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Total Volume (24h)</span>
            <span className="text-lg font-extrabold text-slate-900 tracking-tight">${coin.total_volume.toLocaleString()}</span>
          </div>

          <div className="bg-slate-50/40 border border-slate-100 rounded-2xl p-5 flex flex-col justify-between h-28 hover:border-emerald-100 transition-colors">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">24h High Range</span>
            <span className="text-lg font-extrabold text-emerald-600 tracking-tight">${coin.high_24h?.toLocaleString() ?? 'N/A'}</span>
          </div>

          <div className="bg-slate-50/40 border border-slate-100 rounded-2xl p-5 flex flex-col justify-between h-28 hover:border-rose-100 transition-colors">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">24h Low Range</span>
            <span className="text-lg font-extrabold text-rose-600 tracking-tight">${coin.low_24h?.toLocaleString() ?? 'N/A'}</span>
          </div>

          <div className="bg-slate-50/40 border border-slate-100 rounded-2xl p-5 md:col-span-2 flex justify-between items-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Price Momentum (24h)</span>
            <span className={`inline-flex items-center text-sm font-black px-4 py-1.5 rounded-xl border ${
              isPositive ? 'bg-emerald-50/60 text-emerald-700 border-emerald-100' : 'bg-rose-50/60 text-rose-700 border-rose-100'
            }`}>
              {isPositive ? '▲ +' : '▼ '}{coin.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AssetProfile;