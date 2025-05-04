import { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyseReport } from '../utils/analyseReport';
import { ChatPrompt } from '../prompts/prompt';
import { useStudent } from '../context/userContext';

export default function Chatbot() {
    const { student } = useStudent()
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: `Hello ${student ? student.name : "" }! I can help you with student grade information. What would you like to know?`,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
//   console.log("student : ", student)

  // Scroll to bottom of messages on new message
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now(), // Use timestamp for unique IDs
      type: 'user',
      content: inputValue,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    let data = {
        name: student.name,
        academicRecords : student.academicRecords
    }
    
    try {
      // Process the question using analyseReport
      const response = await analyseReport("question : " + inputValue, ChatPrompt + JSON.stringify(data), "chat");
      
      console.log('Response from analyseReport:', response);
      // Add bot message with response
      const botMessage = {
        id: Date.now() + 1, // Ensure unique ID
        type: 'bot',
        content: response || "I'm sorry, I can only answer specific questions about student grades and academic performance.",
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 500); // Add slight delay for realism
      
    } catch (error) {
      // Handle error
      const errorMessage = {
        id: Date.now() + 1, // Ensure unique ID
        type: 'bot',
        content: "Sorry, I couldn't process your request. Please try asking a different question about student grades.",
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, errorMessage]);
        setIsLoading(false);
      }, 500);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(), // Use timestamp for unique ID
        type: 'bot',
        content: 'Hello! I can help you with student grade information. What would you like to know?',
      },
    ]);
  };

  return (
    <div className="flex flex-col h-screen bg-purple-50">
      {/* Header */}
      <div className="bg-purple-900 text-white p-4 shadow-md mx-auto w-2/3 mt-20">
        <div className="flex items-center justify-between max-w-4xl mx-auto ">
          <h1 className="text-xl font-bold">Student Grade Assistant</h1>
          <button 
            onClick={clearChat}
            className="flex items-center space-x-1 bg-purple-600 hover:bg-purple-800 rounded-md px-3 py-1 text-sm transition-colors"
          >
            <X size={16} />
            <span>Clear Chat</span>
          </button>
        </div>
      </div>
      
      {/* Chat container */}
      <div className="flex-1 overflow-y-auto p-4 max-w-4xl mx-auto w-full">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex mb-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[75%]
                ${message.type === 'user' 
                  ? 'flex-row-reverse space-x-reverse' 
                  : 'flex-row'}`}
              >
                <div className={`rounded-full p-2 
                  ${message.type === 'user' 
                    ? 'bg-purple-700 text-white' 
                    : 'bg-purple-200 text-purple-700'}`}
                >
                  {message.type === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className={`p-3 rounded-lg shadow-sm 
                  ${message.type === 'user' 
                    ? 'bg-purple-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 rounded-tl-none border border-purple-100'}`}
                >
                  {message.content}
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Loading indicator with unique key */}
          {isLoading && (
            <motion.div
              key="loading-indicator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex mb-4 justify-start"
            >
              <div className="flex items-start space-x-2 max-w-[75%]">
                <div className="rounded-full p-2 bg-purple-200 text-purple-700">
                  <Bot size={20} />
                </div>
                <div className="p-3 rounded-lg shadow-sm bg-white text-gray-800 rounded-tl-none border border-purple-100 flex items-center">
                  <Loader2 size={20} className="animate-spin text-purple-600" />
                  <span className="ml-2">Thinking...</span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>
      
      {/* Input area */}
      <div className="border-t border-purple-200 bg-white p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-2 max-w-4xl mx-auto">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about student grades..."
            className="flex-1 border border-purple-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className={`bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-2 transition-colors flex items-center justify-center ${
              isLoading || !inputValue.trim() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}