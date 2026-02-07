
import React, { useState } from 'react';
import { analyzeCode } from './geminiService';
import { CodeAnalysis, AnalysisLevel } from './types';
import { AnalysisView } from './components/AnalysisView';

const App: React.FC = () => {
  const [code, setCode] = useState('');
  const [analysis, setAnalysis] = useState<CodeAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<AnalysisLevel>(AnalysisLevel.BEGINNER);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeCode(code);
      setAnalysis(result);
      setActiveTab(AnalysisLevel.BEGINNER);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred during analysis.');
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setCode('');
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500/30">
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xl">L</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">CodeLens <span className="text-blue-500">AI</span></h1>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sm text-slate-400">
            <span>Analyze. Understand. Build.</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Editor */}
        <div className="flex flex-col gap-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
            <div className="relative bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Editor</span>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// Paste your code here (Python, JS, C++, etc.)"
                spellCheck={false}
                className="w-full h-[500px] bg-transparent p-4 font-mono text-sm resize-none focus:outline-none placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAnalyze}
              disabled={loading || !code.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Logic...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Explain Code
                </>
              )}
            </button>
            <button
              onClick={clear}
              className="px-6 py-3 rounded-xl border border-slate-800 hover:bg-slate-900 transition-colors text-slate-400 hover:text-slate-100"
            >
              Clear
            </button>
          </div>
          {error && (
            <div className="p-4 bg-rose-900/20 border border-rose-900/50 rounded-xl text-rose-400 text-sm">
              <p className="font-bold mb-1">Error</p>
              {error}
            </div>
          )}
        </div>

        {/* Right Side: Results */}
        <div className="flex flex-col gap-4">
          {!analysis && !loading ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-slate-900/30 rounded-2xl border border-dashed border-slate-800">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-400">Ready for insights?</h2>
              <p className="text-slate-500 max-w-sm mt-2">Paste your code on the left and click "Explain Code" to get multi-level architectural and logical breakdowns.</p>
            </div>
          ) : loading ? (
             <div className="h-full flex flex-col items-center justify-center p-12 bg-slate-900/30 rounded-2xl border border-slate-800">
               <div className="space-y-4 w-full max-w-md">
                 <div className="h-2 bg-slate-800 rounded-full w-3/4 animate-pulse"></div>
                 <div className="h-2 bg-slate-800 rounded-full w-full animate-pulse delay-75"></div>
                 <div className="h-2 bg-slate-800 rounded-full w-5/6 animate-pulse delay-150"></div>
                 <div className="h-32 bg-slate-800 rounded-xl w-full animate-pulse mt-8"></div>
                 <p className="text-center text-slate-500 text-sm mt-4 italic">Gemini is deep-diving into your logic...</p>
               </div>
             </div>
          ) : analysis && (
            <div className="flex flex-col h-full bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-800/80 border-b border-slate-700">
                <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-widest">
                  Detected: {analysis.language}
                </span>
                <div className="flex gap-2">
                   <div className="px-2 py-0.5 rounded bg-slate-700 text-[10px] text-slate-300 font-mono">
                    Time: {analysis.interviewLevel.timeComplexity}
                   </div>
                </div>
              </div>
              
              <div className="flex bg-slate-800 border-b border-slate-700 overflow-x-auto no-scrollbar">
                {Object.values(AnalysisLevel).map((level) => (
                  <button
                    key={level}
                    onClick={() => setActiveTab(level)}
                    className={`px-6 py-3 text-sm font-medium transition-all whitespace-nowrap border-b-2 ${
                      activeTab === level
                        ? 'text-blue-400 border-blue-500 bg-blue-500/10'
                        : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-700/50'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto max-h-[700px]">
                <AnalysisView analysis={analysis} activeTab={activeTab} />
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-4 py-12 border-t border-slate-900 text-center text-slate-600 text-sm">
        <p>© 2024 CodeLens AI. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;
