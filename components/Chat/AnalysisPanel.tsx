import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';
import { Download, Share2, Sparkles, Wand2, Loader2, Image as ImageIcon } from 'lucide-react';
import { generateMaterialImage } from '../../services/geminiService';
import { useLanguage } from '../../contexts/LanguageContext';

const AnalysisPanel: React.FC = () => {
  const { t } = useLanguage();
  const [imagePrompt, setImagePrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  // Empty Initial Data
  const EMPTY_RADAR = [
    { subject: t('analysis.radar.tensile'), A: 0, fullMark: 150 },
    { subject: t('analysis.radar.impact'), A: 0, fullMark: 150 },
    { subject: t('analysis.radar.heat'), A: 0, fullMark: 150 },
    { subject: t('analysis.radar.chemical'), A: 0, fullMark: 150 },
    { subject: t('analysis.radar.uv'), A: 0, fullMark: 150 },
    { subject: t('analysis.radar.flexural'), A: 0, fullMark: 150 },
  ];

  const EMPTY_LIFECYCLE = [
    { name: t('analysis.lifecycle.production'), val: 0 },
    { name: t('analysis.lifecycle.transport'), val: 0 },
    { name: t('analysis.lifecycle.use'), val: 0 },
    { name: t('analysis.lifecycle.endOfLife'), val: 0 },
  ];

  const INITIAL_RADAR_TEMPLATE = [
    { subject: t('analysis.radar.tensile'), fullMark: 150 },
    { subject: t('analysis.radar.impact'), fullMark: 150 },
    { subject: t('analysis.radar.heat'), fullMark: 150 },
    { subject: t('analysis.radar.chemical'), fullMark: 150 },
    { subject: t('analysis.radar.uv'), fullMark: 150 },
    { subject: t('analysis.radar.flexural'), fullMark: 150 },
  ];

  // Dynamic Analysis State - Initialized to Zeros
  const [analysisData, setAnalysisData] = useState({
      radar: EMPTY_RADAR,
      lifecycle: EMPTY_LIFECYCLE,
      recyclingRate: 0,
      cost: 0 
  });

  // Helper to generate random number in range
  const getRandom = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  const handleGenerate = async () => {
    if (!imagePrompt.trim()) return;

    setIsGenerating(true);
    
    // Simulate updating analysis data based on the prompt (Mock AI Analysis)
    const newRadar = INITIAL_RADAR_TEMPLATE.map(item => ({
        ...item,
        A: getRandom(50, 145) // Randomize strength/durability stats
    }));

    const newLifecycle = [
        { name: t('analysis.lifecycle.production'), val: getRandom(20, 60) },
        { name: t('analysis.lifecycle.transport'), val: getRandom(5, 25) },
        { name: t('analysis.lifecycle.use'), val: getRandom(5, 30) },
        { name: t('analysis.lifecycle.endOfLife'), val: getRandom(10, 50) },
    ];

    try {
      // 1. Generate Image
      const result = await generateMaterialImage(imagePrompt);
      if (result) {
        setGeneratedImage(result);
      } else {
        console.warn("No image returned");
      }

      // 2. Update Charts & Stats (Synced with generation)
      setAnalysisData({
          radar: newRadar,
          lifecycle: newLifecycle,
          recyclingRate: getRandom(60, 99),
          cost: getRandom(120, 1200) // Random price between NT$120 - NT$1200
      });
      setHasGenerated(true);

    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `SML_Generated_Texture_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-white border-l border-gray-100 flex flex-col">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Sparkles size={18} className="text-sml-orange fill-sml-orange"/> 
            {t('analysis.title')}
        </h3>
        <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-sml-teal-600 rounded-lg hover:bg-sml-teal-50 transition-colors">
                <Share2 size={18} />
            </button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Generated Visual Section */}
        <div>
            <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-3">{t('analysis.visualGen')}</h4>
            
            {/* Image Display */}
            <div className="aspect-square w-full rounded-3xl overflow-hidden bg-sml-cream-100 relative group flex items-center justify-center border-4 border-white shadow-sm">
                {generatedImage ? (
                    <>
                        <img 
                            src={generatedImage} 
                            alt="Generated Material Texture" 
                            className={`w-full h-full object-cover transition-opacity duration-300 ${isGenerating ? 'opacity-50 blur-sm' : 'opacity-100'}`}
                        />
                        {/* Download Overlay */}
                        {!isGenerating && (
                            <div className="absolute inset-0 bg-sml-teal-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                <button 
                                    onClick={handleDownloadImage}
                                    className="bg-white text-gray-800 px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:scale-105 transition-all shadow-xl"
                                >
                                    <Download size={16} /> {t('analysis.downloadImage')}
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    !isGenerating && (
                        <div className="flex flex-col items-center justify-center text-gray-300 gap-3">
                            <ImageIcon size={40} className="opacity-50" />
                            <span className="text-sm font-bold">{t('analysis.inputPrompt')}</span>
                        </div>
                    )
                )}
                
                {isGenerating && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-sml-teal-600 bg-white/80 backdrop-blur-sm z-10">
                        <Loader2 size={32} className="animate-spin mb-3" />
                        <span className="text-xs font-bold px-3 py-1 bg-sml-teal-50 rounded-full text-sml-teal-700">{t('analysis.generating')}</span>
                    </div>
                )}
            </div>

            {/* Input Controls */}
            <div className="mt-4 space-y-2">
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={t('analysis.placeholder')}
                        disabled={isGenerating}
                        className="flex-1 bg-sml-cream-50 border-none rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sml-teal-200 focus:bg-white transition-all placeholder-gray-400"
                    />
                    <button 
                        onClick={handleGenerate}
                        disabled={isGenerating || !imagePrompt.trim()}
                        className="bg-sml-orange hover:bg-red-500 text-white p-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 shadow-sm"
                        title={t('analysis.generateBtn')}
                    >
                        {isGenerating ? <Loader2 size={20} className="animate-spin"/> : <Wand2 size={20} />}
                    </button>
                </div>
            </div>
        </div>

        <div className="w-full h-px bg-gray-100"></div>

        {/* Durability Analysis */}
        <div>
            <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">{t('analysis.durability')}</h4>
                {!hasGenerated && <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-bold">{t('analysis.pending')}</span>}
            </div>
            <div className="h-48 w-full relative">
                {!hasGenerated && <div className="absolute inset-0 flex items-center justify-center z-10 text-gray-300 text-xs font-bold">{t('analysis.waitingData')}</div>}
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={analysisData.radar}>
                        <PolarGrid stroke={hasGenerated ? "#cbd5e1" : "#f1f5f9"} />
                        <PolarAngleAxis dataKey="subject" tick={{fontSize: 10, fill: hasGenerated ? '#64748b' : '#cbd5e1', fontWeight: 600}} />
                        <Radar
                            name="Stats"
                            dataKey="A"
                            stroke={hasGenerated ? "#1c9ba4" : "transparent"}
                            strokeWidth={3}
                            fill="#1c9ba4"
                            fillOpacity={0.3}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Carbon Footprint */}
        <div>
            <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">{t('analysis.carbonFootprint')}</h4>
                {!hasGenerated && <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-bold">{t('analysis.pending')}</span>}
            </div>
            <div className="h-32 w-full relative">
                {!hasGenerated && <div className="absolute inset-0 flex items-center justify-center z-10 text-gray-300 text-xs font-bold">{t('analysis.waitingData')}</div>}
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analysisData.lifecycle} layout="vertical">
                        <XAxis type="number" hide domain={[0, hasGenerated ? 'auto' : 100]} />
                        {hasGenerated && (
                            <Tooltip 
                                contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} 
                                cursor={{fill: '#f8fafc'}}
                            />
                        )}
                        <Bar 
                            dataKey="val" 
                            fill={hasGenerated ? "#9c89b8" : "#f1f5f9"} 
                            radius={[0, 6, 6, 0]} 
                            barSize={16} 
                            background={{ fill: '#f8fafc', radius: 6 }} 
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className={`flex justify-between text-xs mt-2 px-1 font-bold ${hasGenerated ? 'text-gray-500' : 'text-gray-300'}`}>
                <span>{t('analysis.lifecycle.production')}</span>
                <span>{t('analysis.lifecycle.endOfLife')}</span>
            </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-green-50 rounded-2xl border-none">
                <p className="text-xs font-bold text-green-600/70 mb-1">{t('analysis.stats.recyclingRate')}</p>
                <p className={`text-xl font-black ${hasGenerated ? 'text-green-600' : 'text-gray-300'}`}>
                    {hasGenerated ? `${analysisData.recyclingRate}%` : '-'}
                </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-2xl border-none">
                <p className="text-xs font-bold text-blue-600/70 mb-1">{t('analysis.stats.costIndex')}</p>
                <p className={`text-lg font-black ${hasGenerated ? 'text-blue-600' : 'text-gray-300'}`}>
                    {hasGenerated ? `NT$ ${analysisData.cost}` : '-'}
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPanel;