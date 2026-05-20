import { useNavigate } from "react-router"

export default function NotFoundPage() {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
            <h1 className="text-[15rem] md:text-[20rem] font-serif text-white/[0.03] absolute z-0 select-none">404</h1>
            
            <div className="relative z-10 space-y-6">
                <h2 className="text-5xl font-serif text-white italic">Lost in <span className="text-[#c9a69a]">Time</span></h2>
                <p className="text-zinc-500 uppercase tracking-[0.5em] text-[10px] max-w-xs mx-auto leading-loose">
                    The archives you are seeking have been displaced or no longer exist.
                </p>
                
                <button 
                    onClick={() => navigate('/')} 
                    className="mt-10 px-12 py-4 border border-[#c9a69a]/30 text-[#c9a69a] text-[10px] uppercase tracking-[0.3em] rounded-full hover:bg-[#c9a69a] hover:text-white transition-all duration-500"
                >
                    Return to Present
                </button>
            </div>
        </div>
    )
}