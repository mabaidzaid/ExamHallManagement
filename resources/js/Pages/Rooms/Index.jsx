import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Building2, Plus, Edit2, Trash2, Search, LayoutGrid, Users, MapPin, Eye } from 'lucide-react';

export default function RoomsIndex({ rooms }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const filteredRooms = rooms.data?.filter(room =>
        (room.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (room.room_number || '').toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const handleDelete = (roomId) => {
        router.delete(route('rooms.destroy', roomId), {
            onSuccess: () => setDeleteConfirm(null),
        });
    };

    const toggleStatus = (roomId) => {
        router.patch(route('rooms.toggle-status', roomId), {}, {
            preserveScroll: true
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Building2 className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 leading-tight">Room Management</h2>
                            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Manage exam halls and physical spaces</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('room-types.index')}
                            className="inline-flex items-center gap-2 px-6 py-4 bg-white border border-gray-200 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all font-black text-[11px] uppercase tracking-widest active:scale-95"
                        >
                            <LayoutGrid className="w-4 h-4" />
                            Manage Categories
                        </Link>
                        <Link
                            href={route('rooms.create')}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl hover:shadow-2xl hover:shadow-blue-200 transition-all font-black text-[12px] uppercase tracking-[0.1em] active:scale-95 whitespace-nowrap"
                        >
                            <Plus className="w-5 h-5" />
                            Add New Room
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Rooms" />

            <div className="py-8 px-4 md:px-8">
                <div className="max-w-full mx-auto">
                    {/* Search & Stats Bar */}
                    <div className="mb-8 flex flex-col items-stretch md:flex-row gap-4 md:items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex-1 max-w-xl group">
                            <div className="flex items-center bg-gray-50 border-2 border-transparent focus-within:border-blue-500/20 focus-within:bg-white rounded-2xl transition-all h-[52px]">
                                <div className="pl-4 pr-2 flex items-center justify-center text-gray-400 group-focus-within:text-blue-500">
                                    <Search className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search by room name or number..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-semibold text-gray-700 placeholder-gray-400 h-full w-full rounded-r-2xl"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="px-6 py-2.5 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Building2 className="w-4 h-4 text-blue-600" />
                                </div>
                                <div>
                                    <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest block leading-none">Total Rooms</span>
                                    <span className="text-lg font-bold text-blue-800 leading-tight">{rooms.total}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                        {filteredRooms.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-100">
                                            <th className="px-4 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Room Identification</th>
                                            <th className="px-4 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Category</th>
                                            <th className="px-4 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Capacity</th>
                                            <th className="px-4 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                                            <th className="px-4 py-5 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Operations</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {filteredRooms.map((room) => (
                                            <tr key={room.id} className="group hover:bg-blue-50/20 transition-all duration-300">
                                                <td className="px-4 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center text-blue-600 font-bold shadow-sm border border-blue-200/50">
                                                            <MapPin className="w-5 h-5" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <h4 className="font-bold text-gray-900 group-hover:text-blue-700 transition leading-tight truncate">{room.name}</h4>
                                                            <div className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-0.5">
                                                                #{room.room_number}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-5 text-center">
                                                    <span className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-gray-100 whitespace-nowrap">
                                                        {room.room_type?.name || 'Uncategorized'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-5 text-center">
                                                    <div className="flex items-center justify-center gap-1.5 font-black text-gray-700 text-xs">
                                                        <Users className="w-3.5 h-3.5 text-gray-300" />
                                                        {room.capacity}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-5 text-center">
                                                    <button 
                                                        onClick={() => toggleStatus(room.id)}
                                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase transition-all whitespace-nowrap ${
                                                            room.is_active 
                                                            ? 'bg-green-100 text-green-700 border border-green-200' 
                                                            : 'bg-red-100 text-red-700 border border-red-200'
                                                        }`}
                                                    >
                                                        <div className={`w-1 h-1 rounded-full ${room.is_active ? 'bg-green-600' : 'bg-red-600'} animate-pulse`} />
                                                        {room.is_active ? 'Active' : 'Inactive'}
                                                    </button>
                                                </td>
                                                <td className="px-4 py-5">
                                                    <div className="flex items-center justify-center gap-1.5">
                                                        <Link
                                                            href={route('rooms.show', room.id)}
                                                            className="p-2 bg-gray-50 text-gray-400 rounded-lg hover:bg-blue-600 hover:text-white transition shadow-sm border border-gray-100"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </Link>
                                                        <Link
                                                            href={route('rooms.edit', room.id)}
                                                            className="p-2 bg-gray-50 text-gray-400 rounded-lg hover:bg-indigo-600 hover:text-white transition shadow-sm border border-gray-100"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => setDeleteConfirm(room.id)}
                                                            className="p-2 bg-gray-50 text-gray-400 rounded-lg hover:bg-red-600 hover:text-white transition shadow-sm border border-gray-100"
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
                        ) : (
                            <div className="p-20 text-center">
                                <div className="p-6 bg-blue-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                                    <Building2 className="w-12 h-12 text-blue-200" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">No rooms defined yet</h3>
                                <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                                    {searchTerm ? 'No matches for your search. Try different keywords.' : 'Get started by creating your first physical space or exam hall.'}
                                </p>
                                {!searchTerm && (
                                    <Link
                                        href={route('rooms.create')}
                                        className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-bold"
                                    >
                                        <Plus className="w-5 h-5" />
                                        Add Room Now
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {rooms.links && rooms.links.length > 3 && (
                        <div className="mt-8 flex justify-center gap-3">
                            {rooms.links.map((link, index) => {
                                if (!link.url) {
                                    return (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-white text-gray-300 border border-gray-100 rounded-xl cursor-not-allowed font-bold text-sm"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                }
                                return (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`px-4 py-2 rounded-xl border font-bold text-sm transition-all ${
                                            link.active
                                                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100'
                                                : 'bg-white text-gray-600 border-gray-100 hover:bg-gray-50 hover:border-blue-200'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de confirmación */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-white/20 animate-in zoom-in duration-200">
                        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                            <Trash2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 text-center mb-2">Remove Room?</h3>
                        <p className="text-gray-500 text-center text-sm leading-relaxed mb-8 px-4">
                            Are you absolutely sure you want to delete this room? This action cannot be undone and will affect any exams scheduled here.
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
                                Yes, Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
