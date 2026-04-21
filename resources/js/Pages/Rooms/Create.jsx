import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Building2, Save, X, Hash, Users, MapPin, Grid, Layers } from 'lucide-react';

export default function RoomsCreate({ roomTypes }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        room_number: '',
        room_type_id: '',
        capacity: 30,
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('rooms.store'));
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
                            <h2 className="text-2xl font-bold text-gray-800 leading-tight">Define New Room</h2>
                            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Register a new physical space</p>
                        </div>
                    </div>
                    <Link
                        href={route('rooms.index')}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition font-bold text-sm"
                    >
                        <X className="w-4 h-4" />
                        Cancel
                    </Link>
                </div>
            }
        >
            <Head title="Create Room" />

            <div className="py-8 px-4 md:px-8">
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                            <div className="px-10 py-8 bg-gradient-to-br from-blue-50 to-white border-b border-gray-100 flex items-center justify-between">
                                <h3 className="text-sm font-black text-blue-900 uppercase tracking-widest flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-blue-600" />
                                    Physical Details
                                </h3>
                            </div>
                            
                            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Location Name</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <Building2 className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl"
                                            placeholder="e.g. Main Auditorium"
                                        />
                                    </div>
                                    {errors.name && <p className="mt-2 text-xs text-red-500 font-bold">{errors.name}</p>}
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Room / Door Number</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <Hash className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="text"
                                            value={data.room_number}
                                            onChange={e => setData('room_number', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl"
                                            placeholder="e.g. AUD-01"
                                        />
                                    </div>
                                    {errors.room_number && <p className="mt-2 text-xs text-red-500 font-bold">{errors.room_number}</p>}
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Room Category</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <Layers className="w-5 h-5" />
                                        </div>
                                        <select
                                            value={data.room_type_id}
                                            onChange={e => setData('room_type_id', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full cursor-pointer rounded-r-2xl"
                                        >
                                            <option value="">Select Structure</option>
                                            {roomTypes && roomTypes.length > 0 ? (
                                                roomTypes.map(t => (
                                                    <option key={t.id} value={t.id}>{t.name}</option>
                                                ))
                                            ) : (
                                                <option value="" disabled>No categories available</option>
                                            )}
                                        </select>
                                    </div>
                                    {!roomTypes || roomTypes.length === 0 ? (
                                        <p className="mt-2 text-xs text-orange-500 font-bold flex items-center gap-1">
                                            ⚠️ <Link href={route('room-types.index')} className="underline hover:text-orange-600">Please create a room category first.</Link>
                                        </p>
                                    ) : errors.room_type_id && (
                                        <p className="mt-2 text-xs text-red-500 font-bold">{errors.room_type_id}</p>
                                    )}
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Seating Capacity</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <Users className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="number"
                                            value={data.capacity}
                                            onChange={e => setData('capacity', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl"
                                            min="1"
                                        />
                                    </div>
                                    {errors.capacity && <p className="mt-2 text-xs text-red-500 font-bold">{errors.capacity}</p>}
                                </div>
                                <div className="flex items-center gap-3 px-2 md:col-span-2">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={data.is_active}
                                        onChange={e => setData('is_active', e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <label htmlFor="is_active" className="text-sm font-bold text-gray-600 uppercase tracking-widest">Mark as Currently Active/Usable</label>
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
                                {processing ? 'Registering...' : 'Register Room'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
