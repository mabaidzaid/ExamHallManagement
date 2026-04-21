import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { 
    MapPin, 
    ArrowLeft, 
    Plus, 
    Trash2, 
    Users, 
    Building2, 
    LayoutGrid,
    CheckCircle2,
    CalendarCheck
} from 'lucide-react';

export default function Allotment({ allotments, exams, rooms }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        exam_id: '',
        room_id: '',
        total_seats: '',
        is_overflow: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('allotments.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                            <Building2 className="w-8 h-8 text-indigo-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 leading-tight">Exam Allotment</h2>
                            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest text-left">Assign rooms and capacities to examinations</p>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Exam Allotment" />

            <div className="py-8 px-4 md:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Add Allotment Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden sticky top-8">
                            <div className="px-8 py-6 bg-gradient-to-br from-indigo-50 to-white flex items-center gap-3 border-b border-gray-100">
                                <Plus className="w-5 h-5 text-indigo-600" />
                                <h3 className="text-sm font-black text-indigo-900 uppercase tracking-widest">Assign New Room</h3>
                            </div>
                            
                            <form onSubmit={submit} className="p-8 space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 px-1">Select Examination</label>
                                    <select
                                        value={data.exam_id}
                                        onChange={e => setData('exam_id', e.target.value)}
                                        className="w-full bg-gray-50 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-indigo-500 text-sm font-bold p-4"
                                    >
                                        <option value="">-- Choose Exam --</option>
                                        {exams.map(exam => (
                                            <option key={exam.id} value={exam.id}>{exam.title}</option>
                                        ))}
                                    </select>
                                    {errors.exam_id && <p className="mt-2 text-xs text-red-500 font-bold">{errors.exam_id}</p>}
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 px-1">Select Room</label>
                                    <select
                                        value={data.room_id}
                                        onChange={e => setData('room_id', e.target.value)}
                                        className="w-full bg-gray-50 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-indigo-500 text-sm font-bold p-4"
                                    >
                                        <option value="">-- Choose Room --</option>
                                        {rooms.map(room => (
                                            <option key={room.id} value={room.id}>{room.name} (Cap: {room.capacity})</option>
                                        ))}
                                    </select>
                                    {errors.room_id && <p className="mt-2 text-xs text-red-500 font-bold">{errors.room_id}</p>}
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 px-1">Available Seats in this Exam</label>
                                    <input
                                        type="number"
                                        placeholder="Max seats for this specific exam"
                                        value={data.total_seats}
                                        onChange={e => setData('total_seats', e.target.value)}
                                        className="w-full bg-gray-50 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-indigo-500 text-sm font-bold p-4"
                                    />
                                    {errors.total_seats && <p className="mt-2 text-xs text-red-500 font-bold">{errors.total_seats}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 active:scale-[0.98] disabled:opacity-50"
                                >
                                    Confirm Allotment
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Allotment List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                            <div className="px-10 py-8 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between border-b border-gray-100">
                                <div>
                                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em] flex items-center gap-3 leading-none text-left">
                                        <LayoutGrid className="w-5 h-5 text-indigo-600" />
                                        Current Assignments
                                    </h3>
                                    <p className="text-[11px] text-gray-400 font-bold uppercase mt-2 text-left">List of rooms assigned to examinations</p>
                                </div>
                                <Link
                                    href={route('seat-allocation.index')}
                                    className="px-6 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition"
                                >
                                    Proceed to Allocation &rarr;
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-50 text-left">
                                            <th className="px-4 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Examination</th>
                                            <th className="px-4 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Room</th>
                                            <th className="px-4 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center leading-none">Seats</th>
                                            <th className="px-4 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right leading-none">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {allotments.data.map((allotment) => (
                                            <tr key={allotment.id} className="group hover:bg-gray-50/50 transition-colors">
                                                <td className="px-4 py-6">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 shrink-0">
                                                            <CalendarCheck className="w-4 h-4" />
                                                        </div>
                                                        <span className="font-bold text-gray-900 text-xs truncate max-w-[120px]">{allotment.exam?.title}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-6">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                                                            <MapPin className="w-4 h-4" />
                                                        </div>
                                                        <span className="font-bold text-gray-900 text-xs">{allotment.room?.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-6 text-center">
                                                    <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
                                                        {allotment.total_seats} Total
                                                    </span>
                                                </td>
                                                <td className="px-4 py-6 text-right">
                                                    <Link
                                                        method="delete"
                                                        href={route('allotments.destroy', allotment.id)}
                                                        as="button"
                                                        className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition shadow-sm"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
