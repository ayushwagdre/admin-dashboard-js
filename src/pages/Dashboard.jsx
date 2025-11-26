import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const stats = [
    {
      name: 'Total Permissions',
      value: user?.permissions.length || 0,
      icon: '🛡️',
      color: '#3b82f6',
      bgColor: '#dbeafe',
    },
    {
      name: 'Active Sessions',
      value: '1',
      icon: '📡',
      color: '#10b981',
      bgColor: '#d1fae5',
    },
    {
      name: 'Account Status',
      value: 'Active',
      icon: '✅',
      color: '#8b5cf6',
      bgColor: '#ede9fe',
    },
  ];

  const quickActions = [
    { name: 'Users', icon: '👥', permission: 'view_users', path: '/dashboard/users', color: '#3b82f6' },
    { name: 'Blogs', icon: '📝', permission: 'read_blog', path: '/dashboard/blogs', color: '#10b981' },
    { name: 'Portfolios', icon: '💼', permission: 'read_portfolio', path: '/dashboard/portfolios', color: '#8b5cf6' },
    { name: 'Testimonials', icon: '💬', permission: 'read_testimonial', path: '/dashboard/testimonials', color: '#f59e0b' },
  ];

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #e3f2fd 100%)',
    padding: '1.5rem',
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '1.5rem',
    padding: '2rem',
    color: 'white',
    marginBottom: '2rem',
    boxShadow: '0 20px 60px rgba(102, 126, 234, 0.4)',
    animation: 'slideDown 0.6s ease-out',
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  };

  const statCardStyle = (bgColor, index) => ({
    background: 'white',
    borderRadius: '1rem',
    padding: '1.5rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    animation: `slideUp 0.6s ease-out ${index * 0.1}s both`,
    ':hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    },
  });

  const permissionsCardStyle = {
    background: 'white',
    borderRadius: '1rem',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  };

  const quickActionsCardStyle = {
    background: 'white',
    borderRadius: '1rem',
    padding: '2rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  };

  const actionButtonStyle = (color) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1rem',
    borderRadius: '1rem',
    border: '2px solid #e5e7eb',
    background: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    color: '#1f2937',
  });

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .stat-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
          }

          .action-btn:hover {
            transform: scale(1.05);
            border-color: currentColor;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          }

          .permission-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.25rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 0.75rem;
            font-size: 0.875rem;
            font-weight: 600;
            margin: 0.5rem;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
            transition: all 0.3s ease;
          }

          .permission-badge:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          }

          @media (max-width: 768px) {
            .stats-grid {
              grid-template-columns: 1fr !important;
            }

            .actions-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
        `}
      </style>

      {/* Header */}
      <div style={headerStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: '700', marginBottom: '0.5rem' }}>
              {getGreeting()}, {user?.name}! 👋
            </h1>
            <p style={{ fontSize: 'clamp(0.875rem, 3vw, 1.125rem)', opacity: '0.9' }}>
              Welcome to your admin dashboard
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.875rem', opacity: '0.8', marginBottom: '0.25rem' }}>Current Time</p>
            <p style={{ fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', fontWeight: '600' }}>
              {currentTime.toLocaleTimeString()}
            </p>
            <p style={{ fontSize: '0.875rem', opacity: '0.9' }}>
              {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid" style={statsGridStyle}>
        {stats.map((stat, index) => (
          <div
            key={index}
            className="stat-card"
            style={{
              ...statCardStyle(stat.bgColor, index),
              background: 'white',
              borderRadius: '1rem',
              padding: '1.5rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '4rem',
                  height: '4rem',
                  background: stat.bgColor,
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                }}
              >
                {stat.icon}
              </div>
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500', marginBottom: '0.5rem' }}>
                {stat.name}
              </p>
              <p style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937' }}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Permissions Card */}
      <div style={permissionsCardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🔐</span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>Your Permissions</h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {user?.permissions.length > 0 ? (
            user.permissions.map((permission, index) => (
              <span key={index} className="permission-badge">
                ✓ {permission.replace(/_/g, ' ').toUpperCase()}
              </span>
            ))
          ) : (
            <p style={{ color: '#6b7280', textAlign: 'center', width: '100%', padding: '2rem' }}>
              No permissions assigned
            </p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={quickActionsCardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>⚡</span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>Quick Actions</h2>
        </div>
        <div
          className="actions-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {quickActions
            .filter((action) => !action.permission || user?.permissions.includes(action.permission))
            .map((action, index) => (
              <a
                key={index}
                href={action.path}
                className="action-btn"
                style={actionButtonStyle(action.color)}
              >
                <div
                  style={{
                    fontSize: '3rem',
                    marginBottom: '1rem',
                  }}
                >
                  {action.icon}
                </div>
                <span style={{ fontWeight: '600', fontSize: '1rem' }}>{action.name}</span>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
