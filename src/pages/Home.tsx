import React from 'react';
import { Link } from 'react-router-dom';
import { toolsByCategory } from '../data/tools';

export default function Home() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">PDF Solutions, Simplified.</h1>
        <p className="text-slate-500 mt-2 text-lg">
          All the tools you need to convert, compress, and edit PDFs in one place.
        </p>
      </div>

      <div className="space-y-12 flex-1 mb-8">
        {Object.entries(toolsByCategory).map(([category, tools]) => (
          <div key={category}>
            <h2 className="text-xl font-bold text-slate-800 mb-4">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tools.map((tool) => (
                <Link 
                  key={tool.id} 
                  to={`/tool/${tool.id}`}
                  className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-all cursor-pointer flex flex-col items-start"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${tool.color}`}>
                    <tool.icon size={24} strokeWidth={2} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{tool.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{tool.description}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-auto p-4 bg-indigo-600 rounded-2xl flex items-center justify-between text-white">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-2 rounded-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
          </div>
          <div>
            <p className="text-sm font-semibold">Backend Architecture</p>
            <p className="text-[10px] opacity-80 uppercase tracking-widest">FastAPI • LibreOffice • Ghostscript • PyMuPDF</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 bg-white/10 rounded-full text-[11px] border border-white/20">Worker ID: #AF-902</div>
          <div className="px-3 py-1 bg-green-400 text-green-900 rounded-full text-[11px] font-bold">System Healthy</div>
        </div>
      </div>
    </>
  );
}
