import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { quizQuestions, QuizAnswer } from '@/lib/quiz-data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface QuizWizardProps {
  onComplete: (answers: QuizAnswer) => void;
  onBack: () => void;
}

const QuizWizard = ({ onComplete, onBack }: QuizWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswer>>({});
  const [direction, setDirection] = useState(1);

  const currentQuestion = quizQuestions[currentStep];
  const isLastStep = currentStep === quizQuestions.length - 1;
  const currentAnswer = answers[currentQuestion.id as keyof QuizAnswer];

  const handleSelect = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (isLastStep) {
      onComplete(answers as QuizAnswer);
    } else {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep === 0) {
      onBack();
    } else {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    }
  };

  const progress = ((currentStep + 1) / quizQuestions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col px-6 py-8">
      {/* Progress bar */}
      <div className="w-full mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-muted-foreground">
            Question {currentStep + 1} of {quizQuestions.length}
          </span>
          <span className="text-sm font-bold text-primary">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden border-2 border-foreground shadow-brutal-sm">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -100 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-display text-foreground mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {currentQuestion.question}
            </motion.h2>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3 flex-1 content-start">
              {currentQuestion.options.map((option, index) => (
                <motion.div
                  key={option.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Button
                    variant={currentAnswer === option.value ? "default" : "quiz"}
                    size="lg"
                    className={`w-full h-auto py-4 flex flex-col gap-1 ${
                      currentAnswer === option.value 
                        ? 'ring-4 ring-primary ring-offset-2 ring-offset-background' 
                        : ''
                    }`}
                    onClick={() => {
                      handleSelect(option.value);
                      // Auto-advance to next question after a brief delay
                      setTimeout(() => {
                        if (currentStep === quizQuestions.length - 1) {
                          onComplete({ ...answers, [currentQuestion.id]: option.value } as QuizAnswer);
                        } else {
                          setDirection(1);
                          setCurrentStep(prev => prev + 1);
                        }
                      }, 300);
                    }}
                  >
                    <span className="text-2xl">{option.emoji}</span>
                    <span className="text-base">{option.label}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 mt-8">
        <Button
          variant="outline"
          size="lg"
          onClick={handlePrev}
          className="flex-1"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </Button>
        <Button
          size="lg"
          onClick={handleNext}
          disabled={!currentAnswer}
          className="flex-1"
        >
          {isLastStep ? 'Get My Drink!' : 'Next'}
          {!isLastStep && <ChevronRight className="w-5 h-5" />}
        </Button>
      </div>
    </div>
  );
};

export default QuizWizard;
