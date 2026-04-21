import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Mail, Save, Server, Shield, Send, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function EmailSettings({ settings }) {
    const { data, setData, post, processing, errors } = useForm({
        mail_mailer: settings.mail_mailer || 'log',
        mail_host: settings.mail_host || 'smtp.mailtrap.io',
        mail_port: settings.mail_port || '2525',
        mail_username: settings.mail_username || '',
        mail_password: settings.mail_password || '',
        mail_encryption: settings.mail_encryption || 'tls',
        mail_from_address: settings.mail_from_address || 'noreply@examhall.com',
        mail_from_name: settings.mail_from_name || 'ExamHall Management',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('settings.email.save'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Mail className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 leading-tight">Email Management</h2>
                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">SMTP Configuration & Outbound Mail Service</p>
                    </div>
                </div>
            }
        >
            <Head title="Email Settings" />

            <div className="py-8 px-4 md:px-0">
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Developer Bypass Mode */}
                        <div className="bg-indigo-600 p-8 rounded-[2.5rem] shadow-xl shadow-indigo-100 flex items-center justify-between text-white border-4 border-white">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                                    <Shield className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-widest mb-1">Developer / Student Mode</h4>
                                    <p className="text-[10px] font-bold opacity-80 uppercase tracking-tighter">Bypass SMTP and use the Laravel 'Log' Driver for testing</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 bg-white/10 p-2 rounded-2xl border border-white/20">
                                <span className={`text-[10px] font-black uppercase ${data.mail_mailer === 'log' ? 'text-white' : 'text-white/40'}`}>Log Only</span>
                                <button 
                                    type="button"
                                    onClick={() => setData('mail_mailer', data.mail_mailer === 'log' ? 'smtp' : 'log')}
                                    className={`w-14 h-8 rounded-xl transition-all relative ${data.mail_mailer === 'log' ? 'bg-green-400' : 'bg-white/20'}`}
                                >
                                    <div className={`w-6 h-6 bg-white rounded-lg absolute top-1 transition-all shadow-sm ${data.mail_mailer === 'log' ? 'left-7' : 'left-1'}`}></div>
                                </button>
                                <span className={`text-[10px] font-black uppercase ${data.mail_mailer === 'smtp' ? 'text-white' : 'text-white/40'}`}>Live SMTP</span>
                            </div>
                        </div>

                        {/* Status Alert */}
                        {data.mail_mailer === 'smtp' ? (
                            <div className="bg-amber-50 border-2 border-amber-100 p-6 rounded-[2rem] flex items-start gap-4">
                                <AlertTriangle className="w-6 h-6 text-amber-600 mt-1 shrink-0" />
                                <div>
                                    <h4 className="text-sm font-black text-amber-900 uppercase tracking-tight mb-1">SMTP Configuration Active</h4>
                                    <p className="text-xs text-amber-700 font-medium leading-relaxed opacity-80">
                                        Email will be sent to real servers. Please verify these credentials.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-green-50 border-2 border-green-100 p-6 rounded-[2rem] flex items-start gap-4">
                                <CheckCircle2 className="w-6 h-6 text-green-600 mt-1 shrink-0" />
                                <div>
                                    <h4 className="text-sm font-black text-green-900 uppercase tracking-tight mb-1">Log Mirroring Active</h4>
                                    <p className="text-xs text-green-700 font-medium leading-relaxed opacity-80">
                                        Perfect for Students! No SMTP needed. All emails will show up in <code className="bg-green-100 px-1 rounded">storage/logs/laravel.log</code> instead of being sent.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* 1. SMTP Server Configuration */}
                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                            <div className="px-10 py-8 bg-gradient-to-br from-blue-50/50 to-white border-b border-gray-100">
                                <h3 className="text-sm font-black text-blue-900 uppercase tracking-widest flex items-center gap-3">
                                    <Server className="w-5 h-5 text-blue-600" />
                                    Mail Server (SMTP)
                                </h3>
                            </div>
                            
                            <div className="p-10 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="group">
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">SMTP Host</label>
                                        <input
                                            type="text"
                                            value={data.mail_host}
                                            onChange={e => setData('mail_host', e.target.value)}
                                            className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500/10 focus:bg-white rounded-2xl p-4 text-sm font-bold text-gray-800 transition-all h-[56px]"
                                            placeholder="e.g. smtp.gmail.com"
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">SMTP Port</label>
                                        <input
                                            type="text"
                                            value={data.mail_port}
                                            onChange={e => setData('mail_port', e.target.value)}
                                            className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500/10 focus:bg-white rounded-2xl p-4 text-sm font-bold text-gray-800 transition-all h-[56px]"
                                            placeholder="e.g. 587"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="group">
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Authentication Username</label>
                                        <input
                                            type="text"
                                            value={data.mail_username}
                                            onChange={e => setData('mail_username', e.target.value)}
                                            className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500/10 focus:bg-white rounded-2xl p-4 text-sm font-bold text-gray-800 transition-all h-[56px]"
                                        />
                                    </div>
                                    <div className="group">
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Secure Password</label>
                                        <input
                                            type="password"
                                            value={data.mail_password}
                                            onChange={e => setData('mail_password', e.target.value)}
                                            className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500/10 focus:bg-white rounded-2xl p-4 text-sm font-bold text-gray-800 transition-all h-[56px]"
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Encryption Protocol</label>
                                    <select
                                        value={data.mail_encryption}
                                        onChange={e => setData('mail_encryption', e.target.value)}
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500/10 focus:bg-white rounded-2xl p-4 text-sm font-bold text-gray-800 transition-all h-[56px] cursor-pointer appearance-none"
                                    >
                                        <option value="tls">TLS (Recommended)</option>
                                        <option value="ssl">SSL</option>
                                        <option value="none">No Encryption</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* 2. Sender Identity Card */}
                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                            <div className="px-10 py-8 bg-gradient-to-br from-indigo-50/50 to-white border-b border-gray-100">
                                <h3 className="text-sm font-black text-indigo-900 uppercase tracking-widest flex items-center gap-3">
                                    <Send className="w-5 h-5 text-indigo-600" />
                                    Outbound Identity
                                </h3>
                            </div>
                            
                            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">"From" Email Address</label>
                                    <input
                                        type="email"
                                        value={data.mail_from_address}
                                        onChange={e => setData('mail_from_address', e.target.value)}
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-indigo-500/10 focus:bg-white rounded-2xl p-4 text-sm font-bold text-gray-800 transition-all h-[56px]"
                                    />
                                </div>
                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">"From" Sender Name</label>
                                    <input
                                        type="text"
                                        value={data.mail_from_name}
                                        onChange={e => setData('mail_from_name', e.target.value)}
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-indigo-500/10 focus:bg-white rounded-2xl p-4 text-sm font-bold text-gray-800 transition-all h-[56px]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end p-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-12 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-100 hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-4 text-[12px]"
                            >
                                <Save className="w-5 h-5" />
                                {processing ? 'Updating...' : 'Save Configuration'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
