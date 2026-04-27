import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Trash2, Edit, Plus, AlertCircle, Shield } from 'lucide-react';

export default function Index({ roles, auth, flash }) {
    const [deletingId, setDeletingId] = useState(null);

    const handleDelete = (roleId) => {
        router.delete(route('roles.destroy', roleId), {
            onSuccess: () => {
                setDeletingId(null);
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Role Management" />

            <div className="py-8 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-blue-100 rounded-2xl">
                                <Shield className="w-8 h-8 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-gray-800 leading-tight flex items-center gap-3">
                                    Role Management
                                </h2>
                                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest leading-none mt-1">Authority and permission config</p>
                            </div>
                        </div>
                        <Link
                            href={route('roles.create')}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl hover:shadow-2xl hover:shadow-blue-200 transition-all font-black text-[12px] uppercase tracking-[0.1em] active:scale-95 whitespace-nowrap"
                        >
                            <Plus className="w-5 h-5" />
                            Define New Role
                        </Link>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                        {roles.data.length === 0 ? (
                            <div className="p-20 text-center text-gray-400">
                                <Shield className="w-16 h-16 mx-auto mb-4 opacity-10 text-blue-600" />
                                <p className="text-lg font-black uppercase tracking-widest">No roles defined</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[800px]">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-100">
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Role Name</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Permissions</th>
                                            <th className="px-8 py-5 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Operations</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {roles.data.map((role) => (
                                            <tr key={role.id} className="group hover:bg-blue-50/20 transition-all duration-300">
                                                <td className="px-8 py-7">
                                                    <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-[10px] font-black uppercase tracking-widest">
                                                        {role.name}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-7">
                                                    <p className="text-sm font-medium text-gray-600 max-w-xs">{role.description || 'No description provided'}</p>
                                                </td>
                                                <td className="px-8 py-7 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <span className="text-lg font-black text-gray-900 leading-none">{role.permissions.length}</span>
                                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Active Rules</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-7 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        {role.name !== 'super_admin' && (
                                                            <Link
                                                                href={route('roles.edit', role.id)}
                                                                className="p-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-blue-600 hover:text-white transition shadow-sm active:scale-90"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </Link>
                                                        )}
                                                        <button
                                                            onClick={() => {if(confirm('Delete this role?')) handleDelete(role.id)}}
                                                            disabled={role.name === 'super_admin'}
                                                            className="p-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-red-600 hover:text-white transition shadow-sm active:scale-90 disabled:opacity-20 disabled:hover:bg-gray-50 disabled:hover:text-gray-600"
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
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
