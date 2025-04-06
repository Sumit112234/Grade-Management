// First, create this component in a separate file (e.g., ImageSlider.jsx)
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const ImageSlider = () => {
  const images = ['boy-img1.png', 'boy-img2.png', 'boy-img3.png', 'boy-img4.png', 'boy-img5.png'];
  const [currentIndex, setCurrentIndex] = useState(1); // Start with boy-img2
  const [prevIndex, setPrevIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(2);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % images.length;
        setPrevIndex((newIndex - 1 + images.length) % images.length);
        setNextIndex((newIndex + 1) % images.length);
        return newIndex;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  return (
    <div className="relative w-full h-96 overflow-hidden">
      {/* Current Image */}
      <motion.div 
        className="absolute top-0 w-full h-full flex justify-center"
        key={`current-${currentIndex}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, zIndex: 10 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <motion.img
          src={images[currentIndex]}
          alt={`Student image ${currentIndex + 1}`}
          className="rounded-3xl h-96 w-96 shadow-2xl object-cover "
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
        />
      </motion.div>
      
      {/* Previous Image (Blurred) */}
      <motion.div
        className="absolute top-0 left-0 w-1/4 h-full overflow-hidden "
        style={{ filter: 'blur(2px)', opacity: 0.9, zIndex: 5 }}
      >
        <motion.img
          src={images[prevIndex]}
          alt="Previous slide"
          className="h-full w-auto object-cover"
          animate={{ x: ['0%', '5%', '0%'] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
        />
      </motion.div>
      
      {/* Next Image (Blurred) */}
      <motion.div
        className="absolute top-0 right-0 w-1/4 h-full overflow-hidden"
        style={{ filter: 'blur(2px)', opacity: 0.9, zIndex: 5 }}
      >
        <motion.img
          src={images[nextIndex]}
          alt="Next slide"
          className="h-full w-auto object-cover"
          animate={{ x: ['0%', '-5%', '0%'] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
        />
      </motion.div>
    </div>
  );
};

export default ImageSlider;