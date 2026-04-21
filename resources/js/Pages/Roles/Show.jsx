import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Edit, ArrowLeft } from 'lucide-react';

export default function Show({ role, auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Role - ${role.name}`} />

            <div className="py-6">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
                    {/* Back Button */}
                    <Link
                        href={route('roles.index')}
                        className="inline-flex items-center text-blue-600 hover:text-blue-900 mb-6 transition"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Roles
                    </Link>

                    {/* Header */}
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{role.name}</h1>
                            {role.description && (
                                <p className="text-gray-600 mt-2">{role.description}</p>
                            )}
                        </div>
                        <Link
                            href={route('roles.edit', role.id)}
                            className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
                        >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Role
                        </Link>
                    </div>

                    {/* Role Info Card */}
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase">Role ID</p>
                                <p className="text-lg font-semibold text-gray-900 mt-1">{role.id}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase">Role Name</p>
                                <p className="text-lg font-semibold text-gray-900 mt-1">{role.name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase">Created At</p>
                                <p className="text-lg font-semibold text-gray-900 mt-1">
                                    {new Date(role.created_at).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase">Updated At</p>
                                <p className="text-lg font-semibold text-gray-900 mt-1">
                                    {new Date(role.updated_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Permissions */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Permissions ({role.permissions.length})
                        </h2>

                        {role.permissions.length === 0 ? (
                            <p className="text-gray-500">No permissions assigned to this role.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {role.permissions.map((permission) => (
                                    <div key={permission.id} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                        <p className="font-medium text-gray-900">{permission.name}</p>
                                        {permission.description && (
                                            <p className="text-xs text-gray-600 mt-1">{permission.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
