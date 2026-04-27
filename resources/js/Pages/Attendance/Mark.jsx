import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { 
    Users, 
    Calendar, 
    BookOpen, 
    CheckCircle2, 
    AlertCircle,
    ChevronLeft,
    Save,
    Search,
    RefreshCw
} from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import InputError from '@/Components/InputError';

export default function AttendanceMark({ classes, subjects, auth }) {
    // Get current date in Pakistan timezone
    const getKarachiDate = () => {
        const now = new Date();
        const karachiTime = new Intl.DateTimeFormat('en-CA', {
            timeZone: 'Asia/Karachi',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(now);
        return karachiTime;
    };

    const { data, setData, post, processing, errors } = useForm({
        class_id: '',
        subject_id: '',
        date: getKarachiDate(),
        attendance: {} // { student_id: status }
    });

    const [students, setStudents] = useState([]);
    const [loadingStudents, setLoadingStudents] = useState(false);

    const fetchStudents = async () => {
        if(!data.class_id) return;
        setLoadingStudents(true);
        try {
            const response = await axios.get(`/students/api/fetch?class_id=${data.class_id}`);
            // Note: I changed the URL slightly for better routing
            setStudents(response.data.data || []);
            
            // Initialize attendance as 'Present' for all
            const initialAttendance = {};
            (response.data.data || []).forEach(s => {
                initialAttendance[s.id] = 'Present';
            });
            setData('attendance', initialAttendance);
        } catch (e) {
            console.error('Failed to fetch students', e);
            setStudents([]);
        } finally {
            setLoadingStudents(false);
        }
    };

    useEffect(() => {
        if(data.class_id) fetchStudents();
    }, [data.class_id]);

    const handleStatusChange = (studentId, status) => {
        setData('attendance', {
            ...data.attendance,
            [studentId]: status
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('attendance.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <button onClick={() => window.history.back()} className="p-2 hover:bg-gray-100 rounded-xl transition text-gray-400">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-black text-gray-800 leading-tight">Mark Attendance</h2>
                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mt-1">Register Daily Presence</p>
                    </div>
                </div>
            }
        >
            <Head title="Mark Attendance" />

            <div className="py-12 px-4 md:px-8 max-w-7xl mx-auto pb-24">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Setup Card */}
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-gray-100 border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <Users className="w-3.5 h-3.5" /> Target Class
                                </label>
                                <select 
                                    className="w-full bg-gray-50 border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all"
                                    value={data.class_id}
                                    onChange={e => setData('class_id', e.target.value)}
                                >
                                    <option value="">Select Class</option>
                                    {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                                <InputError message={errors.class_id} className="mt-2 text-[10px] font-bold text-red-500" />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <BookOpen className="w-3.5 h-3.5" /> Subject
                                </label>
                                <select 
                                    className="w-full bg-gray-50 border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all"
                                    value={data.subject_id}
                                    onChange={e => setData('subject_id', e.target.value)}
                                >
                                    <option value="">Select Subject</option>
                                    {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                </select>
                                <InputError message={errors.subject_id} className="mt-2 text-[10px] font-bold text-red-500" />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5" /> Date
                                </label>
                                <input 
                                    type="date"
                                    className="w-full bg-gray-50 border-gray-100 rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all"
                                    value={data.date}
                                    onChange={e => setData('date', e.target.value)}
                                />
                                <InputError message={errors.date} className="mt-2 text-[10px] font-bold text-red-500" />
                            </div>
                        </div>
                    </div>

                    {/* Students List */}
                    {data.class_id && (
                        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-100 border border-gray-100 overflow-hidden">
                            <div className="p-8 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between">
                                <h3 className="text-lg font-black text-gray-800">Student Roll Call</h3>
                                <div className="flex items-center gap-4">
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            const allPresent = {};
                                            students.forEach(s => allPresent[s.id] = 'Present');
                                            setData('attendance', allPresent);
                                        }}
                                        className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-100 transition shadow-sm border border-blue-100 active:scale-95"
                                    >
                                        Mark All Present
                                    </button>
                                    <div className="text-[10px] font-black text-blue-600 uppercase bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200">
                                        {students.length} Total
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50/50">
                                            <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Student Name</th>
                                            <th className="px-10 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Presence Toggle</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {loadingStudents ? (
                                            <tr>
                                                <td colSpan="2" className="px-10 py-32 text-center">
                                                    <RefreshCw className="w-10 h-10 text-blue-100 animate-spin mx-auto mb-4" />
                                                    <p className="text-gray-400 font-bold italic text-sm">Scanning for students...</p>
                                                </td>
                                            </tr>
                                        ) : students.length === 0 ? (
                                            <tr>
                                                <td colSpan="2" className="px-10 py-32 text-center">
                                                    <Users className="w-12 h-12 text-gray-100 mx-auto mb-4" />
                                                    <p className="text-gray-400 font-bold italic text-sm">No students found in this class category.</p>
                                                </td>
                                            </tr>
                                        ) : students.map((s) => (
                                            <tr key={s.id} className="hover:bg-blue-50/20 transition-colors group">
                                                <td className="px-10 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-white text-xs shadow-lg shadow-blue-100 capitalize">
                                                            {s.user?.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <span className="text-sm font-black text-gray-900 block leading-tight group-hover:text-blue-600 transition">{s.user?.name}</span>
                                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{s.admission_number}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-6 text-right">
                                                    <div className="inline-flex p-1.5 bg-gray-50 rounded-2xl gap-2 border border-gray-100">
                                                        <button 
                                                            type="button"
                                                            onClick={() => handleStatusChange(s.id, 'Present')}
                                                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all active:scale-95 ${data.attendance[s.id] === 'Present' ? 'bg-green-500 text-white shadow-lg shadow-green-100' : 'text-gray-400 hover:text-gray-600'}`}
                                                        >
                                                            Present
                                                        </button>
                                                        <button 
                                                            type="button"
                                                            onClick={() => handleStatusChange(s.id, 'Absent')}
                                                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all active:scale-95 ${data.attendance[s.id] === 'Absent' ? 'bg-red-500 text-white shadow-lg shadow-red-100' : 'text-gray-400 hover:text-gray-600'}`}
                                                        >
                                                            Absent
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="p-10 border-t border-gray-100 bg-gray-50/30 flex justify-end">
                                <button 
                                    type="submit"
                                    disabled={processing || students.length === 0}
                                    className="px-10 py-4.5 bg-blue-600 text-white rounded-2xl font-black text-[12px] uppercase tracking-widest hover:bg-blue-700 transition-all hover:shadow-2xl hover:shadow-blue-200 flex items-center gap-4 active:scale-95 disabled:opacity-40"
                                >
                                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                        <Save className="w-5 h-5" />
                                    </div>
                                    <span className="pr-4">Submit Final Sheet</span>
                                </button>
                            </div>
                        </div>
                    )}
                </form>

                {!data.class_id && (
                    <div className="mt-8 p-12 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-200 flex flex-col items-center text-center">
                        <AlertCircle className="w-12 h-12 text-gray-200 mb-6" />
                        <h4 className="text-lg font-black text-gray-400 uppercase tracking-widest">Select a class to begin</h4>
                        <p className="text-sm text-gray-300 font-bold mt-2">The roll call sheet will automatically appear below.</p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
