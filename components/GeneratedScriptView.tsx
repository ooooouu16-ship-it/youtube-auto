import React from 'react';
import { GeneratedScript } from '../types';

interface GeneratedScriptViewProps {
  script: GeneratedScript;
  onReset: () => void;
}

export const GeneratedScriptView: React.FC<GeneratedScriptViewProps> = ({ script, onReset }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(script.scriptContent);
    alert('복사되었습니다.');
  };

  return (
    <div className="w-full animate-fade-in pb-20">
      
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">대본 생성 완료</h2>
          <p className="text-slate-400 text-sm">성공 공식이 적용된 새로운 대본입니다.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onReset}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            새로 만들기
          </button>
          <button 
            onClick={handleCopy}
            className="px-5 py-2 rounded-lg text-sm font-bold bg-white text-slate-900 hover:bg-slate-200 transition-colors shadow-lg"
          >
            전체 복사
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Script Area */}
        <div className="lg:col-span-8 order-2 lg:order-1">
          <div className="bg-[#131926] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
            {/* Editor Header */}
            <div className="bg-[#0f141f] border-b border-white/5 px-6 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              </div>
              <div className="ml-4 text-xs font-mono text-slate-500">script_v1.md</div>
            </div>
            
            <div className="p-8 md:p-10">
              <article className="prose prose-invert prose-slate max-w-none prose-headings:text-indigo-200 prose-p:text-slate-300 prose-strong:text-white">
                <div className="whitespace-pre-wrap font-sans text-base leading-8">
                  {script.scriptContent}
                </div>
              </article>
            </div>
          </div>
        </div>

        {/* Sidebar: Titles & Thumbnails */}
        <div className="lg:col-span-4 order-1 lg:order-2 space-y-6">
          
          <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 p-6 rounded-2xl border border-white/5">
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-4">추천 제목</h3>
            <ul className="space-y-4">
              {script.titleCandidates.map((title, i) => (
                <li key={i} className="group cursor-pointer">
                  <div className="text-white font-bold leading-tight group-hover:text-indigo-300 transition-colors">
                    {title}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Option {i+1}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 p-6 rounded-2xl border border-white/5">
            <h3 className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-4">썸네일 아이디어</h3>
            <div className="space-y-4">
              {script.thumbnailIdeas.map((idea, i) => (
                <div key={i} className="text-sm text-slate-300 leading-relaxed bg-black/20 p-3 rounded-lg border border-white/5">
                  {idea}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};