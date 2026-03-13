import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ChatPanel from './components/Chat/ChatPanel';
import MaterialDatabase from './components/MaterialDatabase';
import ReachDatabase from './components/ReachDatabase';
import MaterialSimulation from './components/Simulation/MaterialSimulation';
import ProjectRecords from './components/ProjectRecords';
import CircularityCheckup from './components/CircularityCheckup';
import ProjectChatView from './components/Chat/ProjectChatView';
import { ViewMode, ProjectHistory } from './types';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>(ViewMode.DASHBOARD);
  const [selectedProject, setSelectedProject] = useState<ProjectHistory | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleProjectSelect = (project: ProjectHistory) => {
    setSelectedProject(project);
    setCurrentView(ViewMode.PROJECT_CHAT);
    setIsMobileMenuOpen(false);
  };

  const handleViewChange = (view: ViewMode) => {
      setCurrentView(view);
      setIsMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewMode.DASHBOARD:
        return <Dashboard onNavigate={handleViewChange} />;
      case ViewMode.CHAT:
        return <ChatPanel />;
      case ViewMode.PROJECT_CHAT:
        if (selectedProject) {
            return (
                <ProjectChatView 
                    project={selectedProject} 
                    onBack={() => setCurrentView(ViewMode.PROJECT_RECORDS)} 
                />
            );
        }
        return <ProjectRecords onSelectProject={handleProjectSelect} />;
      case ViewMode.SIMULATION:
        return <MaterialSimulation />;
      case ViewMode.ISO_DB:
        return <div className="p-8 text-gray-500 text-center">ISO 資料庫模組 (即將推出)</div>;
      case ViewMode.MATERIAL_DB:
        return <MaterialDatabase />;
      case ViewMode.REACH_LIST:
        return <ReachDatabase />;
      case ViewMode.PROJECT_RECORDS:
        return <ProjectRecords onSelectProject={handleProjectSelect} />;
      case ViewMode.CIRCULARITY_CHECK:
        return <CircularityCheckup />;
      default:
        return <Dashboard onNavigate={handleViewChange} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-sml-cream-50 font-sans overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="w-72 flex-shrink-0 hidden md:block h-full z-20 p-4 pr-0">
            <Sidebar currentView={currentView} onViewChange={handleViewChange} />
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
                <div className="absolute inset-0 bg-sml-slate-900/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
                <div className="absolute left-0 top-0 bottom-0 w-72 bg-sml-cream-50 p-4 animate-in slide-in-from-left duration-300">
                    <Sidebar currentView={currentView} onViewChange={handleViewChange} />
                    <button 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md text-gray-500"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>
        )}

        {/* Right Area: Main Content */}
        <div className="flex-1 flex flex-col h-full min-w-0">
            {/* Navbar */}
            <Navbar onMenuClick={() => setIsMobileMenuOpen(true)} />
            
            {/* Content Area */}
            <main className="flex-1 overflow-hidden relative">
                {renderContent()}
            </main>
        </div>
    </div>
  );
};

export default App;