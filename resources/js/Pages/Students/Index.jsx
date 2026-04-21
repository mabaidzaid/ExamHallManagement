import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { Users, Plus, Edit2, Trash2, Search, Mail, Phone, Eye, GraduationCap } from 'lucide-react';

export default function StudentsIndex({ students }) {
    const { flash } = usePage().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const filteredStudents = students.data?.filter(student =>
        (student.user?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.user?.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.admission_number || '').toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const handleDelete = (studentId) => {
        router.delete(route('students.destroy', studentId), {
            onSuccess: () => {
                setDeleteConfirm(null);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 leading-tight">Student Management</h2>
                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Manage your academic students</p>
                    </div>
                </div>
            }
        >
            <Head title="Students" />

            <div className="py-8 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Action Bar */}
                    <div className="mb-6 flex justify-end">
                        <Link
                            href={route('students.create')}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl hover:shadow-2xl hover:shadow-blue-200 transition-all font-black text-[12px] uppercase tracking-[0.1em] active:scale-95 whitespace-nowrap"
                        >
                            <Plus className="w-5 h-5" />
                            Add New Student
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
                                    placeholder="Search student by name, email or admission #..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-semibold text-gray-700 placeholder-gray-400 h-full w-full rounded-r-2xl"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="px-6 py-2.5 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3">
                                <Users className="w-4 h-4 text-blue-600" />
                                <div>
                                    <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest block leading-none">Registered Students</span>
                                    <span className="text-lg font-bold text-blue-800 leading-tight">{students.total}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                        {filteredStudents.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-100">
                                            <th className="px-4 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student Identify</th>
                                            <th className="px-4 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Information</th>
                                            <th className="px-4 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                            <th className="px-4 py-5 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {filteredStudents.map((student) => (
                                            <tr key={student.id} className="group hover:bg-blue-50/20 transition-all duration-300">
                                                <td className="px-4 py-5">
                                                    <div className="flex items-center gap-3">
                                                        {student.profile_picture ? (
                                                            <img 
                                                                src={`/storage/${student.profile_picture}`} 
                                                                alt={student.user?.name}
                                                                className="flex-shrink-0 w-10 h-10 rounded-xl object-cover shadow-sm"
                                                            />
                                                        ) : (
                                                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                                                                {student.user?.name?.charAt(0) || 'S'}
                                                            </div>
                                                        )}
                                                        <div className="min-w-0">
                                                            <h4 className="font-bold text-gray-900 group-hover:text-blue-700 transition leading-tight truncate">{student.user?.name || 'Unknown'}</h4>
                                                            <span className="text-[9px] text-gray-400 font-bold uppercase block">Roll: {student.admission_number || 'N/A'}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-5">
                                                    <div className="max-w-[180px]">
                                                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                                                            <Mail className="w-3 h-3 text-gray-400 shrink-0" />
                                                            <span className="text-[11px] font-bold text-gray-700 truncate">{student.user?.email || 'N/A'}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <Phone className="w-3 h-3 text-gray-400 shrink-0" />
                                                            <span className="text-[11px] font-bold text-gray-700">{student.phone || 'N/A'}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-5">
                                                    <button
                                                        onClick={() => router.patch(route('students.toggle-status', student.id), {}, { preserveScroll: true })}
                                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all duration-300 whitespace-nowrap ${
                                                            student.status === 'active' || !student.status
                                                            ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                        }`}
                                                    >
                                                        <div className={`w-1.5 h-1.5 rounded-full ${student.status === 'active' || !student.status ? 'bg-green-600' : 'bg-red-600'} animate-pulse`} />
                                                        {student.status || 'active'}
                                                    </button>
                                                </td>
                                                <td className="px-4 py-5 text-center">
                                                    <div className="flex items-center justify-center gap-1.5">
                                                        <Link href={route('students.show', student.id)} className="p-2 bg-gray-50 text-gray-400 rounded-lg hover:bg-blue-600 hover:text-white transition shadow-sm border border-gray-100">
                                                            <Eye className="w-4 h-4" />
                                                        </Link>
                                                        <Link href={route('students.edit', student.id)} className="p-2 bg-gray-50 text-gray-400 rounded-lg hover:bg-indigo-600 hover:text-white transition shadow-sm border border-gray-100">
                                                            <Edit2 className="w-4 h-4" />
                                                        </Link>
                                                        <button onClick={() => setDeleteConfirm(student.id)} className="p-2 bg-gray-50 text-gray-400 rounded-lg hover:bg-red-600 hover:text-white transition shadow-sm border border-gray-100">
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
                                <GraduationCap className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-800">No students cataloged</h3>
                                <Link href={route('students.create')} className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold">
                                    <Plus className="w-5 h-5" />
                                    Add First Student
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {deleteConfirm && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8">
                        <h3 className="text-2xl font-black text-gray-900 text-center mb-2">Delete Student?</h3>
                        <p className="text-gray-500 text-center text-sm mb-8 px-4 leading-relaxed">This record and all associated data will be removed forever.</p>
                        <div className="flex gap-4">
                            <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-6 py-4 bg-gray-50 text-gray-700 rounded-2xl font-bold">Cancel</button>
                            <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 px-6 py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
