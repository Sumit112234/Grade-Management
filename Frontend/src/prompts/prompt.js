export const generalTips = "Based on the following academic records of a student, analyze the performance and generate a list of general study tips that could help the student improve and succeed in future subjects. Each tip should be a short, actionable sentence (max 20 words), and return the result as a JavaScript array of strings so it can be directly mapped in React. ";

export const specificTips = `Based on the following academic records of a student, identify the weakest subjects (those with the lowest marks or grades or marks smaller than 65) and generate a list of subject-specific improvement suggestions for each one.

For each weak subject, return an object in the following format:

{
  subject: "Subject Name",
  percentage: "Score percentage as string (e.g. '65.0')",
  suggestions: [
    "Short, actionable suggestion 1",
    "Short, actionable suggestion 2",
    ...
  ]
}
Each subject should include 3–5 helpful and specific tips aimed at improving performance in that subject.

Return the complete result as a JavaScript array of objects, so it can be directly mapped in React.

Here is the academic data: `;

export const overallAnalysis = `Based on the following student's academic profile (including academic records, semester, skills, extracurricular activities, attendance, and course), generate a set of meaningful insights.

Each insight must be returned as an object with the following fields:

title (string): A short heading describing the insight.

description (string): A concise explanation (1-2 sentences max).

icon (string): A relevant emoji.

color (string): A Tailwind CSS gradient class such as "bg-gradient-to-r from-blue-500 to-purple-500".

You must return a JavaScript array of such objects, without any introduction or extra commentary.

Choose emojis and Tailwind gradients that best match the category or meaning of each insight.
Include insights such as:

Academic Progress

Attendance Impact

Skill Development

Career Readiness

Learning Patterns

Recommendations

Format:

[
  {
    title: "Insight Title",
    description: "A short meaningful insight here.",
    icon: "📈",
    color: "bg-gradient-to-r from-blue-500 to-purple-500"
  },
  ...
]
After getting response from you I will directly cheak it using this logic and your response 
must pass this logic.
     const match = YourResponse.match(/\[\s*"(.*?)"\s*\]/s);
     if (!match) return false;  
`;