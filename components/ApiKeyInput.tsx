import React, { useState, useEffect } from 'react';
import { Key, Check, X } from 'lucide-react';

interface ApiKeyInputProps {
  onApiKeySet: (apiKey: string) => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySet }) => {
  const [apiKey, setApiKey] = useState('');
  const [remember, setRemember] = useState(false);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setRemember(true);
    }
  }, []);

  const handleSubmit = () => {
    if (apiKey.trim()) {
      if (remember) {
        localStorage.setItem('gemini_api_key', apiKey);
      } else {
        localStorage.removeItem('gemini_api_key');
      }
      onApiKeySet(apiKey);
    }
  };

  const handleClear = () => {
    setApiKey('');
    setRemember(false);
    localStorage.removeItem('gemini_api_key');
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-3 bg-brand-500/10 rounded-full mb-4">
          <Key className="w-8 h-8 text-brand-500" />
        </div>
        <h2 className="text-3xl font-bold text-white">API 키 설정</h2>
        <p className="text-zinc-400 break-keep">
          Gemini API 키를 입력하여 시작하세요
        </p>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-brand-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-dark-800 border border-zinc-700 rounded-xl p-6 space-y-4">
          <div className="relative">
            <input
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIza..."
              className="w-full bg-dark-900 text-zinc-100 placeholder-zinc-600 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 border border-zinc-700"
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <button
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {showKey ? '숨기기' : '보기'}
            </button>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-zinc-300 hover:text-white transition-colors">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="w-4 h-4 accent-brand-500"
            />
            <span className="text-sm">API 키 기억하기 (브라우저에 저장)</span>
          </label>

          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              disabled={!apiKey.trim()}
              className={`
                flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all
                ${apiKey.trim() 
                  ? 'bg-brand-600 hover:bg-brand-500 text-white' 
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'}
              `}
            >
              <Check className="w-5 h-5" />
              확인
            </button>
            {apiKey && (
              <button
                onClick={handleClear}
                className="px-4 py-3 rounded-lg font-semibold bg-zinc-700 hover:bg-zinc-600 text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="text-center space-y-2">
        <p className="text-xs text-zinc-500">
          API 키는 브라우저에만 저장되며 외부로 전송되지 않습니다
        </p>
        <a
          href="https://aistudio.google.com/app/apikey"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm text-brand-400 hover:text-brand-300 underline"
        >
          API 키가 없으신가요? 발급받기 →
        </a>
      </div>
    </div>
  );
};
