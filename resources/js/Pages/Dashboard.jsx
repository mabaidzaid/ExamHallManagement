import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    Users,
    BookOpen,
    Building2,
    Calendar,
    Clock,
    TrendingUp,
    AlertCircle,
    Activity,
    Award,
    Lock,
    BarChart3,
    Zap,
    User,
    ChevronRight,
    Search
} from 'lucide-react';

export default function Dashboard({ stats, todays_exams, upcoming_exams, today, auth }) {
    const role = auth.user?.role || 'student';
    const isAdmin = ['admin', 'super_admin'].includes(role);
    const isStaff = role === 'staff';
    const isTeacher = role === 'teacher';
    const isStudent = role === 'student';

    const statCards = [];
    if (isAdmin || isStaff) {
        statCards.push(
            { label: 'Total Students', value: stats?.total_students || 0, icon: Users, bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100', iconColor: 'text-blue-600', borderColor: 'border-blue-200' },
            { label: 'Total Teachers', value: stats?.total_teachers || 0, icon: User, bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50', iconColor: 'text-indigo-600', borderColor: 'border-indigo-200' },
            { label: 'Total Rooms', value: stats?.total_rooms || 0, icon: Building2, bgColor: 'bg-gradient-to-br from-indigo-50 to-blue-50', iconColor: 'text-blue-600', borderColor: 'border-blue-200' },
            { label: "Today's Exams", value: stats?.todays_exams || 0, icon: Calendar, bgColor: 'bg-gradient-to-br from-blue-600 to-indigo-700', iconColor: 'text-white', borderColor: 'border-blue-700' }
        );
    } else if (isTeacher) {
        statCards.push(
            { label: 'My Students', value: stats?.total_students || 0, icon: Users, bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100', iconColor: 'text-blue-600', borderColor: 'border-blue-200' },
            { label: 'Marked Classes', value: stats?.marked_today || 0, icon: Activity, bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50', iconColor: 'text-emerald-600', borderColor: 'border-emerald-200' },
            { label: 'Pending Audits', value: stats?.pending_audits || 0, icon: AlertCircle, bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50', iconColor: 'text-orange-600', borderColor: 'border-orange-200' },
            { label: "Exams", value: stats?.todays_exams || 0, icon: Calendar, bgColor: 'bg-gradient-to-br from-indigo-600 to-blue-700', iconColor: 'text-white', borderColor: 'border-indigo-700' }
        );
    } else if (isStudent) {
        statCards.push(
            { label: 'Attendance', value: '82%', icon: Activity, bgColor: 'bg-gradient-to-br from-indigo-50 to-blue-50', iconColor: 'text-blue-600', borderColor: 'border-blue-200' },
            { label: 'Eligibility', value: 'Approved', icon: Award, bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50', iconColor: 'text-emerald-600', borderColor: 'border-emerald-200' },
            { label: 'Hall Ticket No', value: auth.user?.id + 1000, icon: Lock, bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100', iconColor: 'text-gray-600', borderColor: 'border-gray-200' },
            { label: "Next Exam", value: stats?.todays_exams > 0 ? "Today" : "TBD", icon: Calendar, bgColor: 'bg-gradient-to-br from-blue-600 to-indigo-700', iconColor: 'text-white', borderColor: 'border-blue-700' }
        );
    }

    const quickActions = [];
    if (isAdmin || isStaff) {
        quickActions.push(
            { icon: Calendar, title: "Create Exam", description: "Schedule new exams", href: "/exams/create" },
            { icon: Users, title: "Manage Students", description: "View and edit students", href: "/students" },
            { icon: BarChart3, title: "View Reports", description: "Analysis and statistics", href: "/reports" },
            { icon: Lock, title: "Manage Roles", description: "Control permissions", href: "/roles" }
        );
    } else if (isTeacher) {
        quickActions.push(
            { icon: Calendar, title: "Mark Attendance", description: "Daily participation tracking", href: "/attendance/mark" },
            { icon: Users, title: "My Classes", description: "Assigned class lists", href: "/classes" },
            { icon: BarChart3, title: "Eligibility", description: "Check student status", href: "/eligibility" }
        );
    } else if (isStudent) {
        quickActions.push(
            { icon: Lock, title: "Get Hall Ticket", description: "Download exam permit", href: "/hall-tickets" },
            { icon: Calendar, title: "Schedule", description: "My upcoming exams", href: "#" },
            { icon: User, title: "My Profile", description: "Update personal info", href: "/profile" }
        );
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-blue-100 rounded-2xl">
                            <Zap className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-800 leading-tight">
                                Control Center
                            </h2>
                            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest leading-none mt-1">
                                Welcome back, {auth.user?.name}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-xl border border-green-100">
                        <Activity className="w-4 h-4 text-green-600 animate-pulse" />
                        <span className="text-xs font-bold text-green-700 uppercase tracking-wider">System Operational</span>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {statCards.map((card, index) => (
                            <div
                                key={index}
                                className={`${card.bgColor} border ${card.borderColor} rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 group`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 transition-colors ${
                                            card.label.toLowerCase().includes('exam') 
                                            ? 'text-blue-100/80 group-hover:text-white' 
                                            : 'text-gray-400 group-hover:text-blue-600'
                                        }`}>
                                            {card.label}
                                        </p>
                                        <p className={`text-4xl font-black ${card.label.toLowerCase().includes('exam') ? 'text-white' : 'text-gray-900'} leading-none`}>
                                            {card.value}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                                        <card.icon className={`${card.iconColor} w-7 h-7`} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        {/* Today's Exams */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                                <div className="px-10 py-8 bg-gradient-to-r from-blue-50 to-white flex items-center justify-between border-b border-gray-100">
                                    <div>
                                        <h3 className="text-sm font-black text-blue-900 uppercase tracking-[0.2em] flex items-center gap-3 leading-none">
                                            <Calendar className="w-5 h-5 text-blue-600" />
                                            Active Schedule
                                        </h3>
                                        <p className="text-[11px] text-gray-400 font-bold uppercase mt-2">Today's planned examinations</p>
                                    </div>
                                    <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-[10px] font-black uppercase tracking-widest">
                                        {today}
                                    </span>
                                </div>

                                <div className="p-10">
                                    {todays_exams && todays_exams.length > 0 ? (
                                        <div className="space-y-4">
                                            {todays_exams.map((exam) => (
                                                <div key={exam.id} className="group p-6 bg-gray-50 rounded-3xl border-2 border-transparent hover:border-blue-500/10 hover:bg-white transition-all duration-300">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-5">
                                                            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 font-black text-xl">
                                                                {exam.title.charAt(0)}
                                                            </div>
                                                            <div>
                                                            <div className="flex items-center gap-3">
                                                                <h4 className="font-black text-gray-900 leading-tight group-hover:text-blue-600 transition">{exam.title}</h4>
                                                                {exam.status && exam.status !== 'scheduled' && (
                                                                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter ${
                                                                        exam.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                                                    }`}>
                                                                        {exam.status}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">{exam.subject?.name} • Class {exam.class?.name}</p>

                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <span className="text-sm font-black text-gray-900 block">{exam.start_time}</span>
                                                            <span className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">Start Time</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-20 text-center">
                                            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <Calendar className="w-10 h-10 text-blue-200" />
                                            </div>
                                            <h4 className="text-lg font-black text-gray-800 uppercase tracking-widest mb-2">No Exams Today</h4>
                                            <p className="text-sm text-gray-400 font-medium">Schedule looks clear for the moment.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Upcoming Queue */}
                            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                                <div className="px-10 py-8 bg-gradient-to-r from-indigo-50 to-white flex items-center justify-between border-b border-gray-100">
                                    <div>
                                        <h3 className="text-sm font-black text-indigo-900 uppercase tracking-[0.2em] flex items-center gap-3 leading-none">
                                            <Calendar className="w-5 h-5 text-indigo-600" />
                                            Upcoming Queue
                                        </h3>
                                        <p className="text-[11px] text-gray-400 font-bold uppercase mt-2">Scheduled assessments for next 7 days</p>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl">
                                        <Activity className="w-3 h-3 animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Future Ready</span>
                                    </div>
                                </div>

                                <div className="p-10">
                                    {upcoming_exams && upcoming_exams.length > 0 ? (
                                        <div className="space-y-4">
                                            {upcoming_exams.map((exam) => (
                                                <div key={exam.id} className="group p-6 bg-gray-50 rounded-3xl border-2 border-transparent hover:border-indigo-500/10 hover:bg-white transition-all duration-300">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-5">
                                                            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex flex-col items-center justify-center text-indigo-600">
                                                                <span className="text-[9px] font-black uppercase leading-none">
                                                                    {["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][parseInt(exam.exam_date.split('-')[1])]}
                                                                </span>
                                                                <span className="text-xl font-black mt-0.5">
                                                                    {parseInt(exam.exam_date.split('-')[2])}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <div className="flex items-center gap-3">
                                                                    <h4 className="font-black text-gray-900 leading-tight group-hover:text-indigo-600 transition">{exam.title}</h4>
                                                                    {exam.status && exam.status !== 'scheduled' && (
                                                                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter ${
                                                                            exam.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                                                        }`}>
                                                                            {exam.status}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">{exam.subject?.name} • Class {exam.class?.name}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <span className="text-sm font-black text-gray-900 block">{exam.start_time}</span>
                                                            <span className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">Planned Start</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-12 text-center text-gray-400">
                                            <p className="text-[10px] font-black uppercase tracking-widest">No future exams found in recent queue</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity / Actions Side Column */}
                        <div className="space-y-8 text-left">
                            {/* Quick Access */}
                            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 p-6">
                                <h3 className="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em] mb-6 flex items-center gap-2 leading-none">
                                    <Zap className="w-4 h-4 text-blue-600" />
                                    Quick Access
                                </h3>
                                <div className="space-y-3">
                                    {quickActions.map((action, idx) => (
                                        <Link
                                            key={idx}
                                            href={action.href}
                                            className="flex items-center gap-3 p-3.5 rounded-2xl bg-gray-50/50 border border-transparent hover:border-blue-500/10 hover:bg-white hover:shadow-md transition-all group"
                                        >
                                            <div className="w-9 h-9 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                                                <action.icon className="w-4 h-4" />
                                            </div>
                                            <div className="min-w-0">
                                                <h5 className="text-[11px] font-black text-gray-900 uppercase tracking-wider truncate leading-none">{action.title}</h5>
                                                <p className="text-[9px] text-gray-400 font-bold uppercase mt-1 truncate opacity-70">{action.description}</p>
                                            </div>
                                            <ChevronRight className="w-3 h-3 ml-auto text-gray-300 group-hover:text-blue-600 transition shrink-0" />
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Promotion/Info Card */}
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                                <div className="relative z-10">
                                    <h4 className="text-xl font-black leading-tight mb-3">Management Command.</h4>
                                    <p className="text-blue-100 text-[10px] font-bold leading-relaxed opacity-80 mb-6">
                                        Precision-driven exam workflow and automated seating.
                                    </p>
                                    <Link href="/exams" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-700 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-blue-50 transition active:scale-95">
                                        View All
                                    </Link>
                                </div>
                                <img src="/images/favicon.png" alt="" className="absolute -bottom-4 -right-4 w-32 h-32 opacity-20 rotate-12 group-hover:scale-110 transition-transform duration-700 mix-blend-multiply" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
