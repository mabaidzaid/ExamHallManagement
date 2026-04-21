import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    ClipboardList, 
    Search, 
    Filter, 
    CheckCircle2, 
    XCircle, 
    Clock, 
    Users, 
    BarChart,
    ChevronRight,
    Download
} from 'lucide-react';

export default function ExamReport({ exams, selected }) {
    const { data, setData, get, processing } = useForm({
        exam_id: selected?.id || '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        get(route('reports.exam'), {
            preserveState: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <ClipboardList className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 leading-tight">Exam Completion Report</h2>
                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Audit eligibility, participation, and seat counts</p>
                    </div>
                </div>
            }
        >
            <Head title="Exam Report" />

            <div className="py-8 space-y-8">
                {/* Search Bar */}
                <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-100 border border-gray-100">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-end gap-6">
                        <div className="flex-1 w-full group">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Select Examination</label>
                            <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px]">
                                <div className="pl-4 pr-2 text-gray-400">
                                    <Filter className="w-5 h-5" />
                                </div>
                                <select 
                                    value={data.exam_id}
                                    onChange={e => setData('exam_id', e.target.value)}
                                    className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full cursor-pointer"
                                >
                                    <option value="">Choose an exam...</option>
                                    {exams.map(exam => (
                                        <option key={exam.id} value={exam.id}>{exam.title} ({exam.subject?.name})</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button 
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-10 h-[56px] rounded-2xl font-black uppercase tracking-widest text-[11px] hover:shadow-2xl hover:shadow-blue-200 transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50"
                        >
                            <Search className="w-4 h-4" />
                            Generate Report
                        </button>
                    </form>
                </div>

                {selected ? (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Stats Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <SmallStat label="Eligible Students" value={selected.eligibility_checks.filter(e => e.is_eligible).length} icon={CheckCircle2} color="emerald" />
                            <SmallStat label="Blocked Students" value={selected.eligibility_checks.filter(e => !e.is_eligible).length} icon={XCircle} color="red" />
                            <SmallStat label="Seats Allocated" value={selected.seat_allocations.length} icon={Users} color="blue" />
                        </div>

                        {/* Detailed Table */}
                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                            <div className="px-10 py-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/10">
                                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-3">
                                    <BarChart className="w-5 h-5 text-blue-600" />
                                    Student Participation Audit
                                </h3>
                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => window.open(route('reports.exam.download', { exam_id: selected.id }), '_blank')}
                                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition shadow-sm active:scale-95"
                                    >
                                        <Download className="w-4 h-4" />
                                        Export PDF
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50/30">
                                            <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Student</th>
                                            <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Roll #</th>
                                            <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Attendance %</th>
                                            <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                            <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Reason</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {selected.eligibility_checks.map((audit) => (
                                            <tr key={audit.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-10 py-6 text-sm font-bold text-gray-800">{audit.student?.user?.name}</td>
                                                <td className="px-10 py-6 text-sm font-bold text-gray-500 uppercase">{audit.student?.admission_number}</td>
                                                <td className="px-10 py-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                            <div 
                                                                className={`h-full rounded-full ${audit.attendance_percentage >= 75 ? 'bg-emerald-500' : 'bg-red-500'}`}
                                                                style={{ width: `${audit.attendance_percentage}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-xs font-black text-gray-700">{audit.attendance_percentage}%</span>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-6">
                                                    {audit.is_eligible ? (
                                                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full border border-emerald-100 uppercase tracking-widest">Approved</span>
                                                    ) : (
                                                        <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black rounded-full border border-red-100 uppercase tracking-widest">Blocked</span>
                                                    )}
                                                </td>
                                                <td className="px-10 py-6 text-[11px] font-bold text-gray-400 italic">
                                                    {audit.reason || 'N/A'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="min-h-[400px] flex flex-col items-center justify-center bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
                        <div className="p-6 bg-gray-50 rounded-full mb-6">
                            <ClipboardList className="w-12 h-12 text-gray-200" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-600">Select an exam to get started</h3>
                        <p className="text-gray-400 text-sm">Historical audits will appear here after selection</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

function SmallStat({ label, value, icon: Icon, color }) {
    const colors = {
        emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100',
        red: 'text-red-500 bg-red-50 border-red-100',
        blue: 'text-blue-600 bg-blue-50 border-blue-100',
    };

    return (
        <div className="bg-white p-8 rounded-[2rem] shadow-lg shadow-gray-100 border border-gray-50 flex items-center justify-between">
            <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-3xl font-black text-gray-900 tracking-tighter">{value}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${colors[color]}`}>
                <Icon className="w-6 h-6" />
            </div>
        </div>
    );
}
