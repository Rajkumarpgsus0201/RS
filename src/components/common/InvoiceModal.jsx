import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Download, MessageSquare, CheckCircle, ShieldCheck, FileText } from 'lucide-react';
import { printInvoice, downloadInvoiceFile } from '../../utils/invoiceGenerator';
import { BRAND_CONFIG } from '../../data/products';

export default function InvoiceModal({ isOpen, onClose, order }) {
  if (!isOpen || !order) return null;

  const orderId = order.orderId || `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
  const orderDate = order.date 
    ? new Date(order.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    : new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const customer = order.customer || {};
  const items = order.items || [];
  const subtotal = order.subtotal ?? items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const discountAmount = order.discountAmount || 0;
  const shippingFee = order.shippingFee !== undefined ? order.shippingFee : 0;
  const total = order.total ?? (subtotal - discountAmount + shippingFee);

  const handlePrint = () => {
    printInvoice(order);
  };

  const handleDownload = () => {
    downloadInvoiceFile(order);
  };

  const handleWhatsApp = () => {
    if (order.rawMessage) {
      const waUrl = `https://wa.me/${BRAND_CONFIG.businessWhatsApp}?text=${encodeURIComponent(order.rawMessage)}`;
      window.open(waUrl, '_blank');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl bg-brand-surface border border-brand-border rounded-3xl shadow-card-rich flex flex-col max-h-[92vh] overflow-hidden"
        >
          {/* Top Bar with Actions */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border bg-brand-dark/80 shrink-0">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-secondary" />
              <div>
                <span className="text-[10px] font-mono font-bold text-brand-muted uppercase">OFFICIAL ORDER TAX INVOICE</span>
                <h3 className="text-base font-display font-black text-brand-light">#{orderId}</h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-elevated hover:bg-brand-border text-brand-light text-xs font-heading font-bold transition-colors border border-brand-border"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-brand-secondary" />
                <span className="hidden sm:inline">Print / PDF</span>
              </button>

              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-primary hover:bg-brand-primaryLight text-white text-xs font-heading font-black transition-colors shadow-glow-primary"
                title="Download HTML File"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 text-brand-muted hover:text-brand-light hover:bg-brand-elevated rounded-xl transition-colors ml-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Invoice Document Body */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 font-body text-xs sm:text-sm text-brand-light space-y-6 bg-white text-gray-900 rounded-b-2xl m-2 sm:m-4 shadow-inner">
            {/* Invoice Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b-2 border-black">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-black uppercase font-display">
                  RADNUZ STUDIO
                </h2>
                <p className="text-[10px] font-heading font-bold text-emerald-800 tracking-widest uppercase">
                  WEAR YOUR STORY // 240 GSM ATELIER
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  Atelier Logistics Hub • Mumbai, Maharashtra<br/>
                  Official WhatsApp Dispatch: +{BRAND_CONFIG.businessWhatsApp}
                </p>
              </div>

              <div className="sm:text-right font-mono text-xs">
                <span className="inline-block bg-black text-white text-[10px] font-black uppercase px-2.5 py-1 rounded">
                  TAX INVOICE
                </span>
                <p className="mt-2 text-gray-600">Invoice: <strong className="text-black">INV-{orderId}</strong></p>
                <p className="text-gray-600">Date: <strong className="text-black">{orderDate}</strong></p>
                <p className="text-gray-600">Order Channel: <strong className="text-emerald-700">Direct WhatsApp</strong></p>
              </div>
            </div>

            {/* Billed To / Shipping Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-gray-200">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                  BILLED & SHIPPED TO:
                </h4>
                <p className="font-bold text-black text-sm">{customer.fullName || 'Valued Customer'}</p>
                <p className="text-gray-600 text-xs font-mono">Mobile: {customer.mobileNumber || 'N/A'}</p>
                {customer.whatsAppNumber && (
                  <p className="text-gray-600 text-xs font-mono">WhatsApp: {customer.whatsAppNumber}</p>
                )}
                <p className="text-gray-700 text-xs mt-1 leading-snug">
                  {customer.address || 'Address provided via WhatsApp'}, {customer.city || ''} - {customer.pincode || ''}
                </p>
              </div>

              <div className="sm:text-right">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                  ORDER STATUS & DISPATCH:
                </h4>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Order Active</span>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Dispatch ETA: <strong>24-48 Business Hours</strong>
                </p>
                <p className="text-xs text-gray-500">
                  Tracking link sent to WhatsApp upon pickup
                </p>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-300 text-[10px] font-bold uppercase tracking-wider text-gray-600 bg-gray-50">
                    <th className="py-2.5 px-2">#</th>
                    <th className="py-2.5 px-2">Item Description</th>
                    <th className="py-2.5 px-2 text-center">Qty</th>
                    <th className="py-2.5 px-2 text-right">Unit Price</th>
                    <th className="py-2.5 px-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-xs">
                  {items.map((item, idx) => (
                    <tr key={item.cartId || idx}>
                      <td className="py-3 px-2 font-mono text-gray-400">0{idx + 1}</td>
                      <td className="py-3 px-2">
                        <div className="font-bold text-gray-900 uppercase">{item.name}</div>
                        <div className="text-[11px] text-gray-500 mt-0.5">
                          Size: <strong className="text-gray-800">{item.selectedSize}</strong> • 
                          Color: <strong className="text-gray-800">{item.selectedColor?.name || 'Black'}</strong> • 
                          240 GSM French Terry
                        </div>
                        {item.customText && (
                          <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                            Custom Print Text: "{item.customText}"
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-2 text-center font-mono font-bold text-gray-800">{item.quantity}</td>
                      <td className="py-3 px-2 text-right font-mono text-gray-700">₹{item.price?.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-2 text-right font-mono font-bold text-gray-900">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pricing Summary */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-4 border-t border-gray-200">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-600 max-w-sm">
                <span className="font-bold text-gray-900 block mb-1">Direct WhatsApp Payment Notes:</span>
                UPI Payment link / QR Code is shared directly on your active WhatsApp chat. No extra convenience fee charged.
              </div>

              <div className="w-full sm:w-64 space-y-2 font-mono text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span className="font-bold text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount:</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping:</span>
                  <span className="font-bold text-gray-900">
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-black pt-2 border-t-2 border-black">
                  <span>TOTAL:</span>
                  <span className="text-base">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Footer Seal */}
            <div className="pt-6 border-t border-gray-200 flex justify-between items-center text-[10px] text-gray-400">
              <span>RADNUZ STUDIO // COMPUTER GENERATED ORDER RECEIPT</span>
              <span className="font-mono text-emerald-800 font-bold uppercase tracking-wider">
                ✓ ATELIER VERIFIED
              </span>
            </div>
          </div>

          {/* Bottom Dialog Action */}
          <div className="px-6 py-4 bg-brand-dark/90 border-t border-brand-border flex items-center justify-between shrink-0">
            <span className="text-xs text-brand-muted hidden sm:inline font-mono">
              Saved in your local orders archive
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {order.rawMessage && (
                <button
                  onClick={handleWhatsApp}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-elevated hover:bg-brand-border text-brand-light text-xs font-heading font-bold border border-brand-border transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Open WhatsApp</span>
                </button>
              )}
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primaryLight text-white text-xs font-heading font-black uppercase transition-all shadow-glow-primary"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD INVOICE FILE</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
