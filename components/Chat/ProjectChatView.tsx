import React, { useState, useEffect, useRef } from 'react';
import { User, Send, ChevronLeft, History } from 'lucide-react';
import AnalysisPanel from './AnalysisPanel';
import { ProjectHistory, ViewMode } from '../../types';

interface ProjectChatViewProps {
    project: ProjectHistory;
    onBack: () => void;
}

const ProjectChatView: React.FC<ProjectChatViewProps> = ({ project, onBack }) => {
    const [inputValue, setInputValue] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom on load
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [project]);

    return (
        <div className="flex h-full w-full bg-white">
            {/* Left/Main Chat Area */}
            <div className="flex-1 flex flex-col min-w-0 h-full relative">
                
                {/* Header for Context */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-white z-10">
                    <button 
                        onClick={onBack}
                        className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                        title="返回列表"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <h2 className="font-bold text-gray-800 flex items-center gap-2">
                            {project.title}
                            <span className="text-xs font-normal text-gray-400 px-2 py-0.5 bg-gray-100 rounded-full flex items-center gap-1">
                                <History size={10} /> 歷史存檔
                            </span>
                        </h2>
                        <p className="text-xs text-gray-500 truncate max-w-md">{project.description}</p>
                    </div>
                </div>

                {/* Messages Area */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
                    {/* Date Divider */}
                    <div className="flex justify-center">
                        <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                            {project.date}
                        </span>
                    </div>

                    {project.chatHistory.map((msg, idx) => (
                        <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                                msg.role === 'user' ? 'bg-gray-200 text-gray-600' : 'bg-gradient-to-br from-sml-teal-500 to-sml-teal-600 text-white'
                            }`}>
                                {msg.role === 'user' ? <User size={20} /> : <span className="font-bold text-xs">AI</span>}
                            </div>
                            <div className={`max-w-[75%] space-y-1 ${msg.role === 'user' ? 'items-end flex flex-col' : ''}`}>
                                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                                    msg.role === 'user' 
                                    ? 'bg-sml-slate-800 text-white rounded-tr-none' 
                                    : 'bg-white border border-gray-200 text-gray-700 rounded-tl-none'
                                }`}>
                                    {msg.text.split('\n').map((line, i) => (
                                        <React.Fragment key={i}>
                                            {line}
                                            {i !== msg.text.split('\n').length - 1 && <br />}
                                        </React.Fragment>
                                    ))}
                                    {msg.image && (
                                        <div className="mt-4 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                                            <img src={msg.image} alt="AI Generated" className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    <div className="h-4"></div>
                </div>

                {/* Input Area (Mocking continuation) */}
                <div className="p-4 bg-white border-t border-gray-200">
                    <div className="max-w-3xl mx-auto relative">
                        <input 
                            type="text" 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="繼續此對話..." 
                            className="w-full pl-5 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-sml-teal-100 focus:border-sml-teal-400 outline-none transition-all shadow-sm"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-sml-teal-600 text-white rounded-lg hover:bg-sml-teal-700 transition-colors shadow-sm">
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Panel - Reusing AnalysisPanel for consistency */}
            <div className="w-80 lg:w-96 border-l border-gray-200 hidden md:block bg-white flex-shrink-0">
                <AnalysisPanel />
            </div>
        </div>
    );
};

export default ProjectChatView;