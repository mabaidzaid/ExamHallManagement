import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { CalendarCheck, ArrowLeft, Clock, MapPin, Users, BookOpen, Presentation, CalendarDays } from 'lucide-react';

export default function ExamsShow({ exam, allocationStats }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <CalendarDays className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 leading-tight">Exam Details</h2>
                            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest text-left">{exam.title}</p>
                        </div>
                    </div>
                    <Link
                        href={route('exams.index')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all font-black text-[11px] uppercase tracking-widest active:scale-95"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Exams
                    </Link>
                </div>
            }
        >
            <Head title={`Exam: ${exam.title}`} />

            <div className="py-8 px-4 md:px-8 text-left">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Exam Overview Card */}
                    <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden text-left">
                        <div className="px-8 py-6 bg-gradient-to-br from-blue-50 to-white flex items-center justify-between border-b border-gray-100">
                            <h3 className="text-sm font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                                <CalendarCheck className="w-4 h-4 text-blue-600" />
                                Exam Master Information
                            </h3>
                            <div className="flex items-center gap-3">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                    exam.status === 'scheduled' ? 'bg-blue-100 text-blue-700' : 
                                    exam.status === 'completed' ? 'bg-green-100 text-green-700' :
                                    'bg-orange-100 text-orange-700'
                                }`}>
                                    {exam.status || 'Active'}
                                </span>
                            </div>
                        </div>
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 min-w-0">
                                <div className="text-blue-500 mb-3 text-left">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 text-left">Subject Module</p>
                                <p className="font-bold text-gray-900 text-base text-left truncate">{exam.subject?.name || 'N/A'}</p>
                            </div>

                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 min-w-0">
                                <div className="text-emerald-500 mb-3 text-left">
                                    <Presentation className="w-6 h-6" />
                                </div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 text-left">Enrolled Class</p>
                                <p className="font-bold text-gray-900 text-base text-left truncate">{exam.class?.name || 'N/A'}</p>
                            </div>

                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 min-w-0">
                                <div className="text-purple-500 mb-3 text-left">
                                    <CalendarDays className="w-6 h-6" />
                                </div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 text-left">Scheduled Date</p>
                                <p className="font-bold text-gray-900 text-base text-left whitespace-nowrap">
                                    {new Date(exam.exam_date + 'T00:00:00').toLocaleDateString()}
                                </p>
                            </div>

                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 min-w-0">
                                <div className="text-orange-500 mb-3 text-left">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 text-left">Duration & Time</p>
                                <p className="font-bold text-gray-900 text-base text-left whitespace-nowrap">
                                    {exam.start_time?.substring(0, 5)} - {exam.end_time?.substring(0, 5)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Allotment summary overview */}
                    <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden text-left text-left">
                        <div className="px-8 py-6 bg-gradient-to-br from-blue-50 to-white flex items-center justify-between border-b border-gray-100">
                            <h3 className="text-sm font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-blue-600" />
                                Room Allotments
                            </h3>
                            <div className="flex items-center gap-4">
                                <Link 
                                    href={route('allotments.index')} 
                                    className="text-[11px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest"
                                >
                                    Add Allotment &rarr;
                                </Link>
                                <Link 
                                    href={route('seat-allocation.index')} 
                                    className="px-6 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                                >
                                    Manage Seats
                                </Link>
                            </div>
                        </div>
                        <div className="p-8">
                            {exam.allotments && exam.allotments.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {exam.allotments.map(allotment => {
                                        const allocatedCount = allocationStats[allotment.room_id] ? allocationStats[allotment.room_id].length : 0;
                                        const isFull = allocatedCount >= allotment.total_seats;
                                        
                                        return (
                                            <div key={allotment.id} className="p-6 border-2 border-gray-50 rounded-3xl bg-white hover:border-blue-100 transition-all group shadow-sm text-left">
                                                <div className="flex items-center justify-between mb-6">
                                                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                                        <MapPin className="w-6 h-6" />
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                                                        isFull ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                                                    }`}>
                                                        {isFull ? 'Room Full' : 'Available Seats'}
                                                    </span>
                                                </div>
                                                
                                                <h4 className="font-black text-gray-900 text-lg mb-1">{allotment.room?.name || 'Deleted Room'}</h4>
                                                <div className="space-y-4 text-left">
                                                    <div className="flex items-center justify-between text-xs">
                                                        <span className="text-gray-400 font-bold uppercase tracking-wider text-left">Capacity Used</span>
                                                        <span className="font-black text-gray-900">{allocatedCount} / {allotment.total_seats}</span>
                                                    </div>
                                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                                        <div 
                                                            className={`h-full transition-all duration-500 rounded-full ${isFull ? 'bg-orange-500' : 'bg-blue-500'}`}
                                                            style={{ width: `${Math.min(100, (allocatedCount / allotment.total_seats) * 100)}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-10">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                                        <MapPin className="w-10 h-10 text-gray-300" />
                                    </div>
                                    <h4 className="font-bold text-gray-800 text-lg text-center">No Rooms Allotted</h4>
                                    <p className="text-gray-500 text-sm mt-2 text-center text-center">Proceed to Seat Allocation to assign rooms and students.</p>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Master Seating Plan (View Allotment) */}
                    <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden text-left">
                        <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between border-b border-gray-100">
                            <div>
                                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2 leading-none">
                                    <Users className="w-5 h-5 text-blue-600" />
                                    Master Seating Chart
                                </h3>
                                <p className="text-[11px] text-gray-400 font-bold uppercase mt-2">Final student-to-seat assignments for this examination</p>
                            </div>
                        </div>
                        
                        <div className="p-8 space-y-8">
                            {Object.keys(allocationStats).length > 0 ? (
                                Object.keys(allocationStats).map(roomId => {
                                    const allocations = allocationStats[roomId];
                                    const roomName = allocations[0]?.room?.name || 'Room Plan';
                                    
                                    return (
                                        <div key={roomId} className="border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm">
                                            <div className="px-6 py-4 bg-gray-50 flex items-center justify-between border-b border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <MapPin className="w-4 h-4 text-indigo-600" />
                                                    <span className="font-black text-gray-800 uppercase tracking-widest text-xs">{roomName}</span>
                                                </div>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                    {allocations.length} Students Assigned
                                                </span>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full">
                                                    <thead>
                                                        <tr className="bg-white text-left">
                                                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Seat</th>
                                                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student</th>
                                                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-50 bg-white">
                                                        {allocations.map(alloc => (
                                                            <tr key={alloc.id} className="hover:bg-blue-50/20 transition-colors">
                                                                <td className="px-6 py-4">
                                                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-[10px] font-black">
                                                                        {alloc.seat_number}
                                                                    </span>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 overflow-hidden shrink-0">
                                                                            {alloc.student?.profile_picture ? (
                                                                                <img src={`/storage/${alloc.student.profile_picture}`} className="w-full h-full object-cover" />
                                                                            ) : alloc.student?.user?.name?.charAt(0)}
                                                                        </div>
                                                                        <div>
                                                                            <div className="text-xs font-bold text-gray-900">{alloc.student?.user?.name}</div>
                                                                            <div className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Roll: {alloc.student?.admission_number}</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4 text-center">
                                                                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                                                                        alloc.status === 'shifted' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'
                                                                    }`}>
                                                                        {alloc.status}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-20 bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-100">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                        <Users className="w-8 h-8 text-gray-200" />
                                    </div>
                                    <h4 className="font-bold text-gray-500 uppercase tracking-widest text-[11px]">No Student Assignments Found</h4>
                                    <p className="text-gray-400 text-[10px] mt-2 font-medium">Run the Seat Allocation engine to generate this chart.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
