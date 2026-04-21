import React, { useState, useEffect } from 'react';
import { Zap, Ticket, Shield } from 'lucide-react';

export default function Splash({ onComplete }) {
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
                setIsVisible(false);
                if (onComplete) onComplete();
            }, 800);
        }, 2200);

        return () => clearTimeout(timer);
    }, [onComplete]);

    if (!isVisible) return null;

    return (
        <div className={`fixed inset-0 z-[99999] flex items-center justify-center bg-gray-900 transition-all duration-1000 ${isExiting ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'}`}>
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
            </div>

            <div className="relative flex flex-col items-center">
                {/* Logo Container */}
                <div className={`relative mb-8 transition-all duration-1000 delay-300 ${isExiting ? 'scale-50 opacity-0' : 'scale-100 opacity-100'}`}>
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-[2.5rem] shadow-2xl shadow-blue-500/40 flex items-center justify-center animate-bounce">
                        <Zap className="w-12 h-12 text-white" />
                    </div>
                    {/* Ring Animations */}
                    <div className="absolute inset-0 border-4 border-blue-400/30 rounded-[2.5rem] animate-[ping_3s_infinite]"></div>
                    <div className="absolute inset-0 border-2 border-indigo-400/20 rounded-[2.5rem] animate-[ping_4s_infinite] delay-500"></div>
                </div>

                {/* Text Content */}
                <div className="text-center">
                    <h1 className={`text-4xl font-black text-white uppercase tracking-[0.3em] mb-3 transition-all duration-1000 ${isExiting ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'}`}>
                        Exam<span className="text-blue-500">Hall</span>
                    </h1>
                    <div className={`flex items-center justify-center gap-3 text-blue-300/60 font-black text-[10px] uppercase tracking-[0.5em] transition-all duration-1000 delay-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
                        <Ticket className="w-3 h-3" />
                        Management System
                        <Shield className="w-3 h-3" />
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="absolute -bottom-24 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 animate-[loading_2s_ease-in-out_infinite]"></div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    50% { transform: translateX(0%); }
                    100% { transform: translateX(100%); }
                }
            `}} />
        </div>
    );
}
