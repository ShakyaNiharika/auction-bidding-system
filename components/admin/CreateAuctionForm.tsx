'use client';

import { useState, useEffect } from 'react';
import { useCreateAuction } from '@/hooks/auction/useCreateAuction';
import { useUpdateAuction } from '@/hooks/auction/useUpdateAuction';
import { WeightUnit, Auction } from '@/types/auction';
import Button from '@/components/ui/custom-button/Button';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface AuctionFormProps {
    initialData?: Partial<Auction>;
    id?: string;
}

export default function CreateAuctionForm({ initialData, id }: AuctionFormProps) {
    const { mutate: createAuction, isPending: isCreating } = useCreateAuction();
    const { mutate: updateAuction, isPending: isUpdating } = useUpdateAuction(id || '');

    const isEditMode = !!id;
    const isPending = isCreating || isUpdating;

    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        starting_price: initialData?.starting_price?.toString() || '',
        quantity: initialData?.quantity?.toString() || '',
        unit: initialData?.unit || WeightUnit.KG,
        harvest_date: initialData?.harvest_date ? new Date(initialData.harvest_date) : null as Date | null,
        location: initialData?.location || '',
        variety: initialData?.variety || '',
        start_time: initialData?.start_time ? new Date(initialData.start_time) : null as Date | null,
        end_time: initialData?.end_time ? new Date(initialData.end_time) : null as Date | null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Convert values for the API
        const payload = {
            ...formData,
            variety: formData.variety || undefined,
            starting_price: Number(formData.starting_price),
            quantity: Number(formData.quantity),
            current_price: Number(formData.starting_price),
            harvest_date: formData.harvest_date?.toISOString(),
            start_time: formData.start_time?.toISOString(),
            end_time: formData.end_time?.toISOString(),
        };

        if (isEditMode) {
            updateAuction(payload);
        } else {
            createAuction(payload);
        }
    };

    return (
        <div className="max-w-4xl bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div className="space-y-4 md:col-span-2">
                        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-bold text-gray-700">Auction Title</label>
                                <input
                                    required
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Fresh Sugarcane - Batch A"
                                    className={`w-full px-4 py-3 rounded-2xl border  focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900 hover:border-gray-400`}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-bold text-gray-700">Location</label>
                                <input
                                    required
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g. Biratnagar, Morang"
                                    className={`w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900 hover:border-gray-400`}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-bold text-gray-700">Sugarcane Variety</label>
                                <select
                                    name="variety"
                                    value={formData.variety}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900 hover:border-gray-400`}
                                >
                                    <option value="">Select Variety (Optional)</option>
                                    <option value="CO 0238">CO 0238</option>
                                    <option value="CO 1148">CO 1148</option>
                                    <option value="Jitpur-5">Jitpur-5</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-gray-700">Description</label>
                            <textarea
                                required
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Describe the quality, harvest process, or any special notes..."
                                className={`w-full px-4 py-3 rounded-2xl border  focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900 hover:border-gray-400`}
                            />
                        </div>
                    </div>

                    {/* Pricing & Quantity */}
                    <div className="space-y-4 md:col-span-2">
                        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Pricing & Logistics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-bold text-gray-700">Starting Price (Rs.)</label>
                                <input
                                    required
                                    type="number"
                                    name="starting_price"
                                    value={formData.starting_price}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-2xl border  focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900 hover:border-gray-400`}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-bold text-gray-700">Quantity</label>
                                <input
                                    required
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-2xl border  focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900 hover:border-gray-400`}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-bold text-gray-700">Unit</label>
                                <select
                                    name="unit"
                                    value={formData.unit}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-2xl border  focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900 hover:border-gray-400`}
                                >
                                    {Object.values(WeightUnit).map(u => (
                                        <option key={u} value={u}>{u.toUpperCase()}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Dates & Times */}
                    <div className="space-y-4 md:col-span-2">
                        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Schedule</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-bold text-gray-700">Harvest Date</label>
                                <DatePicker
                                    selected={formData.harvest_date}
                                    onChange={(date: any) => setFormData(prev => ({ ...prev, harvest_date: date }))}
                                    dateFormat="MMMM d, yyyy"
                                    placeholderText="Select harvest date"
                                    required
                                    className="w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900 hover:border-gray-400"
                                    wrapperClassName="w-full"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-bold text-gray-700">Start Date & Time</label>
                                <DatePicker
                                    selected={formData.start_time}
                                    onChange={(date: any) => setFormData(prev => ({ ...prev, start_time: date }))}
                                    showTimeSelect
                                    timeIntervals={1}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    placeholderText="Select start date & time"
                                    required
                                    className="w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900 hover:border-gray-400"
                                    wrapperClassName="w-full"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-bold text-gray-700">End Date & Time</label>
                                <DatePicker
                                    selected={formData.end_time}
                                    onChange={(date: any) => setFormData(prev => ({ ...prev, end_time: date }))}
                                    showTimeSelect
                                    timeIntervals={1}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    placeholderText="Select end date & time"
                                    required
                                    className="w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900 hover:border-gray-400"
                                    wrapperClassName="w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t flex justify-end gap-4">
                    <button
                        type="button"
                        className="px-8 py-3 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                        Save as Draft
                    </button>
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="px-10 py-3 rounded-xl font-black shadow-lg shadow-[#1b4332]/20"
                    >
                        {isPending ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Auction' : 'Launch Auction')}
                    </Button>
                </div>
            </form>
        </div>
    );
}
