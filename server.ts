import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());

  // Configuration check on startup
  const config = {
    telegram: !!(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_IDS),
    brevo: !!(process.env.BREVO_API_KEY && process.env.NOTIFICATION_EMAIL_TO && process.env.NOTIFICATION_EMAIL_FROM)
  };
  
  console.log("Notification Service Status:", {
    Telegram: config.telegram ? "Configured" : "NOT CONFIGURED",
    Email_Brevo: config.brevo ? "Configured" : "NOT CONFIGURED"
  });

  if (!config.brevo) {
    console.warn("⚠️ Email notifications (Brevo) are missing configuration. Check your BREVO_API_KEY, NOTIFICATION_EMAIL_TO, and NOTIFICATION_EMAIL_FROM secrets.");
  }

  // Telegram Messaging endpoint
  app.post("/api/contact", async (req, res) => {
    const { name, email, phone, info, message } = req.body;
    
    // Validate inputs
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatIdsString = process.env.TELEGRAM_CHAT_IDS;
    const brevoKey = process.env.BREVO_API_KEY;
    const emailTo = process.env.NOTIFICATION_EMAIL_TO;
    const emailFrom = process.env.NOTIFICATION_EMAIL_FROM;

    console.log(`Processing contact form submission from: ${email}`);

    // Prepare message formatting for Telegram
    const telegramMessage = `
<b>🌟 New Contact Form Submission</b>

<b>👤 Parent Name:</b> ${name}
<b>📧 Email:</b> ${email}
${phone ? `<b>📞 Phone:</b> ${phone}` : ""}
${info ? `<b>👶 Child Info:</b> ${info}` : ""}
<b>💬 Message:</b>
${message}
    `.trim();

    // Prepare HTML for Email
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #333;">🌟 New Contact Form Submission</h2>
        <p><strong>👤 Parent Name:</strong> ${name}</p>
        <p><strong>📧 Email:</strong> ${email}</p>
        ${phone ? `<p><strong>📞 Phone:</strong> ${phone}</p>` : ""}
        ${info ? `<p><strong>👶 Child Info:</strong> ${info}</p>` : ""}
        <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px;">
          <strong>💬 Message:</strong><br/>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      </div>
    `;

    try {
      const results = {
        telegram: [],
        email: []
      };

      // Send Telegram notifications
      if (botToken && chatIdsString) {
        const chatIds = chatIdsString.split(",").map(id => id.trim());
        for (const chatId of chatIds) {
          try {
            const resp = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: chatId,
                text: telegramMessage,
                parse_mode: "HTML",
              }),
            });
            const data = await resp.json();
            if (!resp.ok) console.error("Telegram error:", data);
            results.telegram.push({ id: chatId, success: resp.ok });
          } catch (err) {
            console.error(`Failed to send Telegram message to ${chatId}:`, err);
            results.telegram.push({ id: chatId, success: false, error: err.message });
          }
        }
      }

      // Send Brevo Email notifications
      if (brevoKey && emailTo && emailFrom) {
        const recipientEmails = emailTo.split(",").map(email => email.trim());
        
        for (const recipientEmail of recipientEmails) {
          if (!recipientEmail) continue;
          
          try {
            const resp = await fetch("https://api.brevo.com/v3/smtp/email", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "api-key": brevoKey,
              },
              body: JSON.stringify({
                sender: { email: emailFrom, name: "Roots Empowerment Website" },
                to: [{ email: recipientEmail }],
                subject: `New Contact Form from ${name}`,
                htmlContent: emailHtml,
              }),
            });

            const data = await resp.json();
            if (!resp.ok) {
              console.error(`Brevo API Error for ${recipientEmail}:`, JSON.stringify(data, null, 2));
              results.email.push({ email: recipientEmail, success: false, error: data });
            } else {
              console.log(`Email successfully sent to ${recipientEmail}`);
              results.email.push({ email: recipientEmail, success: true });
            }
          } catch (err) {
            console.error(`Network or Parsing Error sending to ${recipientEmail}:`, err);
            results.email.push({ email: recipientEmail, success: false, error: err.message });
          }
        }
      }

      const totalTasks = results.telegram.length + results.email.length;
      if (totalTasks === 0) {
        console.error("No notification services were triggered. Check environment variables.");
        return res.status(500).json({ error: "Notification services not configured" });
      }

      const anySuccess = results.telegram.some(t => t.success) || results.email.some(e => e.success);
      
      if (anySuccess) {
        return res.json({ 
          success: true, 
          message: "Notifications processed",
          details: results
        });
      } else {
        return res.status(500).json({ 
          error: "All notification attempts failed",
          details: results
        });
      }
    } catch (error) {
      console.error("Critical Contact Proxy Error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
