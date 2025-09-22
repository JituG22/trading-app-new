import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      // If email is not configured, log the email content for development
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log(
          "\n📧 EMAIL SIMULATION (Configure EMAIL_USER and EMAIL_PASS to send real emails)"
        );
        console.log(
          "═══════════════════════════════════════════════════════════════════════"
        );
        console.log(`To: ${options.to}`);
        console.log(`Subject: ${options.subject}`);
        console.log(
          "───────────────────────────────────────────────────────────────────────"
        );
        console.log(options.text || options.html.replace(/<[^>]*>/g, ""));
        console.log(
          "═══════════════════════════════════════════════════════════════════════\n"
        );
        return;
      }

      const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log("✅ Email sent successfully:", info.messageId);
    } catch (error) {
      console.error("❌ Error sending email:", error);
      throw new Error("Failed to send email");
    }
  }

  async sendPasswordResetEmail(
    email: string,
    resetToken: string
  ): Promise<void> {
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const resetUrl = `${frontendUrl}/auth/reset-password?token=${resetToken}`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Password Reset Request</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280; }
          .warning { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔒 Password Reset Request</h1>
          </div>
          <div class="content">
            <h2>Hello!</h2>
            <p>We received a request to reset your password for your Trading App account.</p>
            
            <p>Click the button below to reset your password:</p>
            
            <a href="${resetUrl}" class="button">Reset My Password</a>
            
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; background: #f3f4f6; padding: 10px; border-radius: 4px; font-family: monospace;">
              ${resetUrl}
            </p>
            
            <div class="warning">
              <strong>⚠️ Important:</strong>
              <ul>
                <li>This reset link will expire in <strong>30 minutes</strong></li>
                <li>If you didn't request this reset, please ignore this email</li>
                <li>Never share this link with anyone</li>
              </ul>
            </div>
            
            <p>If you're having trouble with the button above, copy and paste the URL into your web browser.</p>
          </div>
          <div class="footer">
            <p>This email was sent from Trading App. If you did not request a password reset, please ignore this email.</p>
            <p>For security reasons, this link will expire in 30 minutes.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
Password Reset Request

Hello!

We received a request to reset your password for your Trading App account.

Please visit the following link to reset your password:
${resetUrl}

Important:
- This reset link will expire in 30 minutes
- If you didn't request this reset, please ignore this email
- Never share this link with anyone

If you're having trouble, copy and paste the URL into your web browser.

This email was sent from Trading App. If you did not request a password reset, please ignore this email.
    `;

    await this.sendEmail({
      to: email,
      subject: "🔒 Password Reset Request - Trading App",
      html,
      text,
    });
  }

  async sendWelcomeEmail(email: string, firstName: string): Promise<void> {
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome to Trading App</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #059669; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Welcome to Trading App!</h1>
          </div>
          <div class="content">
            <h2>Hello ${firstName}!</h2>
            <p>Welcome to Trading App! We're excited to have you on board.</p>
            
            <p>Your account has been successfully created. You can now:</p>
            <ul>
              <li>📊 View your portfolio dashboard</li>
              <li>📈 Access trading tools</li>
              <li>⚙️ Manage your account settings</li>
              <li>📱 Track your investments</li>
            </ul>
            
            <a href="${frontendUrl}/dashboard" class="button">Go to Dashboard</a>
            
            <p>If you have any questions or need help getting started, don't hesitate to reach out to our support team.</p>
          </div>
          <div class="footer">
            <p>Thank you for choosing Trading App!</p>
            <p>Happy trading! 🚀</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
Welcome to Trading App!

Hello ${firstName}!

Welcome to Trading App! We're excited to have you on board.

Your account has been successfully created. You can now:
- View your portfolio dashboard
- Access trading tools  
- Manage your account settings
- Track your investments

Visit: ${frontendUrl}/dashboard

If you have any questions or need help getting started, don't hesitate to reach out to our support team.

Thank you for choosing Trading App!
Happy trading! 🚀
    `;

    await this.sendEmail({
      to: email,
      subject: "🎉 Welcome to Trading App!",
      html,
      text,
    });
  }
}

export const emailService = new EmailService();
