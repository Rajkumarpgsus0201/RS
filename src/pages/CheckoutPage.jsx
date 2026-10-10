import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, ArrowLeft, CheckCircle2, ShieldCheck, Truck, Sparkles, 
  Download, Copy, ExternalLink, ShoppingBag, FileText, Printer, HelpCircle 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BRAND_CONFIG } from '../data/products';
import { downloadInvoiceFile, printInvoice } from '../utils/invoiceGenerator';
import InvoiceModal from '../components/common/InvoiceModal';
import confetti from 'canvas-confetti';

export default function CheckoutPage({ setActivePage, onOpenPolicyModal }) {
  const {
    cartItems,
    subtotal,
    totalItems,
    discount,
    discountAmount,
    shippingFee,
    total,
    clearCart,
    showToast
  } = useCart();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    whatsAppNumber: '',
    address: '',
    city: '',
    pincode: '',
    orderNotes: ''
  });

  const [useSameForWhatsApp, setUseSameForWhatsApp] = useState(true);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [previewOrderData, setPreviewOrderData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'mobileNumber' && useSameForWhatsApp) {
        updated.whatsAppNumber = value;
      }
      return updated;
    });
  };

  const handleCheckboxChange = (e) => {
    setUseSameForWhatsApp(e.target.checked);
    if (e.target.checked) {
      setFormData(prev => ({ ...prev, whatsAppNumber: prev.mobileNumber }));
    }
  };

  const buildOrderObject = (customOrderId = null) => {
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const orderId = customOrderId || `ORD-${randomDigits}`;
    const orderDate = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    let itemsText = cartItems.map((item, index) => {
      let customDetail = '';
      if (item.isCustom) {
        customDetail += `       • 1-OF-1 Custom Print\n` +
          (item.customText ? `       • Custom Text: "${item.customText}"\n` : '') +
          `       • Placement: ${item.printPlacement?.toUpperCase() || 'FRONT'}\n` +
          `       • 📸 Design Picture: Saved on device & sharing in chat!\n`;
      }
      if (item.isUpcoming) {
        customDetail += `       • ⚡ IN-LOAD PRE-RESERVATION (BATCH 02)\n` +
          `       • Factory Stage: ${item.loadStatus || 'In Assembly Pipeline'}\n` +
          `       • Target Arrival: ${item.eta || 'Drop 02'}\n`;
      }

      return (
        `${index + 1}. *${item.name}*\n` +
        `   • Color: ${item.selectedColor?.name || 'Black'}\n` +
        `   • Size: ${item.selectedSize}\n` +
        `   • Quantity: ${item.quantity}\n` +
        `   • Price: ₹${item.price * item.quantity}\n` +
        customDetail
      );
    }).join('\n');

    const whatsappMessage = 
`⚡ *RADNUZ STUDIO — NEW ORDER* ⚡
Order ID: *#${orderId}*
Date: ${orderDate}

🛍️ *ITEMS ORDERED:*
${itemsText}
💰 *PAYMENT SUMMARY:*
• Subtotal: ₹${subtotal}
${discountAmount > 0 ? `• Discount (${discount.code}): -₹${discountAmount}\n` : ''}• Delivery: ${shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
• *TOTAL PAYABLE: ₹${total}*

📍 *CUSTOMER DETAILS:*
• Name: ${formData.fullName || 'Valued Client'}
• Mobile: ${formData.mobileNumber || 'N/A'}
• WhatsApp: ${formData.whatsAppNumber || formData.mobileNumber || 'N/A'}
• Address: ${formData.address || 'Address provided via WhatsApp'}
• City: ${formData.city || ''}
• Pincode: ${formData.pincode || ''}
${formData.orderNotes ? `• Notes: ${formData.orderNotes}\n` : ''}
Please confirm order and send UPI ID / Payment QR to proceed with dispatch.`;

    return {
      orderId,
      date: new Date().toISOString(),
      customer: formData,
      items: cartItems,
      subtotal,
      discountAmount,
      shippingFee,
      total,
      rawMessage: whatsappMessage
    };
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.mobileNumber.trim() || !formData.address.trim() || !formData.pincode.trim()) {
      showToast("Please fill in all required shipping fields", "error");
      return;
    }

    if (cartItems.length === 0) {
      showToast("Your cart is empty!", "error");
      return;
    }

    const newOrderRecord = buildOrderObject();

    // Save to localStorage for historical persistence
    try {
      const existingOrders = JSON.parse(localStorage.getItem('radnuz_orders') || localStorage.getItem('kinetik_orders') || '[]');
      existingOrders.unshift(newOrderRecord);
      localStorage.setItem('radnuz_orders', JSON.stringify(existingOrders));
    } catch (err) {
      console.error("Failed to save order in localStorage", err);
    }

    setCompletedOrder(newOrderRecord);
    setOrderSubmitted(true);
    clearCart();

    // Trigger celebratory confetti in rich brand colors
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#016935', '#299E60', '#FA6800', '#FFB703', '#FFFFFF']
      });
    } catch (e) {
      // safe fallback
    }

    // Launch WhatsApp
    const encoded = encodeURIComponent(newOrderRecord.rawMessage);
    const waUrl = `https://wa.me/${BRAND_CONFIG.businessWhatsApp}?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  // Direct Invoice Download action (Side button beside Place WhatsApp Order)
  const handleDownloadInvoiceDirect = () => {
    if (cartItems.length === 0) {
      showToast("Your bag is empty. Add items to generate an invoice.", "error");
      return;
    }

    const orderObj = buildOrderObject();
    downloadInvoiceFile(orderObj);
    showToast("Official tax invoice downloaded successfully!", "success");
  };

  const handlePreviewInvoiceDirect = () => {
    if (cartItems.length === 0) {
      showToast("Your bag is empty. Add items to preview invoice.", "error");
      return;
    }

    const orderObj = buildOrderObject();
    setPreviewOrderData(orderObj);
    setIsInvoiceModalOpen(true);
  };

  const copyWhatsAppText = () => {
    if (completedOrder?.rawMessage) {
      navigator.clipboard.writeText(completedOrder.rawMessage);
      showToast("Order message copied to clipboard!", "success");
    }
  };

  const handleDownloadCompletedInvoice = () => {
    if (!completedOrder) return;
    downloadInvoiceFile(completedOrder);
    showToast("Invoice downloaded successfully!", "success");
  };

  const handlePrintCompletedInvoice = () => {
    if (!completedOrder) return;
    printInvoice(completedOrder);
  };

  const exportOrderJSON = () => {
    if (!completedOrder) return;
    const blob = new Blob([JSON.stringify(completedOrder, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${completedOrder.orderId}-radnuz-order.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // 1. ORDER SUBMITTED / SUCCESS STATE
  if (orderSubmitted && completedOrder) {
    return (
      <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-brand-surface border border-brand-border rounded-3xl p-6 sm:p-10 shadow-card-rich space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-brand-primary/20 border border-brand-primary flex items-center justify-center mx-auto text-brand-secondary shadow-glow-primary">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs font-heading text-brand-secondary uppercase tracking-widest font-bold">
              Order Initialized // WhatsApp Atelier Connected
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-brand-light uppercase">
              ORDER #{completedOrder.orderId}
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted max-w-md mx-auto font-body">
              Your order has been compiled and forwarded to our official WhatsApp atelier line. Our team will verify your items and share payment confirmation details.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-brand-dark/80 rounded-2xl p-5 border border-brand-border space-y-4 text-xs font-mono">
            <div className="flex justify-between pb-3 border-b border-brand-border text-brand-muted">
              <span>Customer:</span>
              <span className="text-brand-light font-bold">{completedOrder.customer.fullName} ({completedOrder.customer.mobileNumber})</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-brand-border text-brand-muted">
              <span>Delivery Address:</span>
              <span className="text-brand-light text-right max-w-xs">{completedOrder.customer.address}, {completedOrder.customer.city} - {completedOrder.customer.pincode}</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-brand-border text-brand-muted">
              <span>Items Count:</span>
              <span className="text-brand-light">{completedOrder.items.length} unique item(s)</span>
            </div>
            <div className="flex justify-between text-sm text-brand-light font-bold pt-1">
              <span>Total Amount:</span>
              <span className="text-brand-secondary font-mono text-base">₹{completedOrder.total}</span>
            </div>
          </div>

          {/* Custom Design Mockup Picture Card (if order has custom 1-of-1 items) */}
          {completedOrder.items.some(i => i.isCustom && i.customPreviewUrl) && (
            <div className="p-4 rounded-2xl bg-brand-dark/90 border border-brand-primary/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <img
                  src={completedOrder.items.find(i => i.isCustom && i.customPreviewUrl)?.customPreviewUrl}
                  alt="Custom Mockup Design"
                  className="w-14 h-16 object-contain rounded-xl border border-brand-border bg-brand-surface shrink-0"
                />
                <div>
                  <span className="text-xs font-heading font-bold text-brand-light block">
                    📸 1-OF-1 Custom Design Picture Ready
                  </span>
                  <span className="text-[11px] text-brand-muted font-body">
                    Attach this image in the WhatsApp chat to confirm print alignment!
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  const customItem = completedOrder.items.find(i => i.isCustom && i.customPreviewUrl);
                  if (customItem && customItem.customPreviewUrl) {
                    const a = document.createElement('a');
                    a.href = customItem.customPreviewUrl;
                    a.download = `RADNUZ-Custom-Design-${completedOrder.orderId}.png`;
                    a.click();
                    showToast("Custom design picture downloaded!", "success");
                  }
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-brand-elevated hover:bg-brand-border text-brand-secondary border border-brand-border text-xs font-heading font-bold transition-colors flex items-center justify-center gap-1.5 shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Design Picture</span>
              </button>
            </div>
          )}

          {/* Quick Actions (WhatsApp & Invoice Side-by-Side) */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => {
                  const encoded = encodeURIComponent(completedOrder.rawMessage);
                  window.open(`https://wa.me/${BRAND_CONFIG.businessWhatsApp}?text=${encoded}`, '_blank');
                }}
                className="flex items-center justify-center gap-2 py-4 px-4 rounded-xl bg-brand-primary hover:bg-brand-primaryLight text-white font-heading font-extrabold text-xs tracking-wider uppercase transition-all shadow-glow-primary group"
              >
                <MessageSquare className="w-4 h-4 text-brand-accent group-hover:scale-110 transition-transform" />
                <span>OPEN IN WHATSAPP</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </button>

              <button
                onClick={handleDownloadCompletedInvoice}
                className="flex items-center justify-center gap-2 py-4 px-4 rounded-xl bg-brand-elevated hover:bg-brand-border text-brand-light border border-brand-secondary/40 font-heading font-extrabold text-xs tracking-wider uppercase transition-all shadow-sm group hover:border-brand-secondary"
              >
                <Download className="w-4 h-4 text-brand-secondary group-hover:translate-y-0.5 transition-transform" />
                <span>DOWNLOAD INVOICE</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <button
                onClick={() => {
                  setPreviewOrderData(completedOrder);
                  setIsInvoiceModalOpen(true);
                }}
                className="flex items-center justify-center gap-1.5 py-3 bg-brand-dark hover:bg-brand-elevated text-brand-light rounded-xl border border-brand-border text-xs font-heading font-semibold transition-colors"
                title="View Full Styled Invoice"
              >
                <FileText className="w-3.5 h-3.5 text-brand-secondary" />
                <span className="truncate">PREVIEW</span>
              </button>

              <button
                onClick={handlePrintCompletedInvoice}
                className="flex items-center justify-center gap-1.5 py-3 bg-brand-dark hover:bg-brand-elevated text-brand-light rounded-xl border border-brand-border text-xs font-heading font-semibold transition-colors"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-brand-secondary" />
                <span className="truncate">PRINT / PDF</span>
              </button>

              <button
                onClick={copyWhatsAppText}
                className="flex items-center justify-center gap-1.5 py-3 bg-brand-dark hover:bg-brand-elevated text-brand-light rounded-xl border border-brand-border text-xs font-heading font-semibold transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span className="truncate">COPY TEXT</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-brand-border text-center flex items-center justify-between text-xs font-heading">
            <button
              onClick={() => onOpenPolicyModal && onOpenPolicyModal('shipping')}
              className="text-brand-muted hover:text-brand-light underline transition-colors"
            >
              Shipping & Tracking Policy
            </button>
            <button
              onClick={() => {
                setActivePage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-brand-secondary hover:underline"
            >
              CONTINUE SHOPPING ARCHIVE →
            </button>
          </div>
        </motion.div>

        {/* Invoice Modal */}
        <InvoiceModal
          isOpen={isInvoiceModalOpen}
          onClose={() => setIsInvoiceModalOpen(false)}
          order={previewOrderData || completedOrder}
        />
      </div>
    );
  }

  // 2. CHECKOUT FORM VIEW
  return (
    <div className="py-8 md:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Back to Shop */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => setActivePage('shop')}
          className="inline-flex items-center gap-2 text-xs font-heading font-semibold text-brand-muted hover:text-brand-light transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalog</span>
        </button>

        <button
          onClick={() => onOpenPolicyModal && onOpenPolicyModal('whatsapp')}
          className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-brand-secondary hover:text-white transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>How WhatsApp Checkout Works</span>
        </button>
      </div>

      {/* Page Title */}
      <div className="pb-6 mb-8 border-b border-brand-border">
        <span className="text-xs font-heading font-semibold text-brand-secondary uppercase tracking-widest">
          Direct Atelier Dispatch
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-brand-light tracking-tight uppercase mt-1">
          CHECKOUT & <span className="text-outline hover:text-brand-primaryLight transition-colors cursor-default">WHATSAPP ORDER</span>
        </h1>
        <p className="text-xs text-brand-muted font-body mt-2">
          We take orders directly via WhatsApp for authentic 1-on-1 concierge assistance. You can also download your official invoice receipt anytime.
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-brand-surface rounded-3xl border border-brand-border p-8 space-y-4 shadow-card-rich">
          <div className="w-16 h-16 rounded-full bg-brand-elevated border border-brand-border flex items-center justify-center mx-auto text-brand-muted">
            <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h2 className="text-xl font-display font-bold text-brand-light">YOUR BAG IS CURRENTLY EMPTY</h2>
          <p className="text-xs text-brand-muted max-w-sm mx-auto font-body">
            Add your desired streetwear pieces or create a custom 1-of-1 print to proceed with ordering.
          </p>
          <button
            onClick={() => setActivePage('shop')}
            className="px-8 py-3 bg-brand-primary text-white font-heading font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-brand-primaryLight transition-colors shadow-glow-primary"
          >
            EXPLORE DROPS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Customer Details Form (Span 7 cols) */}
          <div className="lg:col-span-7 bg-brand-surface border border-brand-border rounded-3xl p-6 sm:p-8 shadow-card-rich">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-brand-border">
              <h3 className="text-base font-display font-bold text-brand-light uppercase">
                01 // DELIVERY INFORMATION
              </h3>
              <span className="text-[10px] font-heading font-bold text-brand-secondary uppercase bg-brand-primary/15 px-2 py-0.5 rounded">
                DIRECT WHATSAPP CONCIERGE
              </span>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="text-xs font-heading font-semibold text-brand-muted uppercase block mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Alex Sharma"
                  required
                  className="w-full bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-light placeholder-brand-muted focus:outline-none focus:border-brand-primary font-medium"
                />
              </div>

              {/* Phone & WhatsApp Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-heading font-semibold text-brand-muted uppercase block mb-1.5">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="e.g. 9876543210"
                    required
                    className="w-full bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-light placeholder-brand-muted focus:outline-none focus:border-brand-primary font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-heading font-semibold text-brand-muted uppercase block mb-1.5">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    name="whatsAppNumber"
                    value={formData.whatsAppNumber}
                    onChange={handleInputChange}
                    disabled={useSameForWhatsApp}
                    placeholder="e.g. 9876543210"
                    className={`w-full bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-light placeholder-brand-muted focus:outline-none focus:border-brand-primary font-mono ${
                      useSameForWhatsApp ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                  />
                </div>
              </div>

              {/* Checkbox Same WhatsApp */}
              <label className="flex items-center gap-2 cursor-pointer text-xs font-heading text-brand-muted select-none">
                <input
                  type="checkbox"
                  checked={useSameForWhatsApp}
                  onChange={handleCheckboxChange}
                  className="rounded bg-brand-dark border-brand-border accent-brand-primary w-4 h-4 cursor-pointer"
                />
                <span>WhatsApp number is same as mobile number</span>
              </label>

              {/* Address */}
              <div>
                <label className="text-xs font-heading font-semibold text-brand-muted uppercase block mb-1.5">
                  Complete Delivery Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Flat / House No., Building Name, Street / Area, Landmark"
                  required
                  className="w-full bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-light placeholder-brand-muted focus:outline-none focus:border-brand-primary font-medium resize-none"
                />
              </div>

              {/* City and Pincode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-heading font-semibold text-brand-muted uppercase block mb-1.5">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Mumbai"
                    required
                    className="w-full bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-light placeholder-brand-muted focus:outline-none focus:border-brand-primary font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-heading font-semibold text-brand-muted uppercase block mb-1.5">
                    Postal Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="e.g. 400050"
                    required
                    className="w-full bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-light placeholder-brand-muted focus:outline-none focus:border-brand-primary font-mono"
                  />
                </div>
              </div>

              {/* Order Notes */}
              <div>
                <label className="text-xs font-heading font-semibold text-brand-muted uppercase block mb-1.5">
                  Special Instructions / Order Notes (Optional)
                </label>
                <input
                  type="text"
                  name="orderNotes"
                  value={formData.orderNotes}
                  onChange={handleInputChange}
                  placeholder="e.g. Deliver between 2-5 PM or call on arrival"
                  className="w-full bg-brand-dark border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-light placeholder-brand-muted focus:outline-none focus:border-brand-primary font-medium"
                />
              </div>

              {/* Actions: Send WhatsApp Order + Side Button for Invoice Download */}
              <div className="pt-6 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-stretch">
                  {/* Primary WhatsApp Order Button */}
                  <button
                    type="submit"
                    className="sm:col-span-8 flex items-center justify-center gap-3 py-4 px-5 rounded-xl bg-brand-primary hover:bg-brand-primaryLight text-white font-heading font-black text-xs tracking-wider uppercase transition-all shadow-glow-primary group"
                  >
                    <MessageSquare className="w-5 h-5 text-brand-accent group-hover:scale-110 transition-transform" />
                    <span>PLACE ORDER ON WHATSAPP</span>
                  </button>

                  {/* Side Button: Download Invoice */}
                  <button
                    type="button"
                    onClick={handleDownloadInvoiceDirect}
                    className="sm:col-span-4 flex items-center justify-center gap-2 py-4 px-4 rounded-xl bg-brand-elevated hover:bg-brand-border text-brand-light border border-brand-border hover:border-brand-secondary font-heading font-bold text-xs uppercase transition-all shadow-sm group"
                    title="Generate and Download Official Invoice"
                  >
                    <Download className="w-4 h-4 text-brand-secondary group-hover:translate-y-0.5 transition-transform" />
                    <span>DOWNLOAD INVOICE</span>
                  </button>
                </div>

                {/* Secondary Preview Invoice link */}
                <div className="flex items-center justify-between text-[11px] font-heading text-brand-muted pt-1">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-secondary" />
                    <span>Zero payment gateway fees. Direct UPI on WhatsApp.</span>
                  </div>
                  <button
                    type="button"
                    onClick={handlePreviewInvoiceDirect}
                    className="text-brand-secondary hover:underline flex items-center gap-1"
                  >
                    <FileText className="w-3 h-3" />
                    <span>Preview Invoice</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary (Span 5 cols) */}
          <div className="lg:col-span-5 bg-brand-surface border border-brand-border rounded-3xl p-6 sm:p-8 shadow-card-rich space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-brand-border">
              <h3 className="text-base font-display font-bold text-brand-light uppercase">
                02 // ORDER SUMMARY ({totalItems})
              </h3>
              <button
                onClick={() => setActivePage('shop')}
                className="text-xs font-heading text-brand-secondary hover:underline font-semibold"
              >
                Modify Bag
              </button>
            </div>

            {/* Items List */}
            <div className="space-y-3.5 max-h-80 overflow-y-auto pr-1 no-scrollbar">
              {cartItems.map((item) => (
                <div
                  key={item.cartId}
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-brand-dark/70 border border-brand-border/60"
                >
                  <img
                    src={item.customPreviewUrl || item.images?.primary || item.image}
                    alt={item.name}
                    className="w-14 h-16 object-cover rounded-xl bg-brand-black shrink-0 border border-brand-border/40"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-display font-bold text-brand-light truncate">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] font-heading text-brand-muted mt-0.5">
                      <span>{item.selectedSize}</span>
                      <span>•</span>
                      <span>{item.selectedColor?.name || 'Black'}</span>
                      <span>•</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                    {item.customText && (
                      <div className="text-[10px] font-heading text-brand-secondary truncate mt-0.5">
                        Text: "{item.customText}"
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-mono font-bold text-brand-chalk shrink-0">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown */}
            <div className="pt-4 border-t border-brand-border space-y-2 text-xs font-mono text-brand-muted">
              <div className="flex justify-between">
                <span className="font-heading">Subtotal</span>
                <span className="text-brand-light font-bold">₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-brand-secondary font-bold font-heading">
                  <span>Discount ({discount.code})</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-heading">Shipping Fee</span>
                <span className={shippingFee === 0 ? "text-brand-secondary font-bold" : "text-brand-light font-bold"}>
                  {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-brand-border text-base font-heading font-black text-brand-light">
                <span>TOTAL DUE</span>
                <span className="font-mono text-xl text-brand-light font-bold">₹{total}</span>
              </div>
            </div>

            {/* Quick Invoice Download Box in Summary */}
            <div className="p-4 rounded-2xl bg-brand-dark/90 border border-brand-border space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-heading font-bold text-brand-light flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-brand-secondary" />
                  TAX INVOICE GENERATOR
                </span>
                <span className="text-[10px] font-mono text-brand-secondary font-bold bg-brand-primary/20 px-2 py-0.5 rounded">
                  READY
                </span>
              </div>
              <p className="text-[11px] text-brand-muted leading-relaxed">
                Want a printed copy or business receipt? You can download or print an invoice before or after placing your order on WhatsApp.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleDownloadInvoiceDirect}
                  className="flex-1 py-2 px-3 bg-brand-elevated hover:bg-brand-border text-brand-light rounded-xl border border-brand-border text-xs font-heading font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-brand-secondary" />
                  <span>Download Now</span>
                </button>
                <button
                  type="button"
                  onClick={handlePreviewInvoiceDirect}
                  className="py-2 px-3 bg-brand-dark hover:bg-brand-elevated text-brand-muted hover:text-brand-light rounded-xl border border-brand-border text-xs font-heading font-semibold transition-colors flex items-center justify-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
              </div>
            </div>

            {/* Delivery Trust Badge */}
            <div className="p-4 rounded-2xl bg-brand-dark/70 border border-brand-border text-[11px] font-heading text-brand-muted flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
              <span>
                Dispatches in 24-48 hours. Live courier tracking link sent directly on your WhatsApp chat thread after payment confirmation.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Modal Preview */}
      <InvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        order={previewOrderData}
      />
    </div>
  );
}
