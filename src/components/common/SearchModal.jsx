import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/products';

export default function SearchModal({ isOpen, onClose, onSelectProduct }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = query.trim() === ''
    ? []
    : PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );

  const quickCategories = ['Streetwear', 'Anime', 'Minimal', 'Quotes', 'Custom'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative w-full max-w-2xl bg-brand-surface border border-brand-border rounded-3xl shadow-card-rich overflow-hidden"
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-5 md:px-7 py-4 border-b border-brand-border">
            <Search className="w-5 h-5 text-brand-secondary shrink-0 mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search heavyweight tees, anime, culture, minimal..."
              className="w-full bg-transparent text-brand-light placeholder-brand-muted text-base focus:outline-none font-heading font-medium"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-brand-muted hover:text-brand-light mr-2"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-2.5 py-1 text-xs font-mono text-brand-muted hover:text-brand-light bg-brand-dark rounded-lg border border-brand-border"
            >
              ESC
            </button>
          </div>

          {/* Body Content */}
          <div className="max-h-[60vh] overflow-y-auto p-5 md:p-7 no-scrollbar">
            {query.trim() === '' ? (
              <div>
                <div className="flex items-center gap-2 mb-3 text-xs font-heading font-semibold text-brand-secondary uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
                  Popular Categories
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {quickCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setQuery(cat)}
                      className="px-3.5 py-2 rounded-xl text-xs font-heading font-semibold bg-brand-dark hover:bg-brand-primary hover:text-white border border-brand-border transition-colors text-brand-chalk"
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="text-xs font-heading font-semibold text-brand-muted uppercase tracking-wider mb-3">
                  Featured Archive
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRODUCTS.slice(0, 4).map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product.id);
                        onClose();
                      }}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-brand-dark/60 hover:bg-brand-dark cursor-pointer border border-brand-border/60 transition-colors group"
                    >
                      <img
                        src={product.images.primary}
                        alt={product.name}
                        className="w-12 h-14 object-cover rounded-lg bg-brand-black shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-heading font-bold text-brand-light truncate group-hover:text-brand-secondary transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-xs font-mono text-brand-muted mt-0.5">₹{product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="space-y-2">
                <div className="text-xs font-heading font-semibold text-brand-muted uppercase tracking-wider mb-3">
                  Results ({filteredProducts.length})
                </div>
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product.id);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-brand-dark/40 hover:bg-brand-dark cursor-pointer border border-brand-border/60 transition-all group"
                  >
                    <div className="flex items-center gap-3.5">
                      <img
                        src={product.images.primary}
                        alt={product.name}
                        className="w-12 h-14 object-cover rounded-lg bg-brand-black shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-heading font-bold text-brand-secondary uppercase">{product.category}</span>
                          <span className="text-[10px] font-mono text-brand-muted bg-brand-surface px-1.5 py-0.5 rounded">{product.gsm}</span>
                        </div>
                        <h4 className="text-sm font-heading font-bold text-brand-light group-hover:text-brand-secondary transition-colors mt-0.5">
                          {product.name}
                        </h4>
                        <span className="text-xs font-mono text-brand-chalk font-semibold">₹{product.price}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-brand-muted group-hover:text-brand-accent group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-brand-muted">
                <p className="text-sm font-heading">No items found matching "{query}"</p>
                <p className="text-xs mt-1 font-body">Try searching for "anime", "culture", "oversized", or browse our custom atelier.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
