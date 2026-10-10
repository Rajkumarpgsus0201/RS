import { BRAND_CONFIG } from '../data/products';

/**
 * Generate a standalone, styled, printable HTML invoice for RADNUZ STUDIO orders
 */
export function generateInvoiceHTML(order) {
  const orderId = order.orderId || `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
  const invoiceNumber = `INV-${orderId}`;
  const orderDate = order.date 
    ? new Date(order.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    : new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const invoiceTime = order.date
    ? new Date(order.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    : new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  const customer = order.customer || {};
  const items = order.items || [];
  const subtotal = order.subtotal ?? items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const discountAmount = order.discountAmount || 0;
  const shippingFee = order.shippingFee !== undefined ? order.shippingFee : (subtotal >= BRAND_CONFIG.freeShippingThreshold ? 0 : BRAND_CONFIG.shippingFee);
  const total = order.total ?? (subtotal - discountAmount + shippingFee);

  const itemsRows = items.map((item, index) => {
    const itemTotal = (item.price * item.quantity).toLocaleString('en-IN');
    const customBadge = item.isCustom 
      ? `<div style="margin-top: 4px; font-size: 11px; color: #016935; font-weight: 600;">[1-OF-1 BESPOKE PRINT ${item.printPlacement ? `• ${item.printPlacement.toUpperCase()}` : ''}] ${item.customText ? `"${item.customText}"` : ''}</div>` +
        (item.customPreviewUrl ? `<div style="margin-top: 6px;"><img src="${item.customPreviewUrl}" alt="Custom Mockup" style="max-height: 75px; max-width: 75px; object-fit: contain; border: 1px solid #d1d5db; border-radius: 6px; padding: 2px; background: #fff;" /></div>` : '')
      : '';

    const loadBadge = item.isUpcoming
      ? `<div style="margin-top: 4px; font-size: 11px; color: #d97706; font-weight: 700;">⚡ [IN THE LOAD // PRE-RESERVATION: ${item.loadStatus || 'Batch 02 Assembly'} • ETA: ${item.eta || 'Dropping Soon'}]</div>`
      : '';

    const gsmDisplay = item.gsm || (item.apparelType === 'hoodie' ? '380 GSM Fleece' : item.apparelType === 'fullhand' ? '260 GSM Cotton' : '240 GSM French Terry');

    return `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px 8px; font-family: monospace; font-size: 12px; color: #6b7280;">0${index + 1}</td>
        <td style="padding: 12px 8px;">
          <div style="font-weight: 700; color: #111827; font-size: 13px; text-transform: uppercase;">${item.name}</div>
          <div style="font-size: 11px; color: #4b5563; margin-top: 2px;">
            Size: <strong style="color: #111;">${item.selectedSize || 'Standard'}</strong> &nbsp;|&nbsp; 
            Color: <strong style="color: #111;">${item.selectedColor?.name || 'Onyx Black'}</strong> &nbsp;|&nbsp; 
            GSM: <strong>${gsmDisplay}</strong>
          </div>
          ${customBadge}
          ${loadBadge}
        </td>
        <td style="padding: 12px 8px; text-align: center; font-family: monospace; font-size: 13px; font-weight: 600;">${item.quantity}</td>
        <td style="padding: 12px 8px; text-align: right; font-family: monospace; font-size: 13px;">₹${item.price.toLocaleString('en-IN')}</td>
        <td style="padding: 12px 8px; text-align: right; font-family: monospace; font-size: 13px; font-weight: 700; color: #111827;">₹${itemTotal}</td>
      </tr>
    `;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>RADNUZ Tax Invoice - ${orderId}</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1f2937;
      background: #f9fafb;
      padding: 24px;
      line-height: 1.45;
      font-size: 13px;
    }
    .invoice-card {
      max-width: 820px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 36px 40px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }
    .brand-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #111827;
      padding-bottom: 24px;
      margin-bottom: 24px;
    }
    .brand-title {
      font-size: 28px;
      font-weight: 900;
      letter-spacing: -0.04em;
      color: #000000;
      text-transform: uppercase;
      line-height: 1;
    }
    .brand-tagline {
      font-size: 10px;
      letter-spacing: 0.2em;
      color: #016935;
      font-weight: 700;
      margin-top: 6px;
      text-transform: uppercase;
    }
    .invoice-tag {
      text-align: right;
    }
    .badge {
      display: inline-block;
      background: #111827;
      color: #ffffff;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 4px;
      margin-bottom: 6px;
    }
    .meta-table {
      font-family: monospace;
      font-size: 11px;
      color: #4b5563;
      text-align: right;
    }
    .meta-table td {
      padding: 2px 0 2px 8px;
    }
    .meta-table strong {
      color: #111827;
    }
    .parties-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 28px;
      padding-bottom: 20px;
      border-bottom: 1px dashed #d1d5db;
    }
    .party-box h4 {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.12em;
      color: #6b7280;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .party-box p {
      font-size: 12px;
      color: #374151;
      margin-bottom: 3px;
    }
    .party-box strong {
      color: #111827;
    }
    .table-container {
      margin-bottom: 24px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th {
      background: #f3f4f6;
      padding: 10px 8px;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.08em;
      color: #374151;
      text-transform: uppercase;
      border-bottom: 1px solid #d1d5db;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 24px;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #e5e7eb;
    }
    .note-box {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 14px 16px;
      font-size: 11px;
      color: #4b5563;
    }
    .note-box h5 {
      font-size: 11px;
      font-weight: 700;
      color: #111827;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .totals-box {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .total-row {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #4b5563;
      font-family: monospace;
    }
    .total-row.grand {
      font-size: 16px;
      font-weight: 900;
      color: #111827;
      padding-top: 10px;
      margin-top: 4px;
      border-top: 2px solid #111827;
    }
    .footer-stamp {
      margin-top: 36px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #9ca3af;
    }
    .seal {
      border: 1px dashed #016935;
      padding: 6px 14px;
      border-radius: 6px;
      color: #016935;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
    .action-bar {
      max-width: 820px;
      margin: 0 auto 16px auto;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
    .btn {
      background: #111827;
      color: white;
      border: none;
      padding: 10px 18px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      text-decoration: none;
    }
    .btn-outline {
      background: white;
      color: #111827;
      border: 1px solid #d1d5db;
    }
    .btn:hover {
      opacity: 0.9;
    }

    @media print {
      body {
        background: white;
        padding: 0;
      }
      .action-bar {
        display: none !important;
      }
      .invoice-card {
        border: none;
        box-shadow: none;
        padding: 0;
        max-width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="action-bar">
    <button class="btn btn-outline" onclick="window.close()">Close Window</button>
    <button class="btn" onclick="window.print()">
      🖨️ Print / Save as PDF
    </button>
  </div>

  <div class="invoice-card">
    <!-- Header -->
    <div class="brand-header">
      <div>
        <div class="brand-title">RADNUZ STUDIO</div>
        <div class="brand-tagline">WEAR YOUR STORY // 240 GSM ATELIER</div>
        <div style="font-size: 11px; color: #6b7280; margin-top: 6px;">
          Architectural Heavyweight Streetwear & Bespoke DTG Atelier<br/>
          Official WhatsApp Dispatch: +${BRAND_CONFIG.businessWhatsApp}
        </div>
      </div>
      <div class="invoice-tag">
        <div class="badge">WHATSAPP ORDER INVOICE</div>
        <table class="meta-table">
          <tr>
            <td>Order ID:</td>
            <td><strong>#${orderId}</strong></td>
          </tr>
          <tr>
            <td>Invoice No:</td>
            <td><strong>${invoiceNumber}</strong></td>
          </tr>
          <tr>
            <td>Date:</td>
            <td><strong>${orderDate}</strong></td>
          </tr>
          <tr>
            <td>Time:</td>
            <td><strong>${invoiceTime}</strong></td>
          </tr>
        </table>
      </div>
    </div>

    <!-- Parties -->
    <div class="parties-grid">
      <div class="party-box">
        <h4>Billed & Shipped To</h4>
        <p><strong style="font-size: 13px;">${customer.fullName || 'Valued Client'}</strong></p>
        <p>Mobile: <strong>${customer.mobileNumber || 'N/A'}</strong></p>
        ${customer.whatsAppNumber && customer.whatsAppNumber !== customer.mobileNumber ? `<p>WhatsApp: <strong>${customer.whatsAppNumber}</strong></p>` : ''}
        <p style="margin-top: 4px; line-height: 1.4;">${customer.address || 'Address provided via WhatsApp'}, ${customer.city || ''} ${customer.pincode ? `- ${customer.pincode}` : ''}</p>
        ${customer.orderNotes ? `<p style="margin-top: 6px; font-size: 11px; color: #016935; font-style: italic;">Note: "${customer.orderNotes}"</p>` : ''}
      </div>

      <div class="party-box">
        <h4>Fulfillment & Atelier Dispatch</h4>
        <p><strong>RADNUZ Studio Private Hub</strong></p>
        <p>Plot 42, Apparel Park Logistics Center</p>
        <p>Mumbai, Maharashtra - 400013, India</p>
        <p style="margin-top: 4px;">Direct Concierge: <strong>support@radnuz.com</strong></p>
        <p>WhatsApp Hotline: <strong>+${BRAND_CONFIG.businessWhatsApp}</strong></p>
      </div>
    </div>

    <!-- Table -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th style="width: 40px; text-align: left;">#</th>
            <th style="text-align: left;">Item Description & Specifications</th>
            <th style="width: 60px; text-align: center;">Qty</th>
            <th style="width: 100px; text-align: right;">Unit Price</th>
            <th style="width: 110px; text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${itemsRows}
        </tbody>
      </table>
    </div>

    <!-- Summary & Payment Info -->
    <div class="summary-grid">
      <div class="note-box">
        <h5>⚡ WhatsApp Order Instructions</h5>
        <p style="margin-bottom: 6px;">
          1. This order was generated for direct WhatsApp confirmation at RADNUZ Studio.
        </p>
        <p style="margin-bottom: 6px;">
          2. Complete your payment via the official UPI ID or Payment QR sent on WhatsApp chat.
        </p>
        <p>
          3. Once payment screenshot is verified, you will receive real-time courier tracking within 24-48 hours.
        </p>
      </div>

      <div class="totals-box">
        <div class="total-row">
          <span>Cart Subtotal</span>
          <span>₹${subtotal.toLocaleString('en-IN')}</span>
        </div>
        ${discountAmount > 0 ? `
          <div class="total-row" style="color: #016935; font-weight: 700;">
            <span>Promo Discount</span>
            <span>-₹${discountAmount.toLocaleString('en-IN')}</span>
          </div>
        ` : ''}
        <div class="total-row">
          <span>Express Delivery</span>
          <span>${shippingFee === 0 ? '<strong style="color: #016935;">FREE</strong>' : `₹${shippingFee}`}</span>
        </div>
        <div class="total-row grand">
          <span>TOTAL PAYABLE</span>
          <span>₹${total.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>

    <!-- Footer Stamp -->
    <div class="footer-stamp">
      <div>
        RADNUZ STUDIO © 2026 // COMPUTER GENERATED TAX INVOICE // NO PHYSICAL SIGNATURE REQUIRED
      </div>
      <div class="seal">
        ✓ RADNUZ VERIFIED ORDER
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Triggers a direct download of the invoice as a formatted HTML file
 */
export function downloadInvoiceFile(order) {
  const html = generateInvoiceHTML(order);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const orderId = order.orderId || 'DRAFT';
  const a = document.createElement('a');
  a.href = url;
  a.download = `RADNUZ-Invoice-${orderId}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Opens a print-ready window that automatically triggers browser Print/PDF dialog
 */
export function printInvoice(order) {
  const html = generateInvoiceHTML(order);
  const printWindow = window.open('', '_blank', 'width=900,height=800');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    // Allow styles to render before triggering print
    setTimeout(() => {
      try {
        printWindow.print();
      } catch (e) {
        console.error("Print trigger error", e);
      }
    }, 500);
  } else {
    // If pop-up blocked, fallback to file download
    downloadInvoiceFile(order);
  }
}
