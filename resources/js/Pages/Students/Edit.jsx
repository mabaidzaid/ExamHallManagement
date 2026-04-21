import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Users, Save, X, Mail, User, Shield, Phone, MapPin, Calendar, FileText, BadgeCheck, GraduationCap, Camera, Globe, Landmark, ArrowLeft } from 'lucide-react';

export default function StudentsEdit({ student, classes }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT', // Manual PUT for form data with files
        first_name: student.first_name || '',
        last_name: student.last_name || '',
        email: student.user?.email || '',
        admission_number: student.admission_number || '',
        class_id: student.classes?.[0]?.id || '',
        gender: student.gender || 'male',
        date_of_birth: student.date_of_birth || '',
        phone: student.phone || '',
        address: student.address || '',
        city: student.city || '',
        state: student.state || '',
        country: student.country || 'Pakistan',
        admission_date: student.admission_date || '',
        cnic: student.cnic || '',
        profile_picture: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Since browsing files with PUT is tricky in Laravel (multipart/form-data), 
        // we spoof PUT using POST
        post(route('students.update', student.id), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Users className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 leading-tight">Edit Student</h2>
                            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest text-left text-left">Updating {student.user?.name}'s Profile</p>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title={`Edit Student: ${student.user?.name}`} />

            <div className="py-8 px-4 md:px-8 text-left text-left">
                <div className="max-w-5xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Profile Picture Upload Section */}
                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 p-8 flex flex-col items-center justify-center">
                            <div className="relative group">
                                <div className="w-32 h-32 bg-gray-100 rounded-full overflow-hidden border-4 border-white shadow-lg flex items-center justify-center">
                                    {data.profile_picture ? (
                                        <img 
                                            src={URL.createObjectURL(data.profile_picture)} 
                                            alt="Preview" 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : student.profile_picture ? (
                                        <img 
                                            src={`/storage/${student.profile_picture}`} 
                                            alt={student.user?.name} 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex-shrink-0 w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-3xl">
                                            {student.user?.name?.charAt(0) || 'S'}
                                        </div>
                                    )}
                                </div>
                                <label className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700 shadow-lg transition-all scale-100 hover:scale-110 active:scale-95">
                                    <Camera className="w-5 h-5 text-left" />
                                    <input 
                                        type="file" 
                                        className="hidden" 
                                        onChange={e => setData('profile_picture', e.target.files[0])}
                                        accept="image/*"
                                    />
                                </label>
                            </div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-4">Change Student Profile Picture</p>
                            {errors.profile_picture && <p className="mt-2 text-xs text-red-500 font-bold">{errors.profile_picture}</p>}
                        </div>

                        {/* Identify & Domain Section */}
                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                            <div className="px-10 py-6 bg-gradient-to-br from-blue-50 to-white flex items-center justify-between border-b border-gray-100">
                                <h3 className="text-sm font-black text-blue-900 uppercase tracking-widest flex items-center gap-3 text-left">
                                    <Shield className="w-5 h-5 text-blue-600" />
                                    Identify & Domain
                                </h3>
                            </div>
                            
                            <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                                <div className="group text-left">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 text-left">First Name</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="text"
                                            value={data.first_name}
                                            onChange={e => setData('first_name', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl"
                                        />
                                    </div>
                                    {errors.first_name && <p className="mt-2 text-xs text-red-500 font-bold">{errors.first_name}</p>}
                                </div>

                                <div className="group text-left">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 text-left">Last Name</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <User className="w-5 h-5 text-left" />
                                        </div>
                                        <input
                                            type="text"
                                            value={data.last_name}
                                            onChange={e => setData('last_name', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl"
                                        />
                                    </div>
                                    {errors.last_name && <p className="mt-2 text-xs text-red-500 font-bold">{errors.last_name}</p>}
                                </div>

                                <div className="group text-left text-left">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 text-left text-left">Login Email</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
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

                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 text-left">CNIC / ID Number</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="text"
                                            value={data.cnic}
                                            onChange={e => setData('cnic', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl text-left"
                                        />
                                    </div>
                                    {errors.cnic && <p className="mt-2 text-xs text-red-500 font-bold text-left">{errors.cnic}</p>}
                                </div>

                                <div className="group text-left">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 text-left text-left">Admission ID #</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <BadgeCheck className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="text"
                                            value={data.admission_number}
                                            onChange={e => setData('admission_number', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl text-left"
                                        />
                                    </div>
                                    {errors.admission_number && <p className="mt-2 text-xs text-red-500 font-bold">{errors.admission_number}</p>}
                                </div>

                                <div className="group text-left">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 text-left text-left">Target Class</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group text-left">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <GraduationCap className="w-5 h-5 text-left" />
                                        </div>
                                        <select
                                            value={data.class_id}
                                            onChange={e => setData('class_id', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl cursor-pointer"
                                        >
                                            <option value="">Select Category</option>
                                            {classes.map(cls => (
                                                <option key={cls.id} value={cls.id}>{cls.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.class_id && <p className="mt-2 text-xs text-red-500 font-bold">{errors.class_id}</p>}
                                </div>

                                <div className="group text-left">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 text-left text-left">Gender</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group text-left">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <User className="w-5 h-5 text-left" />
                                        </div>
                                        <select
                                            value={data.gender}
                                            onChange={e => setData('gender', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl cursor-pointer"
                                        >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    {errors.gender && <p className="mt-2 text-xs text-red-500 font-bold">{errors.gender}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Contact & Personal Data Section */}
                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden text-left">
                            <div className="px-10 py-6 bg-gradient-to-br from-indigo-50 to-white flex items-center justify-between border-b border-gray-100">
                                <h3 className="text-sm font-black text-indigo-900 uppercase tracking-widest flex items-center gap-3 text-left">
                                    <Phone className="w-5 h-5 text-indigo-600" />
                                    Contact & Personal Data
                                </h3>
                            </div>
                            
                            <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 text-left">Phone Number</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <Phone className="w-5 h-5 text-left" />
                                        </div>
                                        <input
                                            type="text"
                                            value={data.phone}
                                            onChange={e => setData('phone', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl"
                                        />
                                    </div>
                                    {errors.phone && <p className="mt-2 text-xs text-red-500 font-bold">{errors.phone}</p>}
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 text-left">Date of Birth</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <Calendar className="w-5 h-5 text-left" />
                                        </div>
                                        <input
                                            type="date"
                                            value={data.date_of_birth}
                                            onChange={e => setData('date_of_birth', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl"
                                        />
                                    </div>
                                    {errors.date_of_birth && <p className="mt-2 text-xs text-red-500 font-bold">{errors.date_of_birth}</p>}
                                </div>

                                <div className="group lg:col-span-2">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 text-left text-left text-left">Residential Address</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <MapPin className="w-5 h-5 text-left" />
                                        </div>
                                        <input
                                            type="text"
                                            value={data.address}
                                            onChange={e => setData('address', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl"
                                        />
                                    </div>
                                    {errors.address && <p className="mt-2 text-xs text-red-500 font-bold">{errors.address}</p>}
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 text-left text-left">City</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <Landmark className="w-5 h-5 text-left" />
                                        </div>
                                        <input
                                            type="text"
                                            value={data.city}
                                            onChange={e => setData('city', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl"
                                        />
                                    </div>
                                    {errors.city && <p className="mt-2 text-xs text-red-500 font-bold">{errors.city}</p>}
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 text-left text-left">State</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <Globe className="w-5 h-5 text-left" />
                                        </div>
                                        <input
                                            type="text"
                                            value={data.state}
                                            onChange={e => setData('state', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl"
                                        />
                                    </div>
                                    {errors.state && <p className="mt-2 text-xs text-red-500 font-bold">{errors.state}</p>}
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 text-left text-left">Country</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                        <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <Globe className="w-5 h-5 text-left" />
                                        </div>
                                        <input
                                            type="text"
                                            value={data.country}
                                            onChange={e => setData('country', e.target.value)}
                                            className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl text-left"
                                        />
                                    </div>
                                    {errors.country && <p className="mt-2 text-xs text-red-500 font-bold">{errors.country}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end p-4 text-left">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-black uppercase tracking-[0.1em] hover:shadow-2xl hover:shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-4 disabled:opacity-50 text-[12px] min-w-[240px] shadow-lg shadow-blue-200"
                            >
                                <Save className="w-5 h-5 text-left text-left" />
                                {processing ? 'Updating...' : 'Update Student Record'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
