import { Suspense, type ReactNode, lazy, type ComponentType } from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
    >
        <div className="flex flex-col items-center gap-8">
            <div className="relative w-32 h-32">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                >
                    <div className="w-full h-full rounded-full border-4 border-blue-500/30" />
                    <div className="absolute inset-0 rounded-full border-t-4 border-r-4 border-blue-500">
                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-full h-full"
                        />
                    </div>
                </motion.div>

                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2"
                >
                    <div className="w-full h-full rounded-full border-4 border-blue-400" />
                    <div className="absolute inset-0 rounded-full border-b-4 border-l-4 border-blue-400">
                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.2, repeat: Infinity }}
                            className="w-full h-full"
                        />
                    </div>
                </motion.div>

                <motion.div
                    animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full blur-md" />
                </motion.div>
            </div>
            <div className="space-y-2 text-center">
                <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-blue-400 font-bold text-xl tracking-wider"
                >
                    LOADING
                </motion.div>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                />
            </div>
        </div>
    </motion.div>
);

interface LazyLoadProps {
    children: ReactNode;
}

const LazyLoad = ({ children }: LazyLoadProps) => {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </Suspense>
    );
};

export const lazyLoadComponent = (importFunc: () => Promise<{ default: ComponentType<any> }>) => {
    const LazyComponent = lazy(importFunc);
    return (
        <LazyLoad>
            <LazyComponent />
        </LazyLoad>
    );
};

export default LazyLoad;
