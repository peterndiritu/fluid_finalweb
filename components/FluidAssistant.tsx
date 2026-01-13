import React, { useState } from 'react';
import { Search, Globe, Sparkles, ArrowRight, Loader2, ExternalLink, Bot } from 'lucide-react';
import { generateTextWithSearch, SearchResult } from '../services/geminiService';

const FluidAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);

  const executeSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const data = await generateTextWithSearch(searchQuery);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(query);
  };

  const handleSuggestionClick = (s: string) => {
    setQuery(s);
    executeSearch(s);
  };

  const suggestions = [
    "Fluid Token current price",
    "Fluid Chain network status",
    "How to use Fluid Wallet?",
    "Explain Parmaweb hosting",
    "Crypto market news today"
  ];

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-cyan-500/5 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">
            <Globe size={12} />
            Live Web Access Grounded by Gemini
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-slate-900 dark:text-white">
            Fluid <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Intelligence</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Real-time market insights and protocol help. Ask anything.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white dark:bg-slate-950 p-2 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 mb-8 transition-all focus-within:ring-2 focus-within:ring-blue-500/50">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="pl-4 text-slate-400">
              <Bot size={24} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What's happening in the crypto market?"
              className="flex-1 bg-transparent border-none focus:ring-0 text-base md:text-lg p-4 text-slate-900 dark:text-white placeholder-slate-500"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <ArrowRight size={24} />}
            </button>
          </form>
        </div>

        {/* Suggestions */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSuggestionClick(s)}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold hover:border-blue-500 hover:text-blue-500 dark:hover:text-cyan-400 transition-all active:scale-95 disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Result Area */}
        {(result || loading) && (
          <div className="bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 md:p-10 shadow-2xl animate-fade-in-up">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                <Loader2 className="w-12 h-12 animate-spin mb-6 text-blue-500" />
                <p className="font-bold text-lg animate-pulse">Scanning the web with Gemini...</p>
              </div>
            ) : result && (
              <>
                <div className="flex items-start gap-4 mb-8">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg shrink-0">
                    <Sparkles className="text-white" size={24} />
                  </div>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-slate-800 dark:text-slate-200 text-lg leading-relaxed whitespace-pre-line">
                      {result.text}
                    </p>
                  </div>
                </div>

                {/* Sources */}
                {result.sources.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Globe size={12} /> Verified Sources
                    </h4>
                    <div className="grid gap-3 md:grid-cols-2">
                      {result.sources.map((source, idx) => (
                        <a
                          key={idx}
                          href={source.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-blue-500/30 transition-all group"
                        >
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-300 truncate pr-4">
                            {source.title}
                          </span>
                          <ExternalLink size={14} className="text-slate-400 group-hover:text-blue-500 transition-colors shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FluidAssistant;