import { Link } from '@inertiajs/react';
import Splash from '@/Components/Splash';
import { useState, useEffect } from 'react';

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
                {/* Header - Logo */}
                <Link href="/" className="flex flex-col items-center group mb-8">
                    <div className="w-20 h-20 rounded-2xl shadow-lg shadow-blue-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden bg-white/80 backdrop-blur-sm p-2">
                        <img src="/images/logo.png" alt="ExamHall" className="w-full h-full object-contain" />
                    </div>
                    <h1 className="mt-4 text-2xl font-black text-slate-900 uppercase tracking-[0.2em] leading-none">
                        Exam<span className="text-blue-600">Hall</span>
                    </h1>
                    <p className="mt-2 text-[9px] text-slate-400 font-bold uppercase tracking-[0.4em]">Integrated Exam Portal</p>
                </Link>

                {/* Form Container - Light Glassmorphism */}
                <div className="w-full sm:max-w-md px-10 py-10 bg-white border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] relative overflow-hidden">
                    <div className="absolute top-[-20px] right-[-20px] p-4 opacity-[0.03] pointer-events-none">
                        <img src="/images/logo.png" alt="" className="w-32 h-32 object-contain" />
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
