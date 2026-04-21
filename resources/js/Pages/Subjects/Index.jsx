import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { BookOpen, Plus, Edit2, Trash2, Search, Book } from 'lucide-react';

export default function SubjectsIndex({ subjects }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const filteredSubjects = subjects.data?.filter(subject =>
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.code.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const handleDelete = (subjectId) => {
        router.delete(route('subjects.destroy', subjectId), {
            onSuccess: () => setDeleteConfirm(null),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <BookOpen className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 leading-tight">Subject Management</h2>
                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Academic curriculum database</p>
                    </div>
                </div>
            }
        >
            <Head title="Subjects" />

            <div className="py-8 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Action Bar */}
                    <div className="mb-6 flex justify-end">
                        <Link
                            href={route('subjects.create')}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl hover:shadow-2xl hover:shadow-blue-200 transition-all font-black text-[12px] uppercase tracking-[0.1em] active:scale-95 whitespace-nowrap"
                        >
                            <Plus className="w-5 h-5" />
                            Define New Subject
                        </Link>
                    </div>

                    {/* Search & Stats Bar */}
                    <div className="mb-8 flex flex-col items-stretch md:flex-row gap-4 md:items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex-1 max-w-xl group">
                            <div className="flex items-center bg-gray-50 border-2 border-transparent focus-within:border-blue-500/20 focus-within:bg-white rounded-2xl transition-all h-[52px]">
                                <div className="pl-4 pr-2 flex items-center justify-center text-gray-400 group-focus-within:text-blue-500">
                                    <Search className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search by subject name or code..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-semibold text-gray-700 placeholder-gray-400 h-full w-full rounded-r-2xl"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="px-6 py-2.5 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Book className="w-4 h-4 text-blue-600" />
                                </div>
                                <div>
                                    <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest block leading-none">Total Subjects</span>
                                    <span className="text-lg font-bold text-blue-800 leading-tight">{subjects.total}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                        {filteredSubjects.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[800px]">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-100">
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Subject Details</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Identifier Code</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                            <th className="px-8 py-5 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {filteredSubjects.map((subject) => (
                                            <tr key={subject.id} className="group hover:bg-blue-50/20 transition-all duration-300">
                                                <td className="px-8 py-7">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-100">
                                                            {subject.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-gray-900 group-hover:text-blue-700 transition">{subject.name}</h4>
                                                            <p className="text-[11px] text-gray-400 font-medium truncate max-w-[300px] mt-1">
                                                                {subject.description || 'No description'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-7">
                                                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-[11px] font-bold uppercase tracking-wider">
                                                        {subject.code}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-7">
                                                    <button
                                                        onClick={() => router.patch(route('subjects.toggle-status', subject.id), {}, { preserveScroll: true })}
                                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase transition-all duration-300 ${
                                                            subject.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                        }`}
                                                    >
                                                        {subject.is_active ? 'Active' : 'Inactive'}
                                                    </button>
                                                </td>
                                                <td className="px-8 py-7 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Link href={route('subjects.edit', subject.id)} className="p-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-blue-600 hover:text-white transition shadow-sm">
                                                            <Edit2 className="w-4 h-4" />
                                                        </Link>
                                                        <button onClick={() => setDeleteConfirm(subject.id)} className="p-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-red-600 hover:text-white transition shadow-sm">
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
                                <BookOpen className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-800">No subjects found</h3>
                                <Link href={route('subjects.create')} className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold">
                                    <Plus className="w-5 h-5" />
                                    Add First Subject
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {deleteConfirm && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
                        <h3 className="text-2xl font-black text-gray-900 text-center mb-2">Delete Subject?</h3>
                        <p className="text-gray-500 text-center text-sm mb-8 px-4 px-4 leading-relaxed">This action cannot be undone.</p>
                        <div className="flex gap-4">
                            <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-6 py-4 bg-gray-50 text-gray-700 rounded-2xl font-bold transition">Cancel</button>
                            <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 px-6 py-4 bg-red-600 text-white rounded-2xl font-bold transition hover:bg-red-700">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
