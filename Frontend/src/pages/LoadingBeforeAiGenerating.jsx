import { useState, useEffect } from 'react';
import { Brain, BookOpen, Sparkles, LoaderCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  const [loadingText, setLoadingText] = useState('Analyzing your academic profile');
  const [progress, setProgress] = useState(0);
  
  // Array of loading messages to cycle through
  const loadingMessages = [
    'Analyzing your academic profile',
    'Identifying knowledge gaps',
    'Generating personalized study tips',
    'Creating subject improvement plans',
    'Optimizing your weekly schedule',
    'Finalizing your study recommendations'
  ];
  
  // Update the loading message every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText(prevText => {
        const currentIndex = loadingMessages.indexOf(prevText);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
      
      // Update progress
      setProgress(prev => Math.min(prev + (100/loadingMessages.length/2), 95));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Animation variants for the floating icons
  const floatAnimation = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <motion.div 
            className="relative h-32 w-full flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Central brain icon */}
            <motion.div 
              className="absolute z-10 w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <Brain size={30} />
            </motion.div>
            
            {/* Floating icons around the brain */}
            <motion.div 
              className="absolute top-0 left-24 bg-indigo-500 rounded-full p-2 text-white"
              variants={floatAnimation}
              animate="animate"
              initial={{ y: 0 }}
              custom={1}
            >
              <BookOpen size={18} />
            </motion.div>
            
            <motion.div 
              className="absolute bottom-0 right-24 bg-purple-500 rounded-full p-2 text-white"
              variants={floatAnimation}
              animate="animate"
              initial={{ y: 0 }}
              custom={0.5}
            >
              <Sparkles size={18} />
            </motion.div>
            
            <motion.div 
              className="absolute top-8 right-16 bg-indigo-400 rounded-full p-2 text-white"
              variants={floatAnimation}
              animate="animate"
              initial={{ y: 0 }}
              custom={1.5}
            >
              <BookOpen size={18} />
            </motion.div>
          </motion.div>
        </div>
        
        <motion.h2 
          className="text-xl font-bold text-center text-gray-800 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Your AI Study Partner
        </motion.h2>
        
        <motion.div
          className="flex items-center mb-4 justify-center text-purple-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <LoaderCircle className="animate-spin mr-2" size={20} />
          <p className="font-medium">{loadingText}</p>
        </motion.div>
        
        {/* Progress bar */}
        <motion.div 
          className="h-2 w-full bg-gray-100 rounded-full mb-6 overflow-hidden"
          initial={{ opacity: 0, width: "0%" }}
          animate={{ opacity: 1, width: "100%" }}
          transition={{ delay: 0.7 }}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
            initial={{ width: "5%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>
        
        {/* Bullet points */}
        <motion.div 
          className="bg-purple-50 p-4 rounded-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h3 className="font-medium text-purple-700 mb-2">While you wait:</h3>
          <ul className="space-y-2">
            <li className="flex items-start text-sm">
              <span className="text-purple-700 mr-2">•</span>
              <span className="text-gray-700">Preparing personalized study strategies based on your academic performance</span>
            </li>
            <li className="flex items-start text-sm">
              <span className="text-purple-700 mr-2">•</span>
              <span className="text-gray-700">Creating a balanced weekly study plan optimized for your learning style</span>
            </li>
            <li className="flex items-start text-sm">
              <span className="text-purple-700 mr-2">•</span>
              <span className="text-gray-700">Identifying the most effective resources for each subject</span>
            </li>
          </ul>
        </motion.div>
        
        <motion.p 
          className="text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          We're creating a customized study plan just for you. This usually takes less than a minute.
        </motion.p>
      </div>
    </div>
  );
}