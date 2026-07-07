import React from 'react';
import Sidebar from './Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-screen bg-zinc-950 text-zinc-100 overflow-hidden font-sans select-none selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* App Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Background glow shapes */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none -z-10" />
        
        {/* Scrollable container */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 no-scrollbar">
          <div className="max-w-6xl mx-auto w-full space-y-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
