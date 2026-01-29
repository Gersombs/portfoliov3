import { NextResponse, type NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

// ===== Rate limit en memoria (tu lógica intacta) =====
const RATE_LIMIT = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minuto
  const maxRequests = 5;

  const timestamps = RATE_LIMIT.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < windowMs);

  recent.push(now);
  RATE_LIMIT.set(ip, recent);

  return recent.length > maxRequests;
}

export async function POST(req: NextRequest) {
  try {
    // Obtener IP (compatible con Vercel/Next)
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await req.json();
    const { name, email, subject, message, company, startedAt } = body;

    // ===== Honeypot (Tu lógica anti-spam) =====
    if (company) {
      // Respondemos success falso al bot para que se vaya feliz
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // ===== Delay anti-bot (mínimo 2s) =====
    if (!startedAt || Date.now() - startedAt < 2000) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // ===== Validaciones =====
    if (
      typeof email !== 'string' ||
      !email.includes('@') ||
      typeof message !== 'string' ||
      message.length < 10
    ) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // ===== Nodemailer =====
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio V2" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: subject || `Nuevo mensaje de ${name}`,
      html: `
        <div style="font-family: monospace; color: #333;">
            <h2>📩 Incoming Transmission</h2>
            <p><strong>Operador:</strong> ${name || 'Anónimo'}</p>
            <p><strong>Contacto:</strong> ${email}</p>
            <hr />
            <p><strong>Mensaje:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('CONTACT ERROR:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}