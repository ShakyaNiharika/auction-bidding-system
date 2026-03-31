'use client';

import { useState } from 'react';
import { useGetVarieties, useCreateVariety, useUpdateVariety, useDeleteVariety } from '@/hooks/variety/useVarieties';
import { Variety } from '@/types/variety';
import Button from '@/components/ui/custom-button/Button';
import { Plus, Trash2, Edit2, Loader2, X, AlertTriangle } from 'lucide-react';
import ConfirmModal from '@/components/ui/ConfirmModal';

export default function VarietiesPage() {
    const { data: varieties, isLoading } = useGetVarieties();
    const { mutate: createVariety, isPending: isCreating } = useCreateVariety();
    const { mutate: updateVariety, isPending: isUpdating } = useUpdateVariety();
    const { mutate: deleteVariety, isPending: isDeleting } = useDeleteVariety();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedVariety, setSelectedVariety] = useState<Variety | null>(null);

    const [formData, setFormData] = useState({ 
        name: '', 
        description: '',
        tag: '',
        metricValue: '',
        metricLabel: '',
        image: ''
    });
    const [isUploading, setIsUploading] = useState(false);

    const handleOpenModal = (variety?: Variety) => {
        if (variety) {
            setSelectedVariety(variety);
            setFormData({ 
                name: variety.name, 
                description: variety.description || '',
                tag: variety.tag || '',
                metricValue: variety.metricValue || '',
                metricLabel: variety.metricLabel || '',
                image: variety.image || ''
            });
        } else {
            setSelectedVariety(null);
            setFormData({ 
                name: '', 
                description: '',
                tag: '',
                metricValue: '',
                metricLabel: '',
                image: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({ 
            name: '', 
            description: '',
            tag: '',
            metricValue: '',
            metricLabel: '',
            image: ''
        });
        setSelectedVariety(null);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setIsUploading(true);
            const file = e.target.files[0];
            const data = new FormData();
            data.append('images', file);

            try {
                const token = localStorage.getItem('userToken');
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/upload`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` },
                    body: data
                });
                const result = await res.json();
                if (result.success && result.urls.length > 0) {
                    setFormData(prev => ({ ...prev, image: result.urls[0] }));
                }
            } catch (err) {
                console.error('Upload failed', err);
            } finally {
                setIsUploading(false);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedVariety) {
            updateVariety({ id: selectedVariety._id, data: formData }, { onSuccess: handleCloseModal });
        } else {
            createVariety(formData, { onSuccess: handleCloseModal });
        }
    };

    const handleDelete = (id: string, title: string) => {
        setSelectedVariety({ _id: id, name: title } as Variety);
        setIsConfirmOpen(true);
    };

    const performDelete = () => {
        if (selectedVariety) {
            deleteVariety(selectedVariety._id, {
                onSuccess: () => {
                    setIsConfirmOpen(false);
                    setSelectedVariety(null);
                }
            });
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Sugarcane Varieties</h1>
                    <p className="text-gray-500 mt-2">Manage the types of sugarcane available for auction listings.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-[#1b4332] text-white px-6 py-3 rounded-2xl font-black shadow-lg shadow-[#1b4332]/10 hover:bg-[#153427] transition-all active:scale-95"
                >
                    <Plus size={20} />
                    Add New Variety
                </button>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="p-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-[#1b4332]" />
                        <p className="text-gray-500 font-bold">Loading varieties...</p>
                    </div>
                ) : !varieties || varieties.length === 0 ? (
                    <div className="p-20 text-center">
                        <p className="text-gray-500 font-bold">No varieties found. Start by adding one!</p>
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-black tracking-widest">
                            <tr>
                                <th className="px-8 py-5 text-gray-400">Variety Name</th>
                                <th className="px-8 py-5 text-gray-400">Description</th>
                                <th className="px-8 py-5 text-right text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {varieties.map((variety) => (
                                <tr key={variety._id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border border-gray-100 shrink-0">
                                                {variety.image ? (
                                                    <img src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${variety.image}`} alt={variety.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xs uppercase">No Img</div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-400">{variety.name}</p>
                                                {variety.tag && <span className="text-[9px] font-black uppercase tracking-widest text-[#1b4332] bg-[#1b4332]/5 px-1.5 py-0.5 rounded-sm">{variety.tag}</span>}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm text-gray-500 line-clamp-1">{variety.description || 'No description'}</p>
                                    </td>
                                    <td className="px-8 py-6 text-right text-gray-400">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleOpenModal(variety)}
                                                className="p-2 hover:text-[#1b4332] transition-colors"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(variety._id, variety.name)}
                                                className="p-2 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal for Add/Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleCloseModal} />
                    <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 p-8 sm:p-10">
                        <button onClick={handleCloseModal} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-all">
                            <X size={20} />
                        </button>

                        <h3 className="text-2xl font-black text-gray-900 mb-6">{selectedVariety ? 'Edit Variety' : 'Add New Variety'}</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex flex-col items-center mb-6">
                                <label className="relative w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-[#1b4332] hover:bg-[#1b4332]/5 transition-all overflow-hidden group">
                                    {formData.image ? (
                                        <img src={`${(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '')}${formData.image}`} alt="Variety" className="w-full h-full object-cover" />
                                    ) : (
                                        <>
                                            <Plus size={24} className="text-gray-400 group-hover:text-[#1b4332]" />
                                            <span className="text-[10px] font-bold text-gray-400 group-hover:text-[#1b4332]">Photo</span>
                                        </>
                                    )}
                                    {isUploading && (
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                            <Loader2 size={24} className="text-white animate-spin" />
                                        </div>
                                    )}
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                </label>
                                <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest">Variety Image</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2 col-span-2">
                                    <label className="text-sm font-bold text-gray-700">Variety Name</label>
                                    <input
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g. CO 0238"
                                        className="w-full px-5 py-3 text-gray-400 rounded-2xl border focus:ring-2 focus:ring-[#1b4332]/20 focus:outline-none placeholder:text-gray-300"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Badge/Tag</label>
                                    <input
                                        value={formData.tag}
                                        onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                                        placeholder="e.g. TRENDING"
                                        className="w-full px-5 py-3 text-gray-400 rounded-2xl border focus:ring-2 focus:ring-[#1b4332]/20 focus:outline-none placeholder:text-gray-300"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Metric Value</label>
                                    <input
                                        value={formData.metricValue}
                                        onChange={(e) => setFormData({ ...formData, metricValue: e.target.value })}
                                        placeholder="e.g. 10.5 - 11.2%"
                                        className="w-full px-5 py-3 text-gray-400 rounded-2xl border focus:ring-2 focus:ring-[#1b4332]/20 focus:outline-none placeholder:text-gray-300"
                                    />
                                </div>

                                <div className="space-y-2 col-span-2">
                                    <label className="text-sm font-bold text-gray-700">Metric Label</label>
                                    <input
                                        value={formData.metricLabel}
                                        onChange={(e) => setFormData({ ...formData, metricLabel: e.target.value })}
                                        placeholder="e.g. SUGAR RECOVERY"
                                        className="w-full px-5 py-3 text-gray-400 rounded-2xl border focus:ring-2 focus:ring-[#1b4332]/20 focus:outline-none placeholder:text-gray-300"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Description (Optional)</label>
                                <textarea
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Brief description of this variety..."
                                    className="w-full px-5 py-3 text-gray-400 rounded-2xl border focus:ring-2 focus:ring-[#1b4332]/20 focus:outline-none placeholder:text-gray-300"
                                />
                            </div>

                            <div className="pt-4">
                                <Button type="submit" disabled={isCreating || isUpdating} className="w-full py-4 rounded-2xl font-black text-lg shadow-xl shadow-[#1b4332]/10 transition-all">
                                    {(isCreating || isUpdating) ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : (selectedVariety ? 'Update Variety' : 'Add Variety')}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={performDelete}
                title="Delete Variety"
                message={`Are you sure you want to delete "${selectedVariety?.name}"? Items using this variety may still display it, but it will be removed from future selection options.`}
                confirmText="Delete"
                variant="danger"
                isLoading={isDeleting}
            />
        </div>
    );
}
