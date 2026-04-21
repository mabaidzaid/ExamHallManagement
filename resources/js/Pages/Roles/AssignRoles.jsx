import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Save, AlertCircle, Users } from 'lucide-react';

export default function AssignRoles({ users, roles, permissions, flash, auth }) {
    const [selectedUsers, setSelectedUsers] = useState({});
    const [selectedPermissions, setSelectedPermissions] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleRoleChange = (userId, roleId) => {
        setSelectedUsers(prev => {
            const userRoles = prev[userId] || [];
            return {
                ...prev,
                [userId]: userRoles.includes(roleId)
                    ? userRoles.filter(id => id !== roleId)
                    : [...userRoles, roleId]
            };
        });
    };

    const handlePermissionChange = (userId, permId) => {
        setSelectedPermissions(prev => {
            const userPerms = prev[userId] || [];
            return {
                ...prev,
                [userId]: userPerms.includes(permId)
                    ? userPerms.filter(id => id !== permId)
                    : [...userPerms, permId]
            };
        });
    };

    const handleSaveRoles = (userId) => {
        setProcessing(true);
        const roleIds = selectedUsers[userId] || [];
        const permIds = selectedPermissions[userId] || [];

        router.post(
            route('users.saveRoles'),
            {
                user_id: userId,
                roles: roleIds,
                permissions: permIds
            },
            {
                onSuccess: () => {
                    setProcessing(false);
                },
                onError: () => {
                    setProcessing(false);
                }
            }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-800">Assign Roles & Permissions</h2>
                </div>
            }
        >
            <Head title="Assign Roles to Users" />

            <div className="py-6">
                <div className="w-full mx-auto px-4 sm:px-6 md:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <p className="text-gray-600 mt-2">Manage which roles and permissions are assigned to each user</p>
                    </div>

                    {/* Flash Messages */}
                    {flash?.success && (
                        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg flex items-center">
                            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                            {flash.success}
                        </div>
                    )}

                    {flash?.error && (
                        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg flex items-center">
                            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                            {flash.error}
                        </div>
                    )}

                    {/* Users and Roles Table */}
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                        {users.length === 0 ? (
                            <div className="p-20 text-center text-gray-400">
                                <Users className="w-20 h-20 mx-auto mb-4 opacity-10" />
                                <p className="text-lg">No users found to manage</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50/80 border-b border-gray-100">
                                            <th className="px-6 py-4 text-[10px] font-bold text-blue-900 uppercase tracking-[0.2em] w-[15%] min-w-[180px]">User Profile</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-blue-900 uppercase tracking-[0.2em] w-[15%] min-w-[150px]">Role Rights</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-blue-900 uppercase tracking-[0.2em] w-[55%]">Module Permissions</th>
                                            <th className="px-6 py-4 text-center text-[10px] font-bold text-blue-900 uppercase tracking-[0.2em] w-[15%] min-w-[160px]">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {users.map((user) => {
                                            const grouped = permissions.reduce((acc, p) => {
                                                const moduleName = p.name.includes('.') ? p.name.split('.')[0] : 'General';
                                                if (!acc[moduleName]) acc[moduleName] = [];
                                                acc[moduleName].push(p);
                                                return acc;
                                            }, {});

                                            return (
                                                <tr key={user.id} className="group hover:bg-blue-50/20 transition-all duration-300">
                                                    <td className="px-6 py-6 align-top">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-blue-200 uppercase">
                                                                {user.name.charAt(0)}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <h4 className="font-bold text-gray-900 text-sm whitespace-nowrap overflow-hidden text-ellipsis">{user.name}</h4>
                                                                <p className="text-[10px] text-gray-400 font-medium truncate">{user.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-6 align-top border-l border-r border-gray-50">
                                                        <div className="flex flex-col gap-2.5">
                                                            {roles.map((role) => (
                                                                <label key={role.id} className="flex items-center gap-2.5 cursor-pointer group/role">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={selectedUsers[user.id]?.includes(role.id) || user.roles?.some(r => r.id === role.id) || false}
                                                                        onChange={() => handleRoleChange(user.id, role.id)}
                                                                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer transition"
                                                                        disabled={processing}
                                                                    />
                                                                    <span className={`text-[10px] font-bold uppercase tracking-wider transition ${
                                                                        (selectedUsers[user.id]?.includes(role.id) || user.roles?.some(r => r.id === role.id))
                                                                        ? 'text-blue-600'
                                                                        : 'text-gray-400 group-hover/role:text-gray-600'
                                                                    }`}>
                                                                        {role.name.replace('_', ' ')}
                                                                    </span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-6 align-top">
                                                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-6">
                                                            {Object.entries(grouped).map(([moduleName, perms]) => (
                                                                <div key={moduleName} className="flex flex-col gap-2">
                                                                    <div className="flex items-center gap-2 mb-0.5 border-b border-blue-50 pb-0.5">
                                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                                                        <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest">
                                                                            {moduleName}
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex flex-col gap-1.5">
                                                                        {perms.map((perm) => (
                                                                            <label key={perm.id} className="flex items-center gap-2 cursor-pointer group/perm">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    checked={selectedPermissions[user.id]?.includes(perm.id) || user.permissions?.some(p => p.id === perm.id) || false}
                                                                                    onChange={() => handlePermissionChange(user.id, perm.id)}
                                                                                    className="w-3.5 h-3.5 rounded border-gray-300 text-blue-500 focus:ring-blue-400 transition cursor-pointer"
                                                                                    disabled={processing}
                                                                                />
                                                                                <span className="text-[10px] text-gray-500 font-semibold group-hover/perm:text-blue-600 transition whitespace-nowrap">
                                                                                    {perm.name.includes('.') ? perm.name.split('.')[1] : perm.name}
                                                                                </span>
                                                                            </label>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-6 text-center align-middle border-l border-gray-50">
                                                        <button
                                                            onClick={() => handleSaveRoles(user.id)}
                                                            disabled={processing}
                                                            className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-lg hover:shadow-lg hover:shadow-blue-100 transition-all active:scale-95 disabled:opacity-50 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap"
                                                        >
                                                            {processing ? (
                                                                <span className="flex items-center gap-2">
                                                                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                                    Saving
                                                                </span>
                                                            ) : (
                                                                <span className="flex items-center gap-2">
                                                                    <Save className="w-3.5 h-3.5" />
                                                                    Update
                                                                </span>
                                                            )}
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Back Link */}
                    <div className="mt-6">
                        <Link
                            href={route('roles.index')}
                            className="text-blue-600 hover:text-blue-900 transition"
                        >
                            ← Back to Roles
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
