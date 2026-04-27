import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { Users, Plus, Edit2, Trash2, Search, Shield, Mail, CheckCircle, XCircle } from 'lucide-react';

export default function UsersIndex({ users, auth }) {
    const { props } = usePage();
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const role = auth.user?.role || 'student';
    const isAdmin = ['admin', 'super_admin'].includes(role);

    const filteredUsers = users.data?.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const handleDelete = (userId) => {
        router.delete(route('users.destroy', userId), {
            onSuccess: () => {
                setDeleteConfirm(null);
            },
        });
    };

    const getRoleColor = (role) => {
        const colors = {
            admin: 'bg-blue-100 text-blue-700',
            super_admin: 'bg-indigo-100 text-indigo-700',
            staff: 'bg-cyan-100 text-cyan-700',
            teacher: 'bg-blue-100 text-blue-700',
            student: 'bg-slate-100 text-slate-700',
        };
        return colors[role] || 'bg-gray-100 text-gray-700';
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 leading-tight">User Management</h2>
                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">System access control</p>
                    </div>
                </div>
            }
        >
            <Head title="User Management" />

            <div className="py-8 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Action Bar */}
                    {isAdmin && (
                        <div className="mb-6 flex flex-wrap gap-4 justify-end">
                            <Link
                                href={route('users.assignRoles')}
                                className="inline-flex items-center gap-2 px-6 py-4 bg-white border-2 border-blue-100 text-blue-600 rounded-2xl hover:bg-blue-50 transition-all font-bold text-[12px] uppercase tracking-[0.1em]"
                            >
                                <Shield className="w-4 h-4" />
                                Security Roles
                            </Link>
                            <Link
                                href={route('users.create')}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl hover:shadow-2xl hover:shadow-blue-200 transition-all font-black text-[12px] uppercase tracking-[0.1em] active:scale-95 whitespace-nowrap"
                            >
                                <Plus className="w-5 h-5" />
                                Add New User
                            </Link>
                        </div>
                    )}

                    {/* Search Bar */}
                    <div className="mb-8 flex flex-col items-stretch md:flex-row gap-4 md:items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex-1 max-w-xl group">
                            <div className="flex items-center bg-gray-50 border-2 border-transparent focus-within:border-blue-500/20 focus-within:bg-white rounded-2xl transition-all h-[52px]">
                                <div className="pl-4 pr-2 flex items-center justify-center text-gray-400 group-focus-within:text-blue-500">
                                    <Search className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search users by name or email..."
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
                                    <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest block leading-none">Registered Users</span>
                                    <span className="text-lg font-bold text-blue-800 leading-tight">{users?.total || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                        {filteredUsers.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[900px]">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-100">
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Identify</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Information</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Authority</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                            <th className="px-8 py-5 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {filteredUsers.map((user) => (
                                            <tr key={user.id} className="group hover:bg-blue-50/20 transition-all duration-300">
                                                <td className="px-8 py-7">
                                                    <div className="flex items-center gap-4">
                                                        {(user.student?.profile_picture || user.teacher?.profile_picture) ? (
                                                            <img 
                                                                src={(user.student?.profile_picture || user.teacher?.profile_picture).startsWith('http') ? (user.student?.profile_picture || user.teacher?.profile_picture) : `/storage/${user.student?.profile_picture || user.teacher?.profile_picture}`} 
                                                                alt={user.name} 
                                                                className="flex-shrink-0 w-12 h-12 rounded-2xl object-cover shadow-lg shadow-blue-100 border-2 border-white"
                                                            />
                                                        ) : (
                                                            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-100">
                                                                {user.name.charAt(0)}
                                                            </div>
                                                        )}
                                                        <h4 className="font-bold text-gray-900 group-hover:text-blue-700 transition">{user.name}</h4>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-7">
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <Mail className="w-4 h-4 text-gray-400" />
                                                        <span className="text-sm font-medium">{user.email}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-7">
                                                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${getRoleColor(user.role)}`}>
                                                        <Shield className="w-3 h-3" />
                                                        {user.role?.replace('_', ' ') || 'User'}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-7">
                                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide transition-all ${
                                                        user.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                    }`}>
                                                        <div className={`w-1.5 h-1.5 rounded-full ${user.is_active ? 'bg-green-600' : 'bg-red-600'} animate-pulse`} />
                                                        {user.is_active ? 'Active' : 'Inactive'}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-7 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Link href={route('users.edit', user.id)} className="p-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-blue-600 hover:text-white transition shadow-sm">
                                                            <Edit2 className="w-4 h-4" />
                                                        </Link>
                                                        {isAdmin && (
                                                            <button onClick={() => setDeleteConfirm(user.id)} className="p-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-red-600 hover:text-white transition shadow-sm">
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-20 text-center">
                                <Users className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-800">No users matched</h3>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {users.links && users.links.length > 3 && (
                        <div className="mt-8 flex justify-center gap-3">
                            {users.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 rounded-xl border font-bold text-sm transition-all ${link.active ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'bg-white text-gray-600 border-gray-100 hover:bg-gray-50'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8">
                        <h3 className="text-2xl font-black text-gray-900 text-center mb-2">Confirm Delete</h3>
                        <p className="text-gray-500 text-center text-sm mb-8">This action is permanent and cannot be reversed.</p>
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
