import { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { name: 'Users', path: '/dashboard/users', permission: 'view_users', icon: '👥' },
    { name: 'Blogs', path: '/dashboard/blogs', permission: 'read_blog', icon: '📝' },
    { name: 'Portfolios', path: '/dashboard/portfolios', permission: 'read_portfolio', icon: '💼' },
    { name: 'Testimonials', path: '/dashboard/testimonials', permission: 'read_testimonial', icon: '💬' },
  ];

  const filteredMenuItems = menuItems.filter(
    (item) => !item.permission || user?.permissions.includes(item.permission)
  );

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #e3f2fd 100%)',
  };

  const mobileHeaderStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    padding: '1rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 40,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
  };

  const sidebarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '280px',
    background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
    borderRight: '1px solid rgba(0, 0, 0, 0.08)',
    boxShadow: '4px 0 20px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s ease',
    zIndex: 50,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  };

  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
    zIndex: 45,
    animation: 'fadeIn 0.3s ease',
  };

  const logoContainerStyle = {
    padding: '2rem 1.5rem',
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  };

  const userInfoStyle = {
    padding: '1.5rem',
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
  };

  const menuItemStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem 1.5rem',
    borderRadius: '0.75rem',
    margin: '0.25rem 1rem',
    textDecoration: 'none',
    color: isActive ? 'white' : '#4b5563',
    background: isActive
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      : 'transparent',
    fontWeight: isActive ? '600' : '500',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    border: isActive ? 'none' : '1px solid transparent',
    boxShadow: isActive ? '0 4px 12px rgba(102, 126, 234, 0.3)' : 'none',
  });

  const mainContentStyle = {
    marginLeft: window.innerWidth >= 1024 ? '280px' : '0',
    paddingTop: window.innerWidth < 1024 ? '80px' : '0',
    minHeight: '100vh',
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideIn {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }

          @media (min-width: 1024px) {
            .mobile-header {
              display: none !important;
            }
            .sidebar {
              transform: translateX(0) !important;
            }
          }

          @media (max-width: 1023px) {
            .sidebar {
              transform: translateX(-100%);
            }
            .sidebar.open {
              transform: translateX(0);
              animation: slideIn 0.3s ease;
            }
          }

          .menu-item:not(.active):hover {
            background: linear-gradient(135deg, #f3f4f6 0%, #e0e7ff 100%);
            border-color: #c7d2fe;
            transform: translateX(4px);
          }

          .logout-btn:hover {
            background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
            transform: translateX(4px);
          }

          .logo-text {
            background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        `}
      </style>

      <div style={containerStyle}>
        {/* Mobile Header */}
        <div className="mobile-header" style={mobileHeaderStyle}>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{
              padding: '0.75rem',
              borderRadius: '0.75rem',
              border: 'none',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1.25rem',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
            }}
          >
            ☰
          </button>
          <h1 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937' }}>
            Admin Dashboard
          </h1>
          <div style={{ width: '40px' }}></div>
        </div>

        {/* Overlay */}
        {isSidebarOpen && window.innerWidth < 1024 && (
          <div
            style={overlayStyle}
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <aside
          className={`sidebar ${isSidebarOpen ? 'open' : ''}`}
          style={sidebarStyle}
        >
          {/* Logo */}
          <div style={logoContainerStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  backdropFilter: 'blur(10px)',
                }}
              >
                ⚡
              </div>
              <h1 className="logo-text" style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white' }}>
                Admin Panel
              </h1>
            </div>
          </div>

          {/* User Info */}
          <div style={userInfoStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                }}
              >
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user?.name}
                </p>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav style={{ flex: 1, padding: '1rem 0', overflowY: 'auto' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0 1.5rem', marginBottom: '1rem' }}>
              Menu
            </p>
            {filteredMenuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`menu-item ${isActive ? 'active' : ''}`}
                  style={menuItemStyle(isActive)}
                >
                  <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                  <span>{item.name}</span>
                  {isActive && (
                    <span style={{ marginLeft: 'auto', fontSize: '1rem' }}>→</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}>
            <button
              onClick={handleLogout}
              className="logout-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                width: '100%',
                padding: '1rem 1.5rem',
                borderRadius: '0.75rem',
                border: '1px solid #fecaca',
                background: 'white',
                color: '#dc2626',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div style={mainContentStyle}>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
