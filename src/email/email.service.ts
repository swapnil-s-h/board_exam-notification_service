import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  async sendResultViewedEmail(email: string, name: string) {
    try {
      return await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Board Exam Result Viewed',
        text: `Hello ${name},
Your board examination result has been viewed successfully.
Thank you.`,
      });
    } catch (error) {
      throw error;
    }
  }
}
