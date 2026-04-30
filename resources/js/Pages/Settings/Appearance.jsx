import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Palette, Save, Upload, Type, Layout, CheckCircle2, Monitor } from 'lucide-react';

export default function Appearance({ settings }) {
    const { data, setData, post, processing, errors } = useForm({
        app_name: settings.app_name || 'ExamHall Management',
        app_tagline: settings.app_tagline || 'Simplifying institutional examination workflows',
        primary_color: settings.primary_color || '#2563eb',
        footer_text: settings.footer_text || '© 2024 ExamHall Management System',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('settings.appearance.save'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-100 rounded-lg">
                        <Palette className="w-8 h-8 text-pink-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 leading-tight">Appearance Management</h2>
                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Brand identity and white-labeling tools</p>
                    </div>
                </div>
            }
        >
            <Head title="Appearance Settings" />

            <div className="py-8 px-4 md:px-0">
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* 1. Brand Identity Card */}
                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                            <div className="px-10 py-8 bg-gradient-to-br from-pink-50/50 to-white border-b border-gray-100">
                                <h3 className="text-sm font-black text-pink-900 uppercase tracking-widest flex items-center gap-3">
                                    <Type className="w-5 h-5 text-pink-600" />
                                    Identity & Nomenclature
                                </h3>
                            </div>
                            
                            <div className="p-10 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="group">
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">System Display Name</label>
                                        <input
                                            type="text"
                                            value={data.app_name}
                                            onChange={e => setData('app_name', e.target.value)}
                                            className="w-full bg-gray-50 border-2 border-transparent focus:border-pink-500/10 focus:bg-white rounded-2xl p-4 text-sm font-bold text-gray-800 transition-all h-[56px]"
                                            placeholder="e.g. Global High School"
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Institutional Tagline</label>
                                        <input
                                            type="text"
                                            value={data.app_tagline}
                                            onChange={e => setData('app_tagline', e.target.value)}
                                            className="w-full bg-gray-50 border-2 border-transparent focus:border-pink-500/10 focus:bg-white rounded-2xl p-4 text-sm font-bold text-gray-800 transition-all h-[56px]"
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Dashboard Footer Text</label>
                                    <input
                                        type="text"
                                        value={data.footer_text}
                                        onChange={e => setData('footer_text', e.target.value)}
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-pink-500/10 focus:bg-white rounded-2xl p-4 text-sm font-bold text-gray-800 transition-all h-[56px]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. Visual Theme Card */}
                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                            <div className="px-10 py-8 bg-gradient-to-br from-indigo-50/50 to-white border-b border-gray-100">
                                <h3 className="text-sm font-black text-indigo-900 uppercase tracking-widest flex items-center gap-3">
                                    <Monitor className="w-5 h-5 text-indigo-600" />
                                    Atmosphere & Theme
                                </h3>
                            </div>
                            
                            <div className="p-10 space-y-8">
                                <div className="flex items-center gap-8">
                                    <div className="w-32 h-32 rounded-[2rem] border-4 border-white shadow-xl overflow-hidden relative group cursor-pointer" style={{ backgroundColor: data.primary_color }}>
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Palette className="w-8 h-8 text-white" />
                                        </div>
                                        <input 
                                            type="color" 
                                            value={data.primary_color}
                                            onChange={e => setData('primary_color', e.target.value)}
                                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Primary Theme Accent</label>
                                            <button 
                                                type="button"
                                                onClick={() => setData('primary_color', '#2563eb')}
                                                className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                                            >
                                                Reset to Default
                                            </button>
                                        </div>
                                        <h4 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-2">{data.primary_color}</h4>
                                        <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                            This color will be applied globally to buttons, active navigation states, and primary highlights across the dashboard.
                                         </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end p-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-12 py-5 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-3xl font-black uppercase tracking-[0.2em] shadow-xl shadow-pink-100 hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-4 text-[12px]"
                            >
                                <Save className="w-5 h-5" />
                                {processing ? 'Synchronizing...' : 'Save Appearance'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
