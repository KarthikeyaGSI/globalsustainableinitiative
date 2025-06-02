import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl"
          >
            <h2 className="text-2xl font-bold text-red-400 mb-4">Something went wrong</h2>
            <p className="text-slate-300 mb-6">We're sorry for the inconvenience. Please try refreshing the page.</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-400 text-white rounded-full hover:bg-emerald-500 transition-colors duration-300"
            >
              <RefreshCw size={20} />
              Refresh Page
            </motion.button>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;