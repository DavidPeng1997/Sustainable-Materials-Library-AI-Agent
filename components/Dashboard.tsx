import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ArrowRight, Leaf, Recycle, ShieldCheck, Play, FolderClock, Sparkles } from 'lucide-react';
import { ViewMode } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface DashboardProps {
    onNavigate: (view: ViewMode) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const data01 = [
    { name: t('dashboard.material.recycled'), value: 400, fill: '#1c9ba4' }, // Primary Teal
    { name: t('dashboard.material.bio'), value: 300, fill: '#ff6b6b' },   // Accent Orange
    { name: t('dashboard.material.synthetic'), value: 300, fill: '#9c89b8' }, // Accent Purple
    { name: t('dashboard.material.natural'), value: 200, fill: '#fbbf24' }, // Yellow/Gold
  ];

  const data02 = [
    { name: t('dashboard.day.mon'), searches: 24 },
    { name: t('dashboard.day.tue'), searches: 45 },
    { name: t('dashboard.day.wed'), searches: 38 },
    { name: t('dashboard.day.thu'), searches: 62 },
    { name: t('dashboard.day.fri'), searches: 51 },
    { name: t('dashboard.day.sat'), searches: 32 },
    { name: t('dashboard.day.sun'), searches: 18 },
  ];

  return (
    <div className="p-8 h-full overflow-y-auto scrollbar-hide">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-end gap-4">
            <div>
                <h2 className="text-4xl font-extrabold text-sml-slate-800 mb-2 tracking-tight">{t('dashboard.welcome')} 👋</h2>
                <p className="text-gray-500 font-medium text-lg">{t('dashboard.subtitle')}</p>
            </div>
        </div>

        {/* Top CTA Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            {/* Start New Exploration - Large Card */}
            <div 
                className="md:col-span-3 bg-white rounded-3xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group cursor-pointer hover:shadow-md transition-all border-none" 
                onClick={() => onNavigate(ViewMode.CHAT)}
            >
                 {/* Decorative background shapes for Flat Illustration style */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-sml-teal-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
                 <div className="absolute bottom-0 right-20 w-32 h-32 bg-sml-orange/10 rounded-full group-hover:scale-125 transition-transform duration-700"></div>
                 <div className="absolute top-1/2 right-10 w-16 h-16 bg-sml-purple/20 rounded-lg rotate-12 group-hover:rotate-45 transition-transform duration-500"></div>

                 <div className="relative z-10 max-w-lg">
                    <div className="w-12 h-12 bg-sml-teal-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-sml-teal-200">
                        <Sparkles size={24} />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800 mb-3">{t('dashboard.startNewChat')}</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">
                        {t('dashboard.startNewChatDesc')}
                    </p>
                 </div>
                 <div className="mt-8 relative z-10">
                    <button className="bg-sml-orange text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 group-hover:gap-4 transition-all shadow-lg shadow-orange-200">
                        {t('dashboard.startChatBtn')} <ArrowRight size={18} />
                    </button>
                 </div>
            </div>

            {/* Last Project Record */}
            <div 
                className="md:col-span-2 bg-sml-purple rounded-3xl p-8 flex flex-col justify-between shadow-lg shadow-purple-200 relative overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform" 
                onClick={() => onNavigate(ViewMode.PROJECT_RECORDS)}
            >
                 <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full"></div>
                 <div className="absolute -left-4 -bottom-4 w-40 h-40 bg-white/10 rounded-full"></div>
                 
                 <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4 text-purple-100">
                        <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 backdrop-blur-sm">
                            <FolderClock size={12} /> {t('dashboard.lastProject')}
                        </span>
                        <span className="text-xs font-medium opacity-80">{t('dashboard.project1.date')}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{t('dashboard.project1.title')}</h3>
                    <p className="text-purple-100 text-sm leading-relaxed opacity-90">
                        {t('dashboard.project1.desc')}
                    </p>
                 </div>
                 <div className="mt-6 relative z-10 flex justify-end">
                     <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-sml-purple shadow-md group-hover:scale-110 transition-transform">
                        <Play size={18} fill="currentColor" />
                     </div>
                 </div>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm flex items-center gap-5">
                <div className="w-16 h-16 bg-sml-teal-50 rounded-2xl flex items-center justify-center text-sml-teal-600 flex-shrink-0">
                    <Leaf size={32} />
                </div>
                <div>
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{t('dashboard.stats.explored')}</h3>
                    <p className="text-3xl font-black text-gray-800">124</p>
                    <span className="text-xs font-bold text-sml-teal-500">{t('dashboard.stats.growth')}</span>
                </div>
            </div>
            
            <div className="bg-white p-6 rounded-3xl shadow-sm flex items-center gap-5">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 flex-shrink-0">
                    <Recycle size={32} />
                </div>
                <div>
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{t('dashboard.stats.recycleIndex')}</h3>
                    <p className="text-3xl font-black text-gray-800">8.4</p>
                    <span className="text-xs font-bold text-blue-500">{t('dashboard.stats.average')}</span>
                </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm flex items-center gap-5">
                <div className="w-16 h-16 bg-sml-orange/10 rounded-2xl flex items-center justify-center text-sml-orange flex-shrink-0">
                    <ShieldCheck size={32} />
                </div>
                <div>
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{t('dashboard.stats.iso')}</h3>
                    <p className="text-3xl font-black text-gray-800">92%</p>
                    <span className="text-xs font-bold text-sml-orange">{t('dashboard.stats.compliant')}</span>
                </div>
            </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm">
                <h3 className="font-bold text-lg text-gray-800 mb-6">{t('dashboard.chart.material')}</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data01}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={8}
                                dataKey="value"
                                cornerRadius={6}
                            >
                                {data01.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-2 flex-wrap">
                    {data01.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-bold text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                            <span className="w-2 h-2 rounded-full" style={{backgroundColor: item.fill}}></span>
                            {item.name}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm">
                <h3 className="font-bold text-lg text-gray-800 mb-6">{t('dashboard.chart.search')}</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data02}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8', fontWeight: 600}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8', fontWeight: 600}} />
                            <Tooltip 
                                cursor={{fill: '#f8fafc'}}
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                            <Bar dataKey="searches" fill="#1c9ba4" radius={[6, 6, 6, 6]} barSize={24} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;