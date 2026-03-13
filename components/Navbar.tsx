import React, { useState } from 'react';
import { Bell, Settings, User, Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface NavbarProps {
    onMenuClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <header className="h-16 md:h-20 bg-transparent flex items-center justify-between px-4 md:px-8 flex-shrink-0">
        <div className="flex items-center gap-3 md:gap-4">
          {/* Mobile Menu Button */}
          <button 
              onClick={onMenuClick}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
              <Menu size={24} />
          </button>

          {/* Title */}
          <h1 className="text-lg font-black text-sml-teal-800 tracking-tight md:hidden">SML.AI</h1>
        </div>
        
        {/* Right side container with white background */}
        <div className="flex items-center gap-1 bg-white p-1.5 md:p-2 pr-2 md:pr-6 rounded-2xl shadow-sm border border-gray-100/50">
          <button className="w-8 h-8 md:w-10 md:h-10 text-sml-teal-500 hover:bg-sml-cream-50 rounded-full transition-all flex items-center justify-center relative">
            <Bell size={20} className="w-5 h-5 md:w-5 md:h-5" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-sml-orange rounded-full"></span>
          </button>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="w-8 h-8 md:w-10 md:h-10 text-sml-purple hover:bg-sml-cream-50 rounded-full transition-all flex items-center justify-center"
          >
            <Settings size={20} className="w-5 h-5 md:w-5 md:h-5" />
          </button>
          
          {/* Vertical Divider */}
          <div className="w-px h-6 bg-gray-200 mx-2 hidden md:block"></div>
          
          <div className="flex items-center gap-3 cursor-pointer group pl-1">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-sml-teal-500 rounded-full flex items-center justify-center text-white shadow-md border-2 border-white group-hover:scale-105 transition-transform">
                  <User size={20} className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className="hidden md:block">
                  <p className="font-bold text-gray-800 text-sm leading-none mb-0.5">{t('nav.user.name')}</p>
                  <p className="text-xs font-medium text-sml-teal-600">{t('nav.user.role')}</p>
              </div>
          </div>
        </div>
      </header>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Settings size={24} className="text-sml-purple" />
                {t('settings.title')}
              </h2>
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Language Setting */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <Globe size={18} className="text-gray-400" />
                  {t('settings.language')}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setLanguage('zh')}
                    className={`py-3 px-4 rounded-xl border-2 font-bold transition-all ${
                      language === 'zh' 
                        ? 'border-sml-teal-500 bg-sml-teal-50 text-sml-teal-700' 
                        : 'border-gray-100 hover:border-gray-200 text-gray-600'
                    }`}
                  >
                    {t('settings.zh')}
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`py-3 px-4 rounded-xl border-2 font-bold transition-all ${
                      language === 'en' 
                        ? 'border-sml-teal-500 bg-sml-teal-50 text-sml-teal-700' 
                        : 'border-gray-100 hover:border-gray-200 text-gray-600'
                    }`}
                  >
                    {t('settings.en')}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="px-6 py-2.5 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-900 transition-colors"
              >
                {t('settings.close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;