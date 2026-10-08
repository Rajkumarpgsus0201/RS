import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, SlidersHorizontal, Grid2X2, Grid3X3, X, ArrowUpDown, Sparkles, Search } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/common/ProductCard';

export default function ShopPage({ onNavigateProduct, initialCategory = 'All' }) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-asc' | 'price-desc' | 'rating'
  const [searchQuery, setSearchQuery] = useState('');
  const [gridLayout, setGridLayout] = useState('grid-3'); // 'grid-2' | 'grid-3'
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Available unique sizes and colors
  const allSizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const allColors = [
    { name: 'Onyx Black', hex: '#141416' },
    { name: 'Vintage Chalk', hex: '#E8E8E4' },
    { name: 'Washed Charcoal', hex: '#2A2B30' },
    { name: 'Sage Olive', hex: '#42493E' },
    { name: 'Desert Sand', hex: '#C4B59D' },
    { name: 'Crimson Maroon', hex: '#4D131D' }
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category Filter
      if (selectedCategory !== 'All' && selectedCategory !== 'ALL ARCHIVE') {
        if (product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // Search Query Filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matches = product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query);
        if (!matches) return false;
      }

      // Size Filter
      if (selectedSizes.length > 0) {
        const hasSize = product.sizes.some(s => selectedSizes.includes(s));
        if (!hasSize) return false;
      }

      // Color Filter
      if (selectedColors.length > 0) {
        const hasColor = product.colors.some(c => selectedColors.includes(c.name));
        if (!hasColor) return false;
      }

      // Price Filter
      if (product.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // 'featured' keeps catalog ordering
    });
  }, [selectedCategory, selectedSizes, selectedColors, maxPrice, sortBy, searchQuery]);

  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (colorName) => {
    setSelectedColors(prev =>
      prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(2000);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'All' || selectedSizes.length > 0 || selectedColors.length > 0 || maxPrice < 2000 || searchQuery !== '';

  return (
    <div className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="mb-8 pb-6 border-b border-brand-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-heading font-semibold text-brand-secondary uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
              <span>Full Archive // 240 GSM Oversized</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-brand-light tracking-tight uppercase">
              SHOP <span className="text-outline hover:text-brand-primaryLight transition-colors cursor-default">ALL DROPS</span>
            </h1>
          </div>

          {/* Quick Search Bar */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search drops, anime, culture..."
              className="w-full bg-brand-surface border border-brand-border rounded-xl pl-10 pr-4 py-2.5 text-xs font-heading text-brand-light placeholder-brand-muted focus:outline-none focus:border-brand-primary shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-light"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Horizontal Scrollbar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-2 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase shrink-0 transition-all ${
              selectedCategory === 'All'
                ? 'bg-brand-primary text-white shadow-glow-primary'
                : 'bg-brand-surface text-brand-muted hover:text-brand-light border border-brand-border'
            }`}
          >
            ALL ARCHIVE ({PRODUCTS.length})
          </button>
          {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase shrink-0 transition-all ${
                selectedCategory.toLowerCase() === cat.name.toLowerCase()
                  ? 'bg-brand-primary text-white shadow-glow-primary'
                  : 'bg-brand-surface text-brand-muted hover:text-brand-light border border-brand-border'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: Filter Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Desktop Filter Sidebar (Span 3 cols) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="p-6 bg-brand-surface border border-brand-border rounded-3xl space-y-6 shadow-card-rich">
            <div className="flex items-center justify-between pb-4 border-b border-brand-border">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-secondary" />
                <span className="text-xs font-heading font-extrabold uppercase text-brand-light tracking-wider">
                  FILTERS
                </span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] font-heading text-brand-accent hover:underline uppercase font-bold"
                >
                  RESET ALL
                </button>
              )}
            </div>

            {/* Price Filter Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-brand-muted uppercase font-heading">Max Price</span>
                <span className="text-brand-light font-bold">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="800"
                max="2000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full accent-brand-primary cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-brand-muted mt-1">
                <span>₹800</span>
                <span>₹2000</span>
              </div>
            </div>

            {/* Size Filter */}
            <div className="pt-4 border-t border-brand-border">
              <span className="text-xs font-heading uppercase text-brand-muted tracking-wider block mb-2.5">
                Size
              </span>
              <div className="grid grid-cols-5 gap-1.5">
                {allSizes.map((sz) => {
                  const isSelected = selectedSizes.includes(sz);
                  return (
                    <button
                      key={sz}
                      onClick={() => toggleSize(sz)}
                      className={`py-2 text-xs font-mono font-bold rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                          : 'bg-brand-elevated text-brand-light border-brand-border hover:border-brand-muted'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Filter */}
            <div className="pt-4 border-t border-brand-border">
              <span className="text-xs font-heading uppercase text-brand-muted tracking-wider block mb-2.5">
                Colorway
              </span>
              <div className="grid grid-cols-6 gap-2">
                {allColors.map((color) => {
                  const isSelected = selectedColors.includes(color.name);
                  return (
                    <button
                      key={color.name}
                      onClick={() => toggleColor(color.name)}
                      title={color.name}
                      className={`aspect-square rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-brand-primaryLight scale-110 shadow-md ring-2 ring-brand-primary/40'
                          : 'border-brand-border hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Catalog Display (Span 9 cols) */}
        <main className="lg:col-span-9 space-y-6">
          {/* Controls Bar (Item count, Sort, Mobile Filter, Grid Layout) */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-brand-surface rounded-2xl border border-brand-border shadow-sm">
            <div className="flex items-center gap-3">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-brand-primary text-white rounded-xl text-xs font-heading font-bold shadow-sm"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>FILTERS {hasActiveFilters ? '(ACTIVE)' : ''}</span>
              </button>

              <span className="text-xs font-heading text-brand-muted">
                SHOWING <span className="text-brand-light font-bold">{filteredProducts.length}</span> DROPS
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 bg-brand-dark rounded-xl px-3 py-2 border border-brand-border">
                <ArrowUpDown className="w-3.5 h-3.5 text-brand-secondary" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-heading font-semibold text-brand-light focus:outline-none cursor-pointer"
                >
                  <option value="featured" className="bg-brand-surface">Featured Drops</option>
                  <option value="price-asc" className="bg-brand-surface">Price: Low to High</option>
                  <option value="price-desc" className="bg-brand-surface">Price: High to Low</option>
                  <option value="rating" className="bg-brand-surface">Customer Rating</option>
                </select>
              </div>

              {/* Grid Toggle (Desktop) */}
              <div className="hidden sm:flex items-center bg-brand-dark p-1 rounded-xl border border-brand-border">
                <button
                  onClick={() => setGridLayout('grid-2')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    gridLayout === 'grid-2' ? 'bg-brand-surface text-brand-secondary shadow-sm' : 'text-brand-muted hover:text-brand-light'
                  }`}
                  title="Editorial 2-Column View"
                >
                  <Grid2X2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridLayout('grid-3')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    gridLayout === 'grid-3' ? 'bg-brand-surface text-brand-secondary shadow-sm' : 'text-brand-muted hover:text-brand-light'
                  }`}
                  title="Compact 3-Column View"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Tags Bar */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-brand-surface border border-brand-border text-xs font-heading text-brand-light">
                  <span>Category: {selectedCategory}</span>
                  <X className="w-3.5 h-3.5 cursor-pointer hover:text-brand-accent ml-1" onClick={() => setSelectedCategory('All')} />
                </span>
              )}
              {selectedSizes.map((sz) => (
                <span key={sz} className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-brand-surface border border-brand-border text-xs font-heading text-brand-light">
                  <span>Size: {sz}</span>
                  <X className="w-3.5 h-3.5 cursor-pointer hover:text-brand-accent ml-1" onClick={() => toggleSize(sz)} />
                </span>
              ))}
              {selectedColors.map((color) => (
                <span key={color} className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-brand-surface border border-brand-border text-xs font-heading text-brand-light">
                  <span>Color: {color}</span>
                  <X className="w-3.5 h-3.5 cursor-pointer hover:text-brand-accent ml-1" onClick={() => toggleColor(color)} />
                </span>
              ))}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-brand-surface border border-brand-border text-xs font-heading text-brand-light">
                  <span>Search: "{searchQuery}"</span>
                  <X className="w-3.5 h-3.5 cursor-pointer hover:text-brand-accent ml-1" onClick={() => setSearchQuery('')} />
                </span>
              )}
              <button
                onClick={clearAllFilters}
                className="text-xs font-heading text-brand-secondary hover:underline ml-1 font-bold"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div
              className={`grid gap-6 sm:gap-8 ${
                gridLayout === 'grid-2'
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onNavigateProduct={onNavigateProduct}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-brand-surface rounded-3xl border border-brand-border p-8 shadow-card-rich">
              <h3 className="text-xl font-display font-bold text-brand-light">NO PIECES MATCH YOUR CRITERIA</h3>
              <p className="text-xs text-brand-muted max-w-sm mx-auto mt-2 font-body">
                Try loosening your filters or explore our custom atelier to design your own 1-of-1 drop.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-6 px-6 py-3 bg-brand-primary text-white font-heading font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-brand-primaryLight transition-colors shadow-glow-primary"
              >
                RESET ALL FILTERS
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative ml-auto w-full max-w-xs bg-brand-surface h-full flex flex-col justify-between p-6 z-10 overflow-y-auto"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-brand-border">
                  <h3 className="text-base font-display font-bold text-brand-light uppercase">FILTERS</h3>
                  <button onClick={() => setIsMobileFilterOpen(false)} className="p-1.5 text-brand-muted hover:text-brand-light">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Size Filter */}
                <div>
                  <span className="text-xs font-heading uppercase text-brand-muted tracking-wider block mb-2">Sizes</span>
                  <div className="grid grid-cols-5 gap-1.5">
                    {allSizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => toggleSize(sz)}
                        className={`py-2 text-xs font-mono font-bold rounded-xl border ${
                          selectedSizes.includes(sz) ? 'bg-brand-primary text-white border-brand-primary' : 'bg-brand-elevated text-brand-light border-brand-border'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Color Filter */}
                <div>
                  <span className="text-xs font-heading uppercase text-brand-muted tracking-wider block mb-2">Colorways</span>
                  <div className="grid grid-cols-6 gap-2">
                    {allColors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => toggleColor(c.name)}
                        className={`aspect-square rounded-xl border-2 ${
                          selectedColors.includes(c.name) ? 'border-brand-primaryLight scale-110' : 'border-brand-border'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>

                {/* Mobile Price Slider */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-brand-muted uppercase font-heading">Max Price</span>
                    <span className="text-brand-light font-bold">₹{maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="800"
                    max="2000"
                    step="50"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full accent-brand-primary"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-brand-border space-y-2">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3.5 bg-brand-primary text-white font-heading font-bold text-xs uppercase tracking-wider rounded-xl shadow-glow-primary"
                >
                  APPLY FILTERS ({filteredProducts.length})
                </button>
                <button
                  onClick={clearAllFilters}
                  className="w-full py-2 text-xs font-heading text-brand-muted hover:text-brand-light"
                >
                  RESET FILTERS
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
