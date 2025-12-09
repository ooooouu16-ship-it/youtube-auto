import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { Activity, Zap, Brain, Target, Layers, ArrowRight, RefreshCw, Lightbulb } from 'lucide-react';

interface StepAnalysisProps {
  analysis: AnalysisResult;
  onGenerate: (topic: string) => void;
  isGenerating: boolean;
  onBack: () => void;
}

export const StepAnalysis: React.FC<StepAnalysisProps> = ({ analysis, onGenerate, isGenerating, onBack }) => {
  const [topic, setTopic] = useState('');

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Activity className="text-green-500" />
          분석 완료: 바이럴 DNA
        </h2>
        <button onClick={onBack} className="text-zinc-500 hover:text-white text-sm">
          처음으로
        </button>
      </div>

      {/* Analysis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-brand-500 mb-2">
            <Zap className="w-5 h-5" />
            <h3 className="font-semibold">훅(Hook) 전략</h3>
          </div>
          <p className="text-zinc-300 text-sm break-keep">{analysis.hookStrategy}</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-blue-500 mb-2">
            <Layers className="w-5 h-5" />
            <h3 className="font-semibold">스토리 구조</h3>
          </div>
          <p className="text-zinc-300 text-sm break-keep">{analysis.structure}</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-yellow-500 mb-2">
            <Brain className="w-5 h-5" />
            <h3 className="font-semibold">타겟 심리</h3>
          </div>
          <p className="text-zinc-300 text-sm break-keep">{analysis.audienceTrigger}</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl space-y-2 col-span-1 md:col-span-2 lg:col-span-3">
          <div className="flex items-center gap-2 text-purple-500 mb-2">
            <Target className="w-5 h-5" />
            <h3 className="font-semibold">시청 지속 장치</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.retentionTechniques.map((tech, idx) => (
              <span key={idx} className="bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full text-xs border border-purple-500/20">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* New Topic Selection */}
      <div className="mt-12 pt-8 border-t border-zinc-800">
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              이 공식을 어떤 주제에 적용할까요?
            </h3>
            <p className="text-zinc-400 text-sm">
              AI가 추천하는 주제를 선택하거나 직접 입력하세요.
            </p>
          </div>

          {/* Suggested Topics Chips */}
          {analysis.suggestedTopics && analysis.suggestedTopics.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-6">
               {analysis.suggestedTopics.map((suggested, idx) => (
                 <button
                   key={idx}
                   onClick={() => setTopic(suggested)}
                   className={`
                     flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition-all
                     ${topic === suggested 
                       ? 'bg-brand-600 border-brand-500 text-white shadow-lg shadow-brand-500/20' 
                       : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-brand-500 hover:text-white'}
                   `}
                 >
                   <Lightbulb className="w-3 h-3" />
                   {suggested}
                 </button>
               ))}
            </div>
          )}
          
          <div className="relative">
            <input 
              type="text" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="직접 주제 입력 (예: 비트코인의 역사, 자취 요리 꿀팁)"
              className="w-full bg-zinc-900 border border-zinc-700 text-white p-4 rounded-xl focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none text-lg placeholder-zinc-600 transition-all text-center"
            />
          </div>

          <button
            onClick={() => topic && onGenerate(topic)}
            disabled={!topic || isGenerating}
            className={`
              w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all
              ${!topic || isGenerating 
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                : 'bg-white text-black hover:bg-zinc-200'}
            `}
          >
             {isGenerating ? (
               <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                대본 복제 및 생성 중...
               </>
             ) : (
               <>
                새로운 대본 생성하기 <ArrowRight className="w-5 h-5" />
               </>
             )}
          </button>
        </div>
      </div>
    </div>
  );
};