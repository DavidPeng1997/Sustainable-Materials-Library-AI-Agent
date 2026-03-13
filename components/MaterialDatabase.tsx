import React, { useState, useMemo } from 'react';
import { Search, Plus, Heart, X, FileDown, Check, Filter, ChevronRight, Share2, Printer, BarChart2, Scale, Info, AlertCircle, Sparkles, Layers } from 'lucide-react';
import { MaterialData } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

// Specific Material Data
const initialMaterials: MaterialData[] = [
  {
    id: 'M001',
    name: '菌絲體皮革',
    category: '有機材質',
    image: 'https://duk.tw/l4LjW8.jpg',
    isSaved: true,
    attributes: ['❖ 透氣', '☂ 防水', '耐磨'],
    strength: '高 (15 MPa)',
    density: '0.85 g/cm³',
    processingMethod: '生物培育 / 壓製',
    reachRisk: '無 (SVHC Free)',
    carbonFootprint: '2.5 kg CO2e/kg',
    recyclingMethod: '工業堆肥',
    typicalApplication: '皮件、鞋材、汽車內飾',
    manufacturer: 'MycoWorks / Ecovative',
    manufacturerContact: 'contact@mycoworks.com',
    vendorCode: '1-452-A99',
    stats: { processingDifficulty: 70, durability: 85, carbonFootprintScore: 95, recyclability: 90, reachRiskScore: 100 }
  },
  {
    id: 'M002',
    name: '蚵殼原抽丙纖維',
    category: '再生纖維',
    image: 'https://duk.tw/1UbGnR.jpg',
    isSaved: true,
    attributes: ['抗菌', '抗靜電', '保溫'],
    strength: '中 (35 MPa)',
    density: '0.91 g/cm³',
    processingMethod: '抽絲 / 紡織',
    reachRisk: '低',
    carbonFootprint: '1.1 kg CO2e/kg',
    recyclingMethod: '物理回收',
    typicalApplication: '機能服飾、丹寧布、家飾',
    manufacturer: 'PIDC / Local',
    manufacturerContact: 'service@pidc.org.tw',
    vendorCode: '2-113-B87',
    stats: { processingDifficulty: 65, durability: 80, carbonFootprintScore: 90, recyclability: 85, reachRiskScore: 95 }
  },
  {
    id: 'M003',
    name: '鳳梨葉纖維',
    category: '植物纖維',
    image: 'https://duk.tw/ESqkT4.jpg',
    isSaved: true,
    attributes: ['❖ 透氣', '耐磨', '☀ 抗紫外線'],
    strength: '中高',
    density: '0.9 g/cm³',
    processingMethod: '纖維提取 / 不織布工藝',
    reachRisk: '無',
    carbonFootprint: '5.0 kg CO2e/kg',
    recyclingMethod: '生物降解 / 回收',
    typicalApplication: '時尚配件、室內裝潢',
    manufacturer: 'Ananas Anam',
    manufacturerContact: 'info@ananas-anam.com',
    vendorCode: '1-605-C22',
    stats: { processingDifficulty: 65, durability: 70, carbonFootprintScore: 90, recyclability: 95, reachRiskScore: 100 }
  },
  {
    id: 'M004',
    name: '海廢漁網再生塑膠',
    category: '再生塑膠',
    image: 'https://duk.tw/tf38L7.jpg',
    isSaved: true,
    attributes: ['☂ 防水', '耐磨', '高韌性'],
    strength: '高 (45 MPa)',
    density: '0.96 g/cm³',
    processingMethod: '射出成型 / 押出',
    reachRisk: '需檢測',
    carbonFootprint: '1.6 kg CO2e/kg',
    recyclingMethod: '100% 可回收 (rPA/rPE)',
    typicalApplication: '眼鏡鏡框、滑板、扣具',
    manufacturer: 'Bureo / Oceanworks',
    manufacturerContact: 'hello@oceanworks.co',
    vendorCode: '3-088-X41',
    stats: { processingDifficulty: 80, durability: 95, carbonFootprintScore: 85, recyclability: 90, reachRiskScore: 85 }
  },
  {
    id: 'M005',
    name: '香蕉纖維',
    category: '植物纖維',
    image: 'https://duk.tw/t0OQue.jpg',
    isSaved: true,
    attributes: ['❖ 吸濕排汗', '強韌', '生物降解'],
    strength: '中高 (55 MPa)',
    density: '1.35 g/cm³',
    processingMethod: '纖維提取 / 編織',
    reachRisk: '無',
    carbonFootprint: '0.5 kg CO2e/kg',
    recyclingMethod: '工業堆肥 / 自然降解',
    typicalApplication: '編織包袋、紙漿、紡織品',
    manufacturer: 'Bananatex',
    manufacturerContact: 'info@bananatex.com',
    vendorCode: '2-550-D09',
    stats: { processingDifficulty: 75, durability: 75, carbonFootprintScore: 98, recyclability: 95, reachRiskScore: 100 }
  },
  {
    id: 'M006',
    name: '竹纖維複合板',
    category: '植物纖維',
    image: 'https://duk.tw/wRBTFt.jpg',
    isSaved: true,
    attributes: ['◙ 耐熱保溫', '耐磨'],
    strength: '極高 (60 MPa)',
    density: '1.2 g/cm³',
    processingMethod: '熱壓成型',
    reachRisk: '無',
    carbonFootprint: '0.8 kg CO2e/kg',
    recyclingMethod: '生物降解 / 燃燒回收',
    typicalApplication: '建築外牆、地板、戶外傢俱',
    manufacturer: 'Dasso',
    manufacturerContact: 'info@dasso.com',
    vendorCode: '1-332-E55',
    stats: { processingDifficulty: 75, durability: 95, carbonFootprintScore: 96, recyclability: 85, reachRiskScore: 100 }
  }
];

// Content for the "Add Material" modal (PIDC data)
const pidcMaterials = [
    { id: "1-295-F44", name: "PE/PP Cycle+生物分解袋" },
    { id: "1-416-B82", name: "100%循環再生手機殼" },
    { id: "2-217-E41", name: "8合1穿著系統-單一PP材質全回收耐寒服" },
    { id: "1-264-D30", name: "ABS蚵殼筆殼" },
    { id: "1-200-B50", name: "BBM竹纖維複合材口紅管" },
    { id: "1-372-A55", name: "Bio-PC板(Makrolon®FR6020RE)" },
    { id: "1-355-E34", name: "Bio-PET料粒" },
    { id: "1-357-F41", name: "Bio-PP料粒" },
    { id: "1-294-F44", name: "BOPP/PE Cycle+生物可分解塑膠膜" },
    { id: "1-330-E37", name: "CBC/PE共混易撕膜" },
    { id: "1-305-N41", name: "CPLA湯杯蓋" },
];

const COLORS = ['#1c9ba4', '#ff6b6b', '#9c89b8', '#fbbf24', '#2d3748'];

const MaterialDatabase: React.FC = () => {
  const { t } = useLanguage();
  const [materials, setMaterials] = useState<MaterialData[]>(initialMaterials);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeMaterial, setActiveMaterial] = useState<MaterialData | null>(null);
  const [showFullDbModal, setShowFullDbModal] = useState(false);
  const [showTextureMenu, setShowTextureMenu] = useState(false);

  // Filter Logic
  const filteredMaterials = useMemo(() => 
    materials.filter(m => t(`material.${m.id.toLowerCase()}.name`).toLowerCase().includes(searchQuery.toLowerCase())), 
  [materials, searchQuery, t]);

  // Comparison Logic
  const selectedMaterials = useMemo(() => 
    materials.filter(m => selectedIds.has(m.id)), 
  [materials, selectedIds]);

  const comparisonRadarData = useMemo(() => {
    if (selectedMaterials.length === 0) return [];
    
    const subjects = [
        { label: t('material.db.compare.radar.processing'), key: 'processingDifficulty' },
        { label: t('material.db.compare.radar.durability'), key: 'durability' },
        { label: t('material.db.compare.radar.carbon'), key: 'carbonFootprintScore' },
        { label: t('material.db.compare.radar.recyclability'), key: 'recyclability' },
        { label: t('material.db.compare.radar.reach'), key: 'reachRiskScore' }
    ];

    return subjects.map(subj => {
        const point: any = { subject: subj.label, fullMark: 100 };
        selectedMaterials.forEach(m => {
            // @ts-ignore
            point[t(`material.${m.id.toLowerCase()}.name`)] = m.stats[subj.key];
        });
        return point;
    });
  }, [selectedMaterials, t]);

  // Handlers
  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMaterials(prev => prev.map(m => 
      m.id === id ? { ...m, isSaved: !m.isSaved } : m
    ));
    if (selectedIds.has(id)) {
        const newSet = new Set(selectedIds);
        newSet.delete(id);
        setSelectedIds(newSet);
    }
  };

  const toggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      if (newSet.size >= 5) {
          alert(t('material.db.compare.max'));
          return;
      }
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const openDetail = (material: MaterialData) => {
    setActiveMaterial(material);
    setShowTextureMenu(false); // Reset menu state when opening new detail
  };

  const handleExportSpecSheet = () => {
    alert(t('material.db.export.spec'));
  };

  const handleExportTexture = (type: string) => {
      setShowTextureMenu(false);
      alert(`${t('material.db.export.texture')}${t(`material.${activeMaterial?.id.toLowerCase()}.name`)}_${type}.zip`);
  };

  // Helper for single item radar
  const getSingleRadarData = (material: MaterialData) => [
    { subject: t('material.db.compare.radar.processing'), A: material.stats.processingDifficulty, fullMark: 100 },
    { subject: t('material.db.compare.radar.durability'), A: material.stats.durability, fullMark: 100 },
    { subject: t('material.db.compare.radar.carbon'), A: material.stats.carbonFootprintScore, fullMark: 100 },
    { subject: t('material.db.compare.radar.recyclability'), A: material.stats.recyclability, fullMark: 100 },
    { subject: t('material.db.compare.radar.reach'), A: material.stats.reachRiskScore, fullMark: 100 },
  ];

  return (
    <div className="h-full flex flex-col lg:flex-row w-full bg-sml-cream-50 overflow-hidden relative">
      
      {/* LEFT/MIDDLE PANEL: Grid Display */}
      <div className="flex-1 flex flex-col min-w-0 pr-0 overflow-hidden">
          {/* Header Bar */}
          <div className="px-4 md:px-8 py-4 md:py-6 flex flex-col md:flex-row md:items-center justify-between flex-shrink-0 z-10 gap-4">
            <div className="flex items-center gap-3">
                <h2 className="text-xl md:text-2xl font-black text-gray-800">{t('material.title')}</h2>
                <span className="bg-white text-sml-teal-600 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    {materials.filter(m => m.isSaved).length} {t('material.db.items')}
                </span>
            </div>
            
            <div className="flex gap-2 md:gap-4 w-full md:max-w-xl justify-end">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                        type="text" 
                        placeholder={t('material.search.placeholder')} 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-6 py-3 bg-white border-none rounded-2xl focus:ring-2 focus:ring-sml-teal-200 transition-all text-sm font-medium outline-none shadow-sm"
                    />
                </div>
                <button 
                    onClick={() => setShowFullDbModal(true)}
                    className="flex items-center justify-center gap-2 px-4 md:px-6 py-3 bg-sml-orange text-white rounded-full hover:scale-105 transition-transform text-sm font-bold shadow-md shadow-orange-200 flex-shrink-0 whitespace-nowrap"
                >
                    <Plus size={20} />
                    <span className="hidden md:inline">{t('material.add')}</span>
                    <span className="md:hidden">{t('material.add.short')}</span>
                </button>
            </div>
          </div>

          {/* Main Grid Content */}
          <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-8 scrollbar-hide">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {filteredMaterials.filter(m => m.isSaved).map(material => (
                    <div 
                        key={material.id}
                        onClick={() => openDetail(material)}
                        className={`bg-white rounded-3xl overflow-hidden cursor-pointer group hover:translate-y-[-4px] transition-all duration-300 relative shadow-sm hover:shadow-xl
                            ${selectedIds.has(material.id) ? 'ring-4 ring-sml-teal-500 ring-offset-4 ring-offset-sml-cream-50' : ''}
                        `}
                    >
                        {/* Checkbox (Top Left) */}
                        <div className="absolute top-4 left-4 z-10" onClick={(e) => e.stopPropagation()}>
                            <button 
                                onClick={(e) => toggleSelect(material.id, e)}
                                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all shadow-sm border-2 border-white ${
                                    selectedIds.has(material.id) ? 'bg-sml-teal-500 text-white' : 'bg-white/80 text-transparent hover:bg-white'
                                }`}
                            >
                                <Check size={16} strokeWidth={4} />
                            </button>
                        </div>
                        {/* Heart (Top Right) */}
                        <div className="absolute top-4 right-4 z-10" onClick={(e) => e.stopPropagation()}>
                            <button 
                                onClick={(e) => toggleSave(material.id, e)}
                                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-sml-orange shadow-md hover:scale-110 transition-all"
                            >
                                <Heart size={20} className={material.isSaved ? "fill-current" : ""} />
                            </button>
                        </div>

                        {/* Image Area */}
                        <div className="h-48 md:h-56 w-full bg-gray-100 relative overflow-hidden">
                            <img src={material.image} alt={t(`material.${material.id.toLowerCase()}.name`)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute bottom-4 left-4">
                                <span className="text-xs font-bold text-sml-teal-800 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm">
                                    {t(`material.${material.id.toLowerCase()}.category`)}
                                </span>
                            </div>
                        </div>

                        {/* Info Area */}
                        <div className="p-5 md:p-6">
                            <h3 className="font-extrabold text-lg text-gray-800 mb-1 group-hover:text-sml-teal-600 transition-colors">{t(`material.${material.id.toLowerCase()}.name`)}</h3>
                            <p className="text-xs font-mono text-gray-400 mb-4">{material.vendorCode}</p>
                            
                            <div className="flex gap-2 flex-wrap">
                                {[1, 2, 3].map((i) => {
                                    const attr = t(`material.${material.id.toLowerCase()}.attr${i}`);
                                    if (attr === `material.${material.id.toLowerCase()}.attr${i}`) return null;
                                    return (
                                        <span key={i} className="text-[10px] font-bold text-gray-600 bg-gray-50 px-2 py-1 rounded-md">
                                            {attr}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </div>
      </div>

      {/* RIGHT PANEL: Comparison & Stats */}
      <div className="w-full lg:w-96 flex-shrink-0 bg-white flex flex-col border-t lg:border-t-0 lg:border-l border-gray-100 shadow-2xl z-20 h-1/2 lg:h-full">
          <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Scale size={20} className="text-sml-purple"/> 
                {t('material.db.compare.title')}
            </h3>
            {selectedMaterials.length > 0 && (
                <button 
                    onClick={() => setSelectedIds(new Set())}
                    className="text-xs font-bold text-gray-400 hover:text-sml-orange px-2 py-1"
                >
                    {t('material.db.compare.clear')}
                </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-hide">
              {selectedMaterials.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center px-6 py-8 lg:py-0">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <BarChart2 size={32} className="opacity-30" />
                      </div>
                      <p className="font-bold text-gray-500 mb-2">{t('material.db.compare.empty')}</p>
                      <p className="text-sm opacity-60">{t('material.db.compare.empty.desc')}</p>
                  </div>
              ) : (
                  <div className="space-y-8">
                      {/* Radar Chart */}
                      <div className="bg-sml-cream-50 rounded-3xl p-4">
                          <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 px-2">{t('material.db.compare.radar.title')}</h4>
                          <div className="h-56 md:h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={comparisonRadarData}>
                                    <PolarGrid stroke="#e2e8f0" />
                                    <PolarAngleAxis dataKey="subject" tick={{fontSize: 10, fill: '#64748b', fontWeight: 600}} />
                                    {selectedMaterials.map((m, i) => (
                                        <Radar
                                            key={m.id}
                                            name={t(`material.${m.id.toLowerCase()}.name`)}
                                            dataKey={t(`material.${m.id.toLowerCase()}.name`)}
                                            stroke={COLORS[i % COLORS.length]}
                                            strokeWidth={3}
                                            fill={COLORS[i % COLORS.length]}
                                            fillOpacity={0.1}
                                        />
                                    ))}
                                    <Tooltip 
                                        wrapperStyle={{fontSize: '12px'}}
                                        contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} 
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                          </div>
                      </div>

                      {/* Legend List */}
                      <div>
                          <div className="space-y-3">
                              {selectedMaterials.map((m, i) => (
                                  <div key={m.id} className="flex items-center gap-3 p-4 bg-white rounded-2xl border-2 border-gray-50 hover:border-sml-teal-100 transition-colors">
                                      <span className="w-4 h-4 rounded-full flex-shrink-0" style={{backgroundColor: COLORS[i % COLORS.length]}}></span>
                                      <div className="min-w-0">
                                          <p className="text-sm font-bold text-gray-800 leading-tight">{t(`material.${m.id.toLowerCase()}.name`)}</p>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>

                      {/* Action */}
                      <button 
                        onClick={handleExportSpecSheet}
                        className="w-full py-4 bg-sml-slate-800 text-white rounded-2xl hover:scale-[1.02] transition-transform shadow-lg flex items-center justify-center gap-2 text-sm font-bold"
                      >
                          <FileDown size={18} />
                          {t('material.db.export.btn')}
                      </button>
                  </div>
              )}
          </div>
      </div>

      {/* Material Detail Modal */}
      {activeMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
            <div className="absolute inset-0 bg-sml-slate-900/60 backdrop-blur-md transition-opacity" onClick={() => setActiveMaterial(null)}></div>
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">
                
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 md:p-8 border-b border-gray-100 bg-white">
                    <div>
                        <div className="flex items-center gap-4 mb-2">
                            <h2 className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight">{t(`material.${activeMaterial.id.toLowerCase()}.name`)}</h2>
                            <span className="bg-sml-teal-100 text-sml-teal-800 text-xs px-3 py-1 rounded-full font-bold whitespace-nowrap">
                                {t(`material.${activeMaterial.id.toLowerCase()}.category`)}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                        <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-800 transition-colors hidden md:flex">
                            <Share2 size={20} />
                        </button>
                        <button 
                            onClick={(e) => toggleSave(activeMaterial.id, e)}
                            className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-sml-orange hover:bg-red-100 transition-colors"
                        >
                            <Heart size={20} className={activeMaterial.isSaved ? "fill-current" : ""} />
                        </button>
                        <button onClick={() => setActiveMaterial(null)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-800 transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto bg-white">
                    <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
                        
                        {/* Left Column: Visuals & Radar */}
                        <div className="lg:col-span-2 bg-sml-cream-50 p-6 md:p-8 flex flex-col gap-8 border-r border-gray-100">
                            <div className="aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-sm bg-white p-2">
                                <img src={activeMaterial.image} alt={t(`material.${activeMaterial.id.toLowerCase()}.name`)} className="w-full h-full object-cover rounded-2xl" />
                            </div>
                            
                            <div className="bg-white rounded-3xl p-6 shadow-sm flex-1 flex flex-col min-h-[300px] lg:min-h-0">
                                <h4 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <Filter size={18} className="text-sml-teal-500"/>
                                    {t('material.detail.spec.analysis')}
                                </h4>
                                <div className="flex-1 min-h-[200px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={getSingleRadarData(activeMaterial)}>
                                            <PolarGrid stroke="#e2e8f0" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} />
                                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                            <Radar
                                                name={t(`material.${activeMaterial.id.toLowerCase()}.name`)}
                                                dataKey="A"
                                                stroke="#1c9ba4"
                                                strokeWidth={3}
                                                fill="#1c9ba4"
                                                fillOpacity={0.2}
                                            />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Specs */}
                        <div className="lg:col-span-3 p-6 md:p-10 flex flex-col">
                            
                            <div className="mb-10">
                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">{t('material.detail.spec.attr')}</h4>
                                <div className="flex flex-wrap gap-3">
                                    {[1, 2, 3].map((i) => {
                                        const attr = t(`material.${activeMaterial.id.toLowerCase()}.attr${i}`);
                                        if (attr === `material.${activeMaterial.id.toLowerCase()}.attr${i}`) return null;
                                        return (
                                            <span key={i} className="px-4 py-2 bg-white text-sml-teal-700 rounded-xl text-sm font-bold border border-gray-100 shadow-sm">
                                                {attr}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                                <div className="col-span-2">
                                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">{t('material.detail.spec.detail')}</h4>
                                    <div className="h-0.5 w-full bg-gray-100 rounded-full"></div>
                                </div>
                                
                                <SpecItem label={t('material.detail.spec.strength')} value={t(`material.${activeMaterial.id.toLowerCase()}.strength`)} />
                                <SpecItem label={t('material.detail.spec.density')} value={t(`material.${activeMaterial.id.toLowerCase()}.density`)} />
                                <SpecItem label={t('material.detail.spec.processing')} value={t(`material.${activeMaterial.id.toLowerCase()}.processing`)} />
                                <SpecItem label={t('material.detail.spec.reach')} value={t(`material.${activeMaterial.id.toLowerCase()}.reach`)} highlight={t(`material.${activeMaterial.id.toLowerCase()}.reach`).includes('無') || t(`material.${activeMaterial.id.toLowerCase()}.reach`).includes('None') ? 'green' : 'amber'} />
                                <SpecItem label={t('material.detail.spec.carbon')} value={t(`material.${activeMaterial.id.toLowerCase()}.carbon`)} />
                                <SpecItem label={t('material.detail.spec.recycling')} value={t(`material.${activeMaterial.id.toLowerCase()}.recycling`)} />
                                <SpecItem label={t('material.detail.spec.application')} value={t(`material.${activeMaterial.id.toLowerCase()}.application`)} fullWidth />
                            </div>

                            <div className="my-10"></div>

                            <div className="mb-8">
                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">{t('material.detail.supplier.info')}</h4>
                                <div className="bg-sml-cream-50 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">{t('material.detail.supplier.code')}</p>
                                        <p className="font-mono font-bold text-gray-800 text-lg">{activeMaterial.vendorCode}</p>
                                    </div>
                                    <button className="text-sml-teal-600 font-bold text-sm hover:underline">
                                        {activeMaterial.manufacturerContact}
                                    </button>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-end gap-4 relative">
                                <button 
                                    onClick={() => alert(t('material.alert.ai'))}
                                    className="px-6 py-3 bg-sml-purple text-white rounded-full hover:scale-105 transition-transform shadow-md flex items-center justify-center gap-2 font-bold order-2 md:order-1"
                                >
                                    <Sparkles size={18} />
                                    {t('material.detail.action.ai')}
                                </button>
                                
                                <div className="relative order-1 md:order-2 w-full md:w-auto">
                                    <button 
                                        onClick={() => setShowTextureMenu(!showTextureMenu)}
                                        className="w-full md:w-auto px-6 py-3 bg-white border-2 border-gray-100 text-gray-700 rounded-full hover:border-sml-teal-200 hover:text-sml-teal-700 transition-colors flex items-center justify-center gap-2 font-bold"
                                    >
                                        <Layers size={18} />
                                        {t('material.detail.action.export')}
                                    </button>

                                    {showTextureMenu && (
                                        <div className="absolute bottom-full right-0 mb-3 w-full md:w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-2 duration-200 z-20">
                                            <button 
                                                onClick={() => handleExportTexture('image')}
                                                className="w-full text-left px-5 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-sml-teal-700 border-b border-gray-50 font-medium"
                                            >
                                                {t('material.detail.action.export.img')}
                                            </button>
                                            <button 
                                                onClick={() => handleExportTexture('3d')}
                                                className="w-full text-left px-5 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-sml-teal-700 font-medium"
                                            >
                                                {t('material.detail.action.export.3d')}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Full Database Modal */}
      {showFullDbModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6">
            <div className="absolute inset-0 bg-sml-slate-900/60 backdrop-blur-md" onClick={() => setShowFullDbModal(false)}></div>
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col relative z-10 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-center bg-white">
                    <h3 className="font-black text-xl md:text-2xl text-gray-800">{t('material.modal.add.title')}</h3>
                    <button onClick={() => setShowFullDbModal(false)} className="w-10 h-10 rounded-full hover:bg-gray-50 flex items-center justify-center text-gray-500">
                        <X size={24} />
                    </button>
                </div>
                
                <div className="p-4 md:p-6 bg-sml-cream-50 border-b border-gray-100">
                    <section className="flex items-center gap-3 text-sml-teal-700 font-bold px-2">
                        <Filter size={20} />
                        <h3 className="text-sm md:text-base">{t('material.modal.add.filter')}</h3>
                    </section>
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-sml-cream-50">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pidcMaterials.map((item, index) => (
                            <li 
                                key={index} 
                                className="group flex flex-col p-5 rounded-2xl bg-white border-2 border-transparent hover:border-sml-teal-400 hover:shadow-lg transition-all cursor-pointer relative"
                                onClick={() => {
                                    alert(`${t('material.modal.add.success')} ${t(`pidc.${item.id}`)} ${t('material.modal.add.success2')}`);
                                    setShowFullDbModal(false);
                                }}
                            >
                                <div className="absolute top-4 right-4 text-sml-teal-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Plus size={24} strokeWidth={3} />
                                </div>
                                <span className="inline-block w-fit px-2 py-1 mb-2 text-xs font-mono font-bold text-gray-400 bg-gray-50 rounded-md">
                                    {item.id}
                                </span>
                                <span className="font-bold text-lg text-gray-800 group-hover:text-sml-teal-700">
                                    {t(`pidc.${item.id}`)}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-8 flex justify-center">
                        <span className="text-sm font-bold text-gray-500 bg-white px-5 py-2 rounded-full shadow-sm">
                            {t('material.modal.add.page')} 1 / 29
                        </span>
                    </div>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

const SpecItem: React.FC<{ label: string; value: string; fullWidth?: boolean; highlight?: 'green' | 'amber' }> = ({ label, value, fullWidth, highlight }) => (
    <div className={`${fullWidth ? 'col-span-2' : 'col-span-1'} flex flex-col`}>
        <span className="text-xs font-bold text-gray-400 mb-2">{label}</span>
        <span className={`font-bold text-lg ${
            highlight === 'green' ? 'text-green-600' : 
            highlight === 'amber' ? 'text-amber-500' : 'text-gray-800'
        }`}>
            {value}
        </span>
    </div>
);

export default MaterialDatabase;