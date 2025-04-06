import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Download, Book, Award, BarChart } from 'lucide-react';
import { Document, Page, Text, View, StyleSheet, pdf, Font, Image } from "@react-pdf/renderer";
import { saveAs } from 'file-saver';
import { useStudent } from '../context/userContext';
import { analyseReport } from '../utils/analyseReport';
import { generalTips, specificTips } from '../prompts/prompt';

// Define PDF styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
    fontFamily: 'Helvetica'
  },
  header: {
    backgroundColor: '#7E22CE',
    padding: 15,
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#E9D5FF'
  },
  section: {
    marginVertical: 10
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4B5563'
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E9D5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  avatarText: {
    fontSize: 20,
    color: '#7E22CE',
    fontWeight: 'bold'
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937'
  },
  studentDetails: {
    fontSize: 12,
    color: '#4B5563'
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  statBox: {
    width: '30%',
    borderWidth: 1,
    borderColor: '#E9D5FF',
    borderRadius: 8,
    padding: 10
  },
  statTitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 5
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7E22CE'
  },
  statSubvalue: {
    fontSize: 10,
    color: '#6B7280'
  },
  table: {
    display: 'table',
    width: 'auto',
    marginVertical: 10
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F3E8FF',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E9D5FF'
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E9D5FF',
    padding: 8
  },
  tableCol: {
    width: '20%'
  },
  tableColHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#7E22CE'
  },
  tableCell: {
    fontSize: 10,
    color: '#4B5563'
  },
  gradeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    fontSize: 10
  },
  improvementTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4B5563'
  },
  improvementContainer: {
    backgroundColor: '#F3E8FF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15
  },
  improvementSubject: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8
  },
  suggestionsList: {
    marginTop: 10
  },
  suggestionItem: {
    flexDirection: 'row',
    marginBottom: 5
  },
  bulletPoint: {
    fontSize: 10,
    marginRight: 5,
    color: '#7E22CE'
  },
  suggestionText: {
    fontSize: 10,
    color: '#4B5563'
  },
  tipBox: {
    backgroundColor: '#EFF6FF',
    padding: 10,
    borderRadius: 8,
    marginTop: 10
  },
  tipTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 5
  },
  tipText: {
    fontSize: 10,
    color: '#1E40AF'
  },
  studyPlannerTable: {
    display: 'table',
    width: 'auto',
    marginVertical: 10
  },
  resourcesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },
  resourceBox: {
    width: '48%',
    backgroundColor: '#F3E8FF',
    borderRadius: 8,
    padding: 10,
    margin: '1%'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 8,
    color: '#9CA3AF'
  }
});

