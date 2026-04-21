import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    BarChart3, 
    Calendar, 
    Users, 
    ArrowRight, 
    ClipboardList, 
    LayoutGrid, 
    Clock, 
    BookOpen,
    TrendingUp,
    CheckCircle2
} from 'lucide-react';

export default function ReportsIndex({ stats, todaysExams, recentExams }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                        <BarChart3 className="w-8 h-8 text-indigo-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 leading-tight tracking-tight">Intelligence & Reports</h2>
                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Analytics, data insights, and master exports</p>
                    </div>
                </div>
            }
        >
            <Head title="Reports & Analytics" />

            <div className="space-y-8 py-8 px-4 md:px-0">
                {/* 1. Statistics Ribbon */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard 
                        title="Total Exams" 
                        value={stats.totalExams} 
                        icon={Calendar} 
                        color="blue" 
                    />
                    <StatCard 
                        title="Today's Exams" 
                        value={stats.todayExams} 
                        icon={Clock} 
                        color="amber" 
                    />
                    <StatCard 
                        title="Registered Students" 
                        value={stats.totalStudents} 
                        icon={Users} 
                        color="emerald" 
                    />
                    <StatCard 
                        title="Attendance Avg" 
                        value={`${stats.overallAttendance}%`} 
                        icon={TrendingUp} 
                        color="indigo" 
                    />
                </div>

                {/* 2. Primary Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ReportNavLink 
                        title="Exam Completion Report" 
                        description="View detailed statistics, eligibility audits, and participation counts for specific examinations."
                        href={route('reports.exam')}
                        icon={ClipboardList}
                        accent="blue"
                    />
                    <ReportNavLink 
                        title="Master Seating Report" 
                        description="Generate room-wise seating lists and student placement grids for on-site center management."
                        href={route('reports.seating')}
                        icon={LayoutGrid}
                        accent="indigo"
                    />
                </div>

                {/* 3. Today's Live Schedule */}
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                    <div className="px-10 py-8 bg-gradient-to-br from-gray-50/50 to-white border-b border-gray-100 flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-blue-600" />
                                Today's Live Schedule
                            </h3>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 ml-8">Exams active on {new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2">
                             <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[9px] font-black rounded-full uppercase tracking-widest animate-pulse">Live Now</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50/30">
                                    <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Exam & Subject</th>
                                    <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Class</th>
                                    <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Timing</th>
                                    <th className="px-10 py-5 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Scheduled</th>
                                    <th className="px-10 py-5"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {todaysExams.length > 0 ? todaysExams.map((exam) => (
                                    <tr key={exam.id} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="px-10 py-6 text-sm font-bold text-gray-800">
                                            {exam.title}
                                            <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-0.5">{exam.subject}</div>
                                        </td>
                                        <td className="px-10 py-6 text-sm font-bold text-gray-600">{exam.class}</td>
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
                                                <Clock className="w-4 h-4 text-blue-500" />
                                                {exam.start_time} - {exam.end_time}
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black rounded-lg border border-blue-100 uppercase tracking-tighter">
                                                {exam.student_count} Students
                                            </span>
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <Link href={route('reports.exam', { exam_id: exam.id })} className="p-2 text-gray-300 hover:text-blue-600 transition-colors">
                                                <ArrowRight className="w-5 h-5" />
                                            </Link>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="px-10 py-20 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="p-4 bg-gray-50 rounded-full mb-4">
                                                    <Calendar className="w-8 h-8 text-gray-300" />
                                                </div>
                                                <p className="text-gray-400 text-sm font-bold">No exams scheduled for today</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 4. Recent Activity Summary - Full Width Horizontal */}
                <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-100 border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-3">
                            <BookOpen className="w-5 h-5 text-indigo-600" />
                            Recent Examination History
                        </h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Last 5 Sessions</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {recentExams.map(exam => (
                            <div key={exam.id} className="flex flex-col gap-4 p-6 rounded-3xl bg-gray-50/50 hover:bg-white border-2 border-transparent hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300 group cursor-default">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-black text-gray-800 truncate">{exam.title}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[10px] text-indigo-500 font-black uppercase tracking-widest">{exam.subject.name}</p>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <p className="text-[9px] text-gray-400 font-bold">{new Date(exam.exam_date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function StatCard({ title, value, icon: Icon, color }) {
    const colors = {
        blue: 'bg-blue-50 text-blue-600 border-blue-100',
        amber: 'bg-amber-50 text-amber-600 border-amber-100',
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    };

    return (
        <div className="bg-white rounded-[2rem] p-8 shadow-lg shadow-gray-100 border border-gray-50 flex flex-col justify-between group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className={`w-14 h-14 ${colors[color]} rounded-2xl border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <Icon className="w-7 h-7" />
            </div>
            <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
                <p className="text-3xl font-black text-gray-900 tracking-tighter">{value}</p>
            </div>
        </div>
    );
}

function ReportNavLink({ title, description, href, icon: Icon, accent }) {
    const themes = {
        blue: {
            bg: 'from-blue-600 to-indigo-700',
            iconBg: 'bg-blue-100 text-blue-600',
            shadow: 'shadow-blue-200/50',
            light: 'bg-blue-400'
        },
        indigo: {
            bg: 'from-indigo-600 to-purple-700',
            iconBg: 'bg-indigo-100 text-indigo-600',
            shadow: 'shadow-indigo-200/50',
            light: 'bg-indigo-400'
        },
        violet: {
            bg: 'from-violet-600 to-fuchsia-700',
            iconBg: 'bg-violet-100 text-violet-600',
            shadow: 'shadow-violet-200/50',
            light: 'bg-violet-400'
        },
    };

    const theme = themes[accent];

    return (
        <Link href={href} className="group relative block overflow-hidden rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2">
            {/* Main Content Area */}
            <div className={`relative z-10 p-10 h-full bg-gradient-to-br ${theme.bg} flex flex-col items-start min-h-[320px]`}>
                
                {/* Visual Decorative Circles */}
                <div className={`absolute -right-10 -top-10 w-48 h-48 rounded-full ${theme.light} opacity-20 blur-3xl group-hover:scale-150 transition-transform duration-700`}></div>
                <div className={`absolute -left-10 -bottom-10 w-32 h-32 rounded-full ${theme.light} opacity-10 blur-2xl`}></div>

                {/* Content */}
                <div className="flex-1 space-y-6 relative z-10 w-full">
                    <div className="flex items-center justify-between w-full">
                        <div className={`w-16 h-16 ${theme.iconBg} rounded-[1.5rem] flex items-center justify-center shadow-xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-300`}>
                            <Icon className="w-8 h-8" />
                        </div>
                        <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                             <ArrowRight className="w-5 h-5 text-white" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-2xl font-black text-white tracking-tight leading-tight">
                            {title}
                        </h3>
                        <p className="text-blue-50/70 text-sm font-medium leading-relaxed max-w-[90%]">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Footer Link Action */}
                <div className="mt-8 pt-6 border-t border-white/10 w-full flex items-center justify-between group-hover:border-white/20 transition-colors">
                    <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">Open Detailed Report</span>
                    <TrendingUp className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                </div>
            </div>

            {/* Shine Sweep Effect */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                <div className="absolute -inset-full top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine"></div>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes shine {
                    100% { left: 125%; }
                }
                .group:hover .group-hover\\:animate-shine {
                    animation: shine 1s cubic-bezier(0.4, 0, 0.2, 1);
                }
            `}} />
        </Link>
    );
}
