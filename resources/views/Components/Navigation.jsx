import React from 'react';
import { Link } from '@inertiajs/react';
import {
    Users,
    Lock,
    Shield,
    Settings,
    Home,
    BookOpen,
    User,
    GraduationCap,
    Building2,
    Calendar,
    Clipboard,
    FileText,
} from 'lucide-react';

/**
 * Navigation Component with Role Management Links
 * Include this in your main Layout component
 */
export default function Navigation({ user }) {
    const navigationItems = [
        {
            name: 'Dashboard',
            href: '/dashboard',
            icon: Home,
            roles: ['all'], // All authenticated users
        },
        {
            divider: true,
            label: 'MANAGEMENT',
        },
        {
            name: 'Users',
            href: '/users',
            icon: Users,
            roles: ['admin', 'super-admin'],
        },
        {
            name: 'Roles & Permissions', // NEW
            href: '/roles',
            icon: Lock,
            roles: ['admin', 'super-admin'],
            submenu: [
                {
                    name: 'All Roles',
                    href: '/roles',
                    icon: Lock,
                },
                {
                    name: 'Permissions Directory',
                    href: '/roles/permissions',
                    icon: Shield,
                },
            ],
        },
        {
            name: 'Teachers',
            href: '/teachers',
            icon: User,
            roles: ['admin', 'super-admin'],
        },
        {
            name: 'Students',
            href: '/students',
            icon: GraduationCap,
            roles: ['admin', 'super-admin', 'teacher'],
        },
        {
            name: 'Subjects',
            href: '/subjects',
            icon: BookOpen,
            roles: ['admin', 'super-admin'],
        },
        {
            name: 'Classes',
            href: '/classes',
            icon: Building2,
            roles: ['admin', 'super-admin'],
        },
        {
            name: 'Rooms',
            href: '/rooms',
            icon: Building2,
            roles: ['admin', 'super-admin'],
        },
        {
            divider: true,
            label: 'EXAMINATIONS',
        },
        {
            name: 'Exams',
            href: '/exams',
            icon: Calendar,
            roles: ['admin', 'super-admin', 'teacher'],
        },
        {
            name: 'Hall Tickets',
            href: '/hall-tickets',
            icon: Clipboard,
            roles: ['admin', 'super-admin'],
        },
        {
            name: 'Seat Allocation',
            href: '/seat-allocation',
            icon: Building2,
            roles: ['admin', 'super-admin'],
        },
        {
            name: 'Attendance',
            href: '/attendance',
            icon: Users,
            roles: ['admin', 'super-admin', 'teacher'],
        },
        {
            divider: true,
            label: 'MORE',
        },
        {
            name: 'Reports',
            href: '/reports',
            icon: FileText,
            roles: ['admin', 'super-admin'],
        },
        {
            name: 'Settings',
            href: '/settings',
            icon: Settings,
            roles: ['admin', 'super-admin'],
        },
    ];

    const canAccessItem = (item) => {
        if (!item.roles) return true;
        if (item.roles.includes('all')) return true;
        if (!user) return false;
        return item.roles.some(role => user.roles?.includes(role) || user.role === role);
    };

    const [expandedMenu, setExpandedMenu] = React.useState(null);

    return (
        <nav className="space-y-1 px-2 py-4">
            {navigationItems.map((item, index) => {
                if (item.divider) {
                    return (
                        <div key={index} className="py-2 mt-2">
                            <div className="flex items-center px-3">
                                <div className="flex-1 h-px bg-gray-300"></div>
                            </div>
                            <p className="text-xs font-semibold text-gray-500 uppercase mt-2 px-3">
                                {item.label}
                            </p>
                        </div>
                    );
                }

                if (!canAccessItem(item)) {
                    return null;
                }

                const Icon = item.icon;
                const hasSubmenu = item.submenu && item.submenu.length > 0;
                const isExpanded = expandedMenu === item.href;

                return (
                    <div key={item.href}>
                        {hasSubmenu ? (
                            <button
                                onClick={() => setExpandedMenu(isExpanded ? null : item.href)}
                                className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                            >
                                <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                                <span className="flex-1 text-left">{item.name}</span>
                                <svg
                                    className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                    />
                                </svg>
                            </button>
                        ) : (
                            <Link
                                href={item.href}
                                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                            >
                                <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                                <span>{item.name}</span>
                            </Link>
                        )}

                        {/* Submenu */}
                        {hasSubmenu && isExpanded && (
                            <div className="ml-4 space-y-1">
                                {item.submenu.map((subitem) => (
                                    <Link
                                        key={subitem.href}
                                        href={subitem.href}
                                        className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition"
                                    >
                                        {subitem.icon && <subitem.icon className="w-4 h-4 mr-2 flex-shrink-0" />}
                                        <span>{subitem.name}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}

/**
 * Usage in Layout Component:
 * 
 * import Navigation from '@/Components/Navigation';
 * 
 * export default function Layout({ user, children }) {
 *     return (
 *         <div className="flex h-screen bg-gray-100">
 *             {/* Sidebar */
//  *             <div className="w-64 bg-white shadow-lg">
//  *                 <Navigation user={user} />
//  *             </div>
//  * 
//  *             {/* Main Content */}
//  *             <div className="flex-1 flex flex-col overflow-hidden">
//  *                 {children}
//  *             </div>
//  *         </div>
//  *     );
//  * }
//  */

/**
 * Optional: Add Badge Component for New Feature
 * 
 * {item.name === 'Roles & Permissions' && (
 *     <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
 *         NEW
 *     </span>
 * )}
 */

/**
 * Optional: Role-based Navigation Customization
 * 
 * For admin: Show all items
 * For manager: Show dashboard, students, teachers, reports
 * For teacher: Show dashboard, students, exams, attendance
 * For student: Show dashboard, hall tickets, exam schedule
 */

/**
 * Example Role Configuration:
 * 
 * admin: All access
 * super-admin: All access
 * manager: Users, Students, Teachers, Classes, Reports
 * teacher: Students, Exams, Attendance, Hall Tickets
 * student: Dashboard, Hall Tickets
 */
