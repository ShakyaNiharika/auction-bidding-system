'use client';

import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie,
} from 'recharts';

const data = [
    { name: 'Mon', bids: 40 },
    { name: 'Tue', bids: 30 },
    { name: 'Wed', bids: 65 },
    { name: 'Thu', bids: 45 },
    { name: 'Fri', bids: 90 },
    { name: 'Sat', bids: 70 },
    { name: 'Sun', bids: 55 },
];

const varietyData = [
    { name: 'CO-0238', value: 400 },
    { name: 'CO-86032', value: 300 },
    { name: 'CO-0118', value: 300 },
    { name: 'CO-98014', value: 200 },
];

const COLORS = ['#1b4332', '#2d6a4f', '#40916c', '#52b788'];

export function BiddingActivityChart() {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 600 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 600 }}
                    />
                    <Tooltip
                        cursor={{ fill: '#1b4332', opacity: 0.05 }}
                        contentStyle={{
                            borderRadius: '16px',
                            border: 'none',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                            fontWeight: 'bold'
                        }}
                    />
                    <Bar
                        dataKey="bids"
                        fill="#1b4332"
                        radius={[6, 6, 0, 0]}
                        barSize={32}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 4 ? '#1b4332' : 'rgba(27, 67, 50, 0.2)'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export function VarietyDistributionChart() {
    return (
        <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={varietyData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {varietyData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                <span className="text-2xl font-black text-gray-900 leading-none">1.2k</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Qty</span>
            </div>
        </div>
    );
}
