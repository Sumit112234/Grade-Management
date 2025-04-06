// Create this as ImageSliderDashboard.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const ImageSliderDashboard = () => {
  const images = [
    'boy-img1.png',
    'boy-img2.png',
    'boy-img3.png',
    'boy-img4.png',
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 10 : -10,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? 10 : -10,
    }),
  };

  return (
    <div className="relative w-full h-full">
      {/* Main Slider */}
      <div className="w-full h-72 relative overflow-hidden rounded-lg shadow-2xl">
        <AnimatePresence initial={false} custom={1}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Student studying ${currentIndex + 1}`}
            className="absolute w-full h-full object-cover"
            custom={1}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
              rotateY: { duration: 0.8 },
            }}
          />
        </AnimatePresence>
      </div>
      
      {/* Thumbnail preview dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <motion.button
            key={index}
            className="w-3 h-3 rounded-full bg-white bg-opacity-50 focus:outline-none"
            onClick={() => setCurrentIndex(index)}
            animate={{
              scale: currentIndex === index ? 1.2 : 1,
              backgroundColor: currentIndex === index ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)',
            }}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
      
      {/* Side previews (overlapping style) */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/4 z-0">
        <motion.div
          className="w-32 h-32 overflow-hidden rounded-lg opacity-40"
          style={{ filter: 'blur(2px)' }}
          animate={{ x: [-5, 5, -5], rotate: -5 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        >
          <img 
            src={images[(currentIndex - 1 + images.length) % images.length]} 
            alt="Previous" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
      
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/4 z-0">
        <motion.div
          className="w-32 h-32 overflow-hidden rounded-lg opacity-40"
          style={{ filter: 'blur(2px)' }}
          animate={{ x: [5, -5, 5], rotate: 5 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        >
          <img 
            src={images[(currentIndex + 1) % images.length]} 
            alt="Next" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ImageSliderDashboard;