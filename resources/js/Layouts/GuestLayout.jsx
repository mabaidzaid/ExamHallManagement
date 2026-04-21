import { Link } from '@inertiajs/react';
import Splash from '@/Components/Splash';
import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

export default function GuestLayout({ children }) {
    const [showSplash, setShowSplash] = useState(false);

    useEffect(() => {
        const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
        if (!hasSeenSplash) {
            setShowSplash(true);
            sessionStorage.setItem('hasSeenSplash', 'true');
        }
    }, []);

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 relative overflow-y-auto py-12 px-4 scrollbar-hide">
            {showSplash && <Splash onComplete={() => setShowSplash(false)} />}

            {/* Background Orbs - Light Mode */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-100 rounded-full blur-[100px]"></div>
            </div>

            <div className="z-10 w-full flex flex-col items-center drop-shadow-sm">
                {/* Header - Compact but Spaced */}
                <Link href="/" className="flex flex-col items-center group mb-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg shadow-blue-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Zap className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="mt-4 text-2xl font-black text-slate-900 uppercase tracking-[0.2em] leading-none">
                        Exam<span className="text-blue-600">Hall</span>
                    </h1>
                    <p className="mt-2 text-[9px] text-slate-400 font-bold uppercase tracking-[0.4em]">Integrated Exam Portal</p>
                </Link>

                {/* Form Container - Light Glassmorphism */}
                <div className="w-full sm:max-w-md px-10 py-10 bg-white border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] relative overflow-hidden">
                    <div className="absolute top-[-20px] right-[-20px] p-4 opacity-[0.05] pointer-events-none">
                        <Zap className="w-32 h-32 text-slate-900" />
                    </div>
                    
                    <div className="relative">
                        {children}
                    </div>
                </div>

                <p className="mt-10 text-[9px] text-slate-400 font-bold uppercase tracking-[0.4em]">
                    Enterprise Security &bull; {new Date().getFullYear()}
                </p>
            </div>
        </div>
    );
}
