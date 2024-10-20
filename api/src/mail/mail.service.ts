import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: +process.env.MAIL_PORT || 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async sendVerificationEmail(to: string, code: string): Promise<void> {
    const mailOptions = {
      from: 'phishaware@no-reply.fr', // Your OVH email address
      to,
      subject: 'Email Verification Code',
      html: `<p>Your verification code is: <strong>${code}</strong></p>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Verification email sent to ${to}`);
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw new Error('Could not send verification email.');
    }
  }

  async sendContactEmail(
    from: string,
    fromName: string,
    message: string,
  ): Promise<void> {
    const domain = 'PhishAware';
    try {
      await this.transporter.sendMail({
        from: `${fromName}<${from}>`,
        to: 'support@jdo-univers.eu',
        subject: 'ContactForm mail from ' + domain,
        html: `<p>Here is the message sent from ${fromName} (${from}) :</p><p>${message.replace(/\n/g, '<br />')}</p>`,
      });
      console.log(`Contact email sent from ${from}`);
    } catch (error) {
      console.error('Error sending contact email:', error);
      throw new Error('Could not send contact email.');
    }
  }
}
