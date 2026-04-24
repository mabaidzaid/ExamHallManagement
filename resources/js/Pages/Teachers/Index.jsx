import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { GraduationCap, Plus, Edit2, Trash2, Search, Mail, Phone, MapPin, CheckCircle, XCircle, Eye, Users } from 'lucide-react';

export default function TeachersIndex({ teachers }) {
    const { flash } = usePage().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const filteredTeachers = teachers.data?.filter(teacher =>
        (teacher.user?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (teacher.user?.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (teacher.department || '').toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const handleDelete = (teacherId) => {
        router.delete(route('teachers.destroy', teacherId), {
            onSuccess: () => {
                setDeleteConfirm(null);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <GraduationCap className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 leading-tight">Teacher Management</h2>
                            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Manage your faculty members</p>
                        </div>
                    </div>
                    <Link
                        href={route('teachers.create')}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl hover:shadow-2xl hover:shadow-blue-200 transition-all font-black text-[12px] uppercase tracking-[0.1em] active:scale-95 whitespace-nowrap"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Teacher
                    </Link>
                </div>
            }
        >
            <Head title="Teachers" />

            <div className="py-8 px-4 md:px-8">
                <div className="max-w-full mx-auto">
                    {/* Search & Stats Bar */}
                    <div className="mb-8 flex flex-col items-stretch md:flex-row gap-4 md:items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex-1 max-w-xl group">
                            <div className="flex items-center bg-gray-50 border-2 border-transparent focus-within:border-blue-500/20 focus-within:bg-white rounded-2xl transition-all h-[52px]">
                                <div className="pl-4 pr-2 flex items-center justify-center text-gray-400 group-focus-within:text-blue-500">
                                    <Search className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search faculty by name, email or dept..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-semibold text-gray-700 placeholder-gray-400 h-full w-full rounded-r-2xl"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="px-6 py-2.5 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Users className="w-4 h-4 text-blue-600" />
                                </div>
                                <div>
                                    <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest block leading-none">Total Faculty</span>
                                    <span className="text-lg font-bold text-blue-800 leading-tight">{teachers.total}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                        {filteredTeachers.length > 0 ? (
                            <div className="overflow-x-auto custom-scrollbar">
                                <table className="w-full text-left border-collapse min-w-[1000px]">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-100">
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Faculty Member</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Department</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                            <th className="px-8 py-5 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Operations</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {filteredTeachers.map((teacher) => (
                                            <tr key={teacher.id} className="group hover:bg-blue-50/20 transition-all duration-300">
                                                <td className="px-8 py-7">
                                                    <div className="flex items-center gap-4">
                                                        {teacher.profile_picture ? (
                                                            <img 
                                                                src={teacher.profile_picture.startsWith('http') ? teacher.profile_picture : `/storage/${teacher.profile_picture}`} 
                                                                alt={teacher.user?.name}
                                                                className="flex-shrink-0 w-12 h-12 rounded-2xl object-cover shadow-lg shadow-blue-100"
                                                            />
                                                        ) : (
                                                            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-100">
                                                                {teacher.user?.name?.charAt(0) || 'T'}
                                                            </div>
                                                        )}
                                                        <div>
                                                            <h4 className="font-bold text-gray-900 group-hover:text-blue-700 transition">{teacher.user?.name || 'Unknown'}</h4>
                                                            <div className="flex items-center gap-3 mt-1">
                                                                <span className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
                                                                    <Mail className="w-3 h-3" />
                                                                    {teacher.user?.email || 'N/A'}
                                                                </span>
                                                                <span className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
                                                                    <Phone className="w-3 h-3" />
                                                                    {teacher.contact_number || 'N/A'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-7">
                                                    <div>
                                                        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[11px] font-bold uppercase tracking-wider block w-fit">
                                                            {teacher.department || 'General'}
                                                        </span>
                                                        <p className="text-xs text-gray-500 mt-1 font-medium">{teacher.designation || 'Faculty'}</p>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-7">
                                                    <button
                                                        onClick={() => router.patch(route('teachers.toggle-status', teacher.id), {}, { preserveScroll: true })}
                                                        title={teacher.status === 'active' || !teacher.status ? 'Click to deactivate' : 'Click to activate'}
                                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase transition-all duration-300 hover:scale-105 active:scale-95 ${
                                                            teacher.status === 'active' || !teacher.status
                                                            ? 'bg-green-100 text-green-700 border border-green-200 cursor-pointer hover:bg-green-200' 
                                                            : 'bg-red-100 text-red-700 border border-red-200 cursor-pointer hover:bg-red-200'
                                                        }`}
                                                    >
                                                        <div className={`w-1.5 h-1.5 rounded-full ${teacher.status === 'active' || !teacher.status ? 'bg-green-600' : 'bg-red-600'} animate-pulse`} />
                                                        {teacher.status || 'active'}
                                                    </button>
                                                </td>
                                                <td className="px-8 py-7">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Link
                                                            href={route('teachers.show', teacher.id)}
                                                            className="p-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-blue-600 hover:text-white transition shadow-sm active:scale-90"
                                                            title="View Profile"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </Link>
                                                        <Link
                                                            href={route('teachers.edit', teacher.id)}
                                                            className="p-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-indigo-600 hover:text-white transition shadow-sm active:scale-90"
                                                            title="Edit Records"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => setDeleteConfirm(teacher.id)}
                                                            className="p-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-red-600 hover:text-white transition shadow-sm active:scale-90"
                                                            title="Remove Teacher"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-20 text-center">
                                <div className="p-6 bg-blue-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                                    <GraduationCap className="w-12 h-12 text-blue-200" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">No faculty members found</h3>
                                <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                                    {searchTerm ? 'No matches for your search. Try different keywords.' : 'The faculty list is empty. Start by adding your first teacher.'}
                                </p>
                                {!searchTerm && (
                                    <Link
                                        href={route('teachers.create')}
                                        className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-bold"
                                    >
                                        <Plus className="w-5 h-5 border-2 border-white/30 rounded-full" />
                                        Add Teacher Now
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {teachers.links && teachers.links.length > 3 && (
                        <div className="mt-8 flex justify-center gap-3">
                            {teachers.links.map((link, index) => {
                                if (!link.url) {
                                    return (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-white text-gray-300 border border-gray-100 rounded-xl cursor-not-allowed font-bold text-sm"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
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

            {/* Modal de confirmación robusto */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-white/20 animate-in zoom-in duration-200">
                        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                            <Trash2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 text-center mb-2">Remove Record?</h3>
                        <p className="text-gray-500 text-center text-sm leading-relaxed mb-8 px-4">
                            Are you absolutely sure you want to remove this faculty record? This action will also revoke their system access and cannot be undone.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 px-6 py-4 bg-gray-50 text-gray-700 rounded-2xl font-bold hover:bg-gray-100 transition active:scale-95"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteConfirm)}
                                className="flex-1 px-6 py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 shadow-xl shadow-red-100 transition active:scale-95 flex items-center justify-center gap-2"
                            >
                                <Trash2 className="w-4 h-4" />
                                Yes, Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
