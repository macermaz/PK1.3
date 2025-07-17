import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import React from 'react';

const PsykatAvatar: React.FC = () => {
  return (
    <div className="flex justify-center psykat-shadow">
      <div className="relative">
        {/* Cuerpo del gato */}
        <div className="w-40 h-32 bg-purple-500 rounded-t-full rounded-b-3xl" />
        
        {/* Orejas */}
        <div className="absolute -top-4 left-4 w-0 h-0 border-l-[12px] border-l-transparent border-b-[20px] border-b-purple-700 border-r-[12px] border-r-transparent" />
        <div className="absolute -top-4 right-4 w-0 h-0 border-l-[12px] border-l-transparent border-b-[20px] border-b-purple-700 border-r-[12px] border-r-transparent" />
        
        {/* Ojos */}
        <div className="absolute top-10 left-8 w-6 h-6 bg-white rounded-full">
          <div className="absolute top-1 left-1 w-3 h-3 bg-primary rounded-full" />
        </div>
        <div className="absolute top-10 right-8 w-6 h-6 bg-white rounded-full">
          <div className="absolute top-1 left-1 w-3 h-3 bg-primary rounded-full" />
        </div>
        
        {/* Nariz */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-4 h-3 bg-pink-300 rounded-full" />
        
        {/* Bigotes */}
        <div className="absolute top-16 left-6 w-10 h-0.5 bg-gray-300 transform rotate-12" />
        <div className="absolute top-16 left-5 w-10 h-0.5 bg-gray-300" />
        <div className="absolute top-16 left-5 w-10 h-0.5 bg-gray-300 -rotate-12" />
        <div className="absolute top-16 right-6 w-10 h-0.5 bg-gray-300 -rotate-12" />
        <div className="absolute top-16 right-5 w-10 h-0.5 bg-gray-300" />
        <div className="absolute top-16 right-5 w-10 h-0.5 bg-gray-300 rotate-12" />
      </div>
    </div>
  );
};

export default PsykatAvatar;
// TypeScript Interfaces
interface PsykatAvatarProps {
  /** Estado emocional actual del avatar */
  currentMood?: MoodState;
  /** Tamaño del avatar (pequeño, mediano, grande) */
  size?: 'sm' | 'md' | 'lg';
  /** Si el avatar responde a interacciones del usuario */
  interactive?: boolean;
  /** Callback cuando se hace click en el avatar */
  onClick?: () => void;
  /** Callback cuando cambia el estado de ánimo */
  onMoodChange?: (mood: MoodState) => void;
  /** Clase CSS adicional */
  className?: string;
}

type MoodState = 'idle' | 'happy' | 'curious' | 'sleeping' | 'excited' | 'thinking' | 'celebrating' | 'concerned';

interface ParticleProps {
  x: number;
  y: number;
  delay: number;
  color: string;
}

// Componente de Partículas mejorado
const Particle: React.FC<ParticleProps> = ({ x, y, delay, color }) => (
  <motion.div
    className="absolute rounded-full"
    style={{ backgroundColor: color }}
    initial={{ x, y, opacity: 0, scale: 0 }}
    animate={{
      x: x + (Math.random() - 0.5) * 120,
      y: y - Math.random() * 120,
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
      repeatDelay: 0.5,
      ease: "easeOut",
    }}
  >
    <div className="w-3 h-3" />
  </motion.div>
);

// Componente de Estrella para los ojos
const StarEye: React.FC<{ x: number; y: number; size: number }> = ({ x, y, size }) => (
  <motion.g>
    <motion.path
      d={`M ${x} ${y - size} 
          L ${x + size * 0.3} ${y - size * 0.3} 
          L ${x + size} ${y} 
          L ${x + size * 0.3} ${y + size * 0.3} 
          L ${x} ${y + size} 
          L ${x - size * 0.3} ${y + size * 0.3} 
          L ${x - size} ${y} 
          L ${x - size * 0.3} ${y - size * 0.3} 
          Z`}
      fill="#2d1b69"
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </motion.g>
);

// Componente principal PsykatAvatar
const PsykatAvatar: React.FC<PsykatAvatarProps> = ({
  currentMood = 'idle',
  size = 'md',
  interactive = true,
  onClick,
  onMoodChange,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [blinkTrigger, setBlinkTrigger] = useState(0);

  // Sistema de parpadeo automático
  useEffect(() => {
    if (currentMood === 'sleeping') return;
    
    const blinkInterval = setInterval(() => {
      setBlinkTrigger(prev => prev + 1);
    }, Math.random() * 2000 + 3000);

    return () => clearInterval(blinkInterval);
  }, [currentMood]);



  
  // Dimensiones basadas en tamaño
  const dimensions = useMemo(() => {
    const sizes = {
      sm: { width: 150, height: 150, strokeWidth: 3 },
      md: { width: 250, height: 250, strokeWidth: 4 },
      lg: { width: 350, height: 350, strokeWidth: 5 },
    };
    return sizes[size];
  }, [size]);

  // Configuración de brazos según el estado
  const getArmPositions = useCallback(() => {
    const positions = {
      idle: {
        leftArm: { rotate: 15, x: 0, y: 0 },
        rightArm: { rotate: -15, x: 0, y: 0 },
      },
      happy: {
        leftArm: { rotate: -45, x: -10, y: -15 },
        rightArm: { rotate: 45, x: 10, y: -15 },
      },
      curious: {
        leftArm: { rotate: 20, x: 0, y: 0 },
        rightArm: { rotate: -90, x: 15, y: -20 },
      },
      sleeping: {
        leftArm: { rotate: 45, x: 5, y: 10 },
        rightArm: { rotate: -45, x: -5, y: 10 },
      },
      excited: {
        leftArm: { rotate: -135, x: -20, y: -30 },
        rightArm: { rotate: 135, x: 20, y: -30 },
      },
      thinking: {
        leftArm: { rotate: 25, x: 0, y: 0 },
        rightArm: { rotate: -110, x: 25, y: -35 },
      },
      celebrating: {
        leftArm: { rotate: -160, x: -25, y: -40 },
        rightArm: { rotate: 160, x: 25, y: -40 },
      },
      concerned: {
        leftArm: { rotate: 70, x: 10, y: 5 },
        rightArm: { rotate: -70, x: -10, y: 5 },
      },
    };
    return positions[currentMood];
  }, [currentMood]);

  // Variantes de animación del cuerpo
  const bodyVariants: Record<MoodState, Variants> = {
    idle: {
      animate: {
        y: [0, -8, 0],
        rotate: [0, -2, 2, 0],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    },
    happy: {
      animate: {
        rotate: [-8, 8, -8],
        scale: [1, 1.08, 1],
        y: [0, -10, 0],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    },
    curious: {
      animate: {
        rotate: [0, -20, 0, 20, 0],
        x: [0, -5, 0, 5, 0],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    },
    sleeping: {
      animate: {
        scale: [1, 1.05, 1],
        rotate: [0, 5, 0, -5, 0],
        transition: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    },
    excited: {
      animate: {
        y: [0, -25, 0],
        rotate: [-15, 15, -15],
        scale: [1, 1.1, 1],
        transition: {
          duration: 0.4,
          repeat: Infinity,
          ease: "easeOut",
        },
      },
    },
    thinking: {
      animate: {
        rotate: [0, -5, 0],
        y: [0, -5, 0],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    },
    celebrating: {
      animate: {
        y: [0, -40, 0],
        scale: [1, 1.2, 1],
        rotate: [0, 360],
        transition: {
          duration: 1.2,
          repeat: Infinity,
          ease: "easeOut",
        },
      },
    },
    concerned: {
      animate: {
        x: [-3, 3, -3],
        rotate: [-2, 2, -2],
        transition: {
          duration: 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    },
  };

  // Configuración de expresiones faciales
  const getFacialExpression = useCallback(() => {
    const expressions = {
      idle: {
        eyeType: 'normal',
        eyeScale: 1,
        eyeY: 0,
        pupilSize: 12,
        mouthPath: "M 75 110 Q 100 120 125 110",
        cheekColor: '#ffb3d9',
        cheekOpacity: 0.3,
      },
      happy: {
        eyeType: 'happy',
        eyeScale: 0.3,
        eyeY: -5,
        pupilSize: 0,
        mouthPath: "M 65 110 Q 100 135 135 110",
        cheekColor: '#ff66b3',
        cheekOpacity: 0.6,
      },
      curious: {
        eyeType: 'star',
        eyeScale: 1.3,
        eyeY: -5,
        pupilSize: 15,
        mouthPath: "M 80 115 Q 100 118 120 115",
        cheekColor: '#ffb3d9',
        cheekOpacity: 0.2,
      },
      sleeping: {
        eyeType: 'closed',
        eyeScale: 0.1,
        eyeY: 5,
        pupilSize: 0,
        mouthPath: "M 85 115 Q 100 118 115 115",
        cheekColor: '#ffb3d9',
        cheekOpacity: 0.4,
      },
      excited: {
        eyeType: 'star',
        eyeScale: 1.4,
        eyeY: -10,
        pupilSize: 18,
        mouthPath: "M 60 110 Q 100 140 140 110",
        cheekColor: '#ff1a8c',
        cheekOpacity: 0.7,
      },
      thinking: {
        eyeType: 'normal',
        eyeScale: 0.9,
        eyeY: -3,
        pupilSize: 10,
        mouthPath: "M 80 118 L 120 118",
        cheekColor: '#ffb3d9',
        cheekOpacity: 0.2,
      },
      celebrating: {
        eyeType: 'star',
        eyeScale: 1.2,
        eyeY: -12,
        pupilSize: 14,
        mouthPath: "M 55 110 Q 100 145 145 110",
        cheekColor: '#ff0080',
        cheekOpacity: 0.8,
      },
      concerned: {
        eyeType: 'worried',
        eyeScale: 1.1,
        eyeY: 3,
        pupilSize: 11,
        mouthPath: "M 80 125 Q 100 115 120 125",
        cheekColor: '#cc99ff',
        cheekOpacity: 0.3,
      },
    };
    return expressions[currentMood];
  }, [currentMood]);

  const expression = getFacialExpression();
  const armPositions = getArmPositions();

  // Generar partículas
  const particles = useMemo(() => {
    if (currentMood !== 'celebrating') return [];
    const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4ecdc4', '#a78bfa', '#ff1a8c'];
    return Array.from({ length: 12 }, (_, i) => ({
      x: Math.cos((i / 12) * Math.PI * 2) * 60,
      y: Math.sin((i / 12) * Math.PI * 2) * 60,
      delay: i * 0.08,
      color: colors[i % colors.length],
    }));
  }, [currentMood]);

  const handleClick = useCallback(() => {
    if (interactive && onClick) {
      onClick();
    }
  }, [interactive, onClick]);

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ width: dimensions.width, height: dimensions.height }}
      aria-label={`PSYKAT avatar en estado ${currentMood}`}
      role="img"
    >
      <motion.div
        className="relative w-full h-full cursor-pointer select-none"
        variants={bodyVariants[currentMood]}
        animate="animate"
        whileHover={interactive ? { scale: 1.05 } : {}}
        whileTap={interactive ? { scale: 0.95 } : {}}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <svg
          width={dimensions.width}
          height={dimensions.height}
          viewBox="0 0 200 200"
          className="overflow-visible"
        >
          <defs>
            {/* Gradientes para hacer el diseño más atractivo */}
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#8b7ec8" />
            </linearGradient>
            <radialGradient id="bellyGradient">
              <stop offset="0%" stopColor="#e9d5ff" />
              <stop offset="100%" stopColor="#c4b5fd" />
            </radialGradient>
            <filter id="softShadow">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
              <feOffset dx="0" dy="2" result="offsetblur"/>
              <feFlood floodColor="#000000" floodOpacity="0.1"/>
              <feComposite in2="offsetblur" operator="in"/>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Sombra */}
          <ellipse
            cx="100"
            cy="175"
            rx="70"
            ry="20"
            fill="rgba(0,0,0,0.08)"
            className={currentMood === 'excited' || currentMood === 'celebrating' ? 'animate-pulse' : ''}
          />

          {/* Cuerpo principal */}
          <motion.g filter="url(#softShadow)">
            {/* Cola más expresiva */}
            <motion.path
              d="M 45 130 Q 15 110 10 80 Q 8 50 25 40 Q 40 35 50 50"
              fill="none"
              stroke="url(#bodyGradient)"
              strokeWidth={dimensions.strokeWidth}
              strokeLinecap="round"
              animate={{
                d: currentMood === 'excited' 
                  ? ["M 45 130 Q 15 110 10 80 Q 8 50 25 40 Q 40 35 50 50", 
                     "M 45 130 Q 10 100 5 70 Q 3 40 20 30 Q 35 25 45 40",
                     "M 45 130 Q 15 110 10 80 Q 8 50 25 40 Q 40 35 50 50"]
                  : currentMood === 'happy'
                  ? ["M 45 130 Q 15 110 10 80 Q 8 50 25 40 Q 40 35 50 50",
                     "M 45 130 Q 18 108 13 78 Q 11 48 28 38 Q 43 33 53 48",
                     "M 45 130 Q 15 110 10 80 Q 8 50 25 40 Q 40 35 50 50"]
                  : "M 45 130 Q 15 110 10 80 Q 8 50 25 40 Q 40 35 50 50",
              }}
              transition={{
                duration: currentMood === 'excited' ? 0.3 : 2,
                repeat: currentMood === 'excited' || currentMood === 'happy' ? Infinity : 0,
              }}
            />

            {/* Brazo izquierdo */}
            <motion.g
              animate={{
                rotate: armPositions.leftArm.rotate,
                x: armPositions.leftArm.x,
                y: armPositions.leftArm.y,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ transformOrigin: '70px 120px' }}
            >
              <ellipse
                cx="55"
                cy="125"
                rx="20"
                ry="35"
                fill="url(#bodyGradient)"
                transform="rotate(-25 55 125)"
              />
              {/* Manito */}
              <circle cx="45" cy="145" r="12" fill="#e9d5ff" />
              <circle cx="42" cy="143" r="2" fill="#8b7ec8" />
              <circle cx="48" cy="143" r="2" fill="#8b7ec8" />
              <circle cx="45" cy="148" r="2" fill="#8b7ec8" />
            </motion.g>

            {/* Brazo derecho */}
            <motion.g
              animate={{
                rotate: armPositions.rightArm.rotate,
                x: armPositions.rightArm.x,
                y: armPositions.rightArm.y,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ transformOrigin: '130px 120px' }}
            >
              <ellipse
                cx="145"
                cy="125"
                rx="20"
                ry="35"
                fill="url(#bodyGradient)"
                transform="rotate(25 145 125)"
              />
              {/* Manito */}
              <circle cx="155" cy="145" r="12" fill="#e9d5ff" />
              <circle cx="152" cy="143" r="2" fill="#8b7ec8" />
              <circle cx="158" cy="143" r="2" fill="#8b7ec8" />
              <circle cx="155" cy="148" r="2" fill="#8b7ec8" />
            </motion.g>

            {/* Cuerpo con forma más redondeada y adorable */}
            <ellipse
              cx="100"
              cy="125"
              rx="55"
              ry="50"
              fill="url(#bodyGradient)"
            />

            {/* Barriguita */}
            <ellipse
              cx="100"
              cy="135"
              rx="40"
              ry="35"
              fill="url(#bellyGradient)"
            />

            {/* Patitas */}
            <ellipse cx="75" cy="165" rx="18" ry="25" fill="#8b7ec8" />
            <ellipse cx="125" cy="165" rx="18" ry="25" fill="#8b7ec8" />
            
            {/* Almohadillas de las patitas */}
            <ellipse cx="75" cy="170" rx="10" ry="8" fill="#e9d5ff" />
            <ellipse cx="125" cy="170" rx="10" ry="8" fill="#e9d5ff" />

            {/* Cabeza más grande y expresiva */}
            <motion.g>
              {/* Orejas más grandes y expresivas */}
              <motion.g
                animate={{
                  rotate: currentMood === 'concerned' ? 10 : currentMood === 'happy' ? -10 : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                <path
                  d="M 60 65 Q 55 30 65 25 Q 75 20 80 40 L 75 70 Z"
                  fill="url(#bodyGradient)"
                  stroke="#7c6bb3"
                  strokeWidth="2"
                />
                <path
                  d="M 140 65 Q 145 30 135 25 Q 125 20 120 40 L 125 70 Z"
                  fill="url(#bodyGradient)"
                  stroke="#7c6bb3"
                  strokeWidth="2"
                />
                
                {/* Interior de las orejas */}
                <path
                  d="M 65 60 Q 62 40 68 38 Q 72 36 74 45 L 72 65 Z"
                  fill="#ffb3d9"
                  opacity="0.6"
                />
                <path
                  d="M 135 60 Q 138 40 132 38 Q 128 36 126 45 L 128 65 Z"
                  fill="#ffb3d9"
                  opacity="0.6"
                />
              </motion.g>

              {/* Cara más grande */}
              <circle
                cx="100"
                cy="85"
                r="50"
                fill="url(#bodyGradient)"
              />

              {/* Mejillas adorables */}
              <motion.circle 
                cx="65" 
                cy="95" 
                r="12" 
                fill={expression.cheekColor} 
                opacity={expression.cheekOpacity}
                animate={{
                  scale: currentMood === 'happy' || currentMood === 'excited' ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 1,
                  repeat: currentMood === 'happy' || currentMood === 'excited' ? Infinity : 0,
                }}
              />
              <motion.circle 
                cx="135" 
                cy="95" 
                r="12" 
                fill={expression.cheekColor} 
                opacity={expression.cheekOpacity}
                animate={{
                  scale: currentMood === 'happy' || currentMood === 'excited' ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: 1,
                  repeat: currentMood === 'happy' || currentMood === 'excited' ? Infinity : 0,
                }}
              />

              {/* Ojos más expresivos */}
              <motion.g
                animate={{
                  scaleY: blinkTrigger && currentMood !== 'sleeping' ? [1, 0.1, 1] : expression.eyeScale,
                  y: expression.eyeY,
                }}
                transition={{
                  duration: blinkTrigger ? 0.15 : 0.5,
                }}
              >
                {expression.eyeType === 'star' ? (
                  <>
                    <StarEye x={78} y={85} size={8} />
                    <StarEye x={122} y={85} size={8} />
                  </>
                ) : expression.eyeType === 'happy' ? (
                  <>
                    <path d="M 70 85 Q 78 78 86 85" fill="none" stroke="#2d1b69" strokeWidth="4" strokeLinecap="round" />
                    <path d="M 114 85 Q 122 78 130 85" fill="none" stroke="#2d1b69" strokeWidth="4" strokeLinecap="round" />
                  </>
                ) : expression.eyeType === 'worried' ? (
                  <>
                    <ellipse cx="78" cy="85" rx="12" ry="14" fill="#2d1b69" />
                    <ellipse cx="122" cy="85" rx="12" ry="14" fill="#2d1b69" />
                    <path d="M 66 75 L 85 80" stroke="#2d1b69" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 134 75 L 115 80" stroke="#2d1b69" strokeWidth="3" strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    <ellipse cx="78" cy="85" rx="12" ry="14" fill="#2d1b69" />
                    <ellipse cx="122" cy="85" rx="12" ry="14" fill="#2d1b69" />
                  </>
                )}
                
                {/* Pupilas y brillos */}
                {expression.pupilSize > 0 && currentMood !== 'sleeping' && expression.eyeType === 'normal' && (
                  <>
                    <circle cx="78" cy="85" r={expression.pupilSize} fill="#1a0f3d" />
                    <circle cx="122" cy="85" r={expression.pupilSize} fill="#1a0f3d" />
                    <circle cx="82" cy="82" r="4" fill="white" opacity="0.9" />
                    <circle cx="126" cy="82" r="4" fill="white" opacity="0.9" />
                    <circle cx="75" cy="88" r="2" fill="white" opacity="0.6" />
                    <circle cx="119" cy="88" r="2" fill="white" opacity="0.6" />
                  </>
                )}
              </motion.g>

              {/* Nariz más cute */}
              <motion.g
                animate={{
                  y: currentMood === 'excited' ? [-2, 2, -2] : 0,
                }}
                transition={{
                  duration: 0.3,
                  repeat: currentMood === 'excited' ? Infinity : 0,
                }}
              >
                <ellipse cx="100" cy="100" rx="8" ry="6" fill="#6b5ca5" />
                <ellipse cx="100" cy="98" rx="4" ry="3" fill="#8b7ec8" opacity="0.5" />
              </motion.g>

              {/* Boca más expresiva */}
              <motion.path
                d={expression.mouthPath}
                fill="none"
                stroke="#6b5ca5"
                strokeWidth="4"
                strokeLinecap="round"
                animate={{
                  d: expression.mouthPath,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Bigotes más dinámicos */}
              <motion.g
                animate={{
                  x: isHovered ? [-2, 2, -2] : 0,
                  rotate: currentMood === 'happy' ? [0, -5, 0] : 0,
                }}
                transition={{
                  duration: 2,
                  repeat: isHovered || currentMood === 'happy' ? Infinity : 0,
                }}
              >
                <line x1="25" y1="95" x2="55" y2="92" stroke="#6b5ca5" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="25" y1="105" x2="55" y2="102" stroke="#6b5ca5" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="145" y1="92" x2="175" y2="95" stroke="#6b5ca5" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="145" y1="102" x2="175" y2="105" stroke="#6b5ca5" strokeWidth="2.5" strokeLinecap="round" />
              </motion.g>

              {/* Elementos especiales según el estado */}
              
              {/* Z's mejoradas para sleeping */}
              {currentMood === 'sleeping' && (
                <>
                  <motion.text
                    x="140"
                    y="60"
                    fontSize="20"
                    fill="#a78bfa"
                    fontWeight="bold"
                    fontFamily="Comic Sans MS, cursive"
                    animate={{
                      opacity: [0, 1, 0],
                      y: [0, -20],
                      x: [0, 10],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  >
                    Z
                  </motion.text>
                  <motion.text
                    x="150"
                    y="50"
                    fontSize="14"
                    fill="#c4b5fd"
                    fontWeight="bold"
                    fontFamily="Comic Sans MS, cursive"
                    animate={{
                      opacity: [0, 1, 0],
                      y: [0, -20],
                      x: [0, 10],
                    }}
                    transition={{
                      duration: 2,
                      delay: 0.5,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  >
                    z
                  </motion.text>
                </>
              )}

              {/* Corazones más adorables para happy */}
              {currentMood === 'happy' && (
                <>
                  <motion.g
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.2, 0.5],
                      y: [-5, -25],
                      rotate: [-15, 15, -15],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  >
                    <path
                      d="M 140 55 C 140 48, 133 43, 127 43 C 121 43, 118 48, 118 55 C 118 48, 115 43, 109 43 C 103 43, 96 48, 96 55 Q 118 75, 118 75 Q 140 55, 140 55 Z"
                      fill="#ff66b3"
                    />
                  </motion.g>
                  <motion.g
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0.5],
                      y: [-5, -20],
                      x: [-40, -50],
                      rotate: [15, -15, 15],
                    }}
                    transition={{
                      duration: 2,
                      delay: 0.5,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  >
                    <path
                      d="M 60 60 C 60 56, 56 53, 52 53 C 48 53, 46 56, 46 60 C 46 56, 44 53, 40 53 C 36 53, 32 56, 32 60 Q 46 72, 46 72 Q 60 60, 60 60 Z"
                      fill="#ff1a8c"
                    />
                  </motion.g>
                </>
              )}

              {/* Signos de interrogación más dinámicos para curious */}
              {currentMood === 'curious' && (
                <>
                  <motion.text
                    x="140"
                    y="50"
                    fontSize="24"
                    fill="#a78bfa"
                    fontWeight="bold"
                    fontFamily="Comic Sans MS, cursive"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      rotate: [-20, 20, -20],
                      y: [50, 45, 50],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    ?
                  </motion.text>
                  <motion.text
                    x="50"
                    y="55"
                    fontSize="18"
                    fill="#c4b5fd"
                    fontWeight="bold"
                    fontFamily="Comic Sans MS, cursive"
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                      rotate: [20, -20, 20],
                      y: [55, 50, 55],
                    }}
                    transition={{
                      duration: 2,
                      delay: 0.5,
                      repeat: Infinity,
                    }}
                  >
                    ?
                  </motion.text>
                </>
              )}

              {/* Gotitas de sudor más expresivas para concerned */}
              {currentMood === 'concerned' && (
                <>
                  <motion.g
                    animate={{
                      y: [0, 15, 30],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 0.5,
                    }}
                  >
                    <path
                      d="M 55 70 Q 52 65, 55 60 Q 58 65, 55 70 Z"
                      fill="#4fc3f7"
                    />
                  </motion.g>
                  <motion.g
                    animate={{
                      y: [0, 15, 30],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 0.3,
                      repeat: Infinity,
                      repeatDelay: 0.5,
                    }}
                  >
                    <path
                      d="M 145 72 Q 143 68, 145 64 Q 147 68, 145 72 Z"
                      fill="#4fc3f7"
                    />
                  </motion.g>
                </>
              )}

              {/* Estrellitas y chispas para excited */}
              {currentMood === 'excited' && (
                <>
                  {[0, 1, 2, 3].map((i) => (
                    <motion.g
                      key={i}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 1,
                        delay: i * 0.25,
                        repeat: Infinity,
                      }}
                    >
                      <path
                        d={`M ${60 + i * 30} ${40 + i * 10} l 2 6 l 6 2 l -6 2 l -2 6 l -2 -6 l -6 -2 l 6 -2 z`}
                        fill="#ffd93d"
                      />
                    </motion.g>
                  ))}
                </>
              )}

              {/* Bombillita para thinking */}
              {currentMood === 'thinking' && (
                <motion.g
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0.5, 1, 0.5], 
                    scale: [0.8, 1, 0.8],
                    y: [-5, -10, -5],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <circle cx="130" cy="40" r="12" fill="#ffd93d" />
                  <rect x="126" y="48" width="8" height="6" fill="#ffb347" rx="1" />
                  <line x1="127" y1="38" x2="133" y2="38" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                  <line x1="130" y1="35" x2="130" y2="41" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                </motion.g>
              )}
            </motion.g>
          </motion.g>
        </svg>

        {/* Partículas festivas para celebrating */}
        <AnimatePresence>
          {currentMood === 'celebrating' && (
            <div className="absolute inset-0 pointer-events-none">
              {particles.map((particle, index) => (
                <Particle key={index} {...particle} />
              ))}
              
              {/* Confeti adicional */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`confetti-${i}`}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: '10px',
                    height: '10px',
                    backgroundColor: ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4ecdc4', '#a78bfa', '#ff1a8c'][i],
                  }}
                  animate={{
                    x: [0, (Math.random() - 0.5) * 200],
                    y: [0, -Math.random() * 150 - 50],
                    rotate: [0, Math.random() * 720],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Notas musicales mejoradas para happy */}
        {currentMood === 'happy' && (
          <motion.div
            className="absolute bottom-5 left-1/2 transform -translate-x-1/2"
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <div className="flex gap-2 text-xl text-purple-500 font-bold">
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
              >
                ♪
              </motion.span>
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
              >
                ♫
              </motion.span>
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: 0.4 }}
              >
                ♪
              </motion.span>
            </div>
          </motion.div>
        )}

        {/* Efecto de hover adicional */}
        {isHovered && interactive && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-gradient-radial from-purple-400/20 to-transparent animate-pulse" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

// Ejemplo de uso mejorado
export default function App() {
  const [mood, setMood] = useState<MoodState>('idle');
  const moods: MoodState[] = ['idle', 'happy', 'curious', 'sleeping', 'excited', 'thinking', 'celebrating', 'concerned'];

  // Auto-rotate para demo
  const [autoRotate, setAutoRotate] = useState(false);

  useEffect(() => {
    if (autoRotate) {
      const interval = setInterval(() => {
        setMood((prev) => {
          const currentIndex = moods.indexOf(prev);
          return moods[(currentIndex + 1) % moods.length];
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [autoRotate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
            PSYKAT Avatar
          </h1>
          <p className="text-gray-600 text-lg">Tu compañero de bienestar psicológico</p>
        </div>
        
        {/* Avatar principal */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 mb-8">
          <div className="flex justify-center mb-8">
            <PsykatAvatar
              currentMood={mood}
              size="lg"
              interactive={true}
              onClick={() => {
                console.log('¡PSYKAT dice hola! 💜');
                // Cambiar a un estado aleatorio al hacer click
                const randomMood = moods[Math.floor(Math.random() * moods.length)];
                setMood(randomMood);
              }}
            />
          </div>
          
          {/* Estado actual */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Estado: <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 capitalize">{mood}</span>
            </h2>
            <p className="text-gray-600">Click en PSYKAT para un estado aleatorio</p>
          </div>
          
          {/* Controles de estado */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {moods.map((moodOption) => (
              <button
                key={moodOption}
                onClick={() => setMood(moodOption)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all transform hover:scale-105 ${
                  mood === moodOption
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
              >
                {moodOption.charAt(0).toUpperCase() + moodOption.slice(1)}
              </button>
            ))}
          </div>

          {/* Auto-rotate toggle */}
          <div className="flex justify-center">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                autoRotate
                  ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {autoRotate ? '⏸ Pausar Demo' : '▶️ Demo Automática'}
            </button>
          </div>
        </div>

        {/* Showcase de tamaños */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Tamaños disponibles</h3>
          <div className="flex justify-around items-end gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
                <PsykatAvatar currentMood="happy" size="sm" />
              </div>
              <p className="mt-3 font-semibold text-gray-700">Pequeño</p>
              <p className="text-sm text-gray-500">150x150px</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
                <PsykatAvatar currentMood="curious" size="md" />
              </div>
              <p className="mt-3 font-semibold text-gray-700">Mediano</p>
              <p className="text-sm text-gray-500">250x250px</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
                <PsykatAvatar currentMood="excited" size="lg" />
              </div>
              <p className="mt-3 font-semibold text-gray-700">Grande</p>
              <p className="text-sm text-gray-500">350x350px</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
