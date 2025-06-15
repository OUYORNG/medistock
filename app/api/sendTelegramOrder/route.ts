import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = "8046648879:AAE-NHiFSJ8kOrCc-0rz5eC8w_x91nBdmqU";
const TELEGRAM_CHAT_ID = "-4568118812";

export async function POST(request: Request) {
  try {
    const { orderDetails } = await request.json();

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const text = `From Medistock App:\n${orderDetails}`;

    const res = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to send Telegram message' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
