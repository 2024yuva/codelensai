import React from 'react';
import { CodeAnalysis, AnalysisLevel } from '../types';

interface AnalysisViewProps {
  analysis: CodeAnalysis;
  activeTab: AnalysisLevel;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({ analysis, activeTab }) => {
  return (
    <div className="p-6 space-y-6">
      {activeTab === AnalysisLevel.BEGINNER && (
        <div>
          <h3 className="text-lg font-semibold text-blue-400 mb-3">Beginner Explanation</h3>
          <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
            {analysis.beginnerExplanation}
          </p>
        </div>
      )}

      {activeTab === AnalysisLevel.INTERVIEW && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Problem</h3>
            <p className="text-slate-300">{analysis.interviewLevel.problem}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Approach</h3>
            <p className="text-slate-300 whitespace-pre-wrap">{analysis.interviewLevel.approach}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-400 mb-1">Time Complexity</h3>
              <p className="text-green-400 font-mono text-lg">{analysis.interviewLevel.timeComplexity}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-400 mb-1">Space Complexity</h3>
              <p className="text-blue-400 font-mono text-lg">{analysis.interviewLevel.spaceComplexity}</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Edge Cases</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              {analysis.interviewLevel.edgeCases.map((edge, i) => (
                <li key={i}>{edge}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Interview Questions</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              {analysis.interviewLevel.interviewQuestions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === AnalysisLevel.SENIOR && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Code Quality</h3>
            <p className="text-slate-300 whitespace-pre-wrap">{analysis.seniorLevel.quality}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Design Tradeoffs</h3>
            <p className="text-slate-300 whitespace-pre-wrap">{analysis.seniorLevel.designTradeoffs}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Scalability</h3>
            <p className="text-slate-300 whitespace-pre-wrap">{analysis.seniorLevel.scalability}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Maintenance</h3>
            <p className="text-slate-300 whitespace-pre-wrap">{analysis.seniorLevel.maintenance}</p>
          </div>
        </div>
      )}

      {activeTab === AnalysisLevel.VISUAL && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">Visual Execution Steps</h3>
          {analysis.visualSteps.map((step) => (
            <div key={step.step} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                  Step {step.step}
                </span>
                <span className="text-slate-300 font-medium">{step.description}</span>
              </div>
              <pre className="text-sm text-slate-400 font-mono bg-slate-900 p-3 rounded overflow-x-auto">
                {step.state}
              </pre>
            </div>
          ))}
          
          {analysis.optimizations && analysis.optimizations.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Optimization Suggestions</h3>
              <ul className="space-y-2">
                {analysis.optimizations.map((opt, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300">
                    <span className="text-green-400 mt-1">→</span>
                    <span>{opt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
