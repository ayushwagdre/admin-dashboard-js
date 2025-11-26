import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
    position: 'relative',
    overflow: 'hidden',
  };

  const formContainerStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '2rem',
    padding: '3rem',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 30px 80px rgba(0, 0, 0, 0.3)',
    animation: 'slideUp 0.6s ease-out',
    position: 'relative',
    zIndex: 10,
  };

  const logoStyle = {
    width: '80px',
    height: '80px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 2rem',
    fontSize: '2.5rem',
    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
    animation: 'bounce 2s infinite',
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem 1rem 1rem 3.5rem',
    border: '2px solid #e5e7eb',
    borderRadius: '1rem',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    outline: 'none',
    background: 'white',
  };

  const buttonStyle = {
    width: '100%',
    padding: '1rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '1rem',
    fontSize: '1.125rem',
    fontWeight: '700',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    opacity: isLoading ? '0.7' : '1',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }

          .floating-shape {
            position: absolute;
            border-radius: 50%;
            opacity: 0.1;
            animation: float 6s ease-in-out infinite;
          }

          .input-wrapper input:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
          }

          .login-button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
          }

          .login-button:active:not(:disabled) {
            transform: translateY(0);
          }

          @media (max-width: 768px) {
            .form-container {
              padding: 2rem 1.5rem !important;
              max-width: 90% !important;
            }
            .floating-shape {
              display: none;
            }
          }

          @media (max-width: 640px) {
            .form-container {
              padding: 1.5rem 1rem !important;
              border-radius: 1.5rem !important;
              margin: 1rem !important;
            }
            .login-logo {
              width: 60px !important;
              height: 60px !important;
              font-size: 2rem !important;
            }
          }
        `}
      </style>

      {/* Floating shapes */}
      <div className="floating-shape" style={{ width: '300px', height: '300px', top: '10%', left: '10%', background: 'white', animationDelay: '0s' }}></div>
      <div className="floating-shape" style={{ width: '200px', height: '200px', top: '60%', right: '10%', background: 'white', animationDelay: '2s' }}></div>
      <div className="floating-shape" style={{ width: '150px', height: '150px', bottom: '20%', left: '20%', background: 'white', animationDelay: '4s' }}></div>

      <div className="form-container" style={formContainerStyle}>
        {/* Logo */}
        <div className="login-logo" style={logoStyle}>🔐</div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
            Welcome Back!
          </h1>
          <p style={{ fontSize: '1rem', color: '#6b7280' }}>
            Sign in to access your dashboard
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: '#fee2e2',
            border: '2px solid #fecaca',
            borderRadius: '1rem',
            padding: '1rem',
            marginBottom: '1.5rem',
            color: '#991b1b',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            animation: 'slideDown 0.3s ease-out'
          }}>
            <span style={{ fontSize: '1.25rem' }}>⚠️</span>
            <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Email Input */}
          <div className="input-wrapper">
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1.25rem' }}>
                📧
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
                placeholder="admin@email.com"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="input-wrapper">
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1.25rem' }}>
                🔑
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={inputStyle}
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="login-button"
            style={buttonStyle}
          >
            {isLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem' }}>⏳</span>
                Signing in...
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                Sign In
                <span style={{ fontSize: '1.25rem' }}>→</span>
              </span>
            )}
          </button>
        </form>

        {/* Default Credentials */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
          borderRadius: '1rem',
          border: '2px dashed #9ca3af',
        }}>
          <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem', textAlign: 'center' }}>
            🎯 Default Credentials
          </p>
          <div style={{ fontSize: '0.875rem', color: '#6b7280', textAlign: 'center' }}>
            <p style={{ marginBottom: '0.25rem' }}>
              <strong>Email:</strong> admin@email.com
            </p>
            <p>
              <strong>Password:</strong> admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
