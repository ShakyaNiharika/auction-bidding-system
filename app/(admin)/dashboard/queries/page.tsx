'use client';

import { useState } from 'react';
import { useGetInquiries, useUpdateInquiryStatus, useDeleteInquiry } from '@/hooks/inquiry/useInquiry';
import { Mail, Search, Clock, CheckCircle, AlertCircle, Trash2, Eye, X, Phone, User as UserIcon } from 'lucide-react';
import Button from '@/components/ui/custom-button/Button';
import ConfirmModal from '@/components/ui/ConfirmModal';

export default function QueriesPage() {
    const { data: inquiries, isLoading } = useGetInquiries();
    const updateStatusMutation = useUpdateInquiryStatus();
    const deleteInquiryMutation = useDeleteInquiry();

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const filteredInquiries = inquiries?.filter((item: any) => {
        const matchesSearch = 
            item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.subject.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'pending':
                return { bg: 'bg-amber-50', text: 'text-amber-600', dot: 'bg-amber-400', label: 'Pending' };
            case 'read':
                return { bg: 'bg-blue-50', text: 'text-blue-600', dot: 'bg-blue-400', label: 'Read' };
            case 'resolved':
                return { bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-400', label: 'Resolved' };
            default:
                return { bg: 'bg-gray-50', text: 'text-gray-600', dot: 'bg-gray-400', label: status };
        }
    };

    const handleViewDetails = (inquiry: any) => {
        setSelectedInquiry(inquiry);
        setIsDetailModalOpen(true);
        if (inquiry.status === 'pending') {
            updateStatusMutation.mutate({ id: inquiry._id, status: 'read' });
        }
    };

    const handleDelete = (inquiry: any) => {
        setSelectedInquiry(inquiry);
        setIsConfirmOpen(true);
    };

    const performDelete = () => {
        if (selectedInquiry) {
            deleteInquiryMutation.mutate(selectedInquiry._id, {
                onSuccess: () => {
                    setIsConfirmOpen(false);
                    setSelectedInquiry(null);
                }
            });
        }
    };

    const handleUpdateStatus = (id: string, status: string) => {
        updateStatusMutation.mutate({ id, status });
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-20 gap-4">
                <div className="w-12 h-12 border-4 border-[#1b4332]/20 border-t-[#1b4332] rounded-full animate-spin" />
                <p className="text-gray-500 font-bold">Loading inquiries...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">Customer Inquiries</h1>
                    <p className="text-gray-500 mt-2 font-medium">Manage and respond to customer messages from the contact page.</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by name, email..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-12 pr-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-medium text-gray-900 w-64 focus:ring-2 focus:ring-[#1b4332]/10 outline-none transition-all shadow-sm"
                        />
                    </div>
                    
                    <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#1b4332]/10 outline-none cursor-pointer shadow-sm"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="read">Read</option>
                        <option value="resolved">Resolved</option>
                    </select>
                </div>
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
                {!filteredInquiries || filteredInquiries.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-32 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-[30px] flex items-center justify-center text-gray-300 mb-6">
                            <Mail size={40} />
                        </div>
                        <h3 className="text-xl font-black text-gray-900">No inquiries found</h3>
                        <p className="text-gray-400 mt-2 font-medium max-w-xs">When customers contact you, their messages will appear here.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-[10px] uppercase font-black tracking-widest text-gray-400">
                                <tr>
                                    <th className="px-8 py-6">Customer</th>
                                    <th className="px-8 py-6">Inquiry Type</th>
                                    <th className="px-8 py-6">Subject</th>
                                    <th className="px-8 py-6">Date</th>
                                    <th className="px-8 py-6">Status</th>
                                    <th className="px-8 py-6 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredInquiries.map((item: any) => {
                                    const styles = getStatusStyles(item.status);
                                    return (
                                        <tr key={item._id} className="group hover:bg-gray-50/50 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-[#1b4332]/5 rounded-xl flex items-center justify-center text-[#1b4332] font-black">
                                                        {item.fullName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900 line-clamp-1">{item.fullName}</p>
                                                        <p className="text-xs text-gray-400 font-medium line-clamp-1">{item.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
                                                    {item.inquiryType}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="text-sm font-bold text-gray-600 line-clamp-1">{item.subject}</p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-gray-400">
                                                    <Clock size={14} />
                                                    <span className="text-xs font-bold uppercase tracking-tight">
                                                        {new Date(item.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${styles.bg} ${styles.text}`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">{styles.label}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button 
                                                        onClick={() => handleViewDetails(item)}
                                                        className="p-2 text-gray-300 hover:text-[#1b4332] transition-colors"
                                                        title="View Details"
                                                    >
                                                        <Eye size={18} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(item)}
                                                        className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {isDetailModalOpen && selectedInquiry && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={() => setIsDetailModalOpen(false)} />
                    <div className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-300">
                        {/* Modal Header */}
                        <div className="px-8 pt-8 pb-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-[#1b4332]/5 rounded-2xl flex items-center justify-center text-[#1b4332]">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900 leading-tight">Inquiry Details</h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`w-2 h-2 rounded-full ${getStatusStyles(selectedInquiry.status).dot}`} />
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                            {getStatusStyles(selectedInquiry.status).label} • {new Date(selectedInquiry.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsDetailModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-100">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto scrollbar-hide">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-1.5">
                                            <UserIcon size={12} /> Contact Name
                                        </label>
                                        <p className="text-gray-900 font-bold">{selectedInquiry.fullName}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-1.5">
                                            <Mail size={12} /> Email Address
                                        </label>
                                        <p className="text-gray-900 font-bold">{selectedInquiry.email}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-1.5">
                                            <Phone size={12} /> Phone Number
                                        </label>
                                        <p className="text-gray-900 font-bold">{selectedInquiry.phone}</p>
                                    </div>
                                </div>
                                <div className="p-6 bg-gray-50 rounded-3xl space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Inquiry Type</label>
                                        <p className="text-sm font-black text-[#1b4332]">{selectedInquiry.inquiryType}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Subject</label>
                                        <p className="text-sm font-bold text-gray-700">{selectedInquiry.subject}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 pt-6 border-t border-gray-50">
                                <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Message Content</label>
                                <div className="bg-white border border-gray-100 p-6 rounded-3xl">
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap italic">"{selectedInquiry.message}"</p>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-8 bg-gray-50/50 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-gray-400">Update Status:</span>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => handleUpdateStatus(selectedInquiry._id, 'read')}
                                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedInquiry.status === 'read' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-400 hover:border-blue-200 hover:text-blue-500'}`}
                                    >
                                        Mark Read
                                    </button>
                                    <button 
                                        onClick={() => handleUpdateStatus(selectedInquiry._id, 'resolved')}
                                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedInquiry.status === 'resolved' ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-200 text-gray-400 hover:border-emerald-200 hover:text-emerald-500'}`}
                                    >
                                        Resolved
                                    </button>
                                </div>
                            </div>
                            <Button onClick={() => setIsDetailModalOpen(false)} variant="secondary" className="px-8 py-3 rounded-2xl font-black bg-white ring-1 ring-gray-100">
                                Close Window
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={performDelete}
                title="Delete Inquiry"
                message="Are you sure you want to delete this inquiry record? This action cannot be undone."
                confirmText="Delete Record"
                variant="danger"
                isLoading={deleteInquiryMutation.isPending}
            />
        </div>
    );
}
