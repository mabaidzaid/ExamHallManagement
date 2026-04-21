import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { BookOpen, Save, X, Book, FileText, BookmarkCheck } from 'lucide-react';

export default function SubjectsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        code: '',
        description: '',
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('subjects.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <BookOpen className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 leading-tight">Add New Subject</h2>
                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">Register a new academic unit</p>
                    </div>
                </div>
            }
        >
            <Head title="Create Subject" />

            <div className="py-8 px-4 md:px-8">
                <div className="max-w-3xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                            <div className="px-10 py-8 bg-gradient-to-br from-blue-50 to-white flex items-center justify-between border-b border-gray-100">
                                <h3 className="text-sm font-black text-blue-900 uppercase tracking-widest flex items-center gap-3">
                                    <BookmarkCheck className="w-5 h-5 text-blue-600" />
                                    Subject Specification
                                </h3>
                            </div>
                            
                            <div className="p-10 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="group">
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Professional Name</label>
                                        <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                            <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                                <Book className="w-5 h-5" />
                                            </div>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl"
                                                placeholder="e.g. Calculus I"
                                            />
                                        </div>
                                        {errors.name && <p className="mt-2 text-xs text-red-500 font-bold">{errors.name}</p>}
                                    </div>

                                    <div className="group">
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Identification Code</label>
                                        <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-transparent focus-within:border-blue-500/10 focus-within:bg-white transition-all h-[56px] group">
                                            <div className="pl-4 pr-2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                                <BookmarkCheck className="w-5 h-5" />
                                            </div>
                                            <input
                                                type="text"
                                                value={data.code}
                                                onChange={e => setData('code', e.target.value)}
                                                className="flex-1 bg-transparent border-0 focus:ring-0 text-sm font-bold text-gray-800 h-full rounded-r-2xl"
                                                placeholder="e.g. SUB-102"
                                            />
                                        </div>
                                        {errors.code && <p className="mt-2 text-xs text-red-500 font-bold">{errors.code}</p>}
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Strategic Description</label>
                                    <textarea
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent focus:border-blue-500/10 focus:bg-white rounded-[2rem] transition-all min-h-[160px] text-sm font-medium text-gray-700 resize-none"
                                        placeholder="Outline the core objectives..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end p-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-black uppercase tracking-[0.1em] hover:shadow-2xl hover:shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-4 disabled:opacity-50 text-[12px] whitespace-nowrap min-w-[240px]"
                            >
                                <Save className="w-5 h-5" />
                                {processing ? 'Creating...' : 'Register Subject'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
