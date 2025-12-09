import React, { useState } from 'react';
import { analyzeTranscript, generateViralScript } from './services/geminiService';
import { AnalysisResult, GeneratedScript, AppState } from './types';
import { StepIndicator } from './components/StepIndicator';
import { InputSection } from './components/InputSection';
import { AnalysisResultView } from './components/AnalysisResultView';
import { GeneratedScriptView } from './components/GeneratedScriptView';
import { ApiKeyManager } from './components/ApiKeyManager';

function App() {
  const [apiKey, setApiKey] = useState<string>('');
  const [appState, setAppState] = useState<AppState>(AppState.INPUT);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [script, setScript] = useState<GeneratedScript | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (transcript: string) => {
    if (!apiKey) {
      setError('API 키를 먼저 설정해주세요.');
      return;
    }

    setError(null);
    setAppState(AppState.ANALYZING);
    setAnalysis(null);
    setScript(null);

    try {
      const result = await analyzeTranscript(transcript, apiKey);
      setAnalysis(result);
      setAppState(AppState.TOPIC_SELECTION);
    } catch (err: any) {
      console.error(err);
      setError('대본 분석 중 오류가 발생했습니다. API 키를 확인하거나 잠시 후 다시 시도해주세요.');
      setAppState(AppState.INPUT);
    }
  };

  const handleGenerate = async (topic: string) => {
    if (!analysis || !topic || !apiKey) return;
    
    setError(null);
    setAppState(AppState.GENERATING);

    try {
      const result = await generateViralScript(analysis, topic, apiKey);
      setScript(result);
      setAppState(AppState.COMPLETE);
    } catch (err: any) {
      console.error(err);
      setError('대본 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      setAppState(AppState.TOPIC_SELECTION);
    }
  };

  const resetApp = () => {
    setAppState(AppState.INPUT);
    setAnalysis(null);
    setScript(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-50 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Minimal Header */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-sm border-b border-white/5 bg-[#0B0F19]/80">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={resetApp}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="font-bold text-white text-lg">V</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-100">ViralScripter</span>
          </div>
          <div className="text-xs font-medium text-slate-500 px-3 py-1 rounded-full bg-white/5 border border-white/5">
             AI Powered
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20 relative">
        
        {/* Error Toast */}
        {error && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-down">
            <div className="bg-red-500/10 border border-red-500/20 backdrop-blur-md text-red-200 px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">{error}</span>
            </div>
          </div>
        )}

        {!apiKey ? (
          <ApiKeyManager onApiKeySet={setApiKey} />
        ) : (
          <>
            <div className="mb-12">
              <StepIndicator currentStep={appState} />
            </div>

            <div className="transition-all duration-500 ease-in-out">
              {appState === AppState.INPUT || appState === AppState.ANALYZING ? (
                <InputSection 
                  onAnalyze={handleAnalyze} 
                  isAnalyzing={appState === AppState.ANALYZING} 
                />
              ) : null}

              {(appState === AppState.TOPIC_SELECTION || appState === AppState.GENERATING) && analysis ? (
                <AnalysisResultView 
                  analysis={analysis} 
                  onGenerate={handleGenerate} 
                  isGenerating={appState === AppState.GENERATING}
                />
              ) : null}

              {appState === AppState.COMPLETE && script ? (
                <GeneratedScriptView 
                  script={script} 
                  onReset={resetApp} 
                />
              ) : null}
            </div>
          </>
        )}
      </main>

    </div>
  );
}

export default App;