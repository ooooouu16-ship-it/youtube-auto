import React, { useState } from 'react';

interface InputSectionProps {
  onAnalyze: (transcript: string) => void;
  isAnalyzing: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, isAnalyzing }) => {
  const [transcript, setTranscript] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (transcript.trim()) {
      onAnalyze(transcript);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in-up">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
          어떤 영상을 <span className="text-indigo-400">분석</span>할까요?
        </h2>
        <p className="text-slate-400 text-lg">
          성공한 유튜브 영상의 대본을 붙여넣으세요.<br/>
          AI가 성공 요인을 찾아 새로운 콘텐츠로 재탄생시킵니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        <div className="relative bg-[#131926] rounded-2xl border border-white/5 shadow-2xl overflow-hidden">
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="영상 스크립트를 여기에 붙여넣으세요..."
            className="w-full h-64 px-8 py-8 bg-transparent text-slate-200 placeholder-slate-600 resize-none focus:outline-none text-base leading-relaxed scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
            required
            autoFocus
          />
          
          <div className="bg-[#0f141f] px-4 py-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium ml-2">
              {transcript.length > 0 ? `${transcript.length.toLocaleString()}자 입력됨` : 'YouTube 스크립트 권장'}
            </span>
            <button
              type="submit"
              disabled={isAnalyzing || !transcript}
              className={`
                px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2
                ${isAnalyzing || !transcript
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                  : 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transform hover:-translate-y-0.5'}
              `}
            >
              {isAnalyzing ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white/70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>분석 중...</span>
                </>
              ) : (
                <>
                  <span>분석 시작</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};