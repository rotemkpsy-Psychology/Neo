# שאלון אישיות IPIP-NEO-120 בעברית

אפליקציית ווב להעברת שאלון אישיות IPIP-NEO-120 בעברית, עם ניקוד אוטומטי, נורמליזציה, ושליחת תוצאות למייל.

## תכונות

- **120 פריטים** בעברית — מוצגים בסדר רציף ללא חשיפת קטגוריות
- **ניקוד אוטומטי** — כולל היפוך פריטים שליליים (reverse scoring)
- **T-Scores ואחוזונים** — לפי מין ו-4 קבוצות גיל
- **נורמות מדויקות** — מהמאגר הבינלאומי של Johnson (N ≈ 619,150)
- **שליחת תוצאות למייל** — למאבחן/ת (חובה) ולנבדק/ת (רשות)
- **5 תחומי OCEAN** ו-**30 פאסטים** — עם גרפים וטבלת סיכום

## התקנה מקומית

```bash
git clone https://github.com/YOUR_USERNAME/ipip-neo-120-hebrew.git
cd ipip-neo-120-hebrew
npm install
npm start
```

פתח: `http://localhost:3000`

## פריסה ל-Render

1. העלה ל-GitHub
2. ב-Render: **New → Web Service** → חבר את ה-repo
3. הגדר **Environment Variables** (ראה למטה)
4. Deploy

## הגדרת שליחת מייל (SMTP)

הוסף את משתני הסביבה הבאים ב-Render (Environment → Environment Variables):

| משתנה | דוגמה | הסבר |
|-------|-------|------|
| `SMTP_HOST` | `smtp.gmail.com` | שרת SMTP |
| `SMTP_PORT` | `587` | פורט (587 ל-TLS, 465 ל-SSL) |
| `SMTP_USER` | `you@gmail.com` | שם משתמש |
| `SMTP_PASS` | `xxxx xxxx xxxx xxxx` | סיסמה / App Password |
| `SMTP_FROM` | `MyApp <you@gmail.com>` | כתובת שולח (אופציונלי) |

### שימוש עם Gmail

1. הפעל [2-Step Verification](https://myaccount.google.com/security)
2. צור [App Password](https://myaccount.google.com/apppasswords)
3. השתמש ב-App Password כ-`SMTP_PASS`

### שימוש עם שירותי SMTP אחרים

- **SendGrid**: host=`smtp.sendgrid.net`, port=`587`, user=`apikey`, pass=API Key
- **Mailgun**: host=`smtp.mailgun.org`, port=`587`
- **Outlook**: host=`smtp-mail.outlook.com`, port=`587`

## מבנה OCEAN

| תחום | עברית | פאסטים |
|------|-------|--------|
| **O** | פתיחות לחוויה | דמיון, אומנות, רגשות, גיוון, העמקה אינטלקטואלית, ליברליות |
| **C** | מצפוניות | אמונה ביכולת, סדר, חובה, הישגיות, משמעת עצמית, זהירות |
| **E** | מוחצנות | ידידותיות, מינגלינג, אסרטיביות, אקטיביות, ריגושים, שמחת חיים |
| **A** | מקובלות | אמון, מוסריות, אלטרואיזם, שיתוף פעולה, צניעות, אמפתיה |
| **N** | נוירוטיציזם | חרדה, כעס, דיכאוניות, מודעות עצמית, דחפים, פגיעות |

## מקורות

- **פריטים**: IPIP — נחלת הכלל ([ipip.ori.org](https://ipip.ori.org))
- **מאמר**: Johnson, J. A. (2014). *Journal of Research in Personality*, 51, 78-89
- **נורמות**: [osf.io/tbmh5](https://osf.io/tbmh5)
- **תרגום**: Shaul Oreg

## רישיון

פריטי IPIP — Public Domain. קוד — MIT.

## הערה

למטרות חינוכיות ומחקריות בלבד. אינו מהווה אבחון פסיכולוגי קליני.
