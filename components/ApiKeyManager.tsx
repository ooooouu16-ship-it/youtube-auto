import React, { useState, useEffect } from 'react';

interface ApiKeyManagerProps {
  onApiKeySet: (apiKey: string) => void;
}

const STORAGE_KEY = 'gemini_api_key';
const REMEMBER_KEY = 'gemini_remember_key';

export const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ onApiKeySet }) => {
  const [apiKey, setApiKey] = useState('');
  const [rememberKey, setRememberKey] = useState(false);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    const savedRemember = localStorage.getItem(REMEMBER_KEY) === 'true';
    if (savedRemember) {
      const savedKey = localStorage.getItem(STORAGE_KEY);
      if (savedKey) {
        setApiKey(savedKey);
        setRememberKey(true);
        onApiKeySet(savedKey);
      }
    }
  }, [onApiKeySet]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      if (rememberKey) {
        localStorage.setItem(STORAGE_KEY, apiKey);
        localStorage.setItem(REMEMBER_KEY, 'true');
      } else {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(REMEMBER_KEY);
      }
      onApiKeySet(apiKey);
    }
  };

  const handleClearKey = () => {
    setApiKey('');
    setRememberKey(false);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(REMEMBER_KEY);
    onApiKeySet('');
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">API 키 설정</h2>
        <p className="text-slate-400 text-sm">
          Google AI Studio에서 발급받은 Gemini API 키를 입력하세요
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="relative bg-[#131926] rounded-xl border border-white/5 overflow-hidden">
            <div className="flex items-center px-4 py-3">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="flex-1 bg-transparent text-slate-200 placeholder-slate-600 focus:outline-none text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="ml-2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showKey ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={rememberKey}
            onChange={(e) => setRememberKey(e.target.checked)}
            className="w-4 h-4 rounded bg-slate-800 border-slate-600 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0 cursor-pointer"
          />
          <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
            API 키 기억하기 (브라우저에 저장)
          </span>
        </label>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 py-3 rounded-xl font-bold text-sm bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            시작하기
          </button>
          {apiKey && (
            <button
              type="button"
              onClick={handleClearKey}
              className="px-4 py-3 rounded-xl font-medium text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              초기화
            </button>
          )}
        </div>
      </form>

      <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
        <div className="flex gap-3">
          <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-xs text-blue-200 leading-relaxed">
            <p className="font-semibold mb-1">API 키 발급 방법</p>
            <p className="text-blue-300/80">
              1. <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-200">Google AI Studio</a>에 접속<br/>
              2. "Get API Key" 클릭하여 키 생성<br/>
              3. 발급받은 키를 위에 입력
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
