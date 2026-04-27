import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { 
    LayoutDashboard, 
    Users, 
    GraduationCap, 
    User, 
    BookOpen, 
    Building2,
    Menu,
    X,
    Bell,
    CalendarCheck,
    LayoutGrid,
    Ticket,
    ClipboardCheck,
    BarChart3,
    Settings,
    ChevronDown,
    ChevronRight,
    Search,
    UserCircle,
    DoorOpen
} from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState({});

    const role = user?.role || 'student';
    const isAdmin = ['admin', 'super_admin'].includes(role);
    const isStaff = role === 'staff';
    const isTeacher = role === 'teacher';
    const isStudent = role === 'student';

    const toggleMenu = (menuName) => {
        setExpandedMenus(prev => ({
            ...prev,
            [menuName]: !prev[menuName]
        }));
    };

    const sidebarNavItems = [
        { name: 'Dashboard', href: route('dashboard'), icon: LayoutDashboard, active: route().current('dashboard'), show: true },
        { 
            name: 'User Management', 
            icon: Users, 
            active: route().current('users.*') || route().current('roles.*'), 
            show: isAdmin,
            children: [
                { name: 'Users List', href: route('users.index'), active: route().current('users.*') },
                { name: 'Roles & Permissions', href: route('roles.index'), active: route().current('roles.*') },
            ]
        },
        { name: 'Teacher Mgt', href: route('teachers.index'), icon: GraduationCap, active: route().current('teachers.*'), show: isAdmin || isStaff },
        { name: 'Student Mgt', href: route('students.index'), icon: User, active: route().current('students.*'), show: isAdmin || isStaff || isTeacher },
        { 
            name: 'Academic Setup', 
            icon: BookOpen, 
            active: route().current('subjects.*') || route().current('classes.*'), 
            show: isAdmin || isStaff,
            children: [
                { name: 'Subjects', href: route('subjects.index'), active: route().current('subjects.*') },
                { name: 'Classes', href: route('classes.index'), active: route().current('classes.*') },
            ]
        },
        { 
            name: 'Room Management', 
            icon: DoorOpen, 
            active: route().current('rooms.*') || route().current('room-types.*'), 
            show: isAdmin || isStaff,
            children: [
                { name: 'All Rooms', href: route('rooms.index'), active: route().current('rooms.index') || route().current('rooms.show') || route().current('rooms.edit') },
                { name: 'Room Categories', href: route('room-types.index'), active: route().current('room-types.*') },
            ]
        },
        { 
            name: 'Exam Management', 
            href: route('exams.index'),
            icon: CalendarCheck, 
            active: route().current('exams.*') || route().current('allotments.*'), 
            show: isAdmin || isStaff,
            children: [
                { name: 'Exam Detail', href: route('exams.index'), active: route().current('exams.index') },
                { name: 'Exam Allotment', href: route('allotments.index'), active: route().current('allotments.*') },
            ]
        },
        { 
            name: 'Verification', 
            icon: ClipboardCheck, 
            active: route().current('attendance.*') || route().current('eligibility.*') || route().current('verification.*'), 
            show: !isStudent,
            children: [
                { name: 'Attendance', href: route('attendance.index'), active: route().current('attendance.*') },
                { name: 'Eligibility Check', href: route('eligibility.index'), active: route().current('eligibility.*') },
            ]
        },
        { name: 'Seat Allocation', href: route('seat-allocation.index'), icon: LayoutGrid, active: route().current('seat-allocation.*'), show: isAdmin || isStaff },
        { name: 'Hall Tickets', href: route('hall-tickets.index'), icon: Ticket, active: route().current('hall-tickets.*'), show: true },
        { 
            name: 'Reports', 
            href: route('reports.index'),
            icon: BarChart3, 
            active: route().current('reports.*'), 
            show: !isStudent
        },
        { 
            name: 'System Settings', 
            icon: Settings, 
            active: route().current('settings.*'), 
            show: isAdmin,
            children: [
                { name: 'Appearance', href: route('settings.appearance'), active: route().current('settings.appearance') },
                { name: 'Email Setup', href: route('settings.email'), active: route().current('settings.email') },
            ]
        },
    ].filter(item => item.show);

    // Auto-expand menus based on current route
    useEffect(() => {
        const newExpanded = {};
        sidebarNavItems.forEach(item => {
            if (item.children && item.active) {
                newExpanded[item.name] = true;
            }
        });
        setExpandedMenus(newExpanded);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar for Desktop */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 fixed inset-y-0 z-20 shadow-sm overflow-hidden">
                <div className="flex items-center justify-center h-16 border-b border-gray-200 px-4 shrink-0 bg-white">
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <img src="/images/logo.png" alt="ExamHall" className="h-9 w-auto group-hover:scale-105 transition-transform" />
                        <span className="font-bold text-lg text-gray-900 tracking-tight">ExamHall</span>
                    </Link>
                </div>
                
                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
                    <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 opacity-70">Main Navigation</p>
                    {sidebarNavItems.map((item) => {
                        const Icon = item.icon;
                        const hasChildren = item.children && item.children.length > 0;
                        const isExpanded = expandedMenus[item.name];

                        if (hasChildren) {
                            const ParentTag = item.href ? Link : 'button';
                            return (
                                <div key={item.name} className="space-y-1">
                                    <ParentTag
                                        href={item.href}
                                        onClick={(e) => {
                                            if (!item.href) e.preventDefault();
                                            toggleMenu(item.name);
                                        }}
                                        className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-bold rounded-xl transition-all group ${
                                            item.active 
                                            ? 'text-blue-600 bg-blue-50/50' 
                                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                    >
                                        <div className="flex items-center">
                                            <Icon className={`w-5 h-5 mr-3 transition-colors ${item.active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                                            {item.name}
                                        </div>
                                        <div onClick={(e) => {
                                            if (item.href) {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                toggleMenu(item.name);
                                            }
                                        }}>
                                            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                        </div>
                                    </ParentTag>
                                    
                                    {isExpanded && (
                                        <div className="ml-9 space-y-1 border-l-2 border-gray-100 pl-4 py-1">
                                            {item.children.map(child => (
                                                <Link
                                                    key={child.name}
                                                    href={child.href}
                                                    className={`block py-2 text-xs font-bold transition-colors ${
                                                        child.active 
                                                        ? 'text-blue-600' 
                                                        : 'text-gray-400 hover:text-gray-800'
                                                    }`}
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center px-4 py-2.5 text-sm font-bold rounded-xl transition-all duration-200 group ${
                                    item.active
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                <Icon className={`w-5 h-5 mr-3 transition-colors ${item.active ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
                
                <div className="p-4 border-t border-gray-200 bg-gray-50/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-blue-700 font-black overflow-hidden shadow-sm">
                            {user.profile_picture ? (
                                <img src={`/storage/${user.profile_picture}`} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                                <UserCircle className="w-6 h-6 text-gray-300" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-black text-gray-900 truncate uppercase tracking-tighter">{user.name}</p>
                            <p className="text-[10px] text-gray-400 truncate font-bold">{user.role?.replace('_', ' ')}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col md:ml-64 min-w-0 min-h-screen">
                {/* Top Navigation */}
                <nav className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm h-16 flex items-center shrink-0">
                    <div className="px-4 sm:px-6 lg:px-8 w-full">
                        <div className="flex justify-between items-center h-full">
                            {/* Mobile menu button & Logo */}
                            <div className="flex items-center md:hidden gap-3">
                                <button
                                    onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                    className="inline-flex items-center justify-center p-2 rounded-xl text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition"
                                >
                                    {showingNavigationDropdown ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                                </button>
                                <Link href="/" className="md:hidden flex items-center gap-2">
                                    <img src="/images/logo.png" alt="ExamHall" className="h-8 w-auto" />
                                </Link>
                            </div>

                            <div className="hidden md:flex flex-1 items-center px-4">
                                <div className="relative max-w-sm w-full group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
                                    <input 
                                        type="text" 
                                        placeholder="Global search student, exam..." 
                                        className="w-full bg-gray-50 border-0 rounded-2xl py-2 pl-11 pr-4 text-xs font-bold focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-300"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
                                        <Bell className="h-5 w-5" />
                                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
                                    </button>
                                </div>
                                
                                <div className="sm:flex sm:items-center">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button className="flex items-center gap-3 p-1 rounded-2xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100">
                                                <div className="w-8 h-8 rounded-xl bg-blue-100 overflow-hidden flex items-center justify-center border border-blue-200">
                                                    {user.profile_picture ? (
                                                        <img src={`/storage/${user.profile_picture}`} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <User className="w-4 h-4 text-blue-600" />
                                                    )}
                                                </div>
                                                <div className="hidden sm:block text-left">
                                                    <p className="text-[11px] font-black text-gray-900 leading-none mb-1">{user.name}</p>
                                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{user.role}</p>
                                                </div>
                                                <ChevronDown className="w-4 h-4 text-gray-400" />
                                            </button>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <div className="px-4 py-3 border-b border-gray-50">
                                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Authenticated as</p>
                                                <p className="text-sm font-bold text-gray-900 truncate">{user.email}</p>
                                            </div>
                                            <Dropdown.Link href={route('profile.edit')}>My Account Settings</Dropdown.Link>
                                            <Dropdown.Link href={route('logout')} method="post" as="button" className="text-red-500">
                                                Secure Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Navigation Menu */}
                    <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-xl z-20 overflow-y-auto max-h-[80vh]'}>
                        <div className="pt-4 pb-6 space-y-2 px-4">
                            {sidebarNavItems.map((item) => {
                                const Icon = item.icon;
                                const hasChildren = item.children && item.children.length > 0;
                                
                                if (hasChildren) {
                                    return (
                                        <div key={item.name} className="space-y-1">
                                            <div className="px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 rounded-lg">{item.name}</div>
                                            {item.children.map(child => (
                                                <ResponsiveNavLink key={child.name} href={child.href} active={child.active}>
                                                    {child.name}
                                                </ResponsiveNavLink>
                                            ))}
                                        </div>
                                    );
                                }

                                return (
                                    <ResponsiveNavLink
                                        key={item.name}
                                        href={item.href}
                                        active={item.active}
                                    >
                                        <div className="flex items-center">
                                            <Icon className="w-4 h-4 mr-2" />
                                            {item.name}
                                        </div>
                                    </ResponsiveNavLink>
                                );
                            })}
                        </div>
                    </div>
                </nav>

                {/* Page Header */}
                {header && (
                    <header className="bg-white/50 backdrop-blur-md border-b border-gray-200 shrink-0">
                        <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                            {header}
                        </div>
                    </header>
                )}

                {/* Main Content Area */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
