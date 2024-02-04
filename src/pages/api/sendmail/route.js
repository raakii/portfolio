import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
export async function Post(request) {
  try {
    const { email, message } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'zoho',
      host: 'smtpro.zoho.in',
      port: 465,
      secure: true,
      auth: {
        user: 'rakidiallo@esp.sn',
        pass: process.env.NEXT_PUBLIC_PASS,
      },
    });

    const mailOptions = {
      from: `${email}`,
      to: 'rakidiallo@esp.sn',
      subject: 'send Email',
      html: `
        <h3> hello</h3>
        <p> ${message} </p>
        `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'email send successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'failed to send email' }, { status: 500 });
  }
}
