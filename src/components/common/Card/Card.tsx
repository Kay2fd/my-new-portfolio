import React from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { useTheme } from '../../../context/ThemeProvider';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'outlined' | 'elevated' | 'glass';
    hoverEffect?: boolean;
    clickable?: boolean;
    motionProps?: MotionProps;
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
    variant = 'default',
    hoverEffect = true,
    clickable = false,
    motionProps,
    className = '',
    children,
    ...rest
}) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    const baseClasses = 'rounded-xl transition-all duration-300';

    const variantClasses = {
        default: isDarkMode
            ? 'bg-blue-900/10 border border-blue-800/30'
            : 'bg-blue-50/50 border border-blue-200',

        outlined: isDarkMode
            ? 'bg-transparent border border-blue-700/40'
            : 'bg-transparent border border-blue-300',

        elevated: isDarkMode
            ? 'bg-blue-950/40 border border-blue-900/20 shadow-md'
            : 'bg-white border border-blue-100 shadow-md',

        glass: isDarkMode
            ? 'bg-blue-900/10 backdrop-blur-sm border border-blue-800/30'
            : 'bg-blue-50/50 backdrop-blur-sm border border-blue-200/50',
    };

    const hoverClasses = hoverEffect
        ? isDarkMode
            ? 'hover:bg-blue-900/20 hover:shadow-lg hover:-translate-y-1'
            : 'hover:bg-blue-100/70 hover:shadow-lg hover:-translate-y-1'
        : '';

    const clickableClasses = clickable ? 'cursor-pointer' : '';

    const cardClasses = `
    ${baseClasses} 
    ${variantClasses[variant]} 
    ${hoverClasses} 
    ${clickableClasses} 
    ${className}
  `.trim();

    return (
        <motion.div
            className={cardClasses}
            {...motionProps}
            {...(rest as MotionProps)}
        >
            {children}  
        </motion.div>
    );
};
export default Card;
