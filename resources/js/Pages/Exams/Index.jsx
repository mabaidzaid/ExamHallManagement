import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { CalendarCheck, Plus, Edit2, Trash2, Search, Clock, CalendarDays, BookOpen, Presentation, CalendarOff, AlertCircle, Eye } from 'lucide-react';

export default function ExamsIndex({ exams }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [changeDateExam, setChangeDateExam] = useState(null);
    const [newDate, setNewDate] = useState(new Date().toLocaleDateString('en-CA')); // Gets YYYY-MM-DD in local time

    const filteredExams = exams.data?.filter(exam =>
        (exam.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (exam.subject?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const handleDelete = (id) => {
        router.delete(route('exams.destroy', id), {
            onSuccess: () => setDeleteConfirm(null),
        });
    };

    const handleDateChange = (e) => {
        e.preventDefault();
        router.post(route('exams.changeDate', changeDateExam.id), { exam_date: newDate }, {
            onSuccess: () => setChangeDateExam(null),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <CalendarCheck className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 leading-tight">Exam Management</h2>
                            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Schedule and coordinate assessments</p>
                        </div>
                    </div>
                    <Link
                        href={route('exams.create')}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl hover:shadow-2xl hover:shadow-blue-200 transition-all font-black text-[12px] uppercase tracking-[0.1em] active:scale-95 whitespace-nowrap"
                    >
                        <Plus className="w-5 h-5" />
                        Create New Exam
                    </Link>
                </div>
            }
        >
            <Head title="Exams" />

            <div className="py-8 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Search & Stats Bar */}
                    <div className="mb-8 flex flex-col items-stretch md:flex-row gap-4 md:items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex-1 max-w-xl group">
                            <div className="flex items-center bg-gray-50 border-2 border-transparent focus-within:border-blue-500/20 focus-within:bg-white rounded-2xl transition-all h-[52px]">
                                <div className="pl-4 pr-2 flex items-center justify-center text-gray-400 group-focus-within:text-blue-500">
                                    <Search className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search by exam title or subject..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-semibold text-gray-700 placeholder-gray-400 h-full w-full rounded-r-2xl"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="px-6 py-2.5 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <CalendarCheck className="w-4 h-4 text-blue-600" />
                                </div>
                                <div>
                                    <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest block leading-none">Total Exams</span>
                                    <span className="text-lg font-bold text-blue-800 leading-tight">{exams.total}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {filteredExams.length > 0 ? (
                            filteredExams.map((exam) => (
                                <div key={exam.id} className="bg-white rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden group hover:border-blue-200 transition-all duration-300">
                                    <div className="p-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                                        <div className="flex items-start gap-6">
                                            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center text-blue-600 shadow-sm border border-blue-100 shadow-blue-100/50">
                                                <span className="text-xs font-black uppercase">
                                                    {["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][parseInt(exam.exam_date.split('-')[1])]}
                                                </span>
                                                <span className="text-xl font-bold leading-none mt-1">
                                                    {parseInt(exam.exam_date.split('-')[2])}
                                                </span>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <Link href={route('exams.show', exam.id)}>
                                                        <h3 className="text-xl font-bold text-gray-900 hover:text-blue-700 transition-colors cursor-pointer">{exam.title}</h3>
                                                    </Link>
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                        exam.status === 'scheduled' ? 'bg-blue-100 text-blue-700' : 
                                                        exam.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                        'bg-orange-100 text-orange-700'
                                                    }`}>
                                                        {exam.status || 'Scheduled'}
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-4 mt-3">
                                                    <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                                        <BookOpen className="w-4 h-4 text-blue-500" />
                                                        {exam.subject?.name || 'Unknown Subject'}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                                        <Presentation className="w-4 h-4 text-emerald-500" />
                                                        {exam.class?.name || 'Unknown Class'}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                                        <Clock className="w-4 h-4 text-purple-500" />
                                                        {exam.start_time} - {exam.end_time}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center justify-end gap-2 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t border-gray-100 md:border-0">
                                            <button
                                                onClick={() => setChangeDateExam(exam)}
                                                className="h-10 px-3 bg-orange-50 text-orange-700 hover:bg-orange-600 hover:text-white rounded-xl transition font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 group"
                                            >
                                                <CalendarOff className="w-4 h-4" /> 
                                                <span className="hidden lg:inline">Delay</span>
                                            </button>
                                            <Link
                                                href={route('exams.show', exam.id)}
                                                className="h-10 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-100 active:scale-95 flex items-center gap-2"
                                                title="Exam Detail"
                                            >
                                                <Eye className="w-4 h-4" />
                                                <span className="text-[10px] font-black uppercase tracking-widest hidden lg:inline">Detail</span>
                                            </Link>
                                            <div className="flex items-center gap-1.5 ml-1 h-10">
                                                <Link
                                                    href={route('exams.edit', exam.id)}
                                                    className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-400 rounded-xl hover:bg-indigo-600 hover:text-white transition shadow-sm active:scale-90"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => setDeleteConfirm(exam.id)}
                                                    className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-400 rounded-xl hover:bg-red-600 hover:text-white transition shadow-sm active:scale-90"
                                                    title="Cancel"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden p-20 text-center">
                                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CalendarDays className="w-12 h-12 text-blue-200" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">No exams scheduled</h3>
                                <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                                    {searchTerm ? 'We could not find any exams matching your search.' : 'There are no upcoming exams. Start by creating a new examination event.'}
                                </p>
                                {!searchTerm && (
                                    <Link
                                        href={route('exams.create')}
                                        className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-bold"
                                    >
                                        <Plus className="w-5 h-5 border-2 border-white/30 rounded-full" />
                                        Create Exam Schedule
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {exams.links && exams.links.length > 3 && (
                        <div className="mt-8 flex justify-center gap-3">
                            {exams.links.map((link, index) => {
                                if (!link.url) {
                                    return <span key={index} className="px-4 py-2 bg-white text-gray-300 border border-gray-100 rounded-xl cursor-not-allowed font-bold text-sm" dangerouslySetInnerHTML={{ __html: link.label }} />;
                                }
                                return (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`px-4 py-2 rounded-xl border font-bold text-sm transition-all ${
                                            link.active
                                                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100'
                                                : 'bg-white text-gray-600 border-gray-100 hover:bg-gray-50 hover:border-blue-200'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Delay Handling Modal */}
            {changeDateExam && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-white/20 animate-in zoom-in duration-200">
                        <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                            <AlertCircle className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 text-center mb-2">Reschedule Exam</h3>
                        <p className="text-gray-500 text-center text-sm leading-relaxed mb-6 px-4">
                            You are delaying/changing the date for <span className="font-bold text-gray-800">{changeDateExam.title}</span>.
                        </p>
                        <form onSubmit={handleDateChange}>
                            <div className="mb-6">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">New Exam Date</label>
                                <input
                                    type="date"
                                    value={newDate}
                                    onChange={(e) => setNewDate(e.target.value)}
                                    className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-blue-500/10 focus:bg-white rounded-2xl transition-all text-sm font-bold text-gray-800"
                                    required
                                />
                            </div>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setChangeDateExam(null)}
                                    className="flex-1 px-6 py-4 bg-gray-50 text-gray-700 rounded-2xl font-bold hover:bg-gray-100 transition active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-4 bg-orange-500 text-white rounded-2xl font-bold hover:bg-orange-600 shadow-xl shadow-orange-100 transition active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <CalendarCheck className="w-4 h-4" />
                                    Reschedule
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Cancel/Delete Confirmation */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-white/20 animate-in zoom-in duration-200">
                        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                            <Trash2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 text-center mb-2">Cancel Event?</h3>
                        <p className="text-gray-500 text-center text-sm leading-relaxed mb-8 px-4">
                            Are you sure you want to completely cancel and remove this scheduled exam? This will erase all related seating data.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 px-6 py-4 bg-gray-50 text-gray-700 rounded-2xl font-bold hover:bg-gray-100 transition active:scale-95"
                            >
                                Abort
                            </button>
                            <button
                                onClick={() => handleDelete(deleteConfirm)}
                                className="flex-1 px-6 py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 shadow-xl shadow-red-100 transition active:scale-95 flex items-center justify-center gap-2"
                            >
                                <Trash2 className="w-4 h-4" />
                                Confirm Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
