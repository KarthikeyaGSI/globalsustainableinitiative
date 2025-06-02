import React, { useState, useRef, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  animation?: string;
}

export default function MagneticButton({ children, className = '', onClick, animation }: MagneticButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouse = (e: MouseEvent) => {
    if (ref.current) {
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      setPosition({ x: x * 0.2, y: y * 0.2 });
    }
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.button
      ref={ref}
      className={`relative group ${className}`}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={reset}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      {animation && (
        <div className="absolute inset-0 pointer-events-none">
          <Player
            autoplay
            loop
            src={animation}
            style={{ width: '100%', height: '100%' }}
            speed={isHovered ? 1.5 : 1}
          />
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 rounded-full -z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: isHovered ? 1.2 : 0, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}