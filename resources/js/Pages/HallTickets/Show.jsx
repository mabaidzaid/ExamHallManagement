import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Ticket, 
    Download, 
    Printer, 
    ChevronLeft,
    CheckCircle2,
    Calendar,
    MapPin,
    User,
    Info,
    Shield
} from 'lucide-react';

export default function HallTicketShow({ ticket, allTickets, auth }) {
    const handleDownload = () => {
        window.open(route('hall-tickets.download', ticket.id), '_blank');
    };
 
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link 
                            href={route('hall-tickets.index')}
                            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-black text-gray-800 leading-tight">Combined Examination Slip</h2>
                            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mt-1">Full Datesheet & Entry Verification</p>
                        </div>
                    </div>
                    <button 
                        onClick={handleDownload}
                        className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-700 transition active:scale-95 shadow-xl shadow-blue-100"
                    >
                        <Download className="w-4 h-4" />
                        Download PDF
                    </button>
                </div>
            }
        >
            <Head title={`Hall Ticket - ${auth.user?.name}`} />
 
            <div className="py-8 px-4 md:px-8 max-w-5xl mx-auto pb-20">
                {/* Physical Ticket Simulation */}
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200 border border-gray-100 overflow-hidden relative mb-12">
                    {/* Header Strip */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-2"></div>
                    
                    {/* Official Banner */}
                    <div className="px-10 py-10 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 bg-gray-50/50">
                        <div className="text-center md:text-left">
                            <h1 className="text-2xl font-black text-blue-900 uppercase tracking-tight">Global International School</h1>
                            <p className="text-[10px] text-blue-600 font-black uppercase tracking-[0.3em] mt-1">Official Datesheet & Hall Ticket</p>
                        </div>
                        <div className="px-4 py-2 bg-white border border-blue-100 rounded-xl">
                            <span className="text-[10px] font-black text-gray-400 uppercase block tracking-tighter">Student Reference</span>
                            <span className="text-sm font-black text-blue-700">{ticket.student?.admission_number}</span>
                        </div>
                    </div>
 
                    <div className="p-10 flex flex-col gap-12">
                        <div className="flex flex-col md:flex-row items-start gap-10">
                            {/* Student Info & Photo */}
                            <div className="w-40 space-y-4 shrink-0">
                                <div className="aspect-square bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 overflow-hidden flex items-center justify-center relative group">
                                    {ticket.student?.profile_picture ? (
                                        <img 
                                            src={ticket.student.profile_picture.startsWith('http') ? ticket.student.profile_picture : `/storage/${ticket.student.profile_picture}`} 
                                            alt="" 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <User className="w-20 h-20 text-gray-200" />
                                    )}
                                </div>
                                <div className="p-3 bg-green-50 rounded-2xl text-center">
                                    <span className="text-[9px] font-black text-green-700 uppercase tracking-widest">AUTHORIZED</span>
                                </div>
                            </div>
 
                            {/* Examination Details */}
                            <div className="flex-1 space-y-6">
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Student Name</label>
                                        <p className="text-xl font-black text-gray-900">{ticket.student?.user?.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Total Exams</label>
                                        <p className="text-xl font-black text-blue-600">{allTickets.length} Scheduled</p>
                                    </div>
                                </div>

                                <div className="bg-white border-2 border-gray-100 rounded-[2rem] overflow-hidden">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-gray-50 border-b border-gray-100">
                                                <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Subject</th>
                                                <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Schedule</th>
                                                <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Room / Seat</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {allTickets.map(t => (
                                                <tr key={t.id} className="hover:bg-blue-50/30 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <span className="text-xs font-black text-gray-900 block">{t.exam?.subject?.name}</span>
                                                        <span className="text-[9px] text-gray-400 font-bold uppercase">{t.exam?.title}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-xs font-bold text-gray-700 block">{t.exam?.exam_date}</span>
                                                        <span className="text-[9px] text-blue-500 font-black uppercase">{t.exam?.start_time} - {t.exam?.end_time}</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="inline-flex items-center gap-2">
                                                            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-[9px] font-black uppercase">{t.seat_allocation?.room?.name}</span>
                                                            <span className="text-xs font-black text-blue-700">Seat: {t.seat_allocation?.seat_number ? t.seat_allocation.seat_number.replace('S-', '') : 'N/A'}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Security Notice */}
                        <div className="p-6 bg-red-50 rounded-2xl flex items-start gap-4">
                            <Shield className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                            <div>
                                <h5 className="text-sm font-black text-red-900 uppercase tracking-tight mb-1">Security & Integrity Protocol</h5>
                                <p className="text-xs text-red-700 leading-relaxed font-bold opacity-80">
                                    This hall ticket is digitally signed and encrypted. Tampering with the seat number or identification data will result in immediate disqualification. Please carry a physical printout to the hall.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Auth */}
                    <div className="px-10 py-8 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Verified Digital Asset</span>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-tight">System Generated On</p>
                            <p className="text-[10px] font-black text-gray-800">{new Date(ticket.generated_at).toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* Print Assist */}
                <div className="mt-8 flex justify-center">
                    <p className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        <Info className="w-4 h-4" />
                        Best viewed at 100% zoom and printed on A4 Paper
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
