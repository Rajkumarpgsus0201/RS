import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-brand-volt shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-brand-orange shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-400 shrink-0" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
      <AnimatePresence>
        <motion.div
          key={toastMessage.id}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="pointer-events-auto flex items-center gap-3 px-5 py-3.5 bg-brand-surface border border-brand-border rounded-lg shadow-2xl backdrop-blur-xl text-brand-light text-sm font-medium"
        >
          {icons[toastMessage.type] || icons.info}
          <span>{toastMessage.message}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
