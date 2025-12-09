import React from 'react';
import { AppState } from '../types';

interface StepIndicatorProps {
  currentStep: AppState;
}

const steps = [
  { id: AppState.INPUT, label: '대본 입력' },
  { id: AppState.TOPIC_SELECTION, label: '분석 및 선택' },
  { id: AppState.COMPLETE, label: '완료' },
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-center gap-4">
      {steps.map((step, idx) => {
        const isActive = (step.id === AppState.INPUT && currentStep === AppState.INPUT) ||
                         (step.id === AppState.TOPIC_SELECTION && (currentStep === AppState.TOPIC_SELECTION || currentStep === AppState.GENERATING || currentStep === AppState.ANALYZING)) ||
                         (step.id === AppState.COMPLETE && currentStep === AppState.COMPLETE);
        
        const isCompleted = (currentStep === AppState.TOPIC_SELECTION || currentStep === AppState.GENERATING || currentStep === AppState.COMPLETE) && idx === 0 ||
                            (currentStep === AppState.COMPLETE) && idx === 1;

        return (
          <React.Fragment key={step.id}>
            <div className={`flex items-center gap-2 transition-opacity duration-300 ${isActive || isCompleted ? 'opacity-100' : 'opacity-30'}`}>
              <div className={`
                w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                ${isCompleted ? 'bg-indigo-500 text-white' : 
                  isActive ? 'bg-white text-slate-900 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 
                  'bg-slate-800 text-slate-500'}
              `}>
                {isCompleted ? '✓' : idx + 1}
              </div>
              <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-slate-500'}`}>
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`w-12 h-[1px] ${isCompleted ? 'bg-indigo-500/50' : 'bg-slate-800'}`}></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};