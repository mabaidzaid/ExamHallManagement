import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Users, Mail, Phone, MapPin, Calendar, FileText, BadgeCheck, Briefcase, Building, Globe, Landmark, ArrowLeft, Edit2, ShieldCheck, UserCircle, Award } from 'lucide-react';
import React from 'react';

export default function TeachersShow({ teacher }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Users className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 leading-tight">Teacher Profile</h2>
                            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest text-left">Detailed faculty record</p>
                        </div>
                    </div>
                    <Link
                        href={route('teachers.edit', teacher.id)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-blue-500 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all font-black text-[11px] uppercase tracking-widest active:scale-95 shadow-lg shadow-blue-50"
                    >
                        <Edit2 className="w-4 h-4" />
                        Modify Profile
                    </Link>
                </div>
            }
        >
            <Head title={`Teacher: ${teacher.user?.name}`} />

            <div className="py-8 px-4 md:px-8 text-left">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Hero Section */}
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
                        <div className="px-10 pb-10 -mt-16">
                            <div className="flex flex-col md:flex-row items-end gap-6 text-left">
                                <div className="relative">
                                    <div className="w-40 h-40 bg-white rounded-[2rem] p-2 shadow-2xl">
                                        {teacher.profile_picture ? (
                                            <img 
                                                src={teacher.profile_picture.startsWith('http') ? teacher.profile_picture : `/storage/${teacher.profile_picture}`} 
                                                alt={teacher.user?.name} 
                                                className="w-full h-full object-cover rounded-[1.5rem]"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-blue-50 rounded-[1.5rem] flex items-center justify-center">
                                                <UserCircle className="w-20 h-20 text-blue-200" />
                                            </div>
                                        )}
                                    </div>
                                    <div className={`absolute bottom-4 -right-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-lg ${
                                        teacher.status === 'active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                                    }`}>
                                        {teacher.status || 'Active'}
                                    </div>
                                </div>
                                <div className="flex-1 pb-2 text-left">
                                    <h1 className="text-4xl font-black text-gray-900 mb-1">{teacher.user?.name}</h1>
                                    <div className="flex flex-wrap gap-4 items-center text-gray-400 font-bold text-xs uppercase tracking-widest">
                                        <span className="flex items-center gap-2">
                                            <BadgeCheck className="w-4 h-4 text-blue-500" />
                                            ID: EMP{teacher.id.toString().padStart(3, '0')}
                                        </span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <span className="flex items-center gap-2">
                                            <Briefcase className="w-4 h-4 text-indigo-500" />
                                            {teacher.department || 'General Department'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Information Grid */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Academic Details */}
                            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
                                <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                                        <ShieldCheck className="w-4 h-4 text-blue-600" />
                                    </div>
                                    Identity & Professional
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                                    <InfoItem icon={<UserCircle />} label="Full Name" value={teacher.user?.name} />
                                    <InfoItem icon={<Mail />} label="Email Address" value={teacher.user?.email} />
                                    <InfoItem icon={<FileText />} label="CNIC / ID Card" value={teacher.cnic || 'Not Provided'} />
                                    <InfoItem icon={<Briefcase />} label="Designation" value={teacher.designation || 'Not Provided'} />
                                    <InfoItem icon={<Award />} label="Qualification" value={teacher.qualification || 'Not Provided'} />
                                    <InfoItem icon={<Calendar />} label="Joining Date" value={teacher.joining_date || 'N/A'} />
                                    <InfoItem icon={<Award />} label="Experience" value={teacher.experience || 'Not Specified'} />
                                    <InfoItem icon={<UserCircle />} label="Gender" value={teacher.gender || 'Not Specified'} />
                                </div>
                            </div>

                            {/* Contact & Residential */}
                            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
                                <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                                    <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-left">
                                        <MapPin className="w-4 h-4 text-indigo-600" />
                                    </div>
                                    Contact & Location
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 text-left">
                                    <InfoItem icon={<Phone />} label="Phone Number" value={teacher.contact_number || 'N/A'} />
                                    <div className="md:col-span-2">
                                        <InfoItem icon={<Landmark />} label="Full Address" value={teacher.address || 'N/A'} />
                                    </div>
                                    <InfoItem icon={<Building />} label="City" value={teacher.city || 'N/A'} />
                                    <InfoItem icon={<Globe />} label="State & Country" value={`${teacher.state || 'N/A'}, ${teacher.country || 'N/A'}`} />
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Widgets */}
                        <div className="space-y-8">
                            {/* Stats Card */}
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[2rem] p-8 text-white shadow-xl shadow-blue-100">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                                        <ShieldCheck className="w-6 h-6 text-blue-200" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black uppercase tracking-widest opacity-60">Status</h4>
                                        <p className="font-bold text-lg">System Verified</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-white w-full opacity-40"></div>
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40 leading-relaxed">Account created on {new Date(teacher.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>

                            {/* Actions Widget */}
                            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Quick Link</h4>
                                <div className="space-y-3">
                                    <Link href={route('teachers.index')} className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-2xl text-gray-600 font-bold text-xs hover:bg-gray-100 transition">
                                        <ArrowLeft className="w-4 h-4" />
                                        Back to Listing
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function InfoItem({ icon, label, value }) {
    return (
        <div className="flex gap-4 group">
            <div className="mt-1 text-gray-300 group-hover:text-blue-500 transition-colors">
                {icon && React.cloneElement(icon, { className: "w-5 h-5" })}
            </div>
            <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">{label}</p>
                <p className="text-sm font-bold text-gray-800 break-words">{value || '---'}</p>
            </div>
        </div>
    );
}
