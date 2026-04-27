import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, User, Mail, Shield, ArrowLeft } from 'lucide-react';

export default function EditUser({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
        is_active: user.is_active,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('users.update', user.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <User className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 leading-tight">Modify User</h2>
                            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Update credentials for {user.name}</p>
                        </div>
                    </div>
                    <Link
                        href={route('users.index')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-100 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-all font-bold text-[11px] uppercase tracking-widest shadow-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Link>
                </div>
            }
        >
            <Head title={`Edit User - ${user.name}`} />

            <div className="py-8 px-4 md:px-8">
                <div className="max-w-3xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                            <div className="px-10 py-8 bg-gradient-to-br from-blue-50 to-white flex items-center justify-between border-b border-gray-100">
                                <h3 className="text-sm font-black text-blue-900 uppercase tracking-widest flex items-center gap-3">
                                    <Shield className="w-5 h-5 text-blue-600" />
                                    Access Domain
                                </h3>
                            </div>
                            
                            <div className="p-10 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="group">
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Full Legal Name</label>
                                        <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                            <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl"
                                            />
                                        </div>
                                        {errors.name && <p className="mt-2 text-xs text-red-500 font-bold">{errors.name}</p>}
                                    </div>

                                    <div className="group">
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">System Email</label>
                                        <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                            <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl"
                                            />
                                        </div>
                                        {errors.email && <p className="mt-2 text-xs text-red-500 font-bold">{errors.email}</p>}
                                    </div>

                                    <div className="group">
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">System Role</label>
                                        <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                            <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                                <Shield className="w-5 h-5" />
                                            </div>
                                            <select
                                                value={data.role}
                                                onChange={e => setData('role', e.target.value)}
                                                className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl cursor-pointer"
                                            >
                                                <option value="staff">Staff Member</option>
                                                <option value="admin">Administrator</option>
                                                <option value="teacher">Teacher</option>
                                                <option value="student">Student</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 px-2">
                                        <input
                                            type="checkbox"
                                            id="is_active"
                                            checked={data.is_active}
                                            onChange={e => setData('is_active', e.target.checked)}
                                            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label htmlFor="is_active" className="text-sm font-bold text-gray-600 uppercase tracking-widest">Active Status</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end p-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-black uppercase tracking-[0.1em] hover:shadow-2xl hover:shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-4 disabled:opacity-50 text-[12px] min-w-[240px]"
                            >
                                <Save className="w-5 h-5" />
                                {processing ? 'Updating...' : 'Save Configuration'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
