import React, { useState } from 'react';
import { ClipboardCheck, ArrowRight, ArrowLeft, CheckCircle2, Factory, Leaf, Recycle, BrainCircuit, FileDown, AlertTriangle, Info } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

const CircularityCheckup: React.FC = () => {
    const { t } = useLanguage();
    const [currentStage, setCurrentStage] = useState(0);
    const [formData, setFormData] = useState<Record<string, any>>({});

    const STAGES = [
        { id: 0, title: t('circularity.stage0'), icon: Factory },
        { id: 1, title: t('circularity.stage1'), icon: Leaf },
        { id: 2, title: t('circularity.stage2'), icon: Recycle },
        { id: 3, title: t('circularity.stage3'), icon: BrainCircuit },
    ];

    const handleNext = () => {
        if (currentStage < STAGES.length - 1) setCurrentStage(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentStage > 0) setCurrentStage(prev => prev - 1);
    };

    const updateField = (key: string, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const renderStageContent = () => {
        switch (currentStage) {
            case 0: return <StageOne data={formData} update={updateField} />;
            case 1: return <StageTwo data={formData} update={updateField} />;
            case 2: return <StageThree data={formData} update={updateField} />;
            case 3: return <StageFour data={formData} />;
            default: return null;
        }
    };

    return (
        <div className="h-full flex flex-col bg-sml-cream-50 overflow-hidden">
            {/* Header */}
            <div className="px-8 py-8 flex-shrink-0">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white text-sml-teal-600 rounded-2xl flex items-center justify-center shadow-sm">
                        <ClipboardCheck size={28} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-gray-800 tracking-tight">{t('circularity.title')}</h2>
                        <p className="text-xs text-gray-500 font-mono mt-1 font-bold">{t('circularity.subtitle')}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border-l-8 border-sml-teal-400 shadow-sm max-w-4xl">
                    <p className="text-gray-600 text-sm leading-relaxed font-medium">
                        {t('circularity.desc')}
                    </p>
                </div>
            </div>

            {/* Stepper */}
            <div className="px-8 py-4">
                <div className="flex items-center justify-between max-w-3xl mx-auto bg-white p-4 rounded-full shadow-sm">
                    {STAGES.map((stage, index) => {
                        const Icon = stage.icon;
                        const isActive = index === currentStage;
                        const isCompleted = index < currentStage;

                        return (
                            <div key={stage.id} className="flex flex-col items-center relative z-10 px-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                                    isActive ? 'bg-sml-teal-500 text-white scale-110 shadow-lg' :
                                    isCompleted ? 'bg-sml-teal-100 text-sml-teal-600' :
                                    'bg-gray-100 text-gray-300'
                                }`}>
                                    {isCompleted ? <CheckCircle2 size={24} /> : <Icon size={24} />}
                                </div>
                                <span className={`text-[10px] font-bold mt-2 ${isActive ? 'text-sml-teal-600' : 'text-gray-400'}`}>
                                    {stage.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto px-8 pb-8 scrollbar-hide">
                <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-sm p-10 min-h-[500px]">
                    {renderStageContent()}
                </div>
            </div>

            {/* Footer Actions */}
            <div className="bg-white px-8 py-6 flex justify-between items-center flex-shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.02)] z-20">
                <button 
                    onClick={handlePrev} 
                    disabled={currentStage === 0}
                    className="flex items-center gap-2 px-8 py-3 rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed font-bold transition-colors"
                >
                    <ArrowLeft size={20} /> {t('circularity.prev')}
                </button>
                
                {currentStage < STAGES.length - 1 ? (
                    <button 
                        onClick={handleNext} 
                        className="flex items-center gap-2 px-10 py-3 rounded-full bg-sml-orange text-white hover:scale-105 font-bold shadow-lg shadow-orange-200 transition-all"
                    >
                        {t('circularity.next')} <ArrowRight size={20} />
                    </button>
                ) : (
                    <button 
                        onClick={() => alert(t('circularity.alert.finish'))}
                        className="flex items-center gap-2 px-10 py-3 rounded-full bg-sml-slate-800 text-white hover:bg-sml-slate-900 font-bold shadow-lg transition-all"
                    >
                        {t('circularity.finish')}
                    </button>
                )}
            </div>
        </div>
    );
};

// --- Form Components ---

const LikertScale: React.FC<{
    label: string; 
    value: number; 
    onChange: (val: number) => void;
    leftText: string;
    rightText: string;
}> = ({ label, value, onChange, leftText, rightText }) => (
    <div className="mb-10">
        <label className="block text-base font-extrabold text-gray-800 mb-4">{label}</label>
        <div className="flex items-center justify-between gap-4 bg-gray-50 p-4 rounded-2xl">
            <span className="text-xs font-bold text-gray-400 w-24 text-right">{leftText}</span>
            <div className="flex-1 flex justify-between px-6 max-w-lg">
                {[1, 2, 3, 4, 5].map((num) => (
                    <button
                        key={num}
                        onClick={() => onChange(num)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-black transition-all ${
                            value === num 
                            ? 'bg-sml-teal-500 text-white scale-125 shadow-lg' 
                            : 'bg-white text-gray-300 hover:bg-gray-100'
                        }`}
                    >
                        {num}
                    </button>
                ))}
            </div>
            <span className="text-xs font-bold text-gray-400 w-24">{rightText}</span>
        </div>
    </div>
);

const RadioGroup: React.FC<{
    label: string;
    name: string;
    options: { value: string; label: string; hasInput?: boolean }[];
    selectedValue: string;
    inputValue?: string;
    onChange: (val: string, inputVal?: string) => void;
}> = ({ label, name, options, selectedValue, inputValue, onChange }) => (
    <div className="mb-10">
        <label className="block text-base font-extrabold text-gray-800 mb-4">{label}</label>
        <div className="space-y-3">
            {options.map((opt) => (
                <label key={opt.value} className={`flex items-center p-4 rounded-2xl cursor-pointer transition-all ${
                    selectedValue === opt.value 
                    ? 'bg-sml-teal-50 ring-2 ring-sml-teal-500 text-sml-teal-900' 
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-600'
                }`}>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${
                        selectedValue === opt.value ? 'border-sml-teal-500 bg-white' : 'border-gray-300'
                    }`}>
                        {selectedValue === opt.value && <div className="w-3 h-3 rounded-full bg-sml-teal-500"></div>}
                    </div>
                    <input 
                        type="radio" 
                        name={name} 
                        value={opt.value}
                        checked={selectedValue === opt.value}
                        onChange={() => onChange(opt.value)}
                        className="hidden"
                    />
                    <div className="text-sm font-bold flex-1">
                        {opt.label.split('[__]').map((part, i, arr) => (
                            <React.Fragment key={i}>
                                {part}
                                {i < arr.length - 1 && (
                                    <input 
                                        type="text" 
                                        value={inputValue || ''}
                                        onChange={(e) => onChange(opt.value, e.target.value)}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onChange(opt.value, inputValue);
                                        }}
                                        disabled={selectedValue !== opt.value}
                                        className="mx-2 w-20 border-b-2 border-sml-teal-300 focus:border-sml-teal-600 outline-none bg-transparent text-center font-black text-sml-teal-700"
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </label>
            ))}
        </div>
    </div>
);

const TextInput: React.FC<{
    label: string;
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
}> = ({ label, value, onChange, placeholder }) => (
    <div className="mb-10">
        <label className="block text-base font-extrabold text-gray-800 mb-3">{label}</label>
        <input 
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:bg-white focus:ring-4 focus:ring-sml-teal-100 outline-none transition-all font-medium text-gray-700"
        />
    </div>
);

// --- Stage Contents ---

const StageOne: React.FC<{ data: any, update: any }> = ({ data, update }) => {
    const { t } = useLanguage();
    return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
        <h3 className="text-2xl font-black text-gray-800 mb-8 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-sml-teal-100 text-sml-teal-600 flex items-center justify-center text-lg">1</span> 
            {t('circularity.stage0')}
        </h3>
        
        <LikertScale 
            label={t('circularity.s1.1.label')}
            value={data.s1_1}
            onChange={(v) => update('s1_1', v)}
            leftText={t('circularity.s1.1.left')}
            rightText={t('circularity.s1.1.right')}
        />

        <RadioGroup 
            label={t('circularity.s1.2.label')}
            name="s1_2"
            selectedValue={data.s1_2}
            inputValue={data.s1_2_input}
            onChange={(v, i) => { update('s1_2', v); if(i !== undefined) update('s1_2_input', i); }}
            options={[
                { value: 'A', label: t('circularity.s1.2.a') },
                { value: 'B', label: t('circularity.s1.2.b') },
                { value: 'C', label: t('circularity.s1.2.c') },
                { value: 'D', label: t('circularity.s1.2.d') }
            ]}
        />

        <RadioGroup 
            label={t('circularity.s1.3.label')}
            name="s1_3"
            selectedValue={data.s1_3}
            inputValue={data.s1_3_input}
            onChange={(v, i) => { update('s1_3', v); if(i !== undefined) update('s1_3_input', i); }}
            options={[
                { value: 'A', label: t('circularity.s1.3.a') },
                { value: 'B', label: t('circularity.s1.3.b') },
                { value: 'C', label: t('circularity.s1.3.c') },
            ]}
        />

        <RadioGroup 
            label={t('circularity.s1.4.label')}
            name="s1_4"
            selectedValue={data.s1_4}
            inputValue={data.s1_4_input}
            onChange={(v, i) => { update('s1_4', v); if(i !== undefined) update('s1_4_input', i); }}
            options={[
                { value: 'A', label: t('circularity.s1.4.a') },
                { value: 'B', label: t('circularity.s1.4.b') },
            ]}
        />

        <LikertScale 
            label={t('circularity.s1.5.label')}
            value={data.s1_5}
            onChange={(v) => update('s1_5', v)}
            leftText={t('circularity.s1.5.left')}
            rightText={t('circularity.s1.5.right')}
        />

        <RadioGroup 
            label={t('circularity.s1.6.label')}
            name="s1_6"
            selectedValue={data.s1_6}
            onChange={(v) => update('s1_6', v)}
            options={[
                { value: 'A', label: t('circularity.s1.6.a') },
                { value: 'B', label: t('circularity.s1.6.b') },
                { value: 'C', label: t('circularity.s1.6.c') },
            ]}
        />
    </div>
)};

const StageTwo: React.FC<{ data: any, update: any }> = ({ data, update }) => {
    const { t } = useLanguage();
    return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
        <h3 className="text-2xl font-black text-gray-800 mb-8 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-sml-teal-100 text-sml-teal-600 flex items-center justify-center text-lg">2</span> 
            {t('circularity.stage1')}
        </h3>
        
        <RadioGroup 
            label={t('circularity.s2.1.label')}
            name="s2_1"
            selectedValue={data.s2_1}
            inputValue={data.s2_1_input}
            onChange={(v, i) => { update('s2_1', v); if(i !== undefined) update('s2_1_input', i); }}
            options={[
                { value: 'A', label: t('circularity.s2.1.a') },
                { value: 'B', label: t('circularity.s2.1.b') },
                { value: 'C', label: t('circularity.s2.1.c') },
            ]}
        />

        <div className="mb-10">
            <label className="block text-base font-extrabold text-gray-800 mb-3">{t('circularity.s2.2.label')}</label>
            <div className="grid grid-cols-2 gap-4 mb-4">
                 <input 
                    type="text" 
                    placeholder={t('circularity.s2.2.energy')} 
                    value={data.s2_2_energy || ''}
                    onChange={(e) => update('s2_2_energy', e.target.value)}
                    className="p-4 bg-gray-50 rounded-2xl text-sm font-medium border-none outline-none focus:ring-4 focus:ring-sml-teal-50"
                 />
                 <input 
                    type="text" 
                    placeholder={t('circularity.s2.2.water')} 
                    value={data.s2_2_water || ''}
                    onChange={(e) => update('s2_2_water', e.target.value)}
                    className="p-4 bg-gray-50 rounded-2xl text-sm font-medium border-none outline-none focus:ring-4 focus:ring-sml-teal-50"
                 />
            </div>
            <div className="flex gap-4">
                 {['A', 'B'].map((val) => (
                     <label key={val} className="flex-1 p-3 bg-gray-50 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-gray-100">
                         <input 
                            type="radio" 
                            name="s2_2_forest" 
                            value={val} 
                            checked={data.s2_2_forest === val}
                            onChange={() => update('s2_2_forest', val)}
                            className="w-5 h-5 text-sml-teal-600"
                         />
                         <span className="text-sm font-bold text-gray-700">{val === 'A' ? t('circularity.s2.2.forest.a') : t('circularity.s2.2.forest.b')}</span>
                     </label>
                 ))}
            </div>
        </div>

        <TextInput 
            label={t('circularity.s2.3.label')} 
            value={data.s2_3}
            onChange={(v) => update('s2_3', v)}
            placeholder={t('circularity.s2.3.placeholder')}
        />

        <LikertScale 
            label={t('circularity.s2.5.label')}
            value={data.s2_5}
            onChange={(v) => update('s2_5', v)}
            leftText={t('circularity.s2.5.left')}
            rightText={t('circularity.s2.5.right')}
        />

        <RadioGroup 
            label={t('circularity.s2.6.label')}
            name="s2_6"
            selectedValue={data.s2_6}
            inputValue={data.s2_6_input}
            onChange={(v, i) => { update('s2_6', v); if(i !== undefined) update('s2_6_input', i); }}
            options={[
                { value: 'A', label: t('circularity.s2.6.a') },
                { value: 'B', label: t('circularity.s2.6.b') },
            ]}
        />
    </div>
)};

const StageThree: React.FC<{ data: any, update: any }> = ({ data, update }) => {
    const { t } = useLanguage();
    return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
        <h3 className="text-2xl font-black text-gray-800 mb-8 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-sml-teal-100 text-sml-teal-600 flex items-center justify-center text-lg">3</span> 
            {t('circularity.stage2')}
        </h3>

        <LikertScale 
            label={t('circularity.s3.1.label')}
            value={data.s3_1}
            onChange={(v) => update('s3_1', v)}
            leftText={t('circularity.s3.1.left')}
            rightText={t('circularity.s3.1.right')}
        />

        <div className="mb-10">
            <label className="block text-base font-extrabold text-gray-800 mb-4">{t('circularity.s3.2.label')}</label>
            <div className="flex items-center gap-4 mb-6 bg-gray-50 p-4 rounded-2xl w-fit">
                 <span className="text-sm font-bold text-gray-500">{t('circularity.s3.2.ratio')}</span>
                 <input 
                    type="number" 
                    value={data.s3_2_ratio || ''}
                    onChange={(e) => update('s3_2_ratio', e.target.value)}
                    className="w-24 bg-white p-2 rounded-lg text-center font-bold text-sml-teal-600 outline-none"
                    placeholder="1.0"
                 />
                 <span className="text-sm font-bold text-gray-500">: 1</span>
            </div>
            <LikertScale 
                label={t('circularity.s3.2.scale.label')}
                value={data.s3_2_scale}
                onChange={(v) => update('s3_2_scale', v)}
                leftText={t('circularity.s3.2.scale.left')}
                rightText={t('circularity.s3.2.scale.right')}
            />
        </div>

        <div className="mb-10 p-6 bg-sml-cream-50 rounded-3xl">
             <label className="block text-lg font-black text-gray-800 mb-6">{t('circularity.s3.4.label')}</label>
             <LikertScale label={t('circularity.s3.4.func.label')} value={data.s3_4_func} onChange={(v) => update('s3_4_func', v)} leftText={t('circularity.s3.4.func.left')} rightText={t('circularity.s3.4.func.right')} />
             <LikertScale label={t('circularity.s3.4.easy.label')} value={data.s3_4_easy} onChange={(v) => update('s3_4_easy', v)} leftText={t('circularity.s3.4.easy.left')} rightText={t('circularity.s3.4.easy.right')} />
             <LikertScale label={t('circularity.s3.4.compat.label')} value={data.s3_4_compat} onChange={(v) => update('s3_4_compat', v)} leftText={t('circularity.s3.4.compat.left')} rightText={t('circularity.s3.4.compat.right')} />
        </div>

        <div className="mb-8">
            <label className="block text-base font-extrabold text-gray-800 mb-3">{t('circularity.s3.5.label')}</label>
            <TextInput label={t('circularity.s3.5.waste')} value={data.s3_5_waste} onChange={(v) => update('s3_5_waste', v)} />
        </div>
    </div>
)};

const StageFour: React.FC<{ data: any }> = ({ data }) => {
    const { t } = useLanguage();
    const score1 = 75; 
    const score2 = 60;
    const score3 = 82;
    const totalScore = Math.round((score1 + score2 + score3) / 3);

    const radarData = [
        { subject: t('circularity.s4.radar.material'), A: score1, fullMark: 100 },
        { subject: t('circularity.s4.radar.footprint'), A: score2, fullMark: 100 },
        { subject: t('circularity.s4.radar.endOfLife'), A: score3, fullMark: 100 },
    ];

    return (
        <div className="animate-in fade-in zoom-in-95 duration-700">
            <div className="text-center mb-12">
                <h3 className="text-3xl font-black text-gray-800 mb-4">{t('circularity.s4.title')}</h3>
                <div className="inline-flex items-center justify-center relative">
                     <svg className="w-48 h-48 transform -rotate-90">
                        <circle cx="96" cy="96" r="80" stroke="#f3f4f6" strokeWidth="12" fill="transparent" />
                        <circle cx="96" cy="96" r="80" stroke={totalScore > 80 ? '#10b981' : totalScore > 60 ? '#f59e0b' : '#ef4444'} strokeWidth="12" fill="transparent" strokeDasharray={502} strokeDashoffset={502 - (502 * totalScore) / 100} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-black text-gray-800 tracking-tighter">{totalScore}</span>
                        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">{t('circularity.s4.totalScore')}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-lg">
                    <h4 className="font-bold text-gray-700 mb-6 flex items-center gap-2"><BrainCircuit size={20} className="text-sml-teal-600"/> {t('circularity.s4.stageScores')}</h4>
                    <div className="h-64 w-full">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={radarData} layout="vertical" margin={{ left: 20 }}>
                                <XAxis type="number" domain={[0, 100]} hide />
                                <YAxis dataKey="subject" type="category" width={80} tick={{fontSize: 12, fontWeight: 700}} axisLine={false} tickLine={false} />
                                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                                <Bar dataKey="A" radius={[0, 6, 6, 0]} barSize={32}>
                                    {radarData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={['#1c9ba4', '#ff6b6b', '#9c89b8'][index]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-blue-50 rounded-[2rem] p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -mr-10 -mt-10"></div>
                    <h4 className="font-bold text-blue-800 mb-6 flex items-center gap-2 relative z-10"><AlertTriangle size={20} /> {t('circularity.s4.aiAdvice')}</h4>
                    <ul className="space-y-4 text-sm text-blue-900 font-medium relative z-10">
                        <li className="flex gap-3">
                            <span className="min-w-[6px] h-[6px] rounded-full bg-blue-500 mt-2"></span>
                            <span>{t('circularity.s4.advice1')}</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="min-w-[6px] h-[6px] rounded-full bg-blue-500 mt-2"></span>
                            <span>{t('circularity.s4.advice2')}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="flex justify-center">
                <button className="flex items-center gap-3 px-8 py-4 bg-sml-slate-800 text-white rounded-full shadow-xl hover:scale-105 transition-all font-bold">
                    <FileDown size={20} />
                    {t('circularity.s4.export')}
                </button>
            </div>
        </div>
    );
};

export default CircularityCheckup;