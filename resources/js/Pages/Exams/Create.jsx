import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { CalendarCheck, Save, X, Type, Search, Clock, CalendarDays, BookOpen, Presentation, Info } from 'lucide-react';

export default function ExamsCreate({ subjects, classes }) {
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
        title: '',
        subject_id: '',
        class_id: '',
        exam_date: getKarachiDate(),
        start_time: '',
        end_time: '',
        remarks: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('exams.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <CalendarDays className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 leading-tight">Schedule New Exam</h2>
                            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Establish a new examination event</p>
                        </div>
                    </div>
                    <Link
                        href={route('exams.index')}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition font-bold text-sm"
                    >
                        <X className="w-4 h-4" />
                        Discard
                    </Link>
                </div>
            }
        >
            <Head title="Create Exam" />

            <div className="py-8 px-4 md:px-8">
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                            <div className="px-10 py-8 bg-gradient-to-br from-blue-50 to-white border-b border-gray-100 flex items-center justify-between">
                                <h3 className="text-sm font-black text-blue-900 uppercase tracking-widest flex items-center gap-3">
                                    <CalendarCheck className="w-5 h-5 text-blue-600" />
                                    Exam Specifications
                                </h3>
                            </div>
                            
                            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="group md:col-span-2">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Event Title / Description</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <Type className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={e => setData('title', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl"
                                            placeholder="e.g. Midterm Computer Science 2026"
                                        />
                                    </div>
                                    {errors.title && <p className="mt-2 text-xs text-red-500 font-bold">{errors.title}</p>}
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Target Subject</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <BookOpen className="w-5 h-5" />
                                        </div>
                                        <select
                                            value={data.subject_id}
                                            onChange={e => setData('subject_id', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full cursor-pointer rounded-r-2xl"
                                        >
                                            <option value="">Select Subject</option>
                                            {subjects.map(s => (
                                                <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.subject_id && <p className="mt-2 text-xs text-red-500 font-bold">{errors.subject_id}</p>}
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Participating Class</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <Presentation className="w-5 h-5" />
                                        </div>
                                        <select
                                            value={data.class_id}
                                            onChange={e => setData('class_id', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full cursor-pointer rounded-r-2xl"
                                        >
                                            <option value="">Select Class / Cohort</option>
                                            {classes.map(c => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.class_id && <p className="mt-2 text-xs text-red-500 font-bold">{errors.class_id}</p>}
                                </div>

                                <div className="group md:col-span-2">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Calendar Date</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <CalendarDays className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="date"
                                            value={data.exam_date}
                                            onChange={e => setData('exam_date', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl"
                                        />
                                    </div>
                                    {errors.exam_date && <p className="mt-2 text-xs text-red-500 font-bold">{errors.exam_date}</p>}
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Door Opens (Start Time)</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="time"
                                            value={data.start_time}
                                            onChange={e => setData('start_time', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl"
                                        />
                                    </div>
                                    {errors.start_time && <p className="mt-2 text-xs text-red-500 font-bold">{errors.start_time}</p>}
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Conclusion (End Time)</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="time"
                                            value={data.end_time}
                                            onChange={e => setData('end_time', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl"
                                        />
                                    </div>
                                    {errors.end_time && <p className="mt-2 text-xs text-red-500 font-bold">{errors.end_time}</p>}
                                </div>

                                <div className="group md:col-span-2">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Additional Instructions / Remarks</label>
                                    <textarea
                                        value={data.remarks}
                                        onChange={e => setData('remarks', e.target.value)}
                                        className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent focus:border-blue-500/10 focus:bg-white rounded-[2rem] transition-all min-h-[140px] text-sm font-medium text-gray-700 resize-none"
                                        placeholder="Any specific note for invigilators or students..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end p-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-black uppercase tracking-[0.1em] hover:shadow-2xl hover:shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-4 disabled:opacity-50 text-[12px] min-w-[240px]"
                            >
                                <Save className="w-5 h-5" />
                                {processing ? 'Finalizing...' : 'Schedule Event'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
