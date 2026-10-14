import nodemailer from 'nodemailer';
import { SITE_CONFIG } from './constants';

export interface OrderEmailData {
  orderId: string;
  customer: {
    fullName: string;
    phone: string;
    email?: string;
    city: string;
    address: string;
    postalCode?: string;
    notes?: string;
  };
  items: Array<{
    name: string;
    size?: string;
    thickness?: string;
    quantity: number;
    unitPrice: number;
  }>;
  totals: {
    subtotal: number;
    bundleDiscount?: number;
    couponDiscount?: number;
    deliveryFee: number;
    grandTotal: number;
  };
  paymentMethod: string;
  createdAt?: string;
}

// Create reusable transporter object using environment credentials
function getTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for 587
    auth: {
      user,
      pass,
    },
  });
}

export function generateOrderHtml(order: OrderEmailData): string {
  const { orderId, customer, items, totals, paymentMethod, createdAt } = order;
  const dateStr = createdAt || new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });

  const itemRows = items
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #E2E8F0;">
        <td style="padding: 12px 8px; font-size: 14px; color: #1E293B;">
          <strong>${item.name}</strong><br/>
          <span style="font-size: 12px; color: #64748B;">Size: ${item.size || 'Standard'} | Thickness: ${item.thickness || 'Standard'}</span>
        </td>
        <td style="padding: 12px 8px; font-size: 14px; text-align: center; color: #1E293B;">${item.quantity}</td>
        <td style="padding: 12px 8px; font-size: 14px; text-align: right; color: #1E293B;">Rs. ${(item.unitPrice * item.quantity).toLocaleString()}</td>
      </tr>
    `
    )
    .join('');

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Order #${orderId}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E293B;">
    <div style="max-width: 640px; margin: 30px auto; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #E2E8F0;">
      
      <!-- HEADER -->
      <div style="background-color: #0F1E36; padding: 32px 24px; text-align: center;">
        <h1 style="margin: 0; color: #FFFFFF; font-size: 24px; font-weight: 800; letter-spacing: 1px;">DURA FLEX</h1>
        <p style="margin: 6px 0 0; color: #94A3B8; font-size: 13px;">Sleep Better. Live Better.</p>
        <div style="margin-top: 16px; display: inline-block; background-color: #059669; color: #FFFFFF; padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: bold;">
          🎉 New Order Received: #${orderId}
        </div>
      </div>

      <!-- BODY CONTENT -->
      <div style="padding: 24px 28px;">
        
        <!-- CUSTOMER DETAILS -->
        <h2 style="font-size: 16px; color: #0F1E36; margin: 0 0 14px; border-bottom: 2px solid #F1F5F9; padding-bottom: 8px;">
          👤 Customer & Delivery Information
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #64748B; width: 140px;">Customer Name:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #0F1E36;">${customer.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748B;">WhatsApp / Phone:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #0F1E36;">
              <a href="https://wa.me/${customer.phone.replace(/\D/g, '')}" style="color: #059669; text-decoration: none;">
                ${customer.phone} 💬 (Click to chat)
              </a>
            </td>
          </tr>
          ${
            customer.email
              ? `<tr>
            <td style="padding: 6px 0; color: #64748B;">Email Address:</td>
            <td style="padding: 6px 0; color: #0F1E36;">${customer.email}</td>
          </tr>`
              : ''
          }
          <tr>
            <td style="padding: 6px 0; color: #64748B;">Delivery City:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #0F1E36;">${customer.city}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748B;">Shipping Address:</td>
            <td style="padding: 6px 0; color: #0F1E36;">${customer.address}</td>
          </tr>
          ${
            customer.notes
              ? `<tr>
            <td style="padding: 6px 0; color: #64748B;">Special Instructions:</td>
            <td style="padding: 6px 0; color: #D97706; font-style: italic;">${customer.notes}</td>
          </tr>`
              : ''
          }
          <tr>
            <td style="padding: 6px 0; color: #64748B;">Order Date & Time:</td>
            <td style="padding: 6px 0; color: #64748B;">${dateStr}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748B;">Payment Method:</td>
            <td style="padding: 6px 0; font-weight: bold; color: #0F1E36;">
              ${
                paymentMethod === 'cod'
                  ? '💵 Cash on Delivery (COD)'
                  : paymentMethod === 'bank'
                  ? '🏦 Direct Bank Transfer / Raast'
                  : '💳 Credit / Debit Card'
              }
            </td>
          </tr>
        </table>

        <!-- ORDER ITEMS TABLE -->
        <h2 style="font-size: 16px; color: #0F1E36; margin: 0 0 14px; border-bottom: 2px solid #F1F5F9; padding-bottom: 8px;">
          📦 Items Ordered (${items.length})
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #F8FAFC; text-align: left;">
              <th style="padding: 10px 8px; font-size: 12px; color: #64748B; text-transform: uppercase;">Product</th>
              <th style="padding: 10px 8px; font-size: 12px; color: #64748B; text-transform: uppercase; text-align: center;">Qty</th>
              <th style="padding: 10px 8px; font-size: 12px; color: #64748B; text-transform: uppercase; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemRows}
          </tbody>
        </table>

        <!-- TOTALS BREAKDOWN -->
        <div style="background-color: #F8FAFC; padding: 18px; border-radius: 12px; margin-bottom: 24px; border: 1px solid #E2E8F0;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; color: #64748B;">
            <span>Subtotal:</span>
            <span>Rs. ${totals.subtotal.toLocaleString()}</span>
          </div>
          ${
            (totals.bundleDiscount || 0) + (totals.couponDiscount || 0) > 0
              ? `<div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; color: #059669;">
            <span>Discounts:</span>
            <span>- Rs. ${((totals.bundleDiscount || 0) + (totals.couponDiscount || 0)).toLocaleString()}</span>
          </div>`
              : ''
          }
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; color: #64748B;">
            <span>Delivery:</span>
            <span style="color: #059669; font-weight: bold;">
              ${totals.deliveryFee === 0 ? 'FREE Doorstep Delivery' : `Rs. ${totals.deliveryFee.toLocaleString()}`}
            </span>
          </div>
          <div style="border-top: 1px solid #CBD5E1; margin-top: 10px; padding-top: 10px; display: flex; justify-content: space-between; font-size: 16px; font-weight: 800; color: #0F1E36;">
            <span>Grand Total:</span>
            <span>Rs. ${totals.grandTotal.toLocaleString()}</span>
          </div>
        </div>

        <!-- QUICK ACTION BUTTONS FOR OWNER -->
        <div style="text-align: center; padding-top: 10px;">
          <a href="https://wa.me/${customer.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
            `Salam ${customer.fullName}, Dura Flex Mattress se baat kar rahe hain regarding your order #${orderId}.`
          )}" style="display: inline-block; background-color: #25D366; color: #FFFFFF; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; margin-right: 8px;">
            💬 WhatsApp Customer Directly
          </a>
          <a href="tel:${customer.phone}" style="display: inline-block; background-color: #0F1E36; color: #FFFFFF; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px;">
            📞 Call Customer
          </a>
        </div>

      </div>

      <!-- FOOTER -->
      <div style="background-color: #F1F5F9; padding: 16px; text-align: center; font-size: 12px; color: #64748B;">
        <p style="margin: 0;">${SITE_CONFIG.name} Store Admin Notification • ${SITE_CONFIG.address}</p>
        <p style="margin: 4px 0 0;">Customer Support: ${SITE_CONFIG.phone} | <a href="https://wa.me/${SITE_CONFIG.whatsappNumber}" style="color: #059669;">WhatsApp Us</a></p>
      </div>

    </div>
  </body>
  </html>
  `;
}

export async function sendOrderNotificationEmail(order: OrderEmailData): Promise<{
  success: boolean;
  message: string;
}> {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.ORDER_NOTIFICATION_EMAIL;

  const transporter = getTransporter();

  // If SMTP is not yet configured, log order details and return gracefully
  if (!transporter) {
    console.log('----------------------------------------------------');
    console.log(`[ORDER RECORDED] #${order.orderId}`);
    console.log(`Customer: ${order.customer.fullName} (${order.customer.phone})`);
    console.log(`Address: ${order.customer.address}, ${order.customer.city}`);
    console.log(`Total: Rs. ${order.totals.grandTotal.toLocaleString()}`);
    console.log('Notice: SMTP credentials (SMTP_USER, SMTP_PASS) not set in .env. Skipping external email dispatch.');
    console.log('----------------------------------------------------');
    return {
      success: true,
      message: 'Order saved. SMTP credentials pending configuration.',
    };
  }

  const recipient = adminEmail || process.env.SMTP_USER;
  if (!recipient) {
    return {
      success: false,
      message: 'No recipient email configured.',
    };
  }

  const mailOptions = {
    from: `"${SITE_CONFIG.name} Orders" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: recipient,
    replyTo: order.customer.email || undefined,
    subject: `🛒 New Order #${order.orderId} - Rs. ${order.totals.grandTotal.toLocaleString()} (${order.customer.fullName})`,
    html: generateOrderHtml(order),
  };

  try {
    await transporter.sendMail(mailOptions);

    // If customer also provided an email address, send them an order confirmation copy
    if (order.customer.email) {
      try {
        await transporter.sendMail({
          from: `"${SITE_CONFIG.name}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
          to: order.customer.email,
          subject: `Order Confirmation #${order.orderId} - Dura Flex`,
          html: generateOrderHtml(order),
        });
      } catch (custErr) {
        console.warn('Could not send confirmation copy to customer email:', custErr);
      }
    }

    return { success: true, message: 'Email notification sent successfully.' };
  } catch (error: any) {
    console.error('Failed to send order email:', error);
    return { success: false, message: error?.message || 'Error sending email' };
  }
}
