import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

export default function SizeGuideModal({ isOpen, onClose }) {
  const [unit, setUnit] = useState('inches'); // 'inches' | 'cm'

  if (!isOpen) return null;

  const sizeData = [
    { size: 'S', chestIn: '40', lengthIn: '28', shoulderIn: '20', chestCm: '102', lengthCm: '71', shoulderCm: '51' },
    { size: 'M', chestIn: '42', lengthIn: '29', shoulderIn: '21', chestCm: '107', lengthCm: '74', shoulderCm: '53' },
    { size: 'L', chestIn: '44', lengthIn: '30', shoulderIn: '22', chestCm: '112', lengthCm: '76', shoulderCm: '56' },
    { size: 'XL', chestIn: '46', lengthIn: '31', shoulderIn: '23', chestCm: '117', lengthCm: '79', shoulderCm: '58' },
    { size: 'XXL', chestIn: '48', lengthIn: '32', shoulderIn: '24', chestCm: '122', lengthCm: '81', shoulderCm: '61' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-brand-surface border border-brand-border rounded-3xl p-6 md:p-8 shadow-card-rich overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-brand-border">
            <div>
              <span className="text-xs font-heading font-semibold uppercase tracking-widest text-brand-secondary">Atelier Sizing Guide</span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-brand-light tracking-tight mt-1">
                OVERSIZED BOXY FIT
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-brand-muted hover:text-brand-light hover:bg-brand-elevated rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Unit Toggle & Description */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-5">
            <p className="text-sm text-brand-muted max-w-md font-body">
              Designed with a relaxed drop-shoulder and wider chest. For a true oversized look, select your usual size. For a standard fit, size down one size.
            </p>
            <div className="flex items-center bg-brand-dark p-1 rounded-xl border border-brand-border shrink-0 self-start sm:self-auto">
              <button
                onClick={() => setUnit('inches')}
                className={`px-3.5 py-1 text-xs font-heading font-bold rounded-lg transition-colors ${unit === 'inches' ? 'bg-brand-primary text-white shadow-sm' : 'text-brand-muted hover:text-brand-light'}`}
              >
                INCHES
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3.5 py-1 text-xs font-heading font-bold rounded-lg transition-colors ${unit === 'cm' ? 'bg-brand-primary text-white shadow-sm' : 'text-brand-muted hover:text-brand-light'}`}
              >
                CM
              </button>
            </div>
          </div>

          {/* Size Table */}
          <div className="overflow-x-auto border border-brand-border rounded-2xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-brand-dark text-xs font-heading uppercase text-brand-muted border-b border-brand-border">
                <tr>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Chest</th>
                  <th className="py-3 px-4">Length</th>
                  <th className="py-3 px-4">Shoulder Drop</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border font-mono text-xs">
                {sizeData.map((row) => (
                  <tr key={row.size} className="hover:bg-brand-elevated/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-brand-light font-display text-sm">{row.size}</td>
                    <td className="py-3 px-4 text-brand-chalk">{unit === 'inches' ? `${row.chestIn}"` : `${row.chestCm} cm`}</td>
                    <td className="py-3 px-4 text-brand-chalk">{unit === 'inches' ? `${row.lengthIn}"` : `${row.lengthCm} cm`}</td>
                    <td className="py-3 px-4 text-brand-chalk">{unit === 'inches' ? `${row.shoulderIn}"` : `${row.shoulderCm} cm`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Fit recommendations */}
          <div className="mt-6 pt-5 border-t border-brand-border grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-brand-muted font-body">
            <div className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
              <span>Fabric is pre-shrunk to ensure 0% shrinkage after washing.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
              <span>Male model is 6'1" (185cm) wearing Size XL. Female model is 5'7" (170cm) wearing Size M.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
