import React, { useState, useEffect } from 'react';
import { MessageSquarePlus, FolderClock, BookOpen, Database, LayoutDashboard, Bookmark, ShieldAlert, ChevronDown, ChevronRight, Box, ClipboardCheck } from 'lucide-react';
import { ViewMode } from '../types';
import Logo from './Logo';
import { useLanguage } from '../contexts/LanguageContext';

interface SidebarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const { t } = useLanguage();
  const [isMaterialDbOpen, setIsMaterialDbOpen] = useState(false);

  useEffect(() => {
    if (currentView === ViewMode.MATERIAL_DB || currentView === ViewMode.REACH_LIST) {
        setIsMaterialDbOpen(true);
    }
  }, [currentView]);

  const handleMaterialDbClick = () => {
      setIsMaterialDbOpen(!isMaterialDbOpen);
      if (!isMaterialDbOpen && currentView !== ViewMode.MATERIAL_DB && currentView !== ViewMode.REACH_LIST) {
          onViewChange(ViewMode.MATERIAL_DB);
      }
  };

  const isMaterialSectionActive = currentView === ViewMode.MATERIAL_DB || currentView === ViewMode.REACH_LIST;

  // Helper for Link Styles
  const getLinkClass = (isActive: boolean) => 
    `w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-2xl transition-all duration-200 ${
        isActive
        ? 'bg-sml-teal-500 text-white shadow-md transform scale-[1.02]' 
        : 'text-gray-500 hover:bg-white hover:text-sml-teal-600 hover:shadow-sm'
    }`;

  return (
    <div className="h-full flex flex-col bg-white rounded-3xl overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
      {/* Header */}
      <div 
        className="p-6 pb-0 flex flex-col items-center flex-shrink-0 cursor-pointer"
        onClick={() => onViewChange(ViewMode.DASHBOARD)}
      >
        <div className="w-[160px] h-[60px] flex-shrink-0 flex items-center justify-center">
            <Logo />
        </div>
      </div>
      
      {/* Navigation Area - Increased top margin to mt-6 for requested spacing */}
      <nav className="flex-1 px-4 pb-4 space-y-2 overflow-y-auto mt-6 scrollbar-hide">
        
        <button
            onClick={() => onViewChange(ViewMode.CHAT)}
            className={getLinkClass(currentView === ViewMode.CHAT)}
        >
            <MessageSquarePlus size={20} />
            {t('nav.newChat')}
        </button>

        <button
            onClick={() => onViewChange(ViewMode.SIMULATION)}
            className={getLinkClass(currentView === ViewMode.SIMULATION)}
        >
            <Box size={20} />
            {t('nav.simulation')}
        </button>

         <button
            onClick={() => onViewChange(ViewMode.CIRCULARITY_CHECK)}
            className={getLinkClass(currentView === ViewMode.CIRCULARITY_CHECK)}
        >
            <ClipboardCheck size={20} />
            {t('nav.circularityCheck')}
        </button>

        <button
            onClick={() => onViewChange(ViewMode.PROJECT_RECORDS)}
            className={getLinkClass(currentView === ViewMode.PROJECT_RECORDS)}
        >
            <FolderClock size={20} />
            {t('nav.projectRecords')}
        </button>

        {/* Material Database Accordion */}
        <div className="pt-2">
            <button
                onClick={handleMaterialDbClick}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-bold rounded-2xl transition-all duration-200 ${
                    isMaterialSectionActive 
                    ? 'bg-gray-50 text-sml-teal-600 shadow-sm' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-sml-teal-600'
                }`}
            >
                <div className="flex items-center gap-3">
                    <BookOpen size={20} />
                    {t('nav.materialDb')}
                </div>
                {isMaterialDbOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {isMaterialDbOpen && (
                <div className="mt-2 space-y-1 ml-4 pl-4 border-l-2 border-sml-teal-100">
                    <button
                        onClick={() => onViewChange(ViewMode.MATERIAL_DB)}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-xl font-bold transition-colors ${
                            currentView === ViewMode.MATERIAL_DB
                            ? 'text-sml-teal-600 bg-gray-50 shadow-sm'
                            : 'text-gray-400 hover:text-sml-teal-600'
                        }`}
                    >
                        <Bookmark size={16} className={currentView === ViewMode.MATERIAL_DB ? "fill-current" : ""} />
                        {t('nav.savedMaterials')}
                    </button>
                    <button
                        onClick={() => onViewChange(ViewMode.REACH_LIST)}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-xl font-bold transition-colors ${
                            currentView === ViewMode.REACH_LIST
                            ? 'text-sml-orange bg-gray-50 shadow-sm'
                            : 'text-gray-400 hover:text-sml-orange'
                        }`}
                    >
                        <ShieldAlert size={16} />
                        {t('nav.reachList')}
                    </button>
                </div>
            )}
        </div>

        <button
            onClick={() => onViewChange(ViewMode.ISO_DB)}
            className={getLinkClass(currentView === ViewMode.ISO_DB)}
        >
            <Database size={20} />
            {t('nav.isoDb')}
        </button>

      </nav>

      {/* Upgrade Card */}
      <div className="p-4">
        <div className="bg-sml-purple rounded-2xl p-5 text-white shadow-lg relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform">
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-white opacity-20 rounded-full"></div>
            <div className="absolute bottom-4 -left-4 w-12 h-12 bg-sml-orange opacity-80 rounded-full mix-blend-overlay"></div>
            
            <h4 className="font-bold text-base mb-1 relative z-10">{t('sidebar.upgradeTitle')}</h4>
            <p className="text-xs text-white/80 mb-4 font-medium relative z-10">{t('sidebar.upgradeDesc')}</p>
            <button className="w-full py-2 bg-white text-sml-purple text-xs font-black rounded-xl shadow-sm transition-colors relative z-10">
                {t('sidebar.viewPlans')}
            </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;