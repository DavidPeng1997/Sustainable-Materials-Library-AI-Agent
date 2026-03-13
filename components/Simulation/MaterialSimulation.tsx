import React, { useState } from 'react';
import { Box, Layers, Leaf, Droplets, Zap, Info, Play, MousePointer2, Send, Sparkles, Download, FileBox, BrainCircuit, Loader2 } from 'lucide-react';

// --- Data Types ---
interface SimulationMaterial {
  id: string;
  name: string;
  type: string;
  image: string; // Changed from color hex to image URL
  roughness: number;
  metalness: number;
  opacity?: number;
  transmission?: number; 
  stats: {
    co2: string; // kg CO2e
    recyclability: 'S' | 'A' | 'B' | 'C';
    durability: number; // 0-100
  };
  description: string;
}

// --- Mock Data ---
const MATERIALS: SimulationMaterial[] = [
  {
    id: 'ocean-plastic',
    name: '海廢漁網再生塑膠', 
    type: 'Recycled Ocean Plastic',
    image: 'https://duk.tw/BOlX5B.jpg',
    roughness: 0.5,
    metalness: 0.1,
    opacity: 0.9,
    transmission: 0.2,
    stats: { co2: '1.2 kg', recyclability: 'A', durability: 85 },
    description: '由海洋廢棄漁網與塑料瓶回收製成，具有獨特的半透明質感與極佳的抗衝擊性。'
  },
  {
    id: 'pineapple',
    name: '鳳梨纖維',
    type: 'Piñatex / Plant Fiber',
    image: 'https://duk.tw/KyTHL8.jpg',
    roughness: 0.9, 
    metalness: 0.0,
    stats: { co2: '0.3 kg', recyclability: 'S', durability: 70 },
    description: '利用鳳梨葉纖維提取製成的天然皮革替代品，具有獨特的褶皺紋理，100% 可生物降解。'
  },
  {
    id: 'oyster',
    name: '蚵殼粉織維',
    type: 'Seawool / Bio-Composite',
    image: 'https://duk.tw/gpSs43.jpg',
    roughness: 0.6,
    metalness: 0.1, 
    stats: { co2: '0.8 kg', recyclability: 'A', durability: 95 },
    description: '結合回收寶特瓶與廢棄蚵殼粉奈米化製成，具有羊毛般的觸感，並具備天然抗菌與抗靜電特性。'
  }
];

const MaterialSimulation: React.FC = () => {
  const [selectedMat, setSelectedMat] = useState<SimulationMaterial>(MATERIALS[0]);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  
  // New states for Analysis Panel behavior
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAiPromptSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if(!aiPrompt.trim()) return;
      
      // Start analysis simulation
      setIsAnalyzing(true);
      setShowAnalysis(false); // Hide previous results

      // Simulate API delay
      setTimeout(() => {
          setIsAnalyzing(false);
          setShowAnalysis(true);
          setAiPrompt('');
      }, 2000);
  };

  const handleMaterialChange = (mat: SimulationMaterial) => {
      setSelectedMat(mat);
      // Note: We keep showAnalysis true here so user can see specs of the clicked recommended material
  };

  const handleExport = (format: string) => {
      setIsExporting(true);
      setShowExportMenu(false);
      setTimeout(() => {
          setIsExporting(false);
          alert(`成功匯出模型： Sandal_Prototype_v1.${format}`);
      }, 1500);
  };

  if (!isModelLoaded) {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-gray-50 relative overflow-hidden">
           {/* Background Decoration */}
           <div className="absolute inset-0 z-0 opacity-10">
               <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sml-teal-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
               <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
           </div>

           <div className="text-center space-y-8 z-10 max-w-lg px-6">
               <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto text-sml-teal-600 shadow-xl border border-sml-teal-50 mb-6">
                   <Box size={48} strokeWidth={1.5} />
               </div>
               
               <div className="space-y-3">
                   <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">產品模擬實驗室</h2>
                   <p className="text-gray-500 text-base md:text-lg">
                      載入高擬真 3D 模型，進行材質替換與即時環境影響分析。
                   </p>
               </div>

               <button 
                  onClick={() => setIsModelLoaded(true)}
                  className="group relative px-8 py-4 bg-sml-teal-600 text-white text-lg font-semibold rounded-full hover:bg-sml-teal-700 transition-all shadow-lg hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3 mx-auto overflow-hidden"
               >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  <Play size={24} fill="currentColor" />
                  <span>載入預設模型</span>
               </button>
               
               <p className="text-xs text-gray-400 pt-4 px-8">
                  * 需要 WebGL 支援 • 建議使用桌面版瀏覽器體驗最佳效果
               </p>
           </div>
        </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-full w-full bg-gray-50 relative overflow-hidden animate-in fade-in duration-700">
        
        {/* CENTER: 3D Preview Container */}
        <div className="flex-1 h-[50vh] lg:h-full w-full relative flex flex-col">
            <iframe 
                src="https://pidcapp.pidc.org.tw/esgapi/webgl/index.html"
                style={{ width: '100%', height: '100%', border: 'none' }}
                title="PIDC WebGL Simulation"
            ></iframe>
            
            {/* Title Overlay */}
            <div className="absolute top-4 left-4 md:top-6 md:left-8 pointer-events-none select-none z-10">
                <h2 className="text-lg md:text-2xl font-bold text-gray-800/80 flex items-center gap-2 md:gap-3">
                    <Box className="text-sml-teal-600 w-5 h-5 md:w-6 md:h-6" />
                    產品模擬實驗室
                </h2>
                <span className="text-xs md:text-sm text-gray-400 ml-7 md:ml-9 mt-1 block">Project: Beach_Sandal_v01</span>
            </div>

            {/* Interaction Hint */}
            <div className="absolute top-4 right-4 md:top-6 md:right-8 pointer-events-none select-none z-10 flex items-center gap-2 text-[10px] md:text-xs text-gray-400 bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200/50">
                <MousePointer2 size={12} />
                <span>左鍵拖曳 • 滾輪縮放</span>
            </div>

            {/* AI Chat / Modification Interface (Bottom Overlay) */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-full md:max-w-xl z-20">
                <form onSubmit={handleAiPromptSubmit} className="bg-white/80 backdrop-blur-md border border-white/50 shadow-xl rounded-2xl p-2 flex items-center gap-2 ring-1 ring-gray-200 focus-within:ring-2 focus-within:ring-sml-teal-400 transition-all">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sml-teal-400 to-blue-500 flex items-center justify-center text-white shadow-sm flex-shrink-0">
                        {isAnalyzing ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                    </div>
                    <input 
                        type="text" 
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        placeholder="輸入指令生成分析（例：推薦適合海邊使用的永續材質）..."
                        disabled={isAnalyzing}
                        className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-gray-800 placeholder-gray-500 py-2 w-full min-w-0"
                    />
                    <button 
                        type="submit"
                        disabled={!aiPrompt.trim() || isAnalyzing}
                        className="p-2 bg-sml-slate-800 text-white rounded-xl hover:bg-sml-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0"
                    >
                        <Send size={16} />
                    </button>
                </form>
            </div>
        </div>

        {/* RIGHT PANEL: Analysis & Controls */}
        <div className="w-full lg:w-96 h-[50vh] lg:h-full bg-white border-t lg:border-t-0 lg:border-l border-gray-200 shadow-2xl z-20 flex flex-col relative">
            
            {/* Loading / Empty States Layer */}
            {(!showAnalysis || isAnalyzing) && (
                <div className="absolute inset-0 z-30 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
                    {isAnalyzing ? (
                         <>
                            <Loader2 className="w-12 h-12 text-sml-teal-500 animate-spin mb-6" />
                            <h3 className="text-xl font-bold text-sml-teal-700 mb-2">AI 運算中</h3>
                            <p className="text-gray-500 text-sm">正在分析材質屬性與搜尋推薦清單...</p>
                         </>
                    ) : (
                         <>
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                <BrainCircuit className="text-gray-300" size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-400 mb-3">等待指令</h3>
                            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                                請在畫面下方的對話框輸入您的需求<br/>
                                AI 助理將為您分析並推薦合適的永續材質
                            </p>
                         </>
                    )}
                </div>
            )}

            {/* 1. AI Analysis Section (Top) */}
            <div className="p-4 md:p-6 bg-gradient-to-b from-gray-50/50 to-white border-b border-gray-100 relative overflow-hidden min-h-[300px]">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-sml-teal-50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                    
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <span className="text-xs font-bold text-sml-teal-600 uppercase tracking-wider flex items-center gap-1 bg-sml-teal-50 px-2 py-1 rounded-md border border-sml-teal-100">
                            <Zap size={12} /> AI 即時分析
                        </span>
                        <span className="text-[10px] text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded">ISO 14040</span>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 relative z-10">{selectedMat.name}</h3>
                    <p className="text-xs text-gray-500 mb-4 md:mb-5 font-mono relative z-10">{selectedMat.type}</p>

                    <div className="space-y-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative z-10">
                        <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                            <span className="text-sm text-gray-600 flex items-center gap-2">
                                <div className="p-1 bg-green-100 rounded text-green-600"><Leaf size={12}/></div> 
                                碳足跡
                            </span>
                            <span className="font-bold text-gray-800">{selectedMat.stats.co2}</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                            <span className="text-sm text-gray-600 flex items-center gap-2">
                                <div className="p-1 bg-blue-100 rounded text-blue-600"><Droplets size={12}/></div>
                                回收等級
                            </span>
                            <span className="font-bold text-blue-600 bg-blue-50 px-2 rounded text-xs py-0.5 border border-blue-100">
                                {selectedMat.stats.recyclability}
                            </span>
                        </div>
                        <div className="space-y-1 pt-1">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span className="flex items-center gap-1"><Layers size={12}/> 耐用度預估</span>
                                <span className="font-medium text-purple-600">{selectedMat.stats.durability}%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-700 ease-out" 
                                    style={{width: `${selectedMat.stats.durability}%`}}
                                ></div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-4 flex gap-2 hidden md:flex">
                        <div className="w-1 bg-sml-teal-400 rounded-full"></div>
                        <p className="text-xs text-gray-500 italic leading-relaxed">
                            "{selectedMat.description}"
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. Material Selector / Recommendation (Middle) */}
            <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4 bg-white border-t border-gray-50 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                 <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                    <Sparkles size={16} className="text-sml-orange" />
                    推薦的材質
                </h3>
                {MATERIALS.map((mat) => (
                    <button
                        key={mat.id}
                        onClick={() => handleMaterialChange(mat)}
                        className={`w-full text-left p-3 rounded-xl border transition-all duration-200 group relative overflow-hidden flex items-center gap-3 ${
                            selectedMat.id === mat.id 
                            ? 'border-sml-teal-500 bg-sml-teal-50 shadow-md scale-[1.02]' 
                            : 'border-gray-200 hover:border-sml-teal-300 hover:bg-gray-50 hover:shadow-sm'
                        }`}
                    >
                        {/* Circular Image Thumbnail */}
                        <img 
                            src={mat.image} 
                            alt={mat.name}
                            className="w-12 h-12 rounded-full object-cover shadow-sm border border-gray-100 flex-shrink-0 transition-transform group-hover:scale-110"
                        />

                        <div className="min-w-0 flex-1">
                            <h4 className={`font-semibold text-sm truncate ${selectedMat.id === mat.id ? 'text-sml-teal-800' : 'text-gray-700'}`}>
                                {mat.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                                {mat.stats.recyclability === 'S' && (
                                    <span className="text-[10px] text-green-600 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded font-medium">
                                        Eco+
                                    </span>
                                )}
                                <span className="text-[10px] text-gray-400">
                                    耐用 {mat.stats.durability}%
                                </span>
                            </div>
                        </div>
                        {selectedMat.id === mat.id && (
                             <div className="absolute right-0 top-0 bottom-0 w-1 bg-sml-teal-500"></div>
                        )}
                    </button>
                ))}
            </div>

            {/* 3. Footer Actions (Bottom) */}
            <div className="p-4 md:p-6 border-t border-gray-100 bg-gray-50/50">
                <div className="relative">
                    <button 
                        onClick={() => setShowExportMenu(!showExportMenu)}
                        className="w-full py-3 bg-sml-slate-800 text-white rounded-xl hover:bg-sml-slate-900 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 font-medium active:scale-95 text-sm md:text-base"
                    >
                        {isExporting ? (
                            <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> 處理中...</span>
                        ) : (
                            <>
                                <FileBox size={18} />
                                匯出 3D 原型
                            </>
                        )}
                    </button>
                    
                    {/* Export Options Menu */}
                    {showExportMenu && (
                        <div className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-2 duration-200">
                             <div className="p-2 space-y-1">
                                 {['.GLTF (Web Ready)', '.OBJ (Universal)', '.FBX (Unity/UE)', '.STL (Printing)'].map((format) => (
                                     <button 
                                        key={format}
                                        onClick={() => handleExport(format.split(' ')[0])}
                                        className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-sml-teal-700 rounded-lg transition-colors flex items-center justify-between"
                                     >
                                         {format}
                                         <Download size={14} className="opacity-0 group-hover:opacity-100" />
                                     </button>
                                 ))}
                             </div>
                        </div>
                    )}
                </div>
                
                <div className="hidden md:flex items-center justify-center gap-2 mt-4 text-[10px] text-gray-400">
                    <Info size={12} />
                    <span>LCA 數據模型 v2.4 (2024 更新)</span>
                </div>
            </div>
        </div>

    </div>
  );
};

export default MaterialSimulation;