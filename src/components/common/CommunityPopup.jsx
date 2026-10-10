import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, MessageCircle, X } from 'lucide-react';
import { BRAND_CONFIG } from '../../data/products';

export default function CommunityPopup({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="community-popup-title"
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-brand-primary/50 bg-brand-surface shadow-card-rich"
          >
            <button
              onClick={onClose}
              aria-label="Close WhatsApp community popup"
              className="absolute right-4 top-4 z-10 rounded-xl p-2 text-brand-muted transition-colors hover:bg-brand-elevated hover:text-brand-light"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="bg-gradient-to-br from-brand-primary/35 via-brand-dark to-brand-surface px-6 pb-7 pt-8 text-center sm:px-8">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary text-white shadow-glow-primary">
                <MessageCircle className="h-7 w-7" />
              </div>
              <p className="mb-2 text-[10px] font-heading font-black uppercase tracking-[0.25em] text-brand-secondary">
                RADNUZ COMMUNITY
              </p>
              <h2 id="community-popup-title" className="text-2xl font-display font-black uppercase tracking-tight text-brand-light">
                Join our WhatsApp community
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                Get new drop alerts, exclusive updates, and connect with the RADNUZ family.
              </p>

              <a
                href={BRAND_CONFIG.whatsappCommunity}
                target="_blank"
                rel="noreferrer"
                onClick={onClose}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-xs font-heading font-black uppercase tracking-wider text-white transition-colors hover:bg-brand-primaryLight"
              >
                Join WhatsApp Community
                <ExternalLink className="h-4 w-4" />
              </a>
              <button
                onClick={onClose}
                className="mt-3 text-xs font-heading font-bold uppercase tracking-wider text-brand-muted transition-colors hover:text-brand-light"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
