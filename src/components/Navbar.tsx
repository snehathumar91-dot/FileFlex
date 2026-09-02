import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="h-16 px-8 flex items-center justify-between bg-white border-b border-slate-200 shadow-sm z-10">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">FileFlex</span>
        </Link>
      </div>

      <div className="hidden sm:flex items-center gap-6">
        <Link to="/tool/merge-pdf" className="text-sm font-medium text-slate-600 hover:text-indigo-600">Merge</Link>
        <Link to="/tool/split-pdf" className="text-sm font-medium text-slate-600 hover:text-indigo-600">Split</Link>
        <Link to="/tool/compress-pdf" className="text-sm font-medium text-slate-600 hover:text-indigo-600">Compress</Link>
        <div className="h-4 w-px bg-slate-300 mx-2"></div>
        <button className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold border border-indigo-100">Self-Hosted Node</button>
      </div>

      <div className="-mr-2 flex items-center sm:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {isOpen && (
        <div className="sm:hidden absolute top-16 left-0 right-0 bg-white border-b border-slate-200 shadow-sm z-20">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/tool/merge-pdf" onClick={() => setIsOpen(false)} className="border-transparent text-slate-600 hover:bg-slate-50 hover:text-indigo-600 block pl-8 pr-4 py-2 text-base font-medium">Merge</Link>
            <Link to="/tool/split-pdf" onClick={() => setIsOpen(false)} className="border-transparent text-slate-600 hover:bg-slate-50 hover:text-indigo-600 block pl-8 pr-4 py-2 text-base font-medium">Split</Link>
            <Link to="/tool/compress-pdf" onClick={() => setIsOpen(false)} className="border-transparent text-slate-600 hover:bg-slate-50 hover:text-indigo-600 block pl-8 pr-4 py-2 text-base font-medium">Compress</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-slate-200">
            <div className="px-8">
              <button className="w-full text-left px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold border border-indigo-100">Self-Hosted Node</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
