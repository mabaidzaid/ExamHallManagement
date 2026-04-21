import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Calendar, 
    CheckCircle, 
    XCircle, 
    Clock, 
    Plus,
    Search,
    UserCheck,
    BookOpen,
    Trash2
} from 'lucide-react';
import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function AttendanceIndex({ attendances, stats, auth }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id) => {
        if(confirm('Are you sure you want to delete this record?')) {
            router.delete(route('attendance.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-gray-800 leading-tight">Attendance Registry</h2>
                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mt-1">Daily Presence & Monitoring</p>
                    </div>
                    <Link
                        href={route('attendance.mark')}
                        className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-700 transition shadow-lg shadow-blue-100 flex items-center gap-3 active:scale-95"
                    >
                        <Plus className="w-4 h-4" />
                        Mark Attendance
                    </Link>
                </div>
            }
        >
            <Head title="Attendance Registry" />

            <div className="py-12 px-4 md:px-8 max-w-7xl mx-auto space-y-8">
                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-50 flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Today's Date</p>
                            <p className="text-sm font-black text-gray-900">{new Date().toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-50 flex items-center gap-4">
                        <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                            <UserCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Today's Entries</p>
                            <p className="text-sm font-black text-gray-900">{stats?.today_count || 0}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-50 flex items-center gap-4">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Registry</p>
                            <p className="text-sm font-black text-gray-900">{stats?.total_records || 0} Records</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-100 border border-gray-100 overflow-hidden">
                    <div className="p-8 border-b border-gray-100 bg-gray-50/30">
                        <div className="relative max-w-md">
                            <span className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </span>
                            <input 
                                type="text" 
                                placeholder="Search by student, subject or date..."
                                className="block w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-[1.5rem] text-sm font-bold text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Student</th>
                                    <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Subject</th>
                                    <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Date</th>
                                    <th className="px-10 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Status</th>
                                    <th className="px-10 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {attendances.data.map((att) => (
                                    <tr key={att.id} className="hover:bg-blue-50/20 transition-colors group">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-[10px] shadow-lg shadow-blue-100 uppercase">
                                                    {att.student?.user?.name?.substring(0, 1) || 'S'}
                                                </div>
                                                <span className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition truncate max-w-[150px]">{att.student?.user?.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-2">
                                                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                                                <span className="text-xs font-bold text-gray-600 truncate max-w-[100px]">{att.subject?.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-2 text-gray-500 font-bold text-[11px]">
                                                <Clock className="w-3.5 h-3.5 text-gray-300" />
                                                {att.formatted_date}
                                            </div>
                                        </td>
                                        <td className="px-10 py-6 text-center">
                                            {(att.status?.toLowerCase() === 'present') ? (
                                                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-100 inline-flex items-center gap-1.5 shadow-sm">
                                                    <CheckCircle className="w-3 h-3" />
                                                    Present
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-[9px] font-black uppercase tracking-widest border border-red-100 inline-flex items-center gap-1.5 shadow-sm">
                                                    <XCircle className="w-3 h-3" />
                                                    Absent
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <button 
                                                onClick={() => handleDelete(att.id)}
                                                className="p-2 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all active:scale-95 shadow-sm hover:shadow-red-100"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {attendances.data.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-10 py-20 text-center text-gray-400 italic">
                                            No attendance records found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
