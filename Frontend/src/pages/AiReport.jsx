import { useState, useEffect, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, BookOpen, Calendar, Lightbulb, ChevronRight, Sparkles, Clock } from 'lucide-react';
import LoadingScreen from './LoadingBeforeAiGenerating';
import { useStudent } from '../context/userContext';

// Import the LoadingScreen component
// import LoadingScreen from './LoadingScreen';

export default function AiReport({Ailoading, generalSuggestion, subjectSpecificSuggestion}) {
    console.log("AiReport",Ailoading,generalSuggestion,subjectSpecificSuggestion)
  const [loading, setLoading] = useState(true);
//   const [generalSuggestion, setGeneralSuggestion] = useState([]);
//   const [subjectSpecificSuggestion, setSubjectSpecificSuggestion] = useState([]);
//   const [student, setStudent] = useState(null);
  const { student } = useStudent();


  useEffect(() => {
    // Simulate data loading
    if(!Ailoading) {
        setTimeout(() => {
        setLoading(false);
        }, 2000);
    }
  },[Ailoading])

  // Simulate data loading
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setStudent({
//         name: "Alex Johnson",
//         course: { courseName: "Computer Science" },
//         semester: "3rd"
//       });
      
//       setGeneralSuggestion([
//         "Create a dedicated study environment free from distractions",
//         "Use active recall techniques instead of passive reading",
//         "Study in 25-minute focused sessions with 5-minute breaks",
//         "Review material within 24 hours of learning it to improve retention",
//         "Form study groups for complex subjects to gain different perspectives"
//       ]);
      
//       setSubjectSpecificSuggestion([
//         {
//           subject: "Data Structures",
//           percentage: 65,
//           suggestions: [
//             "Practice implementing data structures from scratch",
//             "Solve algorithm problems on platforms like LeetCode",
//             "Create visual representations of complex data structures",
//             "Work through textbook exercises with increasing difficulty"
//           ]
//         },
//         {
//           subject: "Calculus II",
//           percentage: 72,
//           suggestions: [
//             "Focus on understanding the underlying concepts rather than memorizing formulas",
//             "Practice integration techniques daily with varied problems",
//             "Use visualization tools to understand 3D concepts",
//             "Form a study group specifically for working through complex problems"
//           ]
//         }
//       ]);
      
//       setLoading(false);
//     }, 8000); // Simulate 8 seconds of loading time
    
//     return () => clearTimeout(timer);
//   }, []);

  // Show loading screen if data is not ready
  if (loading || generalSuggestion.length === 0 || subjectSpecificSuggestion.length === 0) {
    return <LoadingScreen/>;
  }

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  // Item animation variants
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
      <motion.div 
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-purple-600 text-white p-6">
          <div className="flex items-center">
            <div className="mr-4">
              <Brain size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AI Study Planner</h1>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Student Info
            <motion.div variants={itemVariants} className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                <span className="text-purple-700 font-bold text-xl">{student?.name.charAt(0)}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{student?.name}</h2>
                <p className="text-gray-600">{student?.course?.courseName} | {student?.semester} Semester</p>
              </div>
            </motion.div>
             */}
            {/* General Study Tips */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center mb-4">
                <BookOpen className="text-purple-600 mr-2" size={20} />
                <h3 className="text-lg font-semibold text-gray-700">General Study Tips</h3>
              </div>
              
              <motion.div 
                className="bg-white border border-purple-100 rounded-lg p-4 shadow-sm"
                whileHover={{ boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
              >
                <ul className="space-y-2">
                  {generalSuggestion.map((tip, index) => (
                    <motion.li 
                      key={`tip-${index}`} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ChevronRight className="text-purple-600 mr-2 flex-shrink-0 mt-1" size={16} />
                      <span className="text-gray-700">{tip}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
            
            {/* Subject-specific suggestions */}
            {subjectSpecificSuggestion.length > 0 && (
              <motion.div variants={itemVariants} className="mb-8">
                <div className="flex items-center mb-4">
                  <Lightbulb className="text-purple-600 mr-2" size={20} />
                  <h3 className="text-lg font-semibold text-gray-700">Subject-Specific Improvement Plans</h3>
                </div>
                
                {subjectSpecificSuggestion.map((subjectSuggestion, index) => (
                  <motion.div 
                    key={`subject-suggestion-${index}`} 
                    className="bg-white border border-purple-100 rounded-lg p-4 shadow-sm mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.2 }}
                    whileHover={{ boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold text-purple-700 flex items-center">
                        <Sparkles className="mr-2" size={16} />
                        {subjectSuggestion.subject}
                      </h4>
                      
                      <div className="flex items-center">
                        <span className="text-sm text-purple-700 mr-2">Current: {subjectSuggestion.percentage}%</span>
                        <div className="w-24 bg-gray-200 rounded-full h-2.5">
                          <motion.div 
                            className="bg-purple-600 h-2.5 rounded-full" 
                            initial={{ width: "0%" }}
                            animate={{ width: `${subjectSuggestion.percentage}%` }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                          ></motion.div>
                        </div>
                      </div>
                    </div>
                    
                    <h5 className="font-medium text-gray-700 mt-4 mb-2">Customized Improvement Strategies:</h5>
                    
                    <ul className="space-y-2 mb-4">
                      {subjectSuggestion.suggestions.map((tip, tipIndex) => (
                        <motion.li 
                          key={`subject-tip-${index}-${tipIndex}`} 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + tipIndex * 0.1 }}
                        >
                          <ChevronRight className="text-purple-600 mr-2 flex-shrink-0 mt-1" size={16} />
                          <span className="text-gray-700">{tip}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    <motion.div 
                      className="bg-blue-50 p-3 rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 + index * 0.2 }}
                    >
                      <h5 className="font-medium text-blue-800 mb-1 flex items-center">
                        <Lightbulb className="mr-2" size={16} />
                        AI-Generated Tip:
                      </h5>
                      <p className="text-blue-800 text-sm">
                        Consider creating concept maps to visualize the relationships between key topics in {subjectSuggestion.subject}. 
                        This can help identify knowledge gaps and strengthen your understanding of complex relationships.
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            )}
            
            {/* Weekly Study Planner */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center mb-4">
                <Calendar className="text-purple-600 mr-2" size={20} />
                <h3 className="text-lg font-semibold text-gray-700">Weekly Study Planner</h3>
              </div>
              
              <motion.div 
                className="bg-white border border-purple-100 rounded-lg p-4 shadow-sm"
                whileHover={{ boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
              >
                <p className="text-gray-700 mb-4">
                  Here's a recommended weekly study plan that prioritizes subjects that need improvement while maintaining performance in stronger areas:
                </p>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-purple-50">
                        <th className="py-2 px-4 border-b border-purple-100 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Day</th>
                        <th className="py-2 px-4 border-b border-purple-100 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Morning</th>
                        <th className="py-2 px-4 border-b border-purple-100 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Afternoon</th>
                        <th className="py-2 px-4 border-b border-purple-100 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Evening</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-100">
                      {['Monday', 'Wednesday', 'Friday', 'Sunday'].map((day, index) => {
                        const weakSubjects = subjectSpecificSuggestion.map(s => s.subject);
                        
                        return (
                          <motion.tr 
                            key={`day-${index}`} 
                            className="hover:bg-gray-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                          >
                            <td className="py-3 px-4 text-sm text-gray-800 font-medium">{day}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">
                              {day === 'Monday' ? (weakSubjects[0] || 'Review Notes') : 
                               day === 'Sunday' ? 'Rest/Light Review' : 'Practice Problems'}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">
                              {day === 'Friday' ? (weakSubjects[1] || weakSubjects[0] || 'Problem-solving') : 
                               day === 'Sunday' ? 'Practice Tests' : 'Group Study'}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">
                              {day === 'Wednesday' ? 'All Subjects Review' : 
                               day === 'Monday' ? weakSubjects[0] : 
                               day === 'Sunday' ? 'Rest' : 'Reading Ahead'}
                            </td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                
                <motion.div 
                  className="bg-green-50 p-3 rounded-lg mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <h5 className="font-medium text-green-800 mb-1 flex items-center">
                    <Clock className="mr-2" size={16} />
                    Remember:
                  </h5>
                  <ul className="space-y-1">
                    <li className="flex items-start text-sm">
                      <span className="text-green-700 mr-2">•</span>
                      <span className="text-green-800">Study in 25-minute focused sessions with 5-minute breaks (Pomodoro technique)</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <span className="text-green-700 mr-2">•</span>
                      <span className="text-green-800">Allocate more time to your weaker subjects</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <span className="text-green-700 mr-2">•</span>
                      <span className="text-green-800">Get 7-8 hours of sleep for optimal cognitive function</span>
                    </li>
                  </ul>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Additional Resources */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center mb-4">
                <BookOpen className="text-purple-600 mr-2" size={20} />
                <h3 className="text-lg font-semibold text-gray-700">Additional Resources</h3>
              </div>
              
              <motion.div 
                className="bg-white border border-purple-100 rounded-lg p-4 shadow-sm"
                whileHover={{ boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
              >
                <p className="text-gray-700 mb-4">
                  These resources can help you improve your understanding and performance:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div 
                    className="bg-purple-50 rounded-lg p-4"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h4 className="font-medium text-purple-700 mb-2">Online Learning Platforms</h4>
                    <ul className="space-y-1">
                      <li className="flex items-start text-sm">
                        <span className="text-purple-700 mr-2">•</span>
                        <span className="text-gray-700">Coursera - Free university courses</span>
                      </li>
                      <li className="flex items-start text-sm">
                        <span className="text-purple-700 mr-2">•</span>
                        <span className="text-gray-700">Khan Academy - Fundamentals</span>
                      </li>
                    </ul>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-purple-50 rounded-lg p-4"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h4 className="font-medium text-purple-700 mb-2">Study Tools</h4>
                    <ul className="space-y-1">
                      <li className="flex items-start text-sm">
                        <span className="text-purple-700 mr-2">•</span>
                        <span className="text-gray-700">Anki - Spaced repetition flashcards</span>
                      </li>
                      <li className="flex items-start text-sm">
                        <span className="text-purple-700 mr-2">•</span>
                        <span className="text-gray-700">Forest - Focus timer</span>
                      </li>
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}