import { motion } from "motion/react";
import { ShieldCheck, Search, Zap, BarChart3, Lock, ArrowRight, Globe, CheckCircle2 } from "lucide-react";

interface LandingPageProps {
  onLaunch: () => void;
}

export default function LandingPage({ onLaunch }: LandingPageProps) {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: "Real-Time Analysis",
      description: "Get instant results as soon as you paste your content. No waiting, no delays."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-blue-500" />,
      title: "Confidence Scoring",
      description: "Every analysis comes with a detailed confidence score and reasoning."
    },
    {
      icon: <Globe className="w-6 h-6 text-emerald-500" />,
      title: "Global Context",
      description: "Our AI understands context from around the world to identify misinformation."
    },
    {
      icon: <Lock className="w-6 h-6 text-red-500" />,
      title: "Secure & Private",
      description: "Your data is processed securely and never stored. Your privacy is our priority."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-green-50/50 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full text-sm font-bold tracking-wide"
          >
            <ShieldCheck className="w-4 h-4" />
            Empowering Truth in the Digital Age
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]"
          >
            Detect Misinformation <br />
            <span className="text-green-600">With AI Precision</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            Veritas uses advanced NLP and machine learning to fact-check headlines and articles in seconds. Stop fake news in its tracks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={onLaunch}
              className="group px-8 py-4 bg-green-600 text-white rounded-2xl font-black text-lg shadow-2xl shadow-green-200 hover:bg-green-700 transition-all flex items-center gap-2"
            >
              Launch Detector
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#features"
              className="px-8 py-4 bg-white text-slate-600 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all"
            >
              Explore Features
            </a>
          </motion.div>
        </div>

        {/* Floating Preview Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="max-w-4xl mx-auto mt-20 bg-white rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 p-4 relative"
        >
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col items-center gap-6">
             <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 2, delay: 1 }}
                  className="h-full bg-green-600"
                />
             </div>
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="font-black text-slate-900">Analysis Complete</p>
                  <p className="text-sm text-slate-500">Confidence: 89% • Status: Legitimate</p>
                </div>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-slate-50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Powerful Features for Fact-Checkers
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Everything you need to verify information and fight misinformation effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
              >
                <div className="mb-6 p-3 bg-slate-50 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
              Built on Scientific <br />
              <span className="text-green-600">Methodology</span>
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600 font-bold">1</div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">NLP Preprocessing</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">We clean and normalize text, removing noise and focusing on the core message of the article.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600 font-bold">2</div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Feature Extraction</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Using TF-IDF principles, we identify key linguistic markers that distinguish real news from fake ones.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600 font-bold">3</div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Probabilistic Analysis</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Our model calculates the likelihood of authenticity, providing a clear, data-driven verdict.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="aspect-square bg-green-600 rounded-[40px] relative overflow-hidden flex items-center justify-center p-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent opacity-50" />
              <Search className="w-32 h-32 text-white/20 absolute -top-10 -right-10 rotate-12" />
              <div className="relative z-10 text-center space-y-6">
                 <div className="w-24 h-24 bg-white rounded-3xl mx-auto flex items-center justify-center shadow-2xl">
                    <ShieldCheck className="w-12 h-12 text-green-600" />
                 </div>
                 <p className="text-white font-black text-2xl tracking-tight">Verified by Veritas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-[40px] p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
          
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight relative z-10">
            Ready to start <br />
            fact-checking?
          </h2>
          <p className="text-slate-400 max-w-md mx-auto relative z-10">
            Join thousands of users who trust Veritas to help them navigate the complex digital information landscape.
          </p>
          <button
            onClick={onLaunch}
            className="relative z-10 px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-xl hover:bg-green-50 transition-all shadow-2xl shadow-black/20"
          >
            Launch Veritas AI
          </button>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-100 text-center text-slate-400 text-sm">
        <p>© 2026 Veritas AI • Built for Truth</p>
      </footer>
    </div>
  );
}
