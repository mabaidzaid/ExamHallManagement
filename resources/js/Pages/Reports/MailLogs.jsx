import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Mail, Send, Calendar, User, Search, ShieldCheck } from 'lucide-react';

export default function MailLogs({ mails }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                        <Send className="w-8 h-8 text-indigo-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 leading-tight">Virtual Mail Audit</h2>
                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Digital outbound communication monitoring</p>
                    </div>
                </div>
            }
        >
            <Head title="Mail Audit" />

            <div className="py-8">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Intro Note for Supervisor */}
                    <div className="bg-gradient-to-r from-indigo-600 to-blue-700 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100 flex items-center justify-between">
                        <div className="max-w-xl">
                            <h3 className="text-lg font-black uppercase tracking-widest mb-2 flex items-center gap-3">
                                <ShieldCheck className="w-6 h-6" />
                                Institutional Sandbox Active
                            </h3>
                            <p className="text-sm font-medium opacity-80 leading-relaxed">
                                This dashboard displays all system-generated emails extracted from the institutional audit trail. This allows for content verification in a secure, serverless environment.
                            </p>
                        </div>
                        <div className="hidden lg:block">
                            <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/20">
                                Mode: Developer Audit
                            </span>
                        </div>
                    </div>

                    {/* Mail List */}
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50 border-bottom border-gray-100">
                                        <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Recipient (Student)</th>
                                        <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Message Subject</th>
                                        <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Transmission Date</th>
                                        <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {mails.length > 0 ? (
                                        mails.map((mail, idx) => (
                                            <tr key={idx} className="hover:bg-indigo-50/30 transition-all cursor-default group">
                                                <td className="px-10 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                                                            <User className="w-4 h-4 text-indigo-600 group-hover:text-white" />
                                                        </div>
                                                        <span className="text-sm font-bold text-gray-800">{mail.to}</span>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-6">
                                                    <p className="text-sm font-black text-gray-800 leading-tight mb-1">{mail.subject}</p>
                                                    <p className="text-[10px] text-gray-400 font-medium truncate max-w-xs">{mail.preview}</p>
                                                </td>
                                                <td className="px-10 py-6">
                                                    <div className="flex items-center gap-2 text-gray-500">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        <span className="text-[11px] font-bold">{mail.date}</span>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-6 text-right">
                                                    <span className="px-3 py-1.5 bg-green-50 text-green-600 text-[9px] font-black rounded-lg uppercase tracking-widest">
                                                        LOGGED
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-10 py-20 text-center">
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="p-4 bg-gray-50 rounded-full">
                                                        <Search className="w-10 h-10 text-gray-200" />
                                                    </div>
                                                    <p className="text-sm font-bold text-gray-400">No mail transactions found in audit trail yet.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
