import React from 'react';
import AnalysisPanel from './AnalysisPanel';

const ChatPanel: React.FC = () => {
  return (
    <div className="flex h-full w-full">
        {/* Chat Area - Embedded Copilot Studio */}
        <div className="flex-1 flex flex-col min-w-0 bg-white relative h-full">
            <iframe 
                src="https://copilotstudio.microsoft.com/environments/Default-fa0bbb96-5e54-44d7-899e-8993669e3339/bots/crfd3_zSfyvooV-l1WepTCU_Sk3/webchat?__version__=2" 
                frameBorder="0" 
                style={{ width: '100%', height: '100%' }}
                title="SML Copilot"
            ></iframe>
        </div>

        {/* Info/Analysis Panel (1/3 width) - Only visible on large screens */}
        <div className="w-80 lg:w-96 border-l border-gray-200 hidden md:block bg-white flex-shrink-0">
            <AnalysisPanel />
        </div>
    </div>
  );
};

export default ChatPanel;