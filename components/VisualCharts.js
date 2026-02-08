"use client"; 
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';

export default function VisualCharts({ type, data }) {
    if (type === 'pie') {
        const pieData = [
            { name: 'Paid', value: data, color: '#3b82f6' },
            { name: 'Remaining', value: 100 - data, color: '#f1f5f9' },
        ];
        return (
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col items-center justify-center relative">
                <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                        <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                            {pieData.map((entry, index) => (
                                <Cell key={index} fill={entry.color} cornerRadius={10} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute flex flex-col items-center">
                    <span className="text-2xl font-black text-slate-800">{data}%</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Paid</span>
                </div>
            </div>
        );
    }

    if (type === 'bar') {
        return (
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <Tooltip 
                            cursor={{fill: '#F1F5F9'}} 
                            contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} 
                        />
                        <Bar dataKey="amount" fill="#3b82f6" radius={[10, 10, 10, 10]} barSize={32} />
                        <XAxis dataKey="createdAt" hide />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}