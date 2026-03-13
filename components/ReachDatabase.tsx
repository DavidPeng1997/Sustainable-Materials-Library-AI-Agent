import React, { useState } from 'react';
import { Search, ShieldAlert, Filter, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ReachDatabase: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden relative">
      
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0 z-10">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                <ShieldAlert size={20} />
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-800">{t('reach.title')}</h2>
                <p className="text-xs text-gray-500">{t('reach.subtitle')}</p>
            </div>
        </div>
        
        <div className="flex gap-3 w-full max-w-lg justify-end">
            <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder={t('reach.searchPlaceholder')} 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-lg focus:bg-white focus:border-sml-teal-300 focus:ring-4 focus:ring-sml-teal-50 transition-all text-sm outline-none"
                />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm">
                <Filter size={16} />
                {t('reach.filter')}
            </button>
        </div>
      </div>

      {/* Main Content (Iframe) */}
      <div className="flex-1 bg-white relative">
          <div className="absolute inset-0 p-4 pb-0">
             <div className="w-full h-full rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white">
                 <iframe 
                    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ1VajyozvW2Cgvc6D4DKvI8ZXRt0AREWviPZI7qOH_fK0X4kjbx7zmX7ljGpg9lQ/pubhtml?widget=true&headers=false"
                    className="w-full h-full"
                    frameBorder="0"
                    title="REACH Restricted Substances List"
                 ></iframe>
             </div>
          </div>
      </div>

      {/* Footer Info */}
      <div className="px-6 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
          <span>{t('reach.dataSource')}</span>
          <a href="https://echa.europa.eu/substances-restricted-under-reach" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-sml-teal-600 transition-colors">
              {t('reach.viewFull')} <ExternalLink size={12} />
          </a>
      </div>
    </div>
  );
};

export default ReachDatabase;