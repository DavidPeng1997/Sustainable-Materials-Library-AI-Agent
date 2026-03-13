import React, { useState } from 'react';
import { FolderClock, Search, Calendar, Trash2, ArrowRight, CheckSquare, Square } from 'lucide-react';
import { ProjectHistory } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const INITIAL_PROJECTS: ProjectHistory[] = [
    {
        id: 1,
        title: "竹纖維無線充電器開發",
        date: "2024-03-15",
        description: "探討竹纖維複合材在消費電子外殼的應用，包含耐熱性與模具流動性分析。",
        chatHistory: [
            { role: 'user', text: "我想開發一款無線充電器，想使用竹纖維複合材料，有什麼建議的供應商？" },
            { role: 'model', text: "竹纖維複合材料非常適合作為電子產品外殼。推薦您參考 Dasso 或本地的 BBM 竹材。Dasso 的材料強度較高 (60 MPa)，且已通過 ISO 14000 認證。需要注意的是，無線充電線圈會產生熱能，建議選擇耐熱級別達 120°C 以上的配方。" },
            { role: 'user', text: "這種材料的防火等級如何？" },
            { role: 'model', text: "一般未經處理的竹纖維為 HB 級。若要符合電子產品 UL94 V-0 標準，需要添加無鹵阻燃劑。我可以為您列出幾種環保型阻燃劑的選項..." }
        ]
    },
    {
        id: 2,
        title: "再生 PET 運動鞋中底",
        date: "2024-02-28",
        description: "針對 rPET 發泡技術的彈性與回彈率評估，以及與 EVA 材料的比較。",
        chatHistory: [
            { role: 'user', text: "目前的再生 PET 發泡技術，能做到類似 Boost 的回彈腳感嗎？" },
            { role: 'model', text: "目前 rPET 發泡技術已有顯著突破。物理發泡 (Supercritical Fluid Foaming) 技術可以讓 rPET 達到約 65-70% 的回彈率，雖然略低於頂級 TPU 發泡 (75%+)，但已優於傳統 EVA。且碳足跡可降低 40%。" },
            { role: 'user', text: "那在貼合製程上需要注意什麼？" },
            { role: 'model', text: "由於 rPET 表面能較低，建議使用水性聚氨酯膠黏劑前，先進行電漿處理 (Plasma treatment) 以增加表面粗糙度與活化能，確保剝離強度符合運動鞋標準。" }
        ]
    },
    {
        id: 3,
        title: "海洋廢棄物模組化座椅",
        date: "2024-01-10",
        description: "公共空間座椅設計案，專注於海廢再生塑膠的抗 UV 能力與結構強度。",
        chatHistory: [
            { role: 'user', text: "戶外公共座椅如果使用 100% 海洋再生塑膠，多久會脆化？" },
            { role: 'model', text: "海洋再生塑膠通常混有 PP 和 PE。若無添加抗 UV 劑，戶外曝曬約 1-2 年會開始出現白化與微裂。建議添加 2-3% 的受阻胺光穩定劑 (HALS)，可將使用壽命延長至 5-8 年。" },
            { role: 'user', text: "有無推薦的結構補強方式？" },
            { role: 'model', text: "建議採用「三明治結構」或「肋條補強」設計。也可以混入 10-15% 的玻璃纖維來提升剛性，但這會稍微降低回收價值。另一種方式是採用內嵌金屬件的設計..." }
        ]
    },
    {
        id: 4,
        title: "物理發泡TPU拖鞋",
        date: "2024-04-10",
        description: "從材料特點分析、研究TPU物性與化性，媒合供應商「歐特捷實業股份有限公司」，並生成再生TPU白色海灘鞋視覺。",
        chatHistory: [
            { role: 'user', text: "我想開發一款物理發泡TPU拖鞋，請幫我分析材料特點，並研究TPU的物性與化性。" },
            { role: 'model', text: "物理發泡TPU（熱塑性聚氨酯）具有優異的彈性、耐磨性和輕量化特點，非常適合用於拖鞋。\n\n【物性分析】\n- 高回彈率：可達 70-75% 以上，提供極佳的緩震與腳感。\n- 低密度：物理發泡能大幅降低材料密度（約 0.15-0.25 g/cm³），實現輕量化。\n- 耐磨與抗撕裂：保留了 TPU 原本優異的機械強度，耐用度遠勝傳統 EVA。\n\n【化性分析】\n- 環保無毒：物理發泡（如超臨界流體發泡）不使用化學發泡劑，無殘留毒性氣味，符合 REACH 等環保法規。\n- 耐候與耐油脂：TPU 本身對油脂、溶劑有良好的抵抗力，且耐候性佳，不易因長時間使用而快速老化。" },
            { role: 'user', text: "有推薦的供應商嗎？" },
            { role: 'model', text: "針對您的需求，推薦您與「歐特捷實業股份有限公司」媒合。他們在 TPU 物理發泡技術和再生材料應用上有豐富的經驗，能提供穩定的材料來源和技術支持，並且具備客製化配方的能力，非常適合開發高品質的環保拖鞋產品。" },
            { role: 'user', text: "請幫我用AI視覺生成一張再生TPU白色海灘鞋的圖片。" },
            { role: 'model', text: "沒問題，為您生成一張再生TPU白色海灘鞋的視覺概念圖：", image: "https://duk.tw/Z9qA42.jpg" }
        ]
    }
];

interface ProjectRecordsProps {
    onSelectProject: (project: ProjectHistory) => void;
}

const ProjectRecords: React.FC<ProjectRecordsProps> = ({ onSelectProject }) => {
    const { t } = useLanguage();
    const [projects, setProjects] = useState<ProjectHistory[]>(INITIAL_PROJECTS);
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const [searchTerm, setSearchTerm] = useState('');

    const toggleSelection = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedIds(newSet);
    };

    const handleDelete = () => {
        if (window.confirm(`確定要刪除選取的 ${selectedIds.size} 個專案紀錄嗎？`)) {
            setProjects(prev => prev.filter(p => !selectedIds.has(p.id)));
            setSelectedIds(new Set());
        }
    };

    const filteredProjects = projects.filter(p => 
        p.title.includes(searchTerm) || p.description.includes(searchTerm)
    );

    return (
        <div className="h-full bg-sml-cream-50 flex flex-col">
            {/* Header */}
            <div className="px-8 py-8 flex-shrink-0">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-sml-purple text-white rounded-2xl flex items-center justify-center shadow-md">
                            <FolderClock size={24} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-gray-800 tracking-tight">{t('project.title')}</h2>
                            <p className="text-gray-500 font-medium">{t('project.subtitle')}</p>
                        </div>
                    </div>
                    
                    {selectedIds.size > 0 && (
                        <button 
                            onClick={handleDelete}
                            className="flex items-center gap-2 px-6 py-3 bg-red-50 text-sml-orange rounded-full hover:bg-red-100 transition-colors text-sm font-bold shadow-sm"
                        >
                            <Trash2 size={18} />
                            {t('project.delete')} ({selectedIds.size})
                        </button>
                    )}
                </div>
                
                <div className="relative max-w-lg">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                        type="text" 
                        placeholder={t('project.search')} 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-6 py-4 bg-white border-none rounded-2xl focus:ring-4 focus:ring-sml-teal-100 transition-all outline-none text-sm font-medium shadow-sm"
                    />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-8 pb-8 scrollbar-hide">
                <div className="max-w-5xl mx-auto space-y-4">
                    {filteredProjects.map((project) => {
                        const isSelected = selectedIds.has(project.id);
                        return (
                            <div 
                                key={project.id} 
                                className={`group bg-white rounded-3xl p-2 transition-all duration-300 overflow-hidden relative flex items-center hover:shadow-lg
                                    ${isSelected ? 'ring-2 ring-sml-teal-500 bg-sml-teal-50/20' : ''}
                                `}
                            >
                                {/* Checkbox Area */}
                                <div 
                                    className="pl-4 pr-4 cursor-pointer self-stretch flex items-center"
                                    onClick={(e) => toggleSelection(project.id, e)}
                                >
                                    <div className={`transition-colors ${isSelected ? 'text-sml-teal-600' : 'text-gray-200 group-hover:text-gray-300'}`}>
                                        {isSelected ? <CheckSquare size={24} /> : <Square size={24} />}
                                    </div>
                                </div>

                                {/* Content Area - Click to Navigate */}
                                <div 
                                    onClick={() => onSelectProject(project)}
                                    className="flex-1 p-4 cursor-pointer"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-extrabold text-xl text-gray-800 group-hover:text-sml-teal-600 transition-colors">
                                            {project.title}
                                        </h3>
                                        <span className="text-xs font-bold text-gray-400 flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full">
                                            <Calendar size={12} /> {project.date}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed font-medium">{project.description}</p>
                                </div>

                                {/* Action Arrow */}
                                <div className="pr-6">
                                    <button 
                                        onClick={() => onSelectProject(project)}
                                        className="w-10 h-10 bg-sml-teal-50 text-sml-teal-600 rounded-full flex items-center justify-center hover:bg-sml-teal-500 hover:text-white transition-all transform group-hover:scale-110 opacity-0 group-hover:opacity-100"
                                    >
                                        <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-16 text-gray-400 bg-white rounded-3xl shadow-sm">
                            <FolderClock size={64} className="mx-auto mb-4 opacity-20 text-sml-teal-500" />
                            <p className="font-bold text-lg">{t('project.empty')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectRecords;