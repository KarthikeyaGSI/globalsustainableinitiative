import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      window.location.href = `mailto:customerrelations.gsi@gmail.com?subject=Chat Inquiry&body=${encodeURIComponent(message)}`;
      setMessage('');
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full shadow-lg flex items-center justify-center text-white z-50"
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden z-50"
          >
            <div className="bg-gradient-to-r from-emerald-400 to-blue-500 p-4 flex justify-between items-center">
              <h3 className="text-white font-semibold">Chat with us</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you?"
                className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-white/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10 resize-none"
                required
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full mt-3 bg-gradient-to-r from-emerald-400 to-blue-500 text-white py-2 rounded-xl flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}