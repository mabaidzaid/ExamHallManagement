import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Save, X } from 'lucide-react';

export default function Create({ permissions, auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        permissions: [],
    });

    const [selectedPermissions, setSelectedPermissions] = useState([]);

    const handlePermissionChange = (permissionId) => {
        const newPermissions = selectedPermissions.includes(permissionId)
            ? selectedPermissions.filter(id => id !== permissionId)
            : [...selectedPermissions, permissionId];
        setSelectedPermissions(newPermissions);
        setData('permissions', newPermissions);
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = permissions.map(p => p.id);
            setSelectedPermissions(allIds);
            setData('permissions', allIds);
        } else {
            setSelectedPermissions([]);
            setData('permissions', []);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('roles.store'));
    };

    // Group permissions by name prefix
    const groupedPermissions = {};
    permissions.forEach(permission => {
        const group = permission.name.split(' ')[0];
        if (!groupedPermissions[group]) {
            groupedPermissions[group] = [];
        }
        groupedPermissions[group].push(permission);
    });

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Role" />

            <div className="py-6">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Create New Role</h1>
                        <p className="text-gray-600 mt-2">Define a new role and assign permissions</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
                        {/* Role Name */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Role Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                                    errors.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="e.g., Editor, Moderator, Member"
                                disabled={processing}
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                                    errors.description ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Describe what this role does..."
                                rows="3"
                                disabled={processing}
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                        </div>

                        {/* Permissions */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Permissions
                                </label>
                                {permissions.length > 0 && (
                                    <label className="flex items-center text-sm text-gray-600">
                                        <input
                                            type="checkbox"
                                            onChange={handleSelectAll}
                                            checked={selectedPermissions.length === permissions.length}
                                            className="mr-2 rounded border-gray-300"
                                            disabled={processing}
                                        />
                                        Select All
                                    </label>
                                )}
                            </div>

                            {permissions.length === 0 ? (
                                <p className="text-gray-500 text-sm">No permissions available</p>
                            ) : (
                                <div className="space-y-4 max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
                                    {Object.entries(groupedPermissions).map(([group, perms]) => (
                                        <div key={group} className="border-b border-gray-200 pb-4 last:border-b-0">
                                            <h4 className="font-semibold text-gray-900 mb-2 capitalize">{group} Permissions</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {perms.map((permission) => (
                                                    <label key={permission.id} className="flex items-center text-sm">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedPermissions.includes(permission.id)}
                                                            onChange={() => handlePermissionChange(permission.id)}
                                                            className="mr-2 rounded border-gray-300"
                                                            disabled={processing}
                                                        />
                                                        <span className="text-gray-700">{permission.name}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {errors.permissions && <p className="mt-2 text-sm text-red-500">{errors.permissions}</p>}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Create Role
                            </button>
                            <Link
                                href={route('roles.index')}
                                className="inline-flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                            >
                                <X className="w-4 h-4 mr-2" />
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
