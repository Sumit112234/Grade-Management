import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { analyseReport } from '../utils/analyseReport';
import { useStudent } from '../context/userContext';
import { overallAnalysis } from '../prompts/prompt';

const OverallAnalysis = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const {student} = useStudent();
  
  useEffect(()=>{
    if(student)
    {
      let query = {
        academicRecords : student.academicRecords,

      }
        analyseReport(query, overallAnalysis, true)
        .then((data)=>{
            console.log(data)
            if(data){
                setAnalysisPoints(data);
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }
  },[student])

   


  const [analysisPoints,setAnalysisPoints] =useState( [
    {
      title: "Academic Progress",
      description: "Showing consistent improvement across multiple subjects with 15% growth in overall performance.",
      icon: "📈",
      color: "bg-gradient-to-r from-blue-500 to-purple-500"
    },
    {
      title: "Attendance Impact",
      description: "Higher attendance rates correlate directly with better performance in technical subjects.",
      icon: "🗓️",
      color: "bg-gradient-to-r from-green-500 to-teal-500"
    },
    {
      title: "Skill Development",
      description: "Technical skills have improved significantly, but soft skills need more attention.",
      icon: "💻",
      color: "bg-gradient-to-r from-yellow-500 to-orange-500"
    },
    {
      title: "Career Readiness",
      description: "On track for software development roles, additional certifications recommended.",
      icon: "🚀",
      color: "bg-gradient-to-r from-pink-500 to-red-500"
    },
    {
      title: "Learning Patterns",
      description: "Performs best with practical, project-based assessments versus theoretical examinations.",
      icon: "🧠",
      color: "bg-gradient-to-r from-indigo-500 to-purple-500"
    },
    {
      title: "Recommendations",
      description: "Focus on collaborative projects and internship opportunities to strengthen practical experience.",
      icon: "💡",
      color: "bg-gradient-to-r from-cyan-500 to-blue-500"
    }
  ]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-6">Overall Analysis</h2>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {analysisPoints.map((point, index) => (
          <motion.div
            key={index}
            className={`${point.color} text-white rounded-lg p-5 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-start">
              <span className="text-3xl mr-3">{point.icon}</span>
              <div>
                <h3 className="font-bold text-lg mb-2">{point.title}</h3>
                <p className="text-white/90">{point.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default OverallAnalysis;