import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { GraduationCap, Save, X, Mail, User, Shield, Phone, MapPin, Briefcase, Calendar, FileText } from 'lucide-react';

export default function TeachersEdit({ teacher }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        name: teacher.user.name,
        email: teacher.user.email,
        department: teacher.department || '',
        designation: teacher.designation || '',
        qualification: teacher.qualification || '',
        experience: teacher.experience || '',
        contact_number: teacher.contact_number || '',
        cnic: teacher.cnic || '',
        address: teacher.address || '',
        city: teacher.city || '',
        state: teacher.state || '',
        country: teacher.country || '',
        gender: teacher.gender || 'male',
        joining_date: teacher.joining_date || '',
        profile_picture: null,
        cv: null,
        id_card_front: null,
        id_card_back: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('teachers.update', teacher.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                            <GraduationCap className="w-8 h-8 text-indigo-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 leading-tight">Edit Teacher Records</h2>
                            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Update information for {teacher.user.name}</p>
                        </div>
                    </div>
                    <Link
                        href={route('teachers.index')}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition font-bold text-sm"
                    >
                        <X className="w-4 h-4" />
                        Discard
                    </Link>
                </div>
            }
        >
            <Head title={`Edit ${teacher.user.name}`} />

            <div className="py-8 px-4 md:px-8">
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Account Information Card */}
                        <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                            <div className="px-8 py-6 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-100">
                                <h3 className="text-sm font-black text-indigo-900 uppercase tracking-widest flex items-center gap-2">
                                    <Shield className="w-4 h-4" />
                                    Identity Details
                                </h3>
                            </div>
                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Professional Name</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-indigo-500/10 focus-within:bg-white transition-all h-[56px] group">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl"
                                        />
                                    </div>
                                    {errors.name && <p className="mt-2 text-xs text-red-500 font-bold">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Official Email</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-indigo-500/10 focus-within:bg-white transition-all h-[56px] group">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl"
                                        />
                                    </div>
                                    {errors.email && <p className="mt-2 text-xs text-red-500 font-bold">{errors.email}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Professional Information Card */}
                        <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                            <div className="px-8 py-6 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-100">
                                <h3 className="text-sm font-black text-indigo-900 uppercase tracking-widest flex items-center gap-2">
                                    <Briefcase className="w-4 h-4" />
                                    Academic Profile
                                </h3>
                            </div>
                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Department</label>
                                    <input
                                        type="text"
                                        value={data.department}
                                        onChange={e => setData('department', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition text-sm font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Designation</label>
                                    <input
                                        type="text"
                                        value={data.designation}
                                        onChange={e => setData('designation', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition text-sm font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Qualification</label>
                                    <input
                                        type="text"
                                        value={data.qualification}
                                        onChange={e => setData('qualification', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition text-sm font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Experience</label>
                                    <input
                                        type="text"
                                        value={data.experience}
                                        onChange={e => setData('experience', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition text-sm font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact & Personal Card */}
                        <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                            <div className="px-8 py-6 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-100">
                                <h3 className="text-sm font-black text-indigo-900 uppercase tracking-widest flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    Contact & Personal
                                </h3>
                            </div>
                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Contact Number</label>
                                    <input
                                        type="text"
                                        value={data.contact_number}
                                        onChange={e => setData('contact_number', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition text-sm font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">CNIC Number</label>
                                    <input
                                        type="text"
                                        value={data.cnic}
                                        onChange={e => setData('cnic', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition text-sm font-medium"
                                        placeholder="e.g. 12345-6789012-3"
                                    />
                                    {errors.cnic && <p className="mt-2 text-xs text-red-500 font-bold">{errors.cnic}</p>}
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Gender</label>
                                    <select
                                        value={data.gender}
                                        onChange={e => setData('gender', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition text-sm font-medium"
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Address</label>
                                    <textarea
                                        value={data.address}
                                        onChange={e => setData('address', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition text-sm font-medium min-h-[100px]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">City</label>
                                    <input
                                        type="text"
                                        value={data.city}
                                        onChange={e => setData('city', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition text-sm font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Joining Date</label>
                                    <input
                                        type="date"
                                        value={data.joining_date}
                                        onChange={e => setData('joining_date', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition text-sm font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">State</label>
                                    <input
                                        type="text"
                                        value={data.state}
                                        onChange={e => setData('state', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition text-sm font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Country</label>
                                    <input
                                        type="text"
                                        value={data.country}
                                        onChange={e => setData('country', e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition text-sm font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Documents & Images Card */}
                        <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                            <div className="px-8 py-6 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-100">
                                <h3 className="text-sm font-black text-indigo-900 uppercase tracking-widest flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Documents & Images
                                </h3>
                            </div>
                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Profile Picture <span className="text-gray-300 font-normal normal-case tracking-normal">(Upload new to replace)</span></label>
                                    <div className="flex items-center gap-4 mt-2">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => setData('profile_picture', e.target.files[0])}
                                            className="flex-1 px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition text-sm font-medium file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                                        />
                                        {teacher.profile_picture && (
                                            <div className="flex-shrink-0">
                                                <img 
                                                    src={teacher.profile_picture.startsWith('http') ? teacher.profile_picture : `/storage/${teacher.profile_picture}`} 
                                                    className="w-12 h-12 rounded-xl object-cover border-2 border-indigo-100" 
                                                    alt="Current" 
                                                />
                                            </div>
                                        )}
                                    </div>
                                    {errors.profile_picture && <p className="mt-2 text-xs text-red-500 font-bold">{errors.profile_picture}</p>}
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">CV / Resume <span className="text-gray-300 font-normal normal-case tracking-normal">(Upload new to replace)</span></label>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={e => setData('cv', e.target.files[0])}
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition text-sm font-medium file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                                    />
                                    {errors.cv && <p className="mt-2 text-xs text-red-500 font-bold">{errors.cv}</p>}
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">ID Card Front <span className="text-gray-300 font-normal normal-case tracking-normal">(Upload new to replace)</span></label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => setData('id_card_front', e.target.files[0])}
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition text-sm font-medium file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                                    />
                                    {errors.id_card_front && <p className="mt-2 text-xs text-red-500 font-bold">{errors.id_card_front}</p>}
                                </div>

                                <div>
                                    <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">ID Card Back <span className="text-gray-300 font-normal normal-case tracking-normal">(Upload new to replace)</span></label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => setData('id_card_back', e.target.files[0])}
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition text-sm font-medium file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                                    />
                                    {errors.id_card_back && <p className="mt-2 text-xs text-red-500 font-bold">{errors.id_card_back}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end p-4 gap-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-blue-700 text-white rounded-2xl font-black uppercase tracking-[0.1em] hover:shadow-2xl hover:shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-4 disabled:opacity-50 text-[12px] whitespace-nowrap min-w-[220px]"
                            >
                                <Save className="w-5 h-5" />
                                {processing ? 'Updating...' : 'Save Updates'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
