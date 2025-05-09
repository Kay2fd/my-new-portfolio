import type { ReactNode } from 'react';
import { useTheme } from '../../../context/ThemeProvider';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    fullWidth?: boolean;
}

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick,
    type = 'button',
    disabled = false,
    fullWidth = false,
}: ButtonProps) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none transition-all duration-200 shadow-md backdrop-blur-sm';

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    const getVariantClasses = () => {
        if (variant === 'primary') {
            return isDarkMode 
                ? 'bg-blue-900/10 hover:bg-blue/10 text-blue-400 border border-blue-800/50 hover:shadow-blue-900/20 hover:shadow-lg' 
                : 'bg-blue-500/90 hover:bg-blue-600/90 text-white border border-blue-400/50 hover:shadow-blue-500/30 hover:shadow-lg';
        } else if (variant === 'secondary') {
            return isDarkMode 
                ? 'bg-[#0f0f1a]/70 hover:bg-[#0f0f1a]/80 text-gray-200 border border-gray-700/50 hover:shadow-gray-900/20 hover:shadow-lg' 
                : 'bg-[#e6f7ee]/70 hover:bg-[#e6f7ee]/80 text-blue-700 border border-blue-200/50 hover:shadow-blue-200/30 hover:shadow-lg';
        } else if (variant === 'outline') {
            return isDarkMode 
                ? 'bg-transparent hover:bg-[#1a1a2f]/30 text-blue-400 border border-blue-700 hover:shadow-blue-900/20 hover:shadow-lg' 
                : 'bg-transparent hover:bg-blue-50/50 text-blue-600 border border-blue-400 hover:shadow-blue-200/30 hover:shadow-lg';
        } else if (variant === 'text') {
            return isDarkMode 
                ? 'bg-transparent hover:bg-blue/30 text-blue-400 hover:shadow-blue-900/10 hover:shadow-md' 
                : 'bg-transparent hover:bg-blue-50/50 text-blue-600 hover:shadow-blue-200/20 hover:shadow-md';
        }
        return '';
    };

    const disabledClasses = disabled 
        ? 'opacity-50 cursor-not-allowed' 
        : 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]';
    
    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <button
            type={type}
            className={`${baseClasses} ${sizeClasses[size]} ${getVariantClasses()} ${disabledClasses} ${widthClass} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;