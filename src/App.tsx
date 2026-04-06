/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { GoogleGenAI, Type } from "@google/genai";
import { motion, AnimatePresence } from "motion/react";
import LandingPage from "./components/LandingPage";
import { 
  ShieldCheck, 
  ShieldAlert, 
  Search, 
  Info, 
  Database, 
  Cpu, 
  AlertCircle, 
  Loader2, 
  RefreshCw, 
  CheckCircle2, 
  XCircle,
  Menu,
  X
} from "lucide-react";

// Initialize Gemini AI lazily to prevent startup crash if API key is missing
let aiInstance: GoogleGenAI | null = null;
const getAI = () => {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing. Please configure it in the Secrets panel.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

type NewsStatus = "Real" | "Fake" | null;

interface AnalysisResult {
  status: NewsStatus;
  confidence: number;
  reasoning: string;
}

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [newsContent, setNewsContent] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const checkAuthenticity = async () => {
    if (!newsContent.trim()) {
      setError("Please enter some text to check.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze the following news content or headline for authenticity. 
        Determine if it is "Real" (Legitimate) or "Fake" (Misinformation).
        Provide a confidence score between 0 and 100.
        
        News Content:
        "${newsContent}"`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              status: { type: Type.STRING, enum: ["Real", "Fake"] },
              confidence: { type: Type.NUMBER },
              reasoning: { type: Type.STRING }
            },
            required: ["status", "confidence", "reasoning"]
          }
        }
      });

      const data = JSON.parse(response.text || "{}") as AnalysisResult;
      setResult(data);
    } catch (err) {
      console.error("Analysis error:", err);
      setError("An error occurred during analysis. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setNewsContent("");
    setResult(null);
    setError(null);
  };

  return (
    <AnimatePresence mode="wait">
      {showLanding ? (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <LandingPage onLaunch={() => setShowLanding(false)} />
        </motion.div>
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-h-screen bg-slate-50 font-sans text-slate-900 flex overflow-hidden w-full"
        >
          {/* Sidebar */}
          <AnimatePresence mode="wait">
            {isSidebarOpen && (
              <motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                className="w-80 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 z-20 shadow-xl lg:shadow-none"
              >
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-green-600" />
                    <h2 className="font-bold text-lg tracking-tight">Veritas AI</h2>
                  </div>
                  <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="lg:hidden p-1 hover:bg-slate-100 rounded-md"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-green-600 font-bold text-sm uppercase tracking-wider">
                      <Info className="w-4 h-4" />
                      How it works
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Veritas uses advanced Natural Language Processing (NLP) and a simulated Logistic Regression model to verify news articles.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-green-600 font-bold text-sm uppercase tracking-wider">
                      <Database className="w-4 h-4" />
                      Methodology
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 p-1 bg-green-50 rounded text-green-600">
                          <Cpu className="w-3 h-3" />
                        </div>
                        <div className="text-xs">
                          <span className="font-bold block text-slate-800">TF-IDF Vectorization</span>
                          <span className="text-slate-500">Converts text into numerical features based on word importance.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 p-1 bg-green-50 rounded text-green-600">
                          <Cpu className="w-3 h-3" />
                        </div>
                        <div className="text-xs">
                          <span className="font-bold block text-slate-800">Logistic Regression</span>
                          <span className="text-slate-500">Calculates the probability of a news piece being real or fake.</span>
                        </div>
                      </li>
                    </ul>
                  </section>

                  <section className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 leading-relaxed uppercase font-bold tracking-widest mb-2">Disclaimer</p>
                    <p className="text-[10px] text-slate-400 leading-relaxed italic">
                      This tool is for educational purposes. Always cross-reference news with multiple trusted sources.
                    </p>
                  </section>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 py-4 px-6 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-4">
                {!isSidebarOpen && (
                  <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 hover:bg-slate-100 rounded-md transition-colors"
                  >
                    <Menu className="w-5 h-5 text-slate-600" />
                  </button>
                )}
                <div className="flex items-center gap-3">
                  <div className="bg-green-600 p-2 rounded-lg shadow-lg shadow-green-100">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-xl font-black tracking-tight text-slate-900">Veritas: Fake News Detector</h1>
                </div>
              </div>
              <button 
                onClick={reset}
                className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-all duration-200"
                title="Reset Analysis"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </header>

            <main className="flex-1 overflow-y-auto p-6 lg:p-12">
              <div className="max-w-3xl mx-auto space-y-8">
                {/* Input Section */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-800">Fact-Check Article</h3>
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">Paste Content Below</span>
                  </div>
                  
                  <div className="relative group">
                    <textarea
                      className="w-full h-64 p-6 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all duration-300 resize-none text-slate-700 placeholder:text-slate-300 leading-relaxed bg-white shadow-sm"
                      placeholder="Paste the news article or headline you want to verify..."
                      value={newsContent}
                      onChange={(e) => {
                        setNewsContent(e.target.value);
                        if (error) setError(null);
                      }}
                    />
                    <div className="absolute bottom-4 right-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                      {newsContent.length} Characters
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      <AnimatePresence mode="wait">
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center gap-1.5 text-red-600 text-sm font-medium"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {error}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <button
                      onClick={checkAuthenticity}
                      disabled={isLoading}
                      className={`
                        w-full sm:w-auto px-10 py-4 rounded-xl font-black text-white shadow-xl 
                        flex items-center justify-center gap-3 transition-all duration-300 active:scale-95
                        ${isLoading 
                          ? 'bg-slate-400 cursor-not-allowed' 
                          : 'bg-green-600 hover:bg-green-700 shadow-green-200'
                        }
                      `}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          Check Authenticity
                        </>
                      )}
                    </button>
                  </div>
                </section>

                {/* Result Section */}
                <AnimatePresence mode="wait">
                  {result && (
                    <motion.section
                      initial={{ opacity: 0, y: 40, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 40, scale: 0.95 }}
                      transition={{ 
                        type: "spring",
                        damping: 20,
                        stiffness: 100,
                        duration: 0.5 
                      }}
                      className="space-y-6"
                    >
                      {result.status === "Real" ? (
                        <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-8 flex flex-col items-center text-center space-y-4 shadow-xl shadow-green-100">
                          <div className="bg-green-600 p-4 rounded-full shadow-lg shadow-green-200">
                            <ShieldCheck className="w-10 h-10 text-white" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-2xl font-black text-green-700 uppercase tracking-tight">LEGITIMATE</h3>
                            <p className="text-green-600 font-medium max-w-md">
                              This news appears to be legitimate based on our analysis.
                            </p>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-600 text-white rounded-full text-xs font-bold shadow-md">
                              Confidence: {result.confidence}%
                            </div>
                          </div>
                          <div className="pt-4 border-t border-green-100 w-full text-left">
                            <p className="text-[10px] font-bold text-green-800 uppercase tracking-widest mb-2">Analysis Reasoning</p>
                            <p className="text-xs text-green-700 leading-relaxed italic">{result.reasoning}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-8 flex flex-col items-center text-center space-y-4 shadow-xl shadow-red-100">
                          <div className="bg-red-600 p-4 rounded-full shadow-lg shadow-red-200">
                            <ShieldAlert className="w-10 h-10 text-white" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-2xl font-black text-red-700 uppercase tracking-tight">MISINFORMATION</h3>
                            <p className="text-red-600 font-medium max-w-md">
                              Warning: This news shows signs of being misinformation.
                            </p>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white rounded-full text-xs font-bold shadow-md">
                              Confidence: {result.confidence}%
                            </div>
                          </div>
                          <div className="pt-4 border-t border-red-100 w-full text-left">
                            <p className="text-[10px] font-bold text-red-800 uppercase tracking-widest mb-2">Analysis Reasoning</p>
                            <p className="text-xs text-red-700 leading-relaxed italic">{result.reasoning}</p>
                          </div>
                        </div>
                      )}
                    </motion.section>
                  )}
                </AnimatePresence>
              </div>
            </main>

            <footer className="py-6 text-center text-slate-400 text-[10px] uppercase tracking-widest font-bold">
              Veritas AI • News Verification Engine v1.0
            </footer>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
