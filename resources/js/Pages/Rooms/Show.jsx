import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Building2, ArrowLeft, Hash, Users, MapPin, Layers } from 'lucide-react';

export default function RoomsShow({ room }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Building2 className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 leading-tight">Room Information</h2>
                            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">{room.name} ({room.room_number})</p>
                        </div>
                    </div>
                    <Link
                        href={route('rooms.index')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all font-black text-[11px] uppercase tracking-widest active:scale-95"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Rooms
                    </Link>
                </div>
            }
        >
            <Head title={`Room: ${room.name}`} />

            <div className="py-8 px-4 md:px-8">
                <div className="max-w-5xl mx-auto space-y-8">
                    {/* Room Overview Card */}
                    <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                        <div className="px-8 py-6 bg-gradient-to-br from-blue-50 to-white flex items-center justify-between border-b border-gray-100">
                            <h3 className="text-sm font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-blue-600" />
                                Physical Space Details
                            </h3>
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                room.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                                {room.is_active ? 'Currently Active' : 'Inactive'}
                            </span>
                        </div>
                        
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
                                <div className="text-blue-500 mt-1">
                                    <Building2 className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Room Name</p>
                                    <p className="font-bold text-gray-900 text-xl">{room.name}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
                                <div className="text-indigo-500 mt-1">
                                    <Hash className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Room / Door Number</p>
                                    <p className="font-bold text-gray-900 text-xl">{room.room_number}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
                                <div className="text-purple-500 mt-1">
                                    <Layers className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Category / Structure</p>
                                    <p className="font-bold text-gray-900 text-xl">{room.room_type?.name || 'N/A'}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
                                <div className="text-emerald-500 mt-1">
                                    <Users className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Seating Capacity</p>
                                    <p className="font-bold text-gray-900 text-xl">{room.capacity} Seats Available</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
