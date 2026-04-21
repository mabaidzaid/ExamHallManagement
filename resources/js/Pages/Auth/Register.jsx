import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Users, BookOpen } from 'lucide-react';

export default function Register() {
        const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'student', // Default role
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Create Account" />

            <div className="mb-6 text-center">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest">Enrollment</h2>
                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider mt-1">Join the ExamHall Network</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                {/* Role Selection Blocks */}
                <div className="grid grid-cols-2 gap-4 mb-2">
                    <button
                        type="button"
                        onClick={() => setData('role', 'student')}
                        className={`p-3 rounded-2xl border transition-all flex flex-col items-center gap-1 ${data.role === 'student' ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-500/20' : 'bg-slate-50 border-slate-200 hover:border-blue-200'}`}
                    >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${data.role === 'student' ? 'bg-white/20' : 'bg-slate-200'}`}>
                            <Users className={`w-3.5 h-3.5 ${data.role === 'student' ? 'text-white' : 'text-slate-500'}`} />
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-widest ${data.role === 'student' ? 'text-white' : 'text-slate-500'}`}>Student</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setData('role', 'teacher')}
                        className={`p-3 rounded-2xl border transition-all flex flex-col items-center gap-1 ${data.role === 'teacher' ? 'bg-indigo-600 border-indigo-500 shadow-lg shadow-indigo-500/20' : 'bg-slate-50 border-slate-200 hover:border-indigo-200'}`}
                    >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${data.role === 'teacher' ? 'bg-white/20' : 'bg-slate-200'}`}>
                            <BookOpen className={`w-3.5 h-3.5 ${data.role === 'teacher' ? 'text-white' : 'text-slate-500'}`} />
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-widest ${data.role === 'teacher' ? 'text-white' : 'text-slate-500'}`}>Teacher</span>
                    </button>
                    <InputError message={errors.role} className="col-span-2 mt-1 text-[9px] font-bold text-red-500" />
                </div>

                <div>
                    <InputLabel htmlFor="name" value="Full Name" className="text-slate-500 uppercase text-[8px] font-black tracking-widest ml-1 mb-1" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="w-full bg-slate-50 border-slate-200 text-slate-900 rounded-2xl py-3 px-6 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-300"
                        autoComplete="name"
                        isFocused={true}
                        placeholder="John Doe"
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-1 text-[9px] font-bold text-red-500" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email Address" className="text-slate-500 uppercase text-[8px] font-black tracking-widest ml-1 mb-1" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="w-full bg-slate-50 border-slate-200 text-slate-900 rounded-2xl py-3 px-6 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-300"
                        placeholder="email@example.com"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-1 text-[9px] font-bold text-red-500" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="password" value="Password" className="text-slate-500 uppercase text-[8px] font-black tracking-widest ml-1 mb-1" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="w-full bg-slate-50 border-slate-200 text-slate-900 rounded-2xl py-3 px-6 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-300"
                            placeholder="••••••••"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Confirm" className="text-slate-500 uppercase text-[8px] font-black tracking-widest ml-1 mb-1" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="w-full bg-slate-50 border-slate-200 text-slate-900 rounded-2xl py-3 px-6 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-300"
                            placeholder="••••••••"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.password} className="col-span-2 mt-1 text-[9px] font-bold text-red-500" />
                </div>

                <div className="pt-2 flex flex-col gap-3 text-center">
                    <button 
                        type="submit"
                        disabled={processing}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 transition active:scale-95 disabled:opacity-50"
                    >
                        {processing ? 'Processing...' : 'Create Account'}
                    </button>

                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                        Already have an account? <Link href={route('login')} className="text-blue-600 hover:text-indigo-600 transition-colors">Sign In</Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
