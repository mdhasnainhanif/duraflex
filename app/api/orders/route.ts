import { NextResponse } from 'next/server';
import { sendOrderNotificationEmail, OrderEmailData } from '@/lib/email';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data: OrderEmailData = await request.json();

    if (!data.orderId || !data.customer?.phone || !data.customer?.fullName) {
      return NextResponse.json(
        { error: 'Missing required order details' },
        { status: 400 }
      );
    }

    // Save order locally to orders.json so no orders are ever lost
    try {
      const ordersDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(ordersDir)) {
        fs.mkdirSync(ordersDir, { recursive: true });
      }
      const ordersFilePath = path.join(ordersDir, 'orders.json');
      let existingOrders: any[] = [];
      if (fs.existsSync(ordersFilePath)) {
        try {
          const fileData = fs.readFileSync(ordersFilePath, 'utf8');
          existingOrders = JSON.parse(fileData);
        } catch {
          existingOrders = [];
        }
      }
      existingOrders.unshift({
        ...data,
        receivedAt: new Date().toISOString(),
      });
      fs.writeFileSync(ordersFilePath, JSON.stringify(existingOrders, null, 2), 'utf8');
    } catch (saveErr) {
      console.warn('Could not persist order to local file:', saveErr);
    }

    // Send email notification (if SMTP is configured in .env)
    const emailResult = await sendOrderNotificationEmail(data);

    return NextResponse.json({
      success: true,
      orderId: data.orderId,
      emailStatus: emailResult.message,
    });
  } catch (error: any) {
    console.error('Error in POST /api/orders:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
