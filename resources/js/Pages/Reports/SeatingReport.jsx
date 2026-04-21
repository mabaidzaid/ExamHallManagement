import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    LayoutGrid, 
    Search, 
    Filter, 
    DoorOpen, 
    MapPin, 
    User,
    Printer,
    Download,
    ArrowRight,
    Users
} from 'lucide-react';

export default function SeatingReport({ exams, allocations }) {
    const { data, setData, get, processing } = useForm({
        exam_id: '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        get(route('reports.seating'), {
            preserveState: true,
        });
    };

    // Grouping by room
    const groupedAllocations = allocations.reduce((acc, curr) => {
        const roomName = curr.room?.name || 'Unassigned';
        if (!acc[roomName]) acc[roomName] = [];
        acc[roomName].push(curr);
        return acc;
    }, {});

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                        <MapPin className="w-8 h-8 text-indigo-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 leading-tight tracking-tight">Master Seating Report</h2>
                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Room-wise student placement and hall maps</p>
                    </div>
                </div>
            }
        >
            <Head title="Seating Report" />

            <div className="py-8 space-y-8 px-4 md:px-0">
                {/* Search Bar */}
                <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-100 border border-gray-100">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-end gap-6">
                        <div className="flex-1 w-full group">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Filter by Exam Session</label>
                            <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-indigo-500/10 focus-within:bg-white transition-all h-[56px]">
                                <div className="pl-4 pr-2 text-gray-400">
                                    <Filter className="w-5 h-5" />
                                </div>
                                <select 
                                    value={data.exam_id}
                                    onChange={e => setData('exam_id', e.target.value)}
                                    className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full cursor-pointer"
                                >
                                    <option value="">Select an active exam...</option>
                                    {exams.map(exam => (
                                        <option key={exam.id} value={exam.id}>{exam.title} ({exam.exam_date})</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button 
                            type="submit"
                            disabled={processing}
                            className="bg-indigo-600 text-white px-10 h-[56px] rounded-2xl font-black uppercase tracking-widest text-[11px] hover:shadow-2xl hover:shadow-indigo-200 transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50"
                        >
                            <Search className="w-4 h-4" />
                            View Seating List
                        </button>
                    </form>
                </div>

                {allocations.length > 0 ? (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Summary Bar */}
                        <div className="flex justify-between items-center bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100/50">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <DoorOpen className="w-5 h-5 text-indigo-500" />
                                    <span className="text-sm font-black text-indigo-900">{Object.keys(groupedAllocations).length} Rooms Active</span>
                                </div>
                                <div className="w-px h-6 bg-indigo-100" />
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-indigo-500" />
                                    <span className="text-sm font-black text-indigo-900">{allocations.length} Total Students</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => window.open(route('reports.seating.download', { exam_id: allocations[0].exam_id }), '_blank')}
                                className="bg-white border border-indigo-200 text-indigo-600 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 transition shadow-sm flex items-center gap-2 active:scale-95"
                            >
                                <Download className="w-4 h-4" />
                                Download Hall Master List (PDF)
                            </button>
                        </div>

                        {/* Room Lists */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {Object.entries(groupedAllocations).map(([roomName, students]) => (
                                <div key={roomName} className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden flex flex-col">
                                    <div className="px-10 py-8 bg-gradient-to-br from-indigo-50/30 to-white border-b border-gray-100 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-600 border border-indigo-50">
                                                <DoorOpen className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-black text-gray-900 tracking-tight">{roomName}</h3>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{students.length} Students Assigned</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex-1">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="bg-gray-50/50">
                                                    <th className="px-8 py-4 text-left text-[9px] font-black text-gray-400 uppercase tracking-widest">Seat #</th>
                                                    <th className="px-8 py-4 text-left text-[9px] font-black text-gray-400 uppercase tracking-widest">Student / Roll</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {students.map((allotment) => (
                                                    <tr key={allotment.id} className="hover:bg-indigo-50/30 transition-colors">
                                                        <td className="px-8 py-5">
                                                            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black rounded-lg uppercase tracking-widest">
                                                                Seat: {allotment.seat_number ? allotment.seat_number.replace('S-', '') : 'N/A'}
                                                            </span>
                                                        </td>
                                                        <td className="px-8 py-5">
                                                            <div className="flex flex-col">
                                                                <span className="text-sm font-bold text-gray-800">{allotment.student?.user?.name}</span>
                                                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Roll: {allotment.student?.admission_number}</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="min-h-[400px] flex flex-col items-center justify-center bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
                        <div className="p-6 bg-gray-50 rounded-full mb-6">
                            <MapPin className="w-12 h-12 text-gray-200" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-600">No allocations selected</h3>
                        <p className="text-gray-400 text-sm">Pick an exam session to view room-wise placement data</p>
                    </div>
                )}
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    .md\\:ml-64, aside, nav, button, form { display: none !important; }
                    .md\\:ml-0 { margin-left: 0 !important; }
                    .bg-white { box-shadow: none !important; border: 1px solid #eee !important; }
                    .rounded-\\[2\\.5rem\\] { border-radius: 0 !important; }
                    .grid { display: block !important; }
                    .p-10, .p-8 { padding: 20px !important; }
                }
            `}} />
        </AuthenticatedLayout>
    );
}
