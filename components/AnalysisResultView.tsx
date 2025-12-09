import React, { useState } from 'react';
import { AnalysisResult } from '../types';

interface AnalysisResultViewProps {
  analysis: AnalysisResult;
  onGenerate: (topic: string) => void;
  isGenerating: boolean;
}

export const AnalysisResultView: React.FC<AnalysisResultViewProps> = ({ analysis, onGenerate, isGenerating }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [customTopic, setCustomTopic] = useState<string>('');

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    setCustomTopic('');
  };

  const handleCustomTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTopic(e.target.value);
    setSelectedTopic('');
  };

  const finalTopic = customTopic || selectedTopic;

  return (
    <div className="w-full animate-fade-in pb-12">
      
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">분석 완료</h2>
        <p className="text-slate-400">성공 요인을 추출했습니다.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Key Insights Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* Hook */}
            <div className="bg-[#131926] p-6 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🪝</span>
                <h3 className="font-bold text-slate-200">후킹 전략</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{analysis.hookStrategy}</p>
            </div>
             {/* Tone */}
            <div className="bg-[#131926] p-6 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                 <span className="text-xl">🎭</span>
                <h3 className="font-bold text-slate-200">톤앤매너</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{analysis.tone}</p>
            </div>
          </div>
          
          {/* Structure Timeline */}
          <div className="bg-[#131926] p-6 rounded-2xl border border-white/5">
            <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
              <span className="text-indigo-400">🏗️</span> 구조 설계도
            </h3>
            <div className="space-y-0">
              {analysis.structure.map((section, idx) => (
                <div key={idx} className="relative pl-6 pb-6 last:pb-0 border-l border-slate-800 last:border-0">
                  <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-slate-700 border-2 border-[#131926]"></div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-1">
                    <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">{section.estimatedDuration}</span>
                    <h4 className="font-bold text-slate-200 text-sm">{section.sectionName}</h4>
                  </div>
                  <p className="text-slate-500 text-xs">{section.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Viral Factors & Topic Select Column */}
        <div className="space-y-6">
           {/* Viral Factors */}
          <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 p-6 rounded-2xl border border-indigo-500/20">
            <h3 className="font-bold text-indigo-300 mb-4 text-sm uppercase tracking-wider">바이럴 핵심 요소</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.viralFactors.map((factor, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-[#0B0F19]/50 text-white rounded-lg text-xs font-medium border border-indigo-500/30">
                  {factor}
                </span>
              ))}
            </div>
          </div>

          {/* Topic Selection */}
          <div className="bg-[#131926] p-6 rounded-2xl border border-white/5 shadow-xl">
             <h3 className="font-bold text-white mb-4">다음 주제 선택</h3>
             
             <div className="space-y-2 mb-6">
              {analysis.suggestedTopics.map((topic, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTopicSelect(topic)}
                  className={`
                    w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200
                    ${selectedTopic === topic 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                      : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200'}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate">{topic}</span>
                    {selectedTopic === topic && <span>✓</span>}
                  </div>
                </button>
              ))}
             </div>

             <div className="relative mb-6">
               <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
               <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#131926] px-2 text-slate-600">or custom</span></div>
             </div>

             <input
                type="text"
                value={customTopic}
                onChange={handleCustomTopicChange}
                placeholder="직접 주제 입력..."
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-slate-200 placeholder-slate-600 text-sm mb-4 transition-all"
              />

             <button
              onClick={() => onGenerate(finalTopic)}
              disabled={isGenerating || !finalTopic}
              className={`
                w-full py-3.5 rounded-xl font-bold text-sm shadow-lg transition-all
                ${isGenerating || !finalTopic
                  ? 'bg-slate-800 text-slate-600 cursor-not-allowed' 
                  : 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-indigo-500/25'}
              `}
            >
              {isGenerating ? '대본 작성 중...' : '대본 생성하기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};