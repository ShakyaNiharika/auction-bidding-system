'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, X, Info, Trophy, AlertTriangle } from 'lucide-react';
import { useGetNotifications, useGetUnreadCount, useMarkAsRead } from '@/hooks/notification/useNotificationQueries';
import { useSocket } from '@/context/SocketContext';
import { useAuth } from '@/context/AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function NotificationBell() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { user } = useAuth();
    const { socket } = useSocket();
    const queryClient = useQueryClient();

    const { data: notifications = [] } = useGetNotifications();
    const { data: unreadData } = useGetUnreadCount();
    const { mutate: markAsRead } = useMarkAsRead();

    const unreadCount = unreadData?.count || 0;

    // Handle WebSocket notifications
    useEffect(() => {
        if (!socket || !user) return;

        // Join user-specific room
        socket.emit('joinUserRoom', { userId: user.id });

        const handleNewNotification = (notification: any) => {
            console.log('New notification received:', notification);

            // Show toast for new notification
            toast.success(notification.message, {
                icon: '🔔',
                duration: 4000
            });

            // Invalidate queries to fetch new data
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            queryClient.invalidateQueries({ queryKey: ['notifications', 'unread-count'] });
        };

        socket.on('notification', handleNewNotification);

        return () => {
            socket.off('notification', handleNewNotification);
        };
    }, [socket, user, queryClient]);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getIcon = (type: string) => {
        switch (type) {
            case 'WINNER':
                return <Trophy className="text-yellow-500" size={18} />;
            case 'OUTBID':
                return <AlertTriangle className="text-orange-500" size={18} />;
            default:
                return <Info className="text-blue-500" size={18} />;
        }
    };

    if (!user) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all relative"
            >
                <Bell size={22} />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white border-2 border-white">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in zoom-in duration-200">
                    <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 mb-2">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Notifications</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-gray-600 p-1"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
                        {notifications.length === 0 ? (
                            <div className="py-8 text-center">
                                <p className="text-sm text-gray-400">No notifications yet</p>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {notifications.map((notif: any) => (
                                    <div
                                        key={notif._id}
                                        onClick={() => {
                                            if (!notif.read) markAsRead(notif._id);
                                            setIsOpen(false);
                                        }}
                                        className={`flex gap-3 p-3 rounded-xl transition-all cursor-pointer ${notif.read ? 'opacity-70 bg-white' : 'bg-red-50 hover:bg-red-100/50'}`}
                                    >
                                        <div className="flex-shrink-0 mt-0.5">
                                            {getIcon(notif.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm leading-snug ${notif.read ? 'text-gray-600 font-medium' : 'text-gray-900 font-bold'}`}>
                                                {notif.message}
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-1 font-semibold uppercase">
                                                {new Date(notif.createdAt).toLocaleDateString()} at {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                            {notif.auction && (
                                                <Link
                                                    href={`/auction/${notif.auction._id}`}
                                                    className="inline-block mt-2 text-[11px] font-bold text-red-600 hover:underline"
                                                >
                                                    View Auction
                                                </Link>
                                            )}
                                        </div>
                                        {!notif.read && (
                                            <div className="flex-shrink-0 self-center">
                                                <div className="h-1.5 w-1.5 rounded-full bg-red-600"></div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
