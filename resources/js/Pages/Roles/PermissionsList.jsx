import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Shield } from 'lucide-react';

export default function PermissionsList({ permissions, auth }) {
    // Group permissions by category
    const groupedPermissions = {};
    permissions.forEach(permission => {
        const category = permission.name.split(' ')[0];
        if (!groupedPermissions[category]) {
            groupedPermissions[category] = [];
        }
        groupedPermissions[category].push(permission);
    });

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Permissions Directory" />

            <div className="py-6">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Permissions Directory</h1>
                            <p className="text-gray-600 mt-2">All available permissions in the system</p>
                        </div>
                        <Link
                            href={route('roles.index')}
                            className="text-blue-600 hover:text-blue-900 transition"
                        >
                            ← Back to Roles
                        </Link>
                    </div>

                    {/* Permissions by Category */}
                    <div className="space-y-6">
                        {Object.entries(groupedPermissions).map(([category, perms]) => (
                            <div key={category} className="bg-white rounded-lg shadow overflow-hidden">
                                <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                        <Shield className="w-5 h-5 mr-2 text-blue-600" />
                                        {category} Permissions ({perms.length})
                                    </h2>
                                </div>

                                <div className="divide-y divide-gray-200">
                                    {perms.map((permission) => (
                                        <div key={permission.id} className="p-6 hover:bg-gray-50 transition">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {permission.name}
                                                    </h3>
                                                    {permission.description && (
                                                        <p className="text-gray-600 text-sm mt-1">
                                                            {permission.description}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="ml-4 flex-shrink-0">
                                                    <code className="bg-gray-100 text-gray-900 px-3 py-1 rounded text-xs font-mono">
                                                        {permission.name}
                                                    </code>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary Card */}
                    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900">Summary</h3>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600 uppercase">Total Permissions</p>
                                <p className="text-2xl font-bold text-blue-600 mt-2">{permissions.length}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 uppercase">Categories</p>
                                <p className="text-2xl font-bold text-blue-600 mt-2">{Object.keys(groupedPermissions).length}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
