'use client';

import { useState, useEffect } from 'react';
import { useCreateAuction } from '@/hooks/auction/useCreateAuction';
import { useUpdateAuction } from '@/hooks/auction/useUpdateAuction';
import { useGetVarieties } from '@/hooks/variety/useVarieties';
import { WeightUnit, Auction } from '@/types/auction';
import Button from '@/components/ui/custom-button/Button';
import DatePicker from 'react-datepicker';
import { X, UploadCloud, Loader2 } from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";
import * as yup from 'yup';
import { auctionSchema } from '@/validations/auctionValidation';
import { useRouter } from 'next/navigation';

interface AuctionFormProps {
    initialData?: Partial<Auction>;
    id?: string;
}

export default function CreateAuctionForm({ initialData, id }: AuctionFormProps) {
    const { mutate: createAuction, isPending: isCreating } = useCreateAuction();
    const { mutate: updateAuction, isPending: isUpdating } = useUpdateAuction(id || '');
    const { data: varieties } = useGetVarieties();

    const router = useRouter();
    const isEditMode = !!id;
    const [isUploading, setIsUploading] = useState(false);
    const isPending = isCreating || isUpdating || isUploading;

    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>(initialData?.images || []);

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

    // Validation errors state
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error on change
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            // Limit to 5 images
            if (selectedImages.length + files.length > 5) {
                alert('You can only upload up to 5 images.');
                return;
            }
            setSelectedImages(prev => [...prev, ...files]);

            // Create preview URLs
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setPreviewUrls(prev => [...prev, ...newPreviews]);
        }
    };

    const removeImage = (index: number) => {
        // If it's a new file
        if (index >= (initialData?.images?.length || 0)) {
            const fileIndex = index - (initialData?.images?.length || 0);
            setSelectedImages(prev => prev.filter((_, i) => i !== fileIndex));
        }
        setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        try {
            // Validate form data
            await auctionSchema.validate(formData, { abortEarly: false });

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
                images: previewUrls.filter(url => !url.startsWith('blob:')), // Keep existing uploaded images
            };

            // Upload new images first
            if (selectedImages.length > 0) {
                setIsUploading(true);
                try {
                    const imgData = new FormData();
                    selectedImages.forEach(file => imgData.append('images', file));

                    const token = localStorage.getItem('userToken');
                    // Assume NEXT_PUBLIC_API_URL is available
                    const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/upload`, {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        body: imgData
                    });

                    if (!uploadRes.ok) throw new Error('Failed to upload images');

                    const uploadResult = await uploadRes.json();
                    if (uploadResult.success) {
                        // Combine old existing image URLs with new uploaded URLs
                        payload.images = [...payload.images, ...uploadResult.urls];
                    }
                } catch (err) {
                    alert('Image upload failed. Please try again.');
                    setIsUploading(false);
                    return;
                }
                setIsUploading(false);
            }

            if (isEditMode) {
                updateAuction(payload);
            } else {
                createAuction(payload);
            }
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                const fieldErrors: Record<string, string> = {};
                err.inner.forEach((e) => {
                    if (e.path && !fieldErrors[e.path]) {
                        fieldErrors[e.path] = e.message;
                    }
                });
                setErrors(fieldErrors);
                // Scroll to the first error
                const firstErrorField = err.inner[0].path;
                if (firstErrorField) {
                    const element = document.getElementsByName(firstErrorField)[0];
                    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        }
    };

    return (
        <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div className="space-y-4 md:col-span-2">
                        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-bold text-gray-700">Auction Title</label>
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Fresh Sugarcane - Batch A"
                                    className={`w-full px-4 py-3 rounded-2xl border ${errors.title ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900 hover:border-gray-400`}
                                />
                                {errors.title && <p className="text-red-500 text-xs mt-1 ml-1">{errors.title}</p>}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-bold text-gray-700">Location</label>
                                <input
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g. Biratnagar, Morang"
                                    className={`w-full px-4 py-3 rounded-2xl border ${errors.location ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900 hover:border-gray-400`}
                                />
                                {errors.location && <p className="text-red-500 text-xs mt-1 ml-1">{errors.location}</p>}
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
                                    {varieties?.map(v => (
                                        <option key={v._id} value={v.name}>{v.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Describe the quality, harvest process, or any special notes..."
                                className={`w-full px-4 py-3 rounded-2xl border ${errors.description ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900 hover:border-gray-400`}
                            />
                            {errors.description && <p className="text-red-500 text-xs mt-1 ml-1">{errors.description}</p>}
                        </div>

                        {/* Pictures */}
                        <div className="flex flex-col gap-2 pt-4 border-t">
                            <label className="text-sm font-bold text-gray-700">Sugarcane Pictures</label>
                            <p className="text-xs text-gray-500 mb-2">Upload up to 5 clear images of your sugarcane batch to attract better bids.</p>

                            <div className="flex flex-wrap gap-4 mb-2">
                                {/* Previews */}
                                {previewUrls.map((url, idx) => (
                                    <div key={idx} className="relative w-24 h-24 rounded-xl border overflow-hidden group">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={url.startsWith('blob:') ? url : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${url}`} alt="preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(idx)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}

                                {/* Upload Button */}
                                {previewUrls.length < 5 && (
                                    <label className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                                        <UploadCloud className="w-6 h-6 text-gray-400 mb-1" />
                                        <span className="text-xs font-medium text-gray-500">Upload</span>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/jpeg, image/png, image/webp"
                                            className="hidden"
                                            onChange={handleImageSelection}
                                        />
                                    </label>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Pricing & Quantity */}
                    <div className="space-y-4 md:col-span-2">
                        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Pricing & Logistics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-bold text-gray-700">Starting Price (Rs.)</label>
                                <input
                                    type="number"
                                    name="starting_price"
                                    value={formData.starting_price}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-2xl border ${errors.starting_price ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900 hover:border-gray-400`}
                                />
                                {errors.starting_price && <p className="text-red-500 text-xs mt-1 ml-1">{errors.starting_price}</p>}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-bold text-gray-700">Quantity</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-2xl border ${errors.quantity ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900 hover:border-gray-400`}
                                />
                                {errors.quantity && <p className="text-red-500 text-xs mt-1 ml-1">{errors.quantity}</p>}
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
                                    onChange={(date: any) => {
                                        setFormData(prev => ({ ...prev, harvest_date: date }));
                                        if (errors.harvest_date) setErrors(prev => ({ ...prev, harvest_date: '' }));
                                    }}
                                    dateFormat="MMMM d, yyyy"
                                    placeholderText="Select harvest date"
                                    className={`w-full px-4 py-3 rounded-2xl border ${errors.harvest_date ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900 hover:border-gray-400`}
                                    wrapperClassName="w-full"
                                />
                                {errors.harvest_date && <p className="text-red-500 text-xs mt-1 ml-1">{errors.harvest_date}</p>}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-bold text-gray-700">Start Date & Time</label>
                                <DatePicker
                                    selected={formData.start_time}
                                    onChange={(date: any) => {
                                        setFormData(prev => ({ ...prev, start_time: date }));
                                        if (errors.start_time) setErrors(prev => ({ ...prev, start_time: '' }));
                                    }}
                                    showTimeSelect
                                    timeIntervals={1}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    placeholderText="Select start date & time"
                                    className={`w-full px-4 py-3 rounded-2xl border ${errors.start_time ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900 hover:border-gray-400`}
                                    wrapperClassName="w-full"
                                />
                                {errors.start_time && <p className="text-red-500 text-xs mt-1 ml-1">{errors.start_time}</p>}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-bold text-gray-700">End Date & Time</label>
                                <DatePicker
                                    selected={formData.end_time}
                                    onChange={(date: any) => {
                                        setFormData(prev => ({ ...prev, end_time: date }));
                                        if (errors.end_time) setErrors(prev => ({ ...prev, end_time: '' }));
                                    }}
                                    showTimeSelect
                                    timeIntervals={1}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    placeholderText="Select end date & time"
                                    className={`w-full px-4 py-3 rounded-2xl border ${errors.end_time ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-900 hover:border-gray-400`}
                                    wrapperClassName="w-full"
                                />
                                {errors.end_time && <p className="text-red-500 text-xs mt-1 ml-1">{errors.end_time}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-8 py-3 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="px-10 py-3 rounded-xl font-black shadow-lg shadow-[#1b4332]/20 flex items-center gap-2"
                    >
                        {isUploading && <Loader2 className="w-5 h-5 animate-spin" />}
                        {isPending
                            ? (isUploading ? 'Uploading Images...' : (isEditMode ? 'Updating...' : 'Creating...'))
                            : (isEditMode ? 'Update Auction' : 'Add Auction')}
                    </Button>
                </div>
            </form>
        </div>
    );
}
