import React, { createContext, useContext, useState, useEffect } from 'react';
import { BRAND_CONFIG } from '../data/products';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('radnuz_cart') || localStorage.getItem('kinetik_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState({ type: null, value: 0, code: '' });
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('radnuz_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (product) => {
    // Determine unique item identifier
    const uniqueId = product.isCustom 
      ? `custom-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
      : `${product.id}-${product.selectedColor?.name || 'default'}-${product.selectedSize}`;

    setCartItems(prev => {
      if (product.isCustom) {
        // Custom items are always unique 1-of-1 creations
        return [...prev, { ...product, cartId: uniqueId }];
      }

      const existingIndex = prev.findIndex(item => item.cartId === uniqueId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + (product.quantity || 1)
        };
        return updated;
      } else {
        return [...prev, { ...product, cartId: uniqueId, quantity: product.quantity || 1 }];
      }
    });

    showToast(`Added "${product.name}" to cart`);
    setIsDrawerOpen(true);
  };

  const updateQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCartItems(prev => prev.map(item => item.cartId === cartId ? { ...item, quantity } : item));
  };

  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
    showToast("Item removed from cart", "info");
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscount({ type: null, value: 0, code: '' });
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    const rule = BRAND_CONFIG.promoCodes[cleanCode];

    if (!rule) {
      showToast("Invalid promo code. Try 'RADNUZ10'", "error");
      return false;
    }

    if (rule === "FREE_SHIPPING") {
      setDiscount({ type: 'shipping', value: 0, code: cleanCode });
      showToast("Code applied: FREE Shipping unlocked!", "success");
    } else {
      setDiscount({ type: 'percentage', value: rule, code: cleanCode });
      showToast(`Code applied: ${(rule * 100)}% OFF!`, "success");
    }
    setCouponCode('');
    return true;
  };

  const removeCoupon = () => {
    setDiscount({ type: null, value: 0, code: '' });
    showToast("Coupon removed", "info");
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  let discountAmount = 0;
  if (discount.type === 'percentage') {
    discountAmount = Math.round(subtotal * discount.value);
  }

  const isFreeShippingByThreshold = subtotal >= BRAND_CONFIG.freeShippingThreshold;
  const isFreeShippingByCoupon = discount.type === 'shipping';
  const shippingFee = (cartItems.length === 0 || isFreeShippingByThreshold || isFreeShippingByCoupon) ? 0 : BRAND_CONFIG.shippingFee;

  const total = Math.max(0, subtotal - discountAmount + shippingFee);
  const amountNeededForFreeShip = Math.max(0, BRAND_CONFIG.freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / BRAND_CONFIG.freeShippingThreshold) * 100));

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isDrawerOpen,
        setIsDrawerOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        couponCode,
        setCouponCode,
        discount,
        applyCoupon,
        removeCoupon,
        subtotal,
        totalItems,
        discountAmount,
        shippingFee,
        total,
        amountNeededForFreeShip,
        freeShippingProgress,
        isFreeShippingByThreshold,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
