import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Building2, Save, X, User, Users, CheckCircle2, Hash } from 'lucide-react';

export default function ClassesEdit({ classroom, teachers }) {
    const { data, setData, put, processing, errors } = useForm({
        name: classroom.name,
        section: classroom.section,
        teacher_id: classroom.teacher_id || '',
        max_students: classroom.max_students,
        is_active: classroom.is_active,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('classes.update', classroom.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Building2 className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 leading-tight">Edit Class</h2>
                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Updating details for {classroom.name}</p>
                    </div>
                </div>
            }
        >
            <Head title={`Edit ${classroom.name}`} />

            <div className="py-8 px-4 md:px-8">
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                            <div className="px-10 py-8 bg-gradient-to-br from-blue-50 to-white border-b border-gray-100 flex items-center justify-between">
                                <h3 className="text-sm font-black text-blue-900 uppercase tracking-widest flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                    Modify Specifics
                                </h3>
                            </div>
                            
                            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Class Name</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <Building2 className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl"
                                        />
                                    </div>
                                    {errors.name && <p className="mt-2 text-xs text-red-500 font-bold">{errors.name}</p>}
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Section / Batch</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <Hash className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="text"
                                            value={data.section}
                                            onChange={e => setData('section', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl"
                                        />
                                    </div>
                                    {errors.section && <p className="mt-2 text-xs text-red-500 font-bold">{errors.section}</p>}
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Class Teacher</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <select
                                            value={data.teacher_id}
                                            onChange={e => setData('teacher_id', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full cursor-pointer rounded-r-2xl"
                                        >
                                            <option value="">No Teacher Assigned</option>
                                            {teachers.map(t => (
                                                <option key={t.id} value={t.id}>{t.user.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.teacher_id && <p className="mt-2 text-xs text-red-500 font-bold">{errors.teacher_id}</p>}
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Max Students Capacity</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <Users className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="number"
                                            value={data.max_students}
                                            onChange={e => setData('max_students', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl"
                                        />
                                    </div>
                                    {errors.max_students && <p className="mt-2 text-xs text-red-500 font-bold">{errors.max_students}</p>}
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
                                {processing ? 'Updating...' : 'Update Class Details'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
