import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Download, Copy, Check, ExternalLink, Sparkles, Image as ImageIcon, Share2 } from 'lucide-react';
import { downloadMockupFile, copyMockupToClipboard, shareMockupDirectly } from '../../utils/mockupGenerator';
import { BRAND_CONFIG } from '../../data/products';

export default function MockupShareModal({
  isOpen,
  onClose,
  mockupDataUrl,
  mockupBlob,
  orderMessage,
  apparelTitle,
  price
}) {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen || !mockupDataUrl) return null;

  const handleDownloadAgain = () => {
    if (mockupBlob) {
      downloadMockupFile(mockupBlob, `RADNUZ-${apparelTitle.replace(/[^a-zA-Z0-9]/g, '_')}-Mockup.png`);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2500);
    }
  };

  const handleCopyImage = async () => {
    if (mockupBlob) {
      const success = await copyMockupToClipboard(mockupBlob);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } else {
        // Fallback to downloading
        handleDownloadAgain();
      }
    }
  };

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(orderMessage);
    const waUrl = `https://wa.me/${BRAND_CONFIG.businessWhatsApp}?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  const handleNativeShare = async () => {
    if (mockupBlob) {
      const shared = await shareMockupDirectly({
        blob: mockupBlob,
        text: orderMessage,
        title: apparelTitle
      });
      if (!shared) {
        handleOpenWhatsApp();
      }
    } else {
      handleOpenWhatsApp();
    }
  };

  const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share && !!navigator.canShare;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-brand-surface border border-brand-border rounded-3xl shadow-card-rich flex flex-col max-h-[92vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border bg-brand-dark/80 shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-secondary" />
              <div>
                <span className="text-[10px] font-mono text-brand-secondary uppercase font-bold tracking-wider">
                  CUSTOM 1-OF-1 MOCKUP GENERATED
                </span>
                <h3 className="text-sm sm:text-base font-display font-black text-brand-light uppercase">
                  {apparelTitle}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-brand-muted hover:text-brand-light hover:bg-brand-elevated rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5 no-scrollbar">
            {/* Visual Guide Banner */}
            <div className="p-4 rounded-2xl bg-brand-primary/10 border border-brand-primary/30 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-brand-primary/20 flex items-center justify-center shrink-0 text-brand-secondary mt-0.5">
                <ImageIcon className="w-4 h-4" />
              </div>
              <div className="text-xs text-brand-light space-y-1">
                <p className="font-heading font-black uppercase text-brand-secondary">
                  📸 YOUR CUSTOM DESIGN IMAGE IS READY!
                </p>
                <p className="text-brand-muted font-body leading-relaxed text-[11px] sm:text-xs">
                  We have saved your edited custom design picture to your device. When WhatsApp opens with your order details, simply <strong>attach/send this image</strong> in the chat to confirm your print!
                </p>
              </div>
            </div>

            {/* Mockup Image Preview Card */}
            <div className="relative rounded-2xl overflow-hidden border border-brand-border bg-brand-dark flex items-center justify-center p-3 group shadow-inner">
              <img
                src={mockupDataUrl}
                alt="Your Custom Apparel Mockup"
                className="max-h-[300px] sm:max-h-[350px] w-auto object-contain rounded-xl shadow-md transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute bottom-4 right-4 bg-brand-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[10px] font-mono text-brand-chalk">
                Price: ₹{price}
              </div>
            </div>

            {/* 2-Step Action Instructions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-brand-dark/60 border border-brand-border/70 space-y-1">
                <div className="flex items-center gap-1.5 font-heading font-bold text-brand-light">
                  <span className="w-4 h-4 rounded-full bg-brand-primary text-white font-mono text-[10px] flex items-center justify-center">1</span>
                  <span>Picture Saved to Device</span>
                </div>
                <p className="text-[11px] text-brand-muted pl-5 font-body">
                  Image auto-downloaded to your gallery & copied to clipboard.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-brand-dark/60 border border-brand-border/70 space-y-1">
                <div className="flex items-center gap-1.5 font-heading font-bold text-brand-light">
                  <span className="w-4 h-4 rounded-full bg-brand-primary text-white font-mono text-[10px] flex items-center justify-center">2</span>
                  <span>Attach in WhatsApp Chat</span>
                </div>
                <p className="text-[11px] text-brand-muted pl-5 font-body">
                  Open WhatsApp and tap 📎 (Paperclip / Gallery) to send the picture!
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="p-4 sm:p-5 bg-brand-dark/95 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleDownloadAgain}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-brand-elevated hover:bg-brand-border text-brand-light border border-brand-border text-xs font-heading font-bold transition-colors"
                title="Save picture again"
              >
                <Download className="w-3.5 h-3.5 text-brand-secondary" />
                <span>{downloaded ? 'Saved ✓' : 'Download Image'}</span>
              </button>

              <button
                onClick={handleCopyImage}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-brand-elevated hover:bg-brand-border text-brand-light border border-brand-border text-xs font-heading font-bold transition-colors"
                title="Copy picture to paste in WhatsApp"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied ✓' : 'Copy'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {canNativeShare && (
                <button
                  onClick={handleNativeShare}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-brand-primary hover:bg-brand-primaryLight text-white text-xs font-heading font-black tracking-wider uppercase transition-all shadow-glow-primary"
                >
                  <Share2 className="w-4 h-4 text-brand-accent" />
                  <span>SHARE ON WHATSAPP</span>
                </button>
              )}

              <button
                onClick={handleOpenWhatsApp}
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-white text-xs font-heading font-black tracking-wider uppercase transition-all ${
                  canNativeShare
                    ? 'bg-brand-elevated hover:bg-brand-border text-brand-light border border-brand-border'
                    : 'bg-brand-primary hover:bg-brand-primaryLight shadow-glow-primary'
                }`}
              >
                <MessageSquare className="w-4 h-4 text-brand-accent" />
                <span>OPEN WHATSAPP CHAT</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
