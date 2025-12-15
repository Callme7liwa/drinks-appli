import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface LandingScreenProps {
  onStart: () => void;
}

const LandingScreen = ({ onStart }: LandingScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/4 right-10 w-40 h-40 bg-highlight/20 rounded-full blur-2xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Floating emojis */}
      <motion.span
        className="absolute top-20 left-10 text-4xl"
        animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🍹
      </motion.span>
      <motion.span
        className="absolute top-32 right-16 text-3xl"
        animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
      >
        🧃
      </motion.span>
      <motion.span
        className="absolute bottom-32 left-16 text-3xl"
        animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 0.6 }}
      >
        🍸
      </motion.span>
      <motion.span
        className="absolute bottom-24 right-10 text-4xl"
        animate={{ y: [0, 12, 0], rotate: [0, -12, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, delay: 0.2 }}
      >
        ☕
      </motion.span>

      {/* Main content */}
      <motion.div
        className="text-center z-10 max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <span className="text-7xl">🥤</span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-6xl font-display text-foreground mb-4 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          What <span className="text-gradient">Beverage</span> Should I
          <br />
          <span className="text-gradient">Drink</span>?
        </motion.h1>

        <motion.p
          className="text-xl text-muted-foreground font-body mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Scan, Quiz, Sip.{' '}
          <span className="font-bold text-foreground">Let AI decide your destiny.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: "spring" }}
        >
          <Button
            onClick={onStart}
            size="xl"
            className="animate-pulse-scale w-full max-w-xs group"
          >
            <Sparkles className="w-6 h-6 group-hover:animate-spin" />
            Start Quiz
          </Button>
        </motion.div>

        <motion.p
          className="text-sm text-muted-foreground mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          ⚡ Takes less than 30 seconds
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LandingScreen;
