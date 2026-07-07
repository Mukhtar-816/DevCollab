import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { Sparkles, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full min-h-[80vh] justify-center items-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center max-w-3xl gap-6"
      >
        <span className="inline-flex items-center gap-1.5 text-indigo-400 text-xs font-semibold tracking-wider uppercase border border-indigo-500/20 bg-indigo-500/5 rounded-full px-4 py-1.5 shadow-sm shadow-indigo-500/5">
          <Sparkles className="h-3.5 w-3.5" />
          The Developer Collaboration Network
        </span>

        <h1 className="text-zinc-100 text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight max-w-2xl">
          Find developers.<br />
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-500 bg-clip-text text-transparent">
            Build the future.
          </span>
        </h1>

        <p className="text-zinc-400 text-sm sm:text-base max-w-md leading-relaxed">
          Collaborate on production-grade projects, polish your portfolio, and connect with engineers who match your exact stack.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full sm:w-auto">
          <Button
            onClick={() => navigate('/auth')}
            rightIcon={<ArrowRight className="h-4 w-4" />}
            size="lg"
            className="w-full sm:w-auto font-semibold"
          >
            Get Started Free
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => navigate('/pricing')}
          >
            Compare Plans
          </Button>
        </div>

        {/* Small stats badges */}
        <div className="flex flex-wrap justify-center items-center gap-8 mt-12 border-t border-zinc-900 pt-8 w-full">
          {[
            { value: '10K+', label: 'Developers Active' },
            { value: '2.5K+', label: 'Projects Completed' },
            { value: '150K+', label: 'Commits Pushed' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-xl font-bold text-zinc-100">{stat.value}</p>
              <p className="text-[10px] text-zinc-500 font-semibold tracking-wider uppercase mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;