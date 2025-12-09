import React from 'react';
import { GeneratedScript } from '../types';
import { Copy, Image as ImageIcon, Video, ArrowLeft } from 'lucide-react';

interface StepResultProps {
  result: GeneratedScript;
  onReset: () => void;
}

export const StepResult: React.FC<StepResultProps> = ({ result, onReset }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(result.scriptContent);
    alert('대본이 클립보드에 복사되었습니다!');
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-20 animate-fade-in">
      <button 
        onClick={onReset}
        className="flex items-center gap-2 text-zinc-500 hover:text-white mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        다른 영상 분석하기
      </button>

      {/* Metadata Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 p-6 rounded-2xl">
          <div className="flex items-start gap-3 mb-2">
            <Video className="w-5 h-5 text-brand-500 mt-1" />
            <div>
              <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">제목 아이디어</span>
              <h2 className="text-xl font-bold text-white mt-1 leading-tight break-keep">{result.title}</h2>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex items-start gap-3">
             <ImageIcon className="w-5 h-5 text-yellow-500 mt-1" />
             <div>
               <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">썸네일 컨셉</span>
               <p className="text-sm text-zinc-300 mt-2 break-keep">{result.thumbnailIdea}</p>
             </div>
          </div>
        </div>
      </div>

      {/* Script Content */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="bg-zinc-900 border-b border-zinc-800 p-4 flex justify-between items-center">
          <span className="font-mono text-sm text-zinc-400">script.md</span>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <Copy className="w-4 h-4" />
            대본 복사
          </button>
        </div>
        <div className="p-8 overflow-auto max-h-[600px] whitespace-pre-wrap font-sans text-zinc-300 leading-relaxed text-lg">
           {result.scriptContent}
        </div>
      </div>
    </div>
  );
};