import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function InteractiveCard({ children, className = '' }: InteractiveCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(1);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * 10;
    const rotateYValue = ((centerX - x) / centerX) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
    setScale(1.02);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setScale(1);
  };

  return (
    <motion.div
      className={`perspective-1000 ${className}`}
      animate={{
        rotateX,
        rotateY,
        scale,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-blue-500/10 rounded-2xl pointer-events-none"
        animate={{
          opacity: scale > 1 ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}