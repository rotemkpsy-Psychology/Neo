const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Email transporter — configure via environment variables
let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    console.warn('SMTP not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.');
    return null;
  }
  transporter = nodemailer.createTransport({
    host, port, secure: port === 465,
    auth: { user, pass }
  });
  return transporter;
}

app.post('/api/send-results', async (req, res) => {
  const { assessorEmail, respondentEmail, respondentName, htmlReport } = req.body;
  if (!assessorEmail || !htmlReport) {
    return res.status(400).json({ error: 'חסרים נתונים' });
  }
  const t = getTransporter();
  if (!t) {
    return res.status(500).json({ error: 'שרת המייל לא מוגדר. הגדר SMTP_HOST, SMTP_USER, SMTP_PASS ב-Environment Variables.' });
  }
  const subject = `תוצאות שאלון IPIP-NEO-120${respondentName ? ' — ' + respondentName : ''}`;
  const emailHtml = `<!DOCTYPE html><html lang="he" dir="rtl"><head><meta charset="UTF-8">
<style>body{font-family:Arial,sans-serif;direction:rtl;color:#1a1a2e;max-width:700px;margin:0 auto;padding:20px}
h1{color:#2d5a7b;font-size:22px;border-bottom:2px solid #2d5a7b;padding-bottom:8px}
table{width:100%;border-collapse:collapse;margin:12px 0;font-size:13px}
th,td{padding:6px 10px;border:1px solid #d1d5db;text-align:center}
th{background:#e8f0f6;font-weight:600}
.low{color:#b91c1c}.avg{color:#6b7280}.high{color:#0369a1}
.meta{font-size:13px;color:#6b7280;margin-bottom:16px}
.footer{margin-top:24px;font-size:11px;color:#9ca3af;text-align:center;border-top:1px solid #e5e7eb;padding-top:12px}</style></head>
<body><h1>תוצאות שאלון אישיות IPIP-NEO-120</h1>
${respondentName ? '<div class="meta">נבדק/ת: <strong>' + respondentName + '</strong></div>' : ''}
${htmlReport}
<div class="footer">שאלון IPIP-NEO-120 — נורמות בינלאומיות מ-Johnson (2014)<br>למטרות חינוכיות ומחקריות בלבד</div>
</body></html>`;

  try {
    const from = process.env.SMTP_FROM || process.env.SMTP_USER;
    await t.sendMail({ from, to: assessorEmail, subject, html: emailHtml });
    if (respondentEmail) {
      await t.sendMail({ from, to: respondentEmail, subject, html: emailHtml });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ error: 'שגיאה בשליחת המייל: ' + err.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`IPIP-NEO-120 Hebrew running on port ${PORT}`);
});
