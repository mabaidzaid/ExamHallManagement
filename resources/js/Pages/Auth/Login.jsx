import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Secure Access" />

            <div className="mb-8">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest">Sign In</h2>
                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider mt-1">Verification Required</p>
            </div>

            {status && (
                <div className="mb-6 rounded-2xl bg-emerald-50 border border-emerald-100 p-4 text-sm font-bold text-emerald-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="email" value="Email Address" className="text-slate-500 uppercase text-[9px] font-black tracking-widest ml-1 mb-2" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="w-full bg-slate-50 border-slate-200 text-slate-900 rounded-2xl py-4 px-6 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-300"
                        autoComplete="username"
                        isFocused={true}
                        placeholder="admin@exam.com"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2 text-[10px] font-bold text-red-500" />
                </div>

                <div className="">
                    <InputLabel htmlFor="password" value="Master Password" className="text-slate-500 uppercase text-[9px] font-black tracking-widest ml-1 mb-2" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="w-full bg-slate-50 border-slate-200 text-slate-900 rounded-2xl py-4 px-6 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-300"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2 text-[10px] font-bold text-red-500" />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center group cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            className="rounded-lg bg-slate-50 border-slate-200 text-blue-600 focus:ring-blue-500/10 w-5 h-5"
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-[11px] font-bold text-slate-400 group-hover:text-slate-600 transition-colors uppercase tracking-widest">
                            Stay Signed In
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-[10px] font-bold text-blue-600 hover:text-indigo-600 transition-colors uppercase tracking-widest"
                        >
                            Reset Password?
                        </Link>
                    )}
                </div>

                <div className="pt-4 flex flex-col gap-4">
                    <button 
                        type="submit"
                        disabled={processing}
                        className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-[1.5rem] font-black text-[12px] uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 transition active:scale-95 disabled:opacity-50"
                    >
                        {processing ? 'Verifying...' : 'Initialize Access'}
                    </button>

                    <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        New User? <Link href={route('register')} className="text-blue-600 hover:text-indigo-600 transition-colors">Create Account</Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
