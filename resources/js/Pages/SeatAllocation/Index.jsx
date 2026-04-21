import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, router, usePage } from '@inertiajs/react';
import { 
    Users, 
    ArrowLeft, 
    Plus, 
    Trash2, 
    Zap, 
    LayoutGrid, 
    MapPin,
    Search,
    UserCheck,
    Calendar,
    ChevronRight,
    Loader2,
    ShieldAlert,
    AlertTriangle,
    Info
} from 'lucide-react';
import { useState } from 'react';

export default function SeatAllocationIndex({ allocations, exams, auth }) {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        exam_id: '',
    });

    const [isAllocating, setIsAllocating] = useState(false);

    const handleAutoAllocate = (e) => {
        e.preventDefault();
        if (!data.exam_id) return;
        
        setIsAllocating(true);
        post(route('seat-allocation.auto'), {
            onSuccess: () => {
                setIsAllocating(false);
            },
            onError: () => setIsAllocating(false),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Users className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 leading-tight">Seat Allocation</h2>
                            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest text-left">Manage student seating and room shifting</p>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Seat Allocation" />

            <div className="py-8 px-4 md:px-8">
                <div className="max-w-7xl mx-auto space-y-8">

                    {/* Flash Messages */}
                    {(flash?.success || flash?.warning || flash?.error) && (
                        <div className={`p-5 rounded-[2rem] border flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500 ${
                            flash.warning ? 'bg-amber-50 border-amber-100 text-amber-800 shadow-xl shadow-amber-50' : 
                            flash.success ? 'bg-emerald-50 border-emerald-100 text-emerald-800 shadow-xl shadow-emerald-50' :
                            'bg-red-50 border-red-100 text-red-800 shadow-xl shadow-red-50'
                        }`}>
                            <div className={`p-3 rounded-2xl ${
                                flash.warning ? 'bg-amber-100/50 text-amber-600' : 
                                flash.success ? 'bg-emerald-100/50 text-emerald-600' :
                                'bg-red-100/50 text-red-600'
                            }`}>
                                {flash.warning ? <AlertTriangle className="w-6 h-6" /> : flash.success ? <UserCheck className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
                            </div>
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-widest leading-none mb-1">
                                    {flash.warning ? 'Audit Notice' : flash.success ? 'System Success' : 'Security Alert'}
                                </h4>
                                <p className="text-sm font-bold opacity-80">{flash.success || flash.warning || flash.error}</p>
                            </div>
                        </div>
                    )}
                    
                    {/* Attendance Policy Notice */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] p-4 p-8 text-white relative overflow-hidden group shadow-2xl">
                        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                            <div className="w-16 h-16 bg-blue-500/20 rounded-[2rem] flex items-center justify-center text-blue-400 border border-blue-500/20 shrink-0">
                                <ShieldAlert className="w-8 h-8" />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h4 className="text-lg font-black uppercase tracking-[0.2em] text-blue-400 mb-2">Automated Eligibility Filter Active</h4>
                                <p className="text-sm font-bold text-gray-400 leading-relaxed max-w-2xl">
                                    The system is currently enforcing the <span className="text-white">75% attendance rule</span>. Students who do not meet this threshold are automatically excluded from seat allocation and examination slip generation.
                                </p>
                            </div>
                            <div className="hidden lg:flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/5 whitespace-nowrap">
                                <Info className="w-4 h-4 text-blue-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Audit Policy: v2.0</span>
                            </div>
                        </div>
                        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all duration-700"></div>
                    </div>
                    
                    {/* Control Panel */}
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden text-left">
                        <div className="px-10 py-8 bg-gradient-to-r from-blue-50 to-white flex items-center justify-between border-b border-gray-100">
                            <div>
                                <h3 className="text-sm font-black text-blue-900 uppercase tracking-[0.2em] flex items-center gap-3 leading-none">
                                    <Zap className="w-5 h-5 text-blue-600" />
                                    Smart Allocation Engine
                                </h3>
                                <p className="text-[11px] text-gray-400 font-bold uppercase mt-2">Trigger automated seat assignment for examinations</p>
                            </div>
                        </div>
                        <div className="p-10">
                            <form onSubmit={handleAutoAllocate} className="flex flex-col md:flex-row gap-6 items-end">
                                <div className="flex-1 w-full">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 px-1">Choose Target Examination</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-500 transition" />
                                        <select
                                            value={data.exam_id}
                                            onChange={e => setData('exam_id', e.target.value)}
                                            className="w-full bg-gray-50 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-blue-500 text-sm font-bold p-5 pl-14 transition"
                                        >
                                            <option value="">-- Select Exam to Allocate --</option>
                                            {exams.map(exam => (
                                                <option key={exam.id} value={exam.id}>{exam.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.exam_id && <p className="mt-2 text-xs text-red-500 font-bold">{errors.exam_id}</p>}
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing || isAllocating || !data.exam_id}
                                    className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-700 transition shadow-lg shadow-blue-200 active:scale-[0.98] disabled:opacity-50 flex items-center gap-3 whitespace-nowrap"
                                >
                                    {isAllocating ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Running Engine...
                                        </>
                                    ) : (
                                        <>
                                            <Zap className="w-4 h-4" />
                                            Run Auto Allocation
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Allocation List */}
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden text-left text-left">
                        <div className="px-10 py-8 bg-gray-50/50 flex items-center justify-between border-b border-gray-100">
                             <div>
                                <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em] flex items-center gap-3 leading-none">
                                    <LayoutGrid className="w-5 h-5 text-blue-600" />
                                    Active Allotments
                                </h3>
                                <p className="text-[11px] text-gray-400 font-bold uppercase mt-2">Currently assigned student seating list</p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-50 text-left">
                                        <th className="px-4 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Student</th>
                                        <th className="px-4 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Examination</th>
                                        <th className="px-4 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Room</th>
                                        <th className="px-4 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center leading-none">Seat</th>
                                        <th className="px-4 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center leading-none">Status</th>
                                        <th className="px-4 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right leading-none">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {allocations.data.length > 0 ? (
                                        allocations.data.map((alloc) => (
                                            <tr key={alloc.id} className="group hover:bg-blue-50/30 transition-colors">
                                                <td className="px-4 py-6">
                                                    <div className="flex items-center gap-2">
                                                        {alloc.student?.profile_picture ? (
                                                            <img 
                                                                src={`/storage/${alloc.student.profile_picture}`} 
                                                                alt={alloc.student.user?.name} 
                                                                className="w-8 h-8 rounded-lg object-cover shadow-sm border border-gray-100 shrink-0"
                                                            />
                                                        ) : (
                                                            <div className="w-8 h-8 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center text-blue-600 font-bold text-[10px] shrink-0">
                                                                {alloc.student?.user?.name?.charAt(0)}
                                                            </div>
                                                        )}
                                                        <div className="min-w-0">
                                                            <div className="font-bold text-gray-900 text-xs truncate max-w-[100px]">{alloc.student?.user?.name}</div>
                                                            <div className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Roll: {alloc.student?.admission_number}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-6 font-bold text-gray-600 text-xs truncate max-w-[120px]">
                                                    {alloc.exam?.title}
                                                </td>
                                                <td className="px-4 py-6">
                                                    <div className="flex items-center gap-1.5 text-indigo-600 font-bold text-xs">
                                                        <MapPin className="w-3.5 h-3.5" />
                                                        {alloc.room?.name}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-6 text-center">
                                                    <span className="inline-flex px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-[10px] font-black whitespace-nowrap">
                                                        {alloc.seat_number}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-6 text-center">
                                                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest whitespace-nowrap ${
                                                        alloc.status === 'shifted' ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'
                                                    }`}>
                                                        {alloc.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-6 text-right">
                                                    <button 
                                                        onClick={() => {
                                                            if(confirm('Are you sure you want to remove this student from the seat allocation?')) {
                                                                router.delete(route('seat-allocation.destroy', alloc.id));
                                                            }
                                                        }}
                                                        className="p-2 text-gray-400 hover:text-red-600 transition"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="py-20 text-center">
                                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Search className="w-8 h-8 text-gray-200" />
                                                </div>
                                                <p className="text-gray-400 font-bold uppercase text-[11px] tracking-widest">No allocations generated yet</p>
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
