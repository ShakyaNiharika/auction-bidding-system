'use client';

import { useGetParticipants } from '@/hooks/auction/useAuctionQueries';
import { useGetUsers, useDeleteUser } from '@/hooks/user/useUserQueries';
import { useAuth } from '@/context/AuthContext';
import { Search, Mail, Calendar, Trash2, UserPlus } from 'lucide-react';
import { useState } from 'react';
import AddUserModal from '@/components/admin/AddUserModal';
import { useQueryClient } from '@tanstack/react-query';

export default function UsersPage() {
    const { user: currentUser } = useAuth();
    const isAdmin = currentUser?.role === 'admin';

    // Fetch data based on role
    const { data: participants, isLoading: loadingParticipants } = useGetParticipants();
    const { data: allUsers, isLoading: loadingAllUsers } = useGetUsers();
    const { mutate: deleteUser } = useDeleteUser();
    const queryClient = useQueryClient();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const isLoading = isAdmin ? loadingAllUsers : loadingParticipants;
    const data = isAdmin ? allUsers : participants;

    const handleDelete = (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete user "${name}"? This action cannot be undone.`)) {
            deleteUser(id);
        }
    };

    const handleAddSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-20 gap-4">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1b4332]"></div>
                <p className="text-gray-500 font-bold animate-pulse">Loading {isAdmin ? 'all users' : 'participants'}...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        {isAdmin ? 'User Management' : 'Participants'}
                    </h1>
                    <p className="text-gray-500 mt-2">
                        {isAdmin 
                            ? 'Overview of all registered sellers, buyers, and administrators.' 
                            : 'Manage and view engagement from potential buyers.'}
                    </p>
                </div>

                {isAdmin && (
                    <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-[#1b4332] text-white px-6 py-4 rounded-[20px] font-black text-sm flex items-center gap-3 hover:bg-[#153427] transition-all shadow-xl shadow-green-100 active:scale-95"
                    >
                        <UserPlus size={18} />
                        Create User
                    </button>
                )}
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        placeholder={`Search ${isAdmin ? 'users' : 'participants'} by name or email...`}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#1b4332]/20 outline-none transition-all placeholder:text-gray-400"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">User</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">Contact Info</th>
                                {isAdmin && <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">Role</th>}
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                                    {isAdmin ? 'Joined Date' : 'Recent Activity'}
                                </th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isAdmin ? (
                                allUsers?.map((u: any) => (
                                    <tr key={u._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-[#1b4332]/5 rounded-xl flex items-center justify-center text-[#1b4332] font-black text-sm">
                                                    {u.first_name?.charAt(0) || u.username?.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{u.first_name} {u.last_name || ''}</p>
                                                    <p className="text-xs text-gray-400 font-medium">@{u.username}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Mail size={14} className="text-gray-300" />
                                                <span className="text-xs font-bold">{u.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                                                u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                                u.role === 'seller' ? 'bg-blue-100 text-blue-700' :
                                                'bg-[#1b4332]/10 text-[#1b4332]'
                                            }`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <Calendar size={14} className="text-gray-300" />
                                                <span className="text-xs font-bold">{new Date(u.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            {u._id !== currentUser?.id && (
                                                <button 
                                                    onClick={() => handleDelete(u._id, `${u.first_name} ${u.last_name}`)}
                                                    className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                participants?.map((p: any) => (
                                    <tr key={p.bidder._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-[#1b4332]/5 rounded-xl flex items-center justify-center text-[#1b4332] font-black text-sm">
                                                    {p.bidder.first_name?.charAt(0) || p.bidder.username?.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{p.bidder.first_name} {p.bidder.last_name || ''}</p>
                                                    <p className="text-xs text-gray-400 font-medium truncate max-w-[200px]">Interested in: {p.auctionsInteracted.join(', ')}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Mail size={14} className="text-gray-300" />
                                                <span className="text-xs font-bold">{p.bidder.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-gray-500">
                                                    <Calendar size={14} className="text-gray-300" />
                                                    <span className="text-[10px] font-bold font-mono">Last: {new Date(p.lastBidTime).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-black text-[#1b4332] bg-[#1b4332]/10 px-2 py-0.5 rounded-full">{p.totalBids} Bids</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button className="px-4 py-2 bg-gray-50 hover:bg-[#1b4332] hover:text-white rounded-xl text-[10px] font-black text-gray-900 transition-all">
                                                View History
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Empty State */}
                {(!data || data.length === 0) && (
                    <div className="p-20 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search size={32} className="text-gray-200" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">No {isAdmin ? 'users' : 'participants'} found</h3>
                        <p className="text-gray-400 text-sm mt-1">Try adjusting your search criteria</p>
                    </div>
                )}
            </div>

            <AddUserModal 
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={handleAddSuccess}
            />
        </div>
    );
}
