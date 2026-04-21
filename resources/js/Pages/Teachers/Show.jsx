import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { GraduationCap, Mail, Phone, MapPin, Briefcase, Calendar, Award, Clock, ArrowLeft, Edit } from 'lucide-react';

export default function TeachersShow({ teacher }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href={route('teachers.index')} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 leading-tight">Teacher Profile</h2>
                            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Employee #: {teacher.id.toString().padStart(5, '0')}</p>
                        </div>
                    </div>
                    <Link
                        href={route('teachers.edit', teacher.id)}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-bold text-sm shadow-lg shadow-blue-100"
                    >
                        <Edit className="w-4 h-4" />
                        Edit Profile
                    </Link>
                </div>
            }
        >
            <Head title={`${teacher.user.name}'s Profile`} />

            <div className="py-8 px-4 md:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Profile Sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 p-8 text-center">
                                {teacher.profile_picture ? (
                                    <img 
                                        src={`/storage/${teacher.profile_picture}`} 
                                        alt={teacher.user.name}
                                        className="w-32 h-32 rounded-3xl object-cover mx-auto mb-6 shadow-2xl shadow-blue-200 ring-4 ring-blue-50"
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6 shadow-2xl shadow-blue-200 uppercase">
                                        {teacher.user.name.charAt(0)}
                                    </div>
                                )}
                                <h3 className="text-2xl font-black text-gray-900">{teacher.user.name}</h3>
                                <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mt-1">{teacher.designation || 'Faculty Member'}</p>
                                
                                <div className="mt-8 pt-8 border-t border-gray-50 space-y-4">
                                    <div className="flex items-center gap-3 text-left">
                                        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email</p>
                                            <p className="text-sm font-bold text-gray-700 truncate">{teacher.user.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-left">
                                        <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact</p>
                                            <p className="text-sm font-bold text-gray-700">{teacher.contact_number || 'Not provided'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 p-8">
                                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-blue-400" />
                                    Employment Status
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500 font-medium">Status</span>
                                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${teacher.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {teacher.status || 'Active'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500 font-medium">Joined Date</span>
                                        <span className="text-sm font-bold text-gray-700">{teacher.joining_date || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Info */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Academic Background */}
                            <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                                <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                        <Award className="w-4 h-4 text-blue-500" />
                                        Academic & Professional Background
                                    </h3>
                                </div>
                                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-1 text-left">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Department</span>
                                        <span className="text-base font-bold text-gray-800">{teacher.department || 'General Education'}</span>
                                    </div>
                                    <div className="space-y-1 text-left">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Qualification</span>
                                        <span className="text-base font-bold text-gray-800">{teacher.qualification || 'N/A'}</span>
                                    </div>
                                    <div className="space-y-1 text-left">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Experience In Years</span>
                                        <span className="text-base font-bold text-gray-800">{teacher.experience || 'N/A'}</span>
                                    </div>
                                    <div className="space-y-1 text-left">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Gender</span>
                                        <span className="text-base font-bold text-gray-800 capitalize">{teacher.gender || 'Not specified'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Address & Location */}
                            <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                                <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-indigo-500" />
                                        Address & Location
                                    </h3>
                                </div>
                                <div className="p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                        <div className="space-y-1 text-left">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">City</span>
                                            <span className="text-base font-bold text-gray-800">{teacher.city || 'N/A'}</span>
                                        </div>
                                        <div className="space-y-1 text-left">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">State/Country</span>
                                            <span className="text-base font-bold text-gray-800">{teacher.state || ''} {teacher.country || ''} {!teacher.state && !teacher.country ? 'N/A' : ''}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1 text-left">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Full Physical Address</span>
                                        <p className="text-base font-bold text-gray-800 leading-relaxed">
                                            {teacher.address || 'No physical address records found in the system.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
