import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { Building2, Save, Trash2, Plus, LayoutGrid, CheckCircle } from 'lucide-react';

export default function RoomTypes({ roomTypes }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
    });

    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('room-types.store'), {
            onSuccess: () => reset(),
        });
    };

    const handleDelete = (id) => {
        router.delete(route('room-types.destroy', id), {
            onSuccess: () => setDeleteConfirm(null),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <LayoutGrid className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 leading-tight">Room Categories</h2>
                            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Manage structural types</p>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Room Types" />

            <div className="py-8 px-4 md:px-8">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
                    
                    {/* Add Room Type Form */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden sticky top-8">
                            <div className="px-8 py-6 bg-gradient-to-br from-blue-50 to-white border-b border-gray-100">
                                <h3 className="text-sm font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                                    <Plus className="w-4 h-4 text-blue-600" />
                                    Add Category
                                </h3>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Category Name</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[52px] group">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <LayoutGrid className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl"
                                            placeholder="e.g. Computer Lab"
                                        />
                                    </div>
                                    {errors.name && <p className="mt-2 text-xs text-red-500 font-bold">{errors.name}</p>}
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Description (Optional)</label>
                                    <textarea
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500/10 focus:bg-white rounded-2xl transition-all min-h-[120px] text-sm font-medium text-gray-700 resize-none"
                                        placeholder="Brief description..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-black uppercase tracking-widest hover:shadow-xl hover:shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 text-[11px]"
                                >
                                    <Save className="w-4 h-4" />
                                    {processing ? 'Saving...' : 'Save Category'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Room Types List */}
                    <div className="w-full lg:w-2/3">
                        <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                            <div className="px-8 py-6 bg-gradient-to-br from-blue-50 to-white border-b border-gray-100 flex items-center justify-between">
                                <h3 className="text-sm font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-blue-600" />
                                    Active Categories
                                </h3>
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 font-black text-[10px] uppercase tracking-widest rounded-lg">
                                    {roomTypes.length} Total
                                </span>
                            </div>
                            
                            <div className="p-2">
                                {roomTypes.length > 0 ? (
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-100">
                                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category Detail</th>
                                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Rooms Linked</th>
                                                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {roomTypes.map((type) => (
                                                <tr key={type.id} className="hover:bg-blue-50/30 transition-colors group">
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                                                <LayoutGrid className="w-5 h-5" />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-bold text-gray-900">{type.name}</h4>
                                                                {type.description && <p className="text-xs text-gray-500 mt-1 truncate max-w-[200px]">{type.description}</p>}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-5 text-center">
                                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-black text-xs">
                                                            {type.rooms_count || 0}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-5 text-right">
                                                        <button
                                                            onClick={() => setDeleteConfirm(type.id)}
                                                            className="p-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-red-600 hover:text-white transition shadow-sm active:scale-90"
                                                            title="Delete Category"
                                                            disabled={type.rooms_count > 0}
                                                        >
                                                            <Trash2 className={`w-4 h-4 ${type.rooms_count > 0 ? 'opacity-30' : ''}`} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="p-16 text-center">
                                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <LayoutGrid className="w-10 h-10 text-blue-200" />
                                        </div>
                                        <h3 className="font-bold text-gray-800 text-lg">No categories defined</h3>
                                        <p className="text-sm text-gray-500 mt-2">Use the form to create your first room category.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-white/20 animate-in zoom-in duration-200">
                        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                            <Trash2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 text-center mb-2">Delete Category?</h3>
                        <p className="text-gray-500 text-center text-sm leading-relaxed mb-8 px-4">
                            Are you absolutely sure you want to delete this room category? This action cannot be undone.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 px-6 py-4 bg-gray-50 text-gray-700 rounded-2xl font-bold hover:bg-gray-100 transition active:scale-95"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteConfirm)}
                                className="flex-1 px-6 py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 shadow-xl shadow-red-100 transition active:scale-95 flex items-center justify-center gap-2"
                            >
                                <Trash2 className="w-4 h-4" />
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
