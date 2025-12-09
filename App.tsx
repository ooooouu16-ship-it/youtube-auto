import React, { useState, useEffect } from 'react';
import { StepInput } from './components/StepInput';
import { StepAnalysis } from './components/StepAnalysis';
import { StepResult } from './components/StepResult';
import { ApiKeyInput } from './components/ApiKeyInput';
import { analyzeTranscript, generateViralScript, setApiKey } from './services/geminiService';
import { AnalysisResult, GeneratedScript, AppStep } from './types';

function App() {
  const [step, setStep] = useState<AppStep>(AppStep.INPUT);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [result, setResult] = useState<GeneratedScript | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setHasApiKey(true);
    }
  }, []);

  const handleAnalyze = async (transcript: string) => {
    setIsLoading(true);
    setError(null);
    try {
      setStep(AppStep.ANALYZING);
      const data = await analyzeTranscript(transcript);
      setAnalysis(data);
      setStep(AppStep.REVIEW);
    } catch (err) {
      setError("대본 분석에 실패했습니다. 다시 시도해 주세요.");
      setStep(AppStep.INPUT);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = async (topic: string) => {
    if (!analysis) return;
    setIsLoading(true);
    setError(null);
    try {
      setStep(AppStep.GENERATING);
      const script = await generateViralScript(analysis, topic);
      setResult(script);
      setStep(AppStep.RESULT);
    } catch (err) {
      setError("대본 생성에 실패했습니다. 다시 시도해 주세요.");
      setStep(AppStep.REVIEW);
    } finally {
      setIsLoading(false);
    }
  };

  const resetApp = () => {
    setStep(AppStep.INPUT);
    setAnalysis(null);
    setResult(null);
    setError(null);
  };

  const handleApiKeySet = (apiKey: string) => {
    setApiKey(apiKey);
    setHasApiKey(true);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-brand-500/30 selection:text-brand-200">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-900/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[128px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16 flex flex-col items-center justify-center min-h-screen">
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-8 max-w-lg text-center animate-fade-in break-keep">
            {error}
          </div>
        )}

        {!hasApiKey ? (
          <ApiKeyInput onApiKeySet={handleApiKeySet} />
        ) : (
          <>
            {step === AppStep.INPUT && (
              <StepInput onAnalyze={handleAnalyze} isLoading={isLoading} />
            )}

        {step === AppStep.ANALYZING && (
          <div className="text-center animate-pulse">
            <h2 className="text-2xl font-bold text-white mb-2">성공 요인 분석 중...</h2>
            <p className="text-zinc-500">훅(Hook), 구조, 몰입 요소를 추출하고 있습니다.</p>
          </div>
        )}

        {(step === AppStep.REVIEW || step === AppStep.GENERATING) && analysis && (
          <StepAnalysis 
            analysis={analysis} 
            onGenerate={handleGenerate} 
            isGenerating={step === AppStep.GENERATING}
            onBack={resetApp}
          />
        )}

            {step === AppStep.RESULT && result && (
              <StepResult result={result} onReset={resetApp} />
            )}
          </>
        )}

      </div>
    </div>
  );
}

export default App;