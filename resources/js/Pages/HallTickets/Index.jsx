import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { 
    Ticket, 
    Plus, 
    Download, 
    Eye, 
    Search, 
    Calendar, 
    CheckCircle2, 
    AlertCircle, 
    ChevronRight,
    Zap,
    Users
} from 'lucide-react';
import { useState } from 'react';

export default function HallTicketIndex({ hallTickets, exams, assignedExams = [], auth }) {
    const role = auth.user?.role || 'student';
    const isAdmin = ['admin', 'super_admin'].includes(role);
    const isStaff = role === 'staff';
    const isTeacher = role === 'teacher';
    const isStudent = role === 'student';
    const canManage = isAdmin || isStaff;
    const canViewList = isAdmin || isStaff || isTeacher;

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedExam, setSelectedExam] = useState('');

    const { data: genData, setData: setGenData, post: postGen, processing: genProcessing } = useForm({
        exam_id: '',
    });

    const handleSelfGenerate = (examId) => {
        router.post(route('hall-tickets.generate-me'), { exam_id: examId });
    };

    const { data, setData, post, processing, errors } = useForm({
        exam_id: '',
    });

    const handleGenerate = (e) => {
        e.preventDefault();
        post(route('hall-tickets.generate'), {
            onSuccess: () => {
                // Keep the filter after generation
            },
        });
    };

    const handleFilter = (examId) => {
        setData('exam_id', examId);
        router.get(route('hall-tickets.index'), { exam_id: examId }, {
            preserveState: true,
            replace: true
        });
    };

    const handleDownload = (id) => {
        window.open(route('hall-tickets.download', id), '_blank');
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-blue-100 rounded-2xl">
                            <Ticket className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-800 leading-tight">Hall Ticket Center</h2>
                            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mt-1">
                                {canManage ? 'Generate and Manage Examination Slips' : (isTeacher ? 'View and Audit Student Hall Tickets' : 'View and Download Your Exam Entries')}
                            </p>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Hall Tickets" />

            <div className="py-8 px-4 md:px-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    
                    {canViewList && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Generator Control */}
                            {canManage && (
                                <div className="lg:col-span-1">
                                    <form onSubmit={handleGenerate} className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 p-8 sticky top-24">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                            <Zap className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Generator</h3>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block px-1">Select Examination</label>
                                            <select
                                                value={data.exam_id}
                                                onChange={(e) => setData('exam_id', e.target.value)}
                                                className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl py-4 px-5 text-sm font-bold text-gray-700 transition-all outline-none"
                                            >
                                                <option value="">Choose an exam...</option>
                                                {exams.map(exam => (
                                                    <option key={exam.id} value={exam.id}>
                                                        {exam.title} - {exam.subject?.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.exam_id && <p className="text-red-500 text-[10px] font-bold mt-2 px-1 uppercase">{errors.exam_id}</p>}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={processing || !data.exam_id}
                                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] shadow-xl shadow-blue-200 hover:shadow-2xl transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                                        >
                                            <Plus className="w-5 h-5" />
                                            {processing ? 'Generating...' : 'Generate All Tickets'}
                                        </button>

                                        <p className="text-[9px] text-gray-400 font-bold text-center uppercase tracking-tighter px-4">
                                            This will create hall tickets for all students allocated to the selected exam.
                                        </p>
                                    </div>
                                </form>
                            </div>
                        )}
                        
                        {/* Ticket List Area */}
                        <div className={`${canManage ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-6`}>
                                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                                    <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                                        <div>
                                            <h3 className="text-[12px] font-black text-gray-900 uppercase tracking-widest">Generated Slips</h3>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Total: {hallTickets.total}</p>
                                        </div>
                                        <div className="relative group">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
                                            <input 
                                                type="text" 
                                                placeholder="Search student..." 
                                                className="bg-white border-0 rounded-xl py-2 pl-11 pr-4 text-[11px] font-bold focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-300 w-48 border border-gray-100"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-gray-50/50">
                                                    <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student Info</th>
                                                    <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Exam & Room</th>
                                                    <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Attendance Eligibility</th>
                                                    <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {hallTickets.data.map((ticket) => (
                                                    <tr key={ticket.id} className="group hover:bg-blue-50/20 transition-all duration-300">
                                                        <td className="px-6 py-5">
                                                            <div className="flex items-center gap-4">
                                                                <div className="relative group/dp">
                                                                    {ticket.student?.profile_picture ? (
                                                                        <img 
                                                                            src={`/storage/${ticket.student.profile_picture}`} 
                                                                            alt={ticket.student.user?.name} 
                                                                            className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-md group-hover/dp:scale-105 transition-transform"
                                                                        />
                                                                    ) : (
                                                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg border-2 border-white">
                                                                            {ticket.student?.user?.name?.charAt(0)}
                                                                        </div>
                                                                    )}
                                                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                                                                </div>
                                                                <div>
                                                                    <div className="text-base font-black text-gray-900 leading-tight group-hover:text-blue-600 transition tracking-tight">
                                                                        {ticket.student?.user?.name}
                                                                    </div>
                                                                    <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-0.5">
                                                                        ROLL: {ticket.student?.admission_number}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <div>
                                                                <div className="text-[10px] font-black text-gray-900 uppercase tracking-widest leading-none mb-2">
                                                                    {ticket.exam?.title}
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="px-2 py-1 bg-gray-50 text-gray-400 text-[9px] font-bold rounded-lg border border-gray-100 uppercase tracking-tighter">
                                                                        {ticket.seat_allocation?.room?.name || 'Unassigned'}
                                                                    </span>
                                                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                                                                        Seat: {ticket.seat_allocation?.seat_number ? ticket.seat_allocation.seat_number.replace('S-', '') : 'TBD'}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-5 text-center">
                                                            {(() => {
                                                                const eligibilityRecords = ticket.student?.eligibility || [];
                                                                const status = (Array.isArray(eligibilityRecords)) 
                                                                    ? eligibilityRecords.find(e => e.exam_id == ticket.exam_id)
                                                                    : null;

                                                                if (!status) return (
                                                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 text-gray-400 rounded-full border border-gray-100 italic text-[10px] font-black uppercase">
                                                                        Pending Audit
                                                                    </div>
                                                                );

                                                                const isFeeBlocked = status.reason && status.reason.toLowerCase().includes('fee');

                                                                return status.is_eligible ? (
                                                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100 text-[10px] font-black uppercase transition-all whitespace-nowrap">
                                                                        Approved
                                                                    </div>
                                                                ) : (
                                                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 ${isFeeBlocked ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-red-50 text-red-700 border-red-100'} rounded-full border text-[10px] font-black uppercase transition-all whitespace-nowrap`}>
                                                                        {status.reason || 'Blocked'}
                                                                    </div>
                                                                );
                                                            })()}
                                                        </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center justify-center gap-2">
                                                        {(() => {
                                                            const eligibilityRecords = ticket.student?.eligibility || [];
                                                            const status = (Array.isArray(eligibilityRecords)) 
                                                                ? eligibilityRecords.find(e => e.exam_id == ticket.exam_id)
                                                                : null;
                                                            const isAllowed = !status || status.is_eligible;

                                                            return (
                                                                <>
                                                                    <Link 
                                                                        href={isAllowed ? route('hall-tickets.slip', ticket.id) : '#'} 
                                                                        onClick={(e) => { if(!isAllowed) { e.preventDefault(); alert(`View Blocked: ${status?.reason || 'Restricted'}`); } }}
                                                                        className={`p-2 rounded-lg transition-all border shadow-sm active:scale-90 ${isAllowed ? 'bg-gray-50 text-gray-400 hover:bg-blue-600 hover:text-white border-gray-100' : 'bg-red-50 text-red-400 border-red-100 hover:bg-red-100 cursor-not-allowed'}`}
                                                                    >
                                                                        <Eye className="w-4 h-4" />
                                                                    </Link>
                                                                    <button 
                                                                        onClick={() => isAllowed ? handleDownload(ticket.id) : alert(`Download Blocked: ${status?.reason || 'Restricted'}`)} 
                                                                        className={`p-2 rounded-lg transition-all border shadow-sm active:scale-90 ${isAllowed ? 'bg-gray-50 text-gray-400 hover:bg-blue-600 hover:text-white border-gray-100' : 'bg-red-50 text-red-400 border-red-100 hover:bg-red-100 cursor-not-allowed'}`}
                                                                    >
                                                                        <Download className="w-4 h-4" />
                                                                    </button>
                                                                </>
                                                            );
                                                        })()}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {hallTickets.data.length === 0 && (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-20 text-center text-gray-400">
                                                    <Ticket className="w-12 h-12 mx-auto mb-4 opacity-10" />
                                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-50">No tickets generated yet</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isStudent && (
                <div className="space-y-8">
                     {/* Student Specific View */}
                     <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <h4 className="text-3xl font-black leading-tight mb-4">Your Hall Ticket portal.</h4>
                            <p className="text-blue-100 text-sm font-bold leading-relaxed opacity-80 mb-8 max-w-xl">
                                Please ensure you meet the 75% attendance threshold to access your exam slips. Check your assigned room and seat number below.
                            </p>
                        </div>
                        <Zap className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10 rotate-12 group-hover:rotate-45 transition-transform duration-700" />
                    </div>

                    {/* Pending Generation Section */}
                    {assignedExams.length > 0 && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                                    <Zap className="w-5 h-5 animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest leading-none">Pending Registration</h3>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Generate your tickets for upcoming exams</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                {assignedExams.map((exam) => (
                                    <div key={exam.id} className="bg-white rounded-[2rem] border-2 border-dashed border-amber-200 p-8 hover:border-amber-400 transition-all group relative overflow-hidden">
                                        <div className="relative z-10">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
                                                    <Calendar className="w-6 h-6" />
                                                </div>
                                                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-[9px] font-black uppercase tracking-widest">
                                                    Required
                                                </span>
                                            </div>
                                            <h4 className="text-lg font-black text-gray-900 mb-1">{exam.title}</h4>
                                            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-6">{exam.subject?.name}</p>
                                            
                                            <button 
                                                onClick={() => handleSelfGenerate(exam.id)}
                                                className="w-full py-4 bg-amber-600 text-white rounded-2xl font-black text-[12px] uppercase tracking-widest hover:bg-amber-700 transition active:scale-95 shadow-lg shadow-amber-100 flex items-center justify-center gap-2"
                                            >
                                                <Plus className="w-4 h-4" />
                                                Generate Ticket
                                            </button>
                                        </div>
                                        <Zap className="absolute -bottom-6 -right-6 w-24 h-24 text-amber-50 group-hover:text-amber-100 transition-colors" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Active Tickets Section */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest leading-none">Active Tickets</h3>
                            <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Your verified examination credentials</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {hallTickets.data.length > 0 ? (
                            hallTickets.data.map((ticket) => {
                                const eligibilityRecords = ticket.student?.eligibility || [];
                                const status = (Array.isArray(eligibilityRecords)) 
                                    ? eligibilityRecords.find(e => e.exam_id == ticket.exam_id)
                                    : null;
                                const isAllowed = !status || status.is_eligible;

                                return (
                                    <div key={ticket.id} className={`bg-white rounded-[2rem] border shadow-xl overflow-hidden group hover:scale-[1.02] transition-all duration-300 mb-6 ${isAllowed ? 'border-gray-100 shadow-gray-100' : 'border-red-100 shadow-red-50 grayscale-[0.5]'}`}>
                                        <div className="p-8 pb-4">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isAllowed ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
                                                    {isAllowed ? <Ticket className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                                                </div>
                                                <button 
                                                    onClick={() => {
                                                        if(isAllowed) {
                                                            handleDownload(ticket.id);
                                                        } else {
                                                            alert('DOWNLOAD BLOCKED: Your attendance is below 75%. Please visit the Administration Office to resolve this audit issue.');
                                                        }
                                                    }}
                                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition shadow-sm ${isAllowed ? 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white' : 'bg-red-600 text-white hover:bg-red-700 shadow-red-200'}`}
                                                >
                                                    {isAllowed ? 'Download PDF' : 'Download Blocked'}
                                                </button>
                                            </div>
                                            <h3 className={`text-lg font-black transition ${isAllowed ? 'text-gray-900 group-hover:text-blue-600' : 'text-red-900 group-hover:text-red-700'}`}>{ticket.exam?.title || 'Exam Title TBD'}</h3>
                                            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">{ticket.exam?.subject?.name || 'Subject TBD'}</p>
                                        </div>
                                        <div className="px-8 py-6 bg-gray-50/50 grid grid-cols-2 gap-4 border-t border-gray-100">
                                            <div>
                                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Room No</span>
                                                <span className="text-sm font-black text-gray-700">{ticket.seat_allocation?.room?.name || 'TBD'}</span>
                                            </div>
                                            <div>
                                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Seat Assignment</span>
                                                <span className={`text-sm font-black ${isAllowed ? 'text-blue-600' : 'text-red-600'}`}>#{ticket.seat_allocation?.seat_number || 'TBD'}</span>
                                            </div>
                                        </div>
                                        <div className={`px-8 py-4 flex justify-between items-center ${isAllowed ? 'bg-gray-100/30' : 'bg-red-50'}`}>
                                            <span className={`text-[8px] font-black uppercase tracking-widest ${isAllowed ? 'text-gray-400' : 'text-red-600 italic'}`}>
                                                {isAllowed ? 'Status: Active' : 'Attendance Restriction Active'}
                                            </span>
                                            {isAllowed ? (
                                                <Link href={route('hall-tickets.slip', ticket.id)} className="text-[10px] font-black text-blue-600 uppercase flex items-center gap-1">
                                                    View Digital Slip <ChevronRight className="w-3 h-3" />
                                                </Link>
                                            ) : (
                                                <button 
                                                    onClick={() => alert('VIEW BLOCKED: Short Attendance detected. Record needs Administrative Audit.')}
                                                    className="text-[10px] font-black text-red-600 uppercase flex items-center gap-1"
                                                >
                                                    Audit Warning <AlertCircle className="w-3 h-3" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-full py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                    <Ticket className="w-10 h-10 text-gray-200" />
                                </div>
                                <h4 className="text-xl font-black text-gray-800 uppercase tracking-widest mb-2">No Tickets Found</h4>
                                <p className="text-sm text-gray-400 max-w-sm font-medium">Your hall tickets will appear here once the administration generates them for your assigned exams.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
