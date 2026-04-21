import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Building2, Plus, Edit2, Trash2, Search, User, Users } from 'lucide-react';

export default function ClassesIndex({ classes }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const filteredClasses = classes.data?.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.section?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.teacher?.user?.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const handleDelete = (id) => {
        router.delete(route('classes.destroy', id), {
            onSuccess: () => setDeleteConfirm(null),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Building2 className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 leading-tight">Class Management</h2>
                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Academic rooms & sections</p>
                    </div>
                </div>
            }
        >
            <Head title="Classes" />

            <div className="py-8 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Action Bar */}
                    <div className="mb-6 flex justify-end">
                        <Link
                            href={route('classes.create')}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl hover:shadow-2xl hover:shadow-blue-200 transition-all font-black text-[12px] uppercase tracking-[0.1em] active:scale-95 whitespace-nowrap"
                        >
                            <Plus className="w-5 h-5" />
                            Define New Class
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
                                    placeholder="Search by class name..."
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
                                    <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest block leading-none">Total Classes</span>
                                    <span className="text-lg font-bold text-blue-800 leading-tight">{classes.total}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                        {filteredClasses.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[900px]">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-100">
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Class Details</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Teacher</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Capacity</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                            <th className="px-8 py-5 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {filteredClasses.map((item) => (
                                            <tr key={item.id} className="group hover:bg-blue-50/20 transition-all duration-300">
                                                <td className="px-8 py-7">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-100">
                                                            {item.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-gray-900 group-hover:text-blue-700 transition">{item.name}</h4>
                                                            <span className="text-[10px] text-gray-400 font-bold uppercase">Section: {item.section || 'N/A'}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-7">
                                                    {item.teacher ? (
                                                        <span className="text-sm font-semibold text-gray-700">{item.teacher.user.name}</span>
                                                    ) : (
                                                        <span className="text-xs text-gray-400 italic">Unassigned</span>
                                                    )}
                                                </td>
                                                <td className="px-8 py-7">
                                                    <span className="text-sm font-bold text-gray-700">{item.max_students} Students</span>
                                                </td>
                                                <td className="px-8 py-7">
                                                    <button
                                                        onClick={() => router.patch(route('classes.toggle-status', item.id), {}, { preserveScroll: true })}
                                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase transition-all duration-300 ${
                                                            item.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                        }`}
                                                    >
                                                        {item.is_active ? 'Active' : 'Inactive'}
                                                    </button>
                                                </td>
                                                <td className="px-8 py-7 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Link href={route('classes.edit', item.id)} className="p-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-blue-600 hover:text-white transition shadow-sm">
                                                            <Edit2 className="w-4 h-4" />
                                                        </Link>
                                                        <button onClick={() => setDeleteConfirm(item.id)} className="p-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-red-600 hover:text-white transition shadow-sm">
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
                                <Building2 className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-800">No classes found</h3>
                                <Link href={route('classes.create')} className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold">
                                    <Plus className="w-5 h-5" />
                                    Add First Class
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {deleteConfirm && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
                        <h3 className="text-2xl font-black text-gray-900 text-center mb-2">Delete Class?</h3>
                        <p className="text-gray-500 text-center text-sm mb-8">This action cannot be undone.</p>
                        <div className="flex gap-4">
                            <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-6 py-4 bg-gray-50 text-gray-700 rounded-2xl font-bold">Cancel</button>
                            <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 px-6 py-4 bg-red-600 text-white rounded-2xl font-bold">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
