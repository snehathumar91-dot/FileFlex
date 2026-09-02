import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ToolPage from './pages/ToolPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
        <Navbar />
        <main className="flex-1 p-8 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tool/:toolId" element={<ToolPage />} />
          </Routes>
        </main>
        <footer className="py-6 border-t border-slate-200 bg-white text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} FileFlex. Self-hosted PDF Editor.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}