const AcademicReport = () => {
  // Sample student data
  let stu = {
    name: "Sandeep Malhotra",
    email: "sandeep.malhotra@example.com",
    enrollment: "BBA2008",
    semester: "1st",
    academicRecords: [
      {
        subjectId: {
          subject: "Introduction to Management",
          code: "MGT101",
          subjectType: "Core",
          semester: "1st"
        },
        marks: 78,
        totalMarks: 100,
        grade: "B+"
      },
      {
        subjectId: {
          subject: "Financial Accounting",
          code: "ACC101",
          subjectType: "Core",
          semester: "1st"
        },
        marks: 65,
        totalMarks: 100,
        grade: "B"
      },
      {
        subjectId: {
          subject: "Business Communication",
          code: "COM101",
          subjectType: "Core",
          semester: "1st"
        },
        marks: 82,
        totalMarks: 100,
        grade: "A"
      }
    ],
    course: {
      courseName: "Bachelor of Business Administration",
      courseCode: "BBA",
      department: "Business",
      institution: "Global Business School",
      duration: "3 years",
      totalSemisters: 6
    }
  };

  const { id } = useParams();
  // const [student, setStudent] = useState(stu);
  const {student} = useStudent();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('academic');
  const [generalSuggestion, setGeneralSuggestion] = useState([]);
  const [subjectSpecificSuggestion, setSubjectSpecificSuggestion] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        // In a real implementation, this would fetch actual data
        // const response = await axios.get(`/api/students/${id}`);
        // setStudent(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load student data');
        console.error(err);
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [id]);

  const handleTabChange = async(tab) => {

    setActiveTab(tab);
    if(tab === 'improvement')
    {
      let generalAiResult = await analyseReport(student.academicRecords,generalTips);
      setGeneralSuggestion(generalAiResult);

      let specificAiResult = await analyseReport(student.academicRecords, specificTips);
      // console.log(specificAiResult);
      setSubjectSpecificSuggestion(specificAiResult);


    }
  }


  const getGrade = (data)=>{
    const percentage = (data.marks / data.totalMarks) * 100;

    let grade = 'F';
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B+';
    else if (percentage >= 60) grade = 'B';
    else if (percentage >= 50) grade = 'C+';
    else if (percentage >= 40) grade = 'C';
    else if (percentage >= 33) grade = 'D';


    return grade

  }
  const calculateOverallPerformance = () => {
    if (!student || !student.academicRecords || student.academicRecords.length === 0) {
      return { percentage: 0, grade: 'N/A' };
    }

    // console.log("hello I am calulating overall performance")

    const totalMarks = student.academicRecords.reduce((acc, record) => acc + record.marks, 0);
    const totalPossibleMarks = student.academicRecords.reduce((acc, record) => acc + record.totalMarks, 0);
    const percentage = (totalMarks / totalPossibleMarks) * 100;

    // console.log(totalMarks, totalPossibleMarks, percentage)

    let grade = 'F';
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B+';
    else if (percentage >= 60) grade = 'B';
    else if (percentage >= 50) grade = 'C+';
    else if (percentage >= 40) grade = 'C';
    else if (percentage >= 33) grade = 'D';

    return { percentage: percentage.toFixed(2), grade };
  };


  useEffect(()=>{
    const weakestSubjects = getSubjectsSortedByPerformance().slice(0, 2);
    const overallPerformance = calculateOverallPerformance();
    

    // let sol = await analyseReport(student.AcademicReport, generalTips);
    // console.log(sol);

    const generalSuggestions = [
      "Create a consistent study schedule with dedicated time for each subject",
      "Use active recall techniques instead of passive reading",
      "Form or join study groups for collaborative learning",
      "Break down complex topics into smaller, manageable parts",
      "Take regular breaks using the Pomodoro technique (25 min study, 5 min break)",
      "Review your notes within 24 hours after each class",
      "Practice past exam questions under timed conditions",
      "Seek help early when you encounter difficulties"
    ];
    
    const subjectSpecificSuggestions = weakestSubjects.map(subject => {
      const subjectName = subject.subjectId?.subject || "this subject";
      const percentage = ((subject.marks / subject.totalMarks) * 100).toFixed(1);
      
      return {
        subject: subjectName,
        percentage,
        suggestions: [
          `Meet with your ${subjectName} professor during office hours`,
          `Find additional practice problems or resources for ${subjectName}`,
          `Create concise summary notes or flashcards for key concepts in ${subjectName}`,
          `Allocate 25% more study time for ${subjectName} compared to other subjects`
        ]
      };
    });
    setGeneralSuggestion(generalSuggestions);
    setSubjectSpecificSuggestion(subjectSpecificSuggestions);
    
  },[])

  const getSubjectsSortedByPerformance = () => {
    if (!student || !student.academicRecords) return [];
    
    return [...student.academicRecords].sort((a, b) => {
      const percentageA = (a.marks / a.totalMarks) * 100;
      const percentageB = (b.marks / b.totalMarks) * 100;
      return percentageA - percentageB;
    });
  };

  const generateImprovementSuggestions = () => {
    const weakestSubjects = getSubjectsSortedByPerformance().slice(0, 2);
    const overallPerformance = calculateOverallPerformance();
    

    // let sol = await analyseReport(student.AcademicReport, generalTips);
    // console.log(sol);

    const generalSuggestions = [
      "Create a consistent study schedule with dedicated time for each subject",
      "Use active recall techniques instead of passive reading",
      "Form or join study groups for collaborative learning",
      "Break down complex topics into smaller, manageable parts",
      "Take regular breaks using the Pomodoro technique (25 min study, 5 min break)",
      "Review your notes within 24 hours after each class",
      "Practice past exam questions under timed conditions",
      "Seek help early when you encounter difficulties"
    ];
    
    const subjectSpecificSuggestions = weakestSubjects.map(subject => {
      const subjectName = subject.subjectId?.subject || "this subject";
      const percentage = ((subject.marks / subject.totalMarks) * 100).toFixed(1);
      
      return {
        subject: subjectName,
        percentage,
        suggestions: [
          `Meet with your ${subjectName} professor during office hours`,
          `Find additional practice problems or resources for ${subjectName}`,
          `Create concise summary notes or flashcards for key concepts in ${subjectName}`,
          `Allocate 25% more study time for ${subjectName} compared to other subjects`
        ]
      };
    });

    console.log("subject specific : ", subjectSpecificSuggestions)
    
    return { generalSuggestions, subjectSpecificSuggestions };
  };

  // Create Academic Performance PDF Document Component
  const AcademicPerformancePDF = () => {
    const overallPerformance = calculateOverallPerformance();
    const weakestSubjects = getSubjectsSortedByPerformance().slice(0, 2);

    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Academic Report</Text>
              <Text style={styles.headerSubtitle}>{student?.name} | Enrollment: {student?.enrollment}</Text>
            </View>
          </View>
          
          {/* Student Info */}
          <View style={styles.studentInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{student?.name.charAt(0)}</Text>
            </View>
            <View>
              <Text style={styles.studentName}>{student?.name}</Text>
              <Text style={styles.studentDetails}>{student?.course?.courseName} | {student?.semester} Semester</Text>
            </View>
          </View>
          
          {/* Performance Overview */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Performance Overview</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statBox}>
                <Text style={styles.statTitle}>Overall Grade</Text>
                <Text style={styles.statValue}>{overallPerformance.grade}</Text>
                <Text style={styles.statSubvalue}>({overallPerformance.percentage}%)</Text>
              </View>
              
              <View style={styles.statBox}>
                <Text style={styles.statTitle}>Subjects</Text>
                <Text style={styles.statValue}>{student?.academicRecords?.length || 0}</Text>
              </View>
              
              <View style={styles.statBox}>
                <Text style={styles.statTitle}>Performance</Text>
                <Text style={styles.statValue}>{overallPerformance.percentage}%</Text>
              </View>
            </View>
          </View>
          
          {/* Subject Performance */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Subject Performance</Text>
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <View style={[styles.tableCol, { width: '30%' }]}>
                  <Text style={styles.tableColHeader}>Subject</Text>
                </View>
                <View style={[styles.tableCol, { width: '15%' }]}>
                  <Text style={styles.tableColHeader}>Code</Text>
                </View>
                <View style={[styles.tableCol, { width: '15%' }]}>
                  <Text style={styles.tableColHeader}>Type</Text>
                </View>
                <View style={[styles.tableCol, { width: '20%' }]}>
                  <Text style={styles.tableColHeader}>Marks</Text>
                </View>
                <View style={[styles.tableCol, { width: '20%' }]}>
                  <Text style={styles.tableColHeader}>Grade</Text>
                </View>
              </View>
              
              {/* Table Rows */}
              {student?.academicRecords?.map((record, index) => {
                const percentage = (record.marks / record.totalMarks) * 100;
                let gradeBgColor;
                
                if (record.grade === 'A+' || record.grade === 'A') gradeBgColor = '#DCFCE7';
                else if (record.grade === 'B+' || record.grade === 'B') gradeBgColor = '#DBEAFE';
                else if (record.grade === 'C+' || record.grade === 'C') gradeBgColor = '#FEF3C7';
                else gradeBgColor = '#FEE2E2';
                
                return (
                  <View style={styles.tableRow} key={`record-${index}`}>
                    <View style={[styles.tableCol, { width: '30%' }]}>
                      <Text style={styles.tableCell}>{record.subjectId?.subject || 'N/A'}</Text>
                    </View>
                    <View style={[styles.tableCol, { width: '15%' }]}>
                      <Text style={styles.tableCell}>{record.subjectId?.code || 'N/A'}</Text>
                    </View>
                    <View style={[styles.tableCol, { width: '15%' }]}>
                      <Text style={styles.tableCell}>{record.subjectId?.subjectType || 'N/A'}</Text>
                    </View>
                    <View style={[styles.tableCol, { width: '20%' }]}>
                      <Text style={styles.tableCell}>{record.marks}/{record.totalMarks} ({percentage.toFixed(1)}%)</Text>
                    </View>
                    <View style={[styles.tableCol, { width: '20%' }]}>
                      <Text style={[styles.gradeBadge, { backgroundColor: gradeBgColor }]}>{record.grade || 'N/A'}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
          
          {/* Areas for Improvement */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Areas for Improvement</Text>
            
            {weakestSubjects.length > 0 ? (
              <View style={styles.improvementContainer}>
                <Text style={styles.suggestionText}>Based on your current performance, focus on improving these subjects:</Text>
                
                {weakestSubjects.map((subject, index) => {
                  const percentage = (subject.marks / subject.totalMarks) * 100;
                  let badgeBgColor;
                  
                  if (percentage >= 80) badgeBgColor = '#DCFCE7';
                  else if (percentage >= 70) badgeBgColor = '#DBEAFE';
                  else if (percentage >= 60) badgeBgColor = '#FEF3C7';
                  else badgeBgColor = '#FEE2E2';
                  
                  return (
                    <View key={`improvement-${index}`} style={styles.improvementSubject}>
                      <Text style={styles.tableCell}>{subject.subjectId?.subject}</Text>
                      <Text style={[styles.gradeBadge, { backgroundColor: badgeBgColor }]}>{percentage.toFixed(1)}%</Text>
                    </View>
                  );
                })}
              </View>
            ) : (
              <View style={[styles.improvementContainer, { backgroundColor: '#DCFCE7' }]}>
                <Text style={[styles.suggestionText, { color: '#166534' }]}>Great job! Your performance is consistent across all subjects.</Text>
              </View>
            )}
          </View>
          
          {/* Footer */}
          <Text style={styles.footer}>
            This report was generated on {new Date().toLocaleDateString()} and includes AI-powered study recommendations.
          </Text>
        </Page>
      </Document>
    );
  };

  // Create Improvement Suggestions PDF Document Component
  const ImprovementSuggestionsPDF = () => {
    const suggestions = generateImprovementSuggestions();
    
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Improvement Suggestions</Text>
              <Text style={styles.headerSubtitle}>{student?.name} | Enrollment: {student?.enrollment}</Text>
            </View>
          </View>
          
          {/* Student Info */}
          <View style={styles.studentInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{student?.name.charAt(0)}</Text>
            </View>
            <View>
              <Text style={styles.studentName}>{student?.name}</Text>
              <Text style={styles.studentDetails}>{student?.course?.courseName} | {student?.semester} Semester</Text>
            </View>
          </View>
          
          {/* General Study Tips */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>General Study Tips</Text>
            <View style={[styles.improvementContainer, { backgroundColor: 'white', borderWidth: 1, borderColor: '#E9D5FF' }]}>
              <View style={styles.suggestionsList}>
                {suggestions.generalSuggestions.map((tip, index) => (
                  <View key={`tip-${index}`} style={styles.suggestionItem}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.suggestionText}>{tip}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
          
          {/* Subject-specific suggestions */}
          {suggestions.subjectSpecificSuggestions.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Subject-Specific Improvement Plans</Text>
              
              {suggestions.subjectSpecificSuggestions.map((subjectSuggestion, index) => (
                <View 
                  key={`subject-suggestion-${index}`} 
                  style={[styles.improvementContainer, { backgroundColor: 'white', borderWidth: 1, borderColor: '#E9D5FF', marginBottom: 15 }]}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text style={{ fontWeight: 'bold', color: '#7E22CE' }}>{subjectSuggestion.subject}</Text>
                    <Text style={{ color: '#7E22CE', fontSize: 12 }}>Current: {subjectSuggestion.percentage}%</Text>
                  </View>
                  
                  <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 10, marginBottom: 5, color: '#4B5563' }}>
                    Customized Improvement Strategies:
                  </Text>
                  
                  <View style={styles.suggestionsList}>
                    {subjectSuggestion.suggestions.map((tip, tipIndex) => (
                      <View key={`subject-tip-${index}-${tipIndex}`} style={styles.suggestionItem}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.suggestionText}>{tip}</Text>
                      </View>
                    ))}
                  </View>
                  
                  <View style={styles.tipBox}>
                    <Text style={styles.tipTitle}>AI-Generated Tip:</Text>
                    <Text style={styles.tipText}>
                      Consider creating concept maps to visualize the relationships between key topics in {subjectSuggestion.subject}. 
                      This can help identify knowledge gaps and strengthen your understanding of complex relationships.
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
          
          {/* Weekly Study Planner */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Weekly Study Planner</Text>
            <View style={[styles.improvementContainer, { backgroundColor: 'white', borderWidth: 1, borderColor: '#E9D5FF' }]}>
              <Text style={styles.suggestionText}>
                Here's a recommended weekly study plan that prioritizes subjects that need improvement while maintaining performance in stronger areas:
              </Text>
              
              <View style={styles.studyPlannerTable}>
                {/* Table Header */}
                <View style={styles.tableHeader}>
                  <View style={[styles.tableCol, { width: '25%' }]}>
                    <Text style={styles.tableColHeader}>Day</Text>
                  </View>
                  <View style={[styles.tableCol, { width: '25%' }]}>
                    <Text style={styles.tableColHeader}>Morning</Text>
                  </View>
                  <View style={[styles.tableCol, { width: '25%' }]}>
                    <Text style={styles.tableColHeader}>Afternoon</Text>
                  </View>
                  <View style={[styles.tableCol, { width: '25%' }]}>
                    <Text style={styles.tableColHeader}>Evening</Text>
                  </View>
                </View>
                
                {/* Table Rows - Just showing a few days for brevity */}
                {['Monday', 'Wednesday', 'Friday', 'Sunday'].map((day, index) => {
                  const weakSubjects = suggestions.subjectSpecificSuggestions.map(s => s.subject);
                  
                  return (
                    <View style={styles.tableRow} key={`day-${index}`}>
                      <View style={[styles.tableCol, { width: '25%' }]}>
                        <Text style={styles.tableCell}>{day}</Text>
                      </View>
                      <View style={[styles.tableCol, { width: '25%' }]}>
                        <Text style={styles.tableCell}>
                          {day === 'Monday' ? (weakSubjects[0] || 'Review Notes') : 
                           day === 'Sunday' ? 'Rest/Light Review' : 'Practice Problems'}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, { width: '25%' }]}>
                        <Text style={styles.tableCell}>
                          {day === 'Friday' ? (weakSubjects[1] || weakSubjects[0] || 'Problem-solving') : 
                           day === 'Sunday' ? 'Practice Tests' : 'Group Study'}
                        </Text>
                      </View>
                      <View style={[styles.tableCol, { width: '25%' }]}>
                        <Text style={styles.tableCell}>
                          {day === 'Wednesday' ? 'All Subjects Review' : 
                           day === 'Monday' ? weakSubjects[0] : 
                           day === 'Sunday' ? 'Rest' : 'Reading Ahead'}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
              
              <View style={[styles.tipBox, { backgroundColor: '#DCFCE7', marginTop: 15 }]}>
                <Text style={[styles.tipTitle, { color: '#166534' }]}>Remember:</Text>
                <View style={styles.suggestionsList}>
                  <View style={styles.suggestionItem}>
                    <Text style={[styles.bulletPoint, { color: '#166534' }]}>•</Text>
                    <Text style={[styles.suggestionText, { color: '#166534' }]}>Study in 25-minute focused sessions with 5-minute breaks (Pomodoro technique)</Text>
                  </View>
                  <View style={styles.suggestionItem}>
                    <Text style={[styles.bulletPoint, { color: '#166534' }]}>•</Text>
                    <Text style={[styles.suggestionText, { color: '#166534' }]}>Allocate more time to your weaker subjects</Text>
                  </View>
                  <View style={styles.suggestionItem}>
                    <Text style={[styles.bulletPoint, { color: '#166534' }]}>•</Text>
                    <Text style={[styles.suggestionText, { color: '#166534' }]}>Get 7-8 hours of sleep for optimal cognitive function</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          
          {/* Additional Resources */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Resources</Text>
            <View style={[styles.improvementContainer, { backgroundColor: 'white', borderWidth: 1, borderColor: '#E9D5FF' }]}>
              <Text style={styles.suggestionText}>
                These resources can help you improve your understanding and performance:
              </Text>
              
              <View style={styles.resourcesGrid}>
                <View style={styles.resourceBox}>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#7E22CE', marginBottom: 5 }}>
                    Online Learning Platforms
                  </Text>
                  <View style={styles.suggestionsList}>
                    <View style={styles.suggestionItem}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={styles.suggestionText}>Coursera - Free university courses</Text>
                    </View>
                    <View style={styles.suggestionItem}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={styles.suggestionText}>Khan Academy - Fundamentals</Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.resourceBox}>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#7E22CE', marginBottom: 5 }}>
                    Study Tools
                  </Text>
                  <View style={styles.suggestionsList}>
                    <View style={styles.suggestionItem}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={styles.suggestionText}>Anki - Spaced repetition flashcards</Text>
                    </View>
                    <View style={styles.suggestionItem}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={styles.suggestionText}>Forest - Focus timer</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          
          {/* Footer */}
          <Text style={styles.footer}>
            This report was generated on {new Date().toLocaleDateString()} and includes AI-powered study recommendations.
          </Text>
        </Page>
      </Document>
    );
  };

  // Function to download PDF based on active tab
  const downloadReport = async () => {
    try {
      let blob;
      
      if (activeTab === 'academic') {
        blob = await pdf(<AcademicPerformancePDF />).toBlob();
        saveAs(blob, `${student?.name || 'Student'}_academic_performance.pdf`);
      } else {
        blob = await pdf(<ImprovementSuggestionsPDF />).toBlob();
        saveAs(blob, `${student?.name || 'Student'}_improvement_suggestions.pdf`);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-purple-700 text-xl">Loading academic report...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  const overallPerformance = calculateOverallPerformance();
  const suggestions = generateImprovementSuggestions();
  const weakestSubjects = getSubjectsSortedByPerformance().slice(0, 2);

  return (
    <div className="min-h-screen pt-20 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-purple-700 text-white p-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Academic Report</h1>
              <p className="text-purple-200">{student?.name} | Enrollment: {student?.enrollment}</p>
            </div>
            <button 
              onClick={downloadReport}
              className="bg-white text-purple-700 px-4 py-2 rounded-md flex items-center hover:bg-purple-50 transition-colors"
            >
              <Download size={18} className="mr-2" />
              Download PDF
            </button>
          </div>
          
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() =>handleTabChange('academic')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'academic' 
                    ? 'border-purple-500 text-purple-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BarChart size={16} className="inline mr-2" />
                Academic Performance
              </button>
              <button
                onClick={() => handleTabChange('improvement')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'improvement' 
                    ? 'border-purple-500 text-purple-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Award size={16} className="inline mr-2" />
                Improvement Suggestions
              </button>
            </nav>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {activeTab === 'academic' ? (
              <div>
                {/* Student Info */}
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <span className="text-purple-700 font-bold text-xl">{student?.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{student?.name}</h2>
                    <p className="text-gray-600">{student?.course?.courseName} | {student?.semester} Semester</p>
                  </div>
                </div>
                
                {/* Performance Overview */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Performance Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                      <p className="text-gray-500 text-sm">Overall Grade</p>
                      <p className="text-2xl font-bold text-purple-700">{overallPerformance.grade}</p>
                      <p className="text-gray-500 text-xs">({overallPerformance.percentage}%)</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                      <p className="text-gray-500 text-sm">Subjects</p>
                      <p className="text-2xl font-bold text-purple-700">{student?.academicRecords?.length || 0}</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
                      <p className="text-gray-500 text-sm">Performance</p>
                      <p className="text-2xl font-bold text-purple-700">{overallPerformance.percentage}%</p>
                    </div>
                  </div>
                </div>
                
                {/* Subject Performance */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Subject Performance</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-purple-50">
                          <th className="py-2 px-4 border-b border-purple-100 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Subject</th>
                          <th className="py-2 px-4 border-b border-purple-100 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Code</th>
                          <th className="py-2 px-4 border-b border-purple-100 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Type</th>
                          <th className="py-2 px-4 border-b border-purple-100 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Marks</th>
                          <th className="py-2 px-4 border-b border-purple-100 text-left text-xs font-medium text-purple-700 uppercase tracking-wider">Grade</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-purple-100">
                        {student?.academicRecords?.map((record, index) => {
                          const percentage = (record.marks / record.totalMarks) * 100;
                          let gradeBgColor;
                          let gradeTextColor;

                          let grade = 'F';
                          if (percentage >= 90) grade = 'A+';
                          else if (percentage >= 80) grade = 'A';
                          else if (percentage >= 70) grade = 'B+';
                          else if (percentage >= 60) grade = 'B';
                          else if (percentage >= 50) grade = 'C+';
                          else if (percentage >= 40) grade = 'C';
                          else if (percentage >= 33) grade = 'D';
                      
                       
                          
                          if (grade === 'A+' || grade === 'A') {
                            gradeBgColor = 'bg-green-100';
                            gradeTextColor = 'text-green-800';
                          } else if (grade === 'B+' || grade === 'B') {
                            gradeBgColor = 'bg-blue-100';
                            gradeTextColor = 'text-blue-800';
                          } else if (grade === 'C+' || grade === 'C') {
                            gradeBgColor = 'bg-yellow-100';
                            gradeTextColor = 'text-yellow-800';
                          } else {
                            gradeBgColor = 'bg-red-100';
                            gradeTextColor = 'text-red-800';
                          }
                          
                          return (
                            <tr key={`record-${index}`} className="hover:bg-gray-50">
                              <td className="py-3 px-4 text-sm text-gray-800">{record.subjectId?.subject || 'N/A'}</td>
                              <td className="py-3 px-4 text-sm text-gray-600">{record.subjectId?.code || 'N/A'}</td>
                              <td className="py-3 px-4 text-sm text-gray-600">{record.subjectId?.subjectType || 'N/A'}</td>
                              <td className="py-3 px-4 text-sm text-gray-600">
                                {record.marks}/{record.totalMarks} ({percentage.toFixed(1)}%)
                              </td>
                              <td className="py-3 px-4">
                                {/* {console.log(record)} */}
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${gradeBgColor} ${gradeTextColor}`}>
                                  {getGrade(record) || 'N/A'}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Areas for Improvement */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Areas for Improvement</h3>
                  
                  {weakestSubjects.length > 0 ? (
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-gray-700 mb-4">Based on your current performance, focus on improving these subjects:</p>
                      
                      {weakestSubjects.map((subject, index) => {
                        const percentage = (subject.marks / subject.totalMarks) * 100;
                        let badgeBgColor;
                        let badgeTextColor;
                        
                        if (percentage >= 80) {
                          badgeBgColor = 'bg-green-100';
                          badgeTextColor = 'text-green-800';
                        } else if (percentage >= 70) {
                          badgeBgColor = 'bg-blue-100';
                          badgeTextColor = 'text-blue-800';
                        } else if (percentage >= 60) {
                          badgeBgColor = 'bg-yellow-100';
                          badgeTextColor = 'text-yellow-800';
                        } else {
                          badgeBgColor = 'bg-red-100';
                          badgeTextColor = 'text-red-800';
                        }
                        
                        return (
                          <div 
                            key={`improvement-${index}`} 
                            className="bg-white p-3 rounded-lg shadow-sm mb-3 flex justify-between items-center"
                          >
                            <span className="text-gray-800">{subject.subjectId?.subject}</span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeBgColor} ${badgeTextColor}`}>
                              {percentage.toFixed(1)}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-green-800">Great job! Your performance is consistent across all subjects.</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                {/* Student Info */}
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <span className="text-purple-700 font-bold text-xl">{student?.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{student?.name}</h2>
                    <p className="text-gray-600">{student?.course?.courseName} | {student?.semester} Semester</p>
                  </div>
                </div>
                
                {/* General Study Tips */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">General Study Tips</h3>
                  <div className="bg-white border border-purple-100 rounded-lg p-4 shadow-sm">
                    <ul className="space-y-2">
                      {generalSuggestion.map((tip, index) => (
                        <li key={`tip-${index}`} className="flex items-start">
                          <span className="text-purple-700 mr-2">•</span>
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Subject-specific suggestions */}
                {subjectSpecificSuggestion.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Subject-Specific Improvement Plans</h3>
                    
                    {subjectSpecificSuggestion.map((subjectSuggestion, index) => (
                      <div 
                        key={`subject-suggestion-${index}`} 
                        className="bg-white border border-purple-100 rounded-lg p-4 shadow-sm mb-4"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-bold text-purple-700">{subjectSuggestion.subject}</h4>
                          <span className="text-sm text-purple-700">Current: {subjectSuggestion.percentage}%</span>
                        </div>
                        
                        <h5 className="font-medium text-gray-700 mt-4 mb-2">Customized Improvement Strategies:</h5>
                        
                        <ul className="space-y-2 mb-4">
                          {subjectSuggestion.suggestions.map((tip, tipIndex) => (
                            <li key={`subject-tip-${index}-${tipIndex}`} className="flex items-start">
                              <span className="text-purple-700 mr-2">•</span>
                              <span className="text-gray-700">{tip}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <h5 className="font-medium text-blue-800 mb-1">AI-Generated Tip:</h5>
                          <p className="text-blue-800 text-sm">
                            Consider creating concept maps to visualize the relationships between key topics in {subjectSuggestion.subject}. 
                            This can help identify knowledge gaps and strengthen your understanding of complex relationships.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Weekly Study Planner */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Weekly Study Planner</h3>
                  <div className="bg-white border border-purple-100 rounded-lg p-4 shadow-sm">
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
                              <tr key={`day-${index}`} className="hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-800">{day}</td>
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
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="bg-green-50 p-3 rounded-lg mt-4">
                      <h5 className="font-medium text-green-800 mb-1">Remember:</h5>
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
                    </div>
                  </div>
                </div>
                
                {/* Additional Resources */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Additional Resources</h3>
                  <div className="bg-white border border-purple-100 rounded-lg p-4 shadow-sm">
                    <p className="text-gray-700 mb-4">
                      These resources can help you improve your understanding and performance:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-purple-50 rounded-lg p-4">
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
                      </div>
                      
                      <div className="bg-purple-50 rounded-lg p-4">
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              This report was generated on {new Date().toLocaleDateString()} and includes AI-powered study recommendations.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AcademicReport;