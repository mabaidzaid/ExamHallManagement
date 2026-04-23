import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { 
    ShieldCheck, 
    ShieldAlert, 
    Users, 
    Zap, 
    Search,
    Filter,
    ArrowUpRight,
    TrendingUp,
    CheckCircle2,
    XCircle,
    Info,
    RefreshCw,
    ShieldOff,
    ShieldPlus,
    AlertTriangle
} from 'lucide-react';
import { useState } from 'react';

export default function EligibilityIndex({ students = [], exams = [], threshold = 75, selectedExamId = '', auth }) {
    const { post, processing, data, setData } = useForm({
        exam_id: selectedExamId || '',
        threshold: threshold
    });

    const [searchTerm, setSearchTerm] = useState('');

    const handleProcess = (e) => {
        e.preventDefault();
        if(!data.exam_id) return alert('Please select an exam first');
        post(route('eligibility.process'));
    };

    const handleToggle = (id) => {
        post(route('eligibility.toggle', id));
    };

    // When exam dropdown changes, reload page with the selected exam filter
    const handleExamFilter = (examId) => {
        setData('exam_id', examId);
        if (examId) {
            router.get(route('eligibility.index'), { exam_id: examId }, { preserveState: true, replace: true });
        }
    };

    const filteredStudents = students.filter(s => 
        s.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.admission_number.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const eligibleCount = students.filter(s => s.eligibility?.is_eligible).length;
    const ineligibleCount = students.filter(s => s.eligibility && !s.eligibility.is_eligible).length;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-gray-800 leading-tight">Eligibility & Attendance</h2>
                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mt-1">Short Attendance Audit System</p>
                    </div>
                    <div className="flex items-center gap-3">
                         <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl border border-blue-100">
                            <TrendingUp className="w-4 h-4 text-blue-600" />
                            <span className="text-[10px] font-black text-blue-700 uppercase">Requirement: {threshold}%</span>
                         </div>
                    </div>
                </div>
            }
        >
            <Head title="Attendance Eligibility" />

            <div className="py-12 px-4 md:px-8 max-w-7xl mx-auto space-y-8 pb-24">
                {selectedExamId ? (
                    <>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase">Total Students</span>
                                </div>
                                <h4 className="text-4xl font-black text-gray-900">{students.length}</h4>
                                <p className="text-xs text-gray-400 font-bold mt-2 italic">Captured from current session</p>
                            </div>

                            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-100 border-l-4 border-l-green-500">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Eligible</span>
                                </div>
                                <h4 className="text-4xl font-black text-green-600">{eligibleCount}</h4>
                                <p className="text-xs text-green-700 font-bold mt-2">Ready for Hall Ticket Generation</p>
                            </div>

                            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-100 border-l-4 border-l-red-500">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
                                        <ShieldAlert className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Not Allowed</span>
                                </div>
                                <h4 className="text-4xl font-black text-red-600">{ineligibleCount}</h4>
                                <p className="text-xs text-red-700 font-bold mt-2 italic">Blocked due to Short Attendance</p>
                            </div>
                        </div>
                    </>
                ) : null}

                {/* Processing Header */}
                <div className="bg-gray-900 p-10 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-10">
                        <Zap className="w-40 h-40" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Run Eligibility Audit</h3>
                        <p className="text-gray-400 text-sm font-bold mb-8 max-w-xl">
                            Select an exam to audit. Students with admin overrides will keep their manual status. 
                            If a student has short attendance but you want to allow them, use the "Manual Allow" button after processing.
                        </p>
                        
                        <form onSubmit={handleProcess} className="flex flex-wrap items-end gap-6">
                            <div className="flex-1 min-w-[300px]">
                                <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3 block">Target Examination</label>
                                <select 
                                    className="w-full bg-gray-800 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all text-white"
                                    value={data.exam_id}
                                    onChange={e => handleExamFilter(e.target.value)}
                                >
                                    <option value="">Select Examination</option>
                                    {(exams || []).map(e => (
                                        <option key={e.id} value={e.id}>{e.title}</option>
                                    ))}
                                </select>
                            </div>
                            <button 
                                type="submit"
                                disabled={processing}
                                className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-[12px] uppercase tracking-widest hover:bg-blue-700 transition active:scale-95 flex items-center gap-3 disabled:opacity-50"
                            >
                                <RefreshCw className={`w-5 h-5 ${processing ? 'animate-spin' : ''}`} />
                                Sync Calculations
                            </button>
                        </form>
                    </div>
                </div>

                {selectedExamId ? (
                    /* Students List */
                    <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-100 border border-gray-100 overflow-hidden">
                        <div className="p-8 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between">
                            <div className="relative w-96">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Search by name or ID..."
                                    className="w-full pl-12 pr-6 py-3 bg-white border-gray-200 rounded-2xl text-sm font-bold focus:ring-blue-500 transition-all"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-4 items-center">
                                {data.exam_id && (
                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                                        Showing: {exams.find(e => e.id == data.exam_id)?.title || 'Selected Exam'}
                                    </span>
                                )}
                                <button className="p-3 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition shadow-sm">
                                    <Filter className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Student / ID</th>
                                        <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Attendance Status</th>
                                        <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Percentage</th>
                                        <th className="px-10 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Decision</th>
                                        <th className="px-10 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredStudents.map((s) => (
                                        <tr key={s.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center font-black text-blue-600 text-xs shadow-sm">
                                                        {s.user?.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-black text-gray-900 block leading-tight">{s.user?.name}</span>
                                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                                                            {s.admission_number} / {s.classes?.[0]?.name || 'No Class'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-[10px] font-black text-blue-600">{s.attendance_stats?.present || 0} Present</span>
                                                    <span className="text-[10px] font-black text-gray-300">/</span>
                                                    <span className="text-[10px] font-black text-gray-500">{s.attendance_stats?.total || 0} Total</span>
                                                </div>
                                                <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                                                    <div 
                                                        className={`h-full transition-all duration-500 ${(s.attendance_stats?.percentage || 0) >= threshold ? 'bg-green-500' : 'bg-red-500'}`}
                                                        style={{ width: `${s.attendance_stats?.percentage || 0}%` }}
                                                    ></div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6">
                                                <span className={`text-lg font-black ${(s.attendance_stats?.percentage || 0) >= threshold ? 'text-green-600' : 'text-red-600'}`}>
                                                    {s.attendance_stats?.percentage || 0}%
                                                </span>
                                            </td>
                                            <td className="px-10 py-6 text-center">
                                                {!s.eligibility ? (
                                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-50 text-gray-400 rounded-full border border-gray-200">
                                                        <AlertTriangle className="w-3.5 h-3.5" />
                                                        <span className="text-[10px] font-black uppercase">Not Processed</span>
                                                    </div>
                                                ) : s.eligibility?.is_eligible ? (
                                                    <div className="inline-flex flex-col items-center gap-1">
                                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-100">
                                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                                            <span className="text-[10px] font-black uppercase">Approved</span>
                                                        </div>
                                                        {s.eligibility?.admin_override && (
                                                            <span className="text-[8px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                                                                Admin Override
                                                            </span>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="inline-flex flex-col items-center gap-1">
                                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 text-red-700 rounded-full border border-red-100">
                                                            <XCircle className="w-3.5 h-3.5" />
                                                            <span className="text-[10px] font-black uppercase">Not Allowed</span>
                                                        </div>
                                                        {s.eligibility?.admin_override && (
                                                            <span className="text-[8px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                                                                Admin Override
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-10 py-6 text-right">
                                                <button 
                                                    onClick={() => handleToggle(s.eligibility?.id)}
                                                    className={`px-4 py-2 border rounded-xl text-[10px] font-black uppercase transition-all shadow-sm active:scale-95 flex items-center gap-2 ml-auto ${
                                                        s.eligibility?.is_eligible 
                                                        ? 'bg-white border-red-200 text-red-600 hover:bg-red-50' 
                                                        : 'bg-white border-green-200 text-green-600 hover:bg-green-50'
                                                    }`}
                                                    disabled={!s.eligibility}
                                                >
                                                    {s.eligibility?.is_eligible ? (
                                                        <><ShieldOff className="w-3 h-3" /> Block Entry</>
                                                    ) : (
                                                        <><ShieldPlus className="w-3 h-3" /> Manual Allow</>
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-[2.5rem] p-20 text-center border-2 border-dashed border-gray-100">
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                            <Search className="w-10 h-10" />
                        </div>
                        <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-2">No Examination Selected</h4>
                        <p className="text-gray-400 text-sm font-bold max-w-sm mx-auto">
                            Please select an examination from the dropdown above to view student eligibility and attendance records.
                        </p>
                    </div>
                )}

                <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100 flex items-start gap-4">
                    <Info className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                    <div>
                        <h5 className="text-sm font-black text-blue-900 uppercase tracking-tight mb-1">System Logic Notice</h5>
                        <p className="text-xs text-blue-700 leading-relaxed font-bold opacity-80">
                            The student's eligibility status directly controls their access to Hall Tickets and Seat Allocation. 
                            If attendance is short but you want to allow the student, click "Manual Allow" — this sets an Admin Override 
                            that persists even when you re-run the eligibility audit. Each exam has its own separate eligibility record, 
                            so changing one exam's status does not affect another.
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
