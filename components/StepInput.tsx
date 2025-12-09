import React, { useState } from 'react';
import { ArrowRight, Sparkles, Youtube } from 'lucide-react';

interface StepInputProps {
  onAnalyze: (transcript: string) => void;
  isLoading: boolean;
}

export const StepInput: React.FC<StepInputProps> = ({ onAnalyze, isLoading }) => {
  const [text, setText] = useState('');

  const handleAnalyze = () => {
    if (text.trim().length > 50) {
      onAnalyze(text);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-3 bg-brand-500/10 rounded-full mb-4">
          <Youtube className="w-8 h-8 text-brand-500" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Viral<span className="text-brand-500">Clone</span> AI
        </h1>
        <p className="text-zinc-400 text-lg break-keep">
          떡상한 유튜브 영상의 대본을 복사해서 붙여넣으세요.<br/>
          성공 DNA를 분석해 당신만의 새로운 대본으로 만들어 드립니다.
        </p>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-dark-800 border border-zinc-700 rounded-xl p-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="영상 스크립트(자막) 전체를 여기에 붙여넣으세요..."
            className="w-full h-64 bg-transparent text-zinc-100 placeholder-zinc-600 p-4 rounded-lg focus:outline-none resize-none font-mono text-sm leading-relaxed"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleAnalyze}
          disabled={text.trim().length < 50 || isLoading}
          className={`
            group flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all transform
            ${text.trim().length < 50 || isLoading 
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
              : 'bg-brand-600 hover:bg-brand-500 text-white hover:scale-105 shadow-lg shadow-brand-500/25'}
          `}
        >
          {isLoading ? (
            <>
              <Sparkles className="w-5 h-5 animate-spin" />
              DNA 추출 중...
            </>
          ) : (
            <>
              대본 분석하기
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
      
      <p className="text-center text-xs text-zinc-600 mt-4">
        팁: 유튜브 영상 설명란의 "스크립트 표시" 버튼을 눌러 전체 자막을 복사할 수 있습니다.
      </p>
    </div>
  );
};