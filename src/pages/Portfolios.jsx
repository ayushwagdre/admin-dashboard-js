import React, { useState, useEffect } from 'react';

const Portfolios = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    projectLink: '',
    technologies: '',
    category: ''
  });

  // Simulated user permissions (in real app, this would come from auth context)
  const userPermissions = ['view_portfolios', 'create_portfolios', 'edit_portfolios', 'delete_portfolios'];

  useEffect(() => {
    loadPortfolios();
  }, []);

  const loadPortfolios = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockPortfolios = [
        {
          id: 1,
          title: 'E-Commerce Platform',
          description: 'A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.',
          image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
          projectLink: 'https://example.com/ecommerce',
          technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
          category: 'Web Development',
          featured: true
        },
        {
          id: 2,
          title: 'Mobile Banking App',
          description: 'Secure mobile banking application with biometric authentication and real-time transaction tracking.',
          image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
          projectLink: 'https://example.com/banking',
          technologies: ['React Native', 'Firebase', 'Redux'],
          category: 'Mobile App',
          featured: true
        },
        {
          id: 3,
          title: 'AI Content Generator',
          description: 'AI-powered content generation tool for creating blog posts, social media content, and marketing copy.',
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
          projectLink: 'https://example.com/ai-content',
          technologies: ['Python', 'OpenAI API', 'Flask', 'React'],
          category: 'AI/ML',
          featured: false
        },
        {
          id: 4,
          title: 'Real Estate Portal',
          description: 'Comprehensive real estate platform with property listings, virtual tours, and mortgage calculators.',
          image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
          projectLink: 'https://example.com/realestate',
          technologies: ['Vue.js', 'Laravel', 'MySQL'],
          category: 'Web Development',
          featured: false
        },
        {
          id: 5,
          title: 'Fitness Tracking App',
          description: 'Personal fitness tracker with workout plans, nutrition tracking, and progress analytics.',
          image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop',
          projectLink: 'https://example.com/fitness',
          technologies: ['Flutter', 'Firebase', 'HealthKit'],
          category: 'Mobile App',
          featured: true
        },
        {
          id: 6,
          title: 'Project Management Tool',
          description: 'Collaborative project management platform with kanban boards, time tracking, and team collaboration features.',
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
          projectLink: 'https://example.com/pm-tool',
          technologies: ['Angular', 'NestJS', 'PostgreSQL'],
          category: 'Web Development',
          featured: false
        }
      ];
      setPortfolios(mockPortfolios);
      setLoading(false);
    }, 1000);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingPortfolio) {
      // Update existing portfolio
      setPortfolios(portfolios.map(portfolio =>
        portfolio.id === editingPortfolio.id
          ? { ...portfolio, ...formData, technologies: formData.technologies.split(',').map(t => t.trim()) }
          : portfolio
      ));
      showNotification('Portfolio updated successfully!', 'success');
    } else {
      // Create new portfolio
      const newPortfolio = {
        id: portfolios.length + 1,
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim()),
        featured: false
      };
      setPortfolios([...portfolios, newPortfolio]);
      showNotification('Portfolio created successfully!', 'success');
    }

    setShowModal(false);
    setEditingPortfolio(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      projectLink: '',
      technologies: '',
      category: ''
    });
  };

  const handleEdit = (portfolio) => {
    if (!userPermissions.includes('edit_portfolios')) {
      showNotification('You do not have permission to edit portfolios', 'error');
      return;
    }

    setEditingPortfolio(portfolio);
    setFormData({
      title: portfolio.title,
      description: portfolio.description,
      image: portfolio.image,
      projectLink: portfolio.projectLink,
      technologies: portfolio.technologies.join(', '),
      category: portfolio.category
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (!userPermissions.includes('delete_portfolios')) {
      showNotification('You do not have permission to delete portfolios', 'error');
      return;
    }

    if (window.confirm('Are you sure you want to delete this portfolio?')) {
      setPortfolios(portfolios.filter(portfolio => portfolio.id !== id));
      showNotification('Portfolio deleted successfully!', 'success');
    }
  };

  const handleAddNew = () => {
    if (!userPermissions.includes('create_portfolios')) {
      showNotification('You do not have permission to create portfolios', 'error');
      return;
    }

    setEditingPortfolio(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      projectLink: '',
      technologies: '',
      category: ''
    });
    setShowModal(true);
  };

  // Styles
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #e3f2fd 100%)',
    padding: '1.5rem'
  };

  const headerStyle = {
    marginBottom: '2rem'
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '0.5rem'
  };

  const subtitleStyle = {
    color: '#64748b',
    fontSize: '0.95rem'
  };

  const addButtonStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '1.5rem',
    marginTop: '1.5rem'
  };

  const cardStyle = {
    background: 'white',
    borderRadius: '1rem',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    animation: 'slideIn 0.5s ease-out'
  };

  const imageContainerStyle = {
    position: 'relative',
    paddingBottom: '60%',
    overflow: 'hidden',
    background: '#f1f5f9'
  };

  const imageStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease'
  };

  const featuredBadgeStyle = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    color: 'white',
    padding: '0.4rem 0.8rem',
    borderRadius: '1rem',
    fontSize: '0.75rem',
    fontWeight: '600',
    boxShadow: '0 2px 8px rgba(251, 191, 36, 0.4)'
  };

  const cardContentStyle = {
    padding: '1.5rem'
  };

  const categoryBadgeStyle = {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '0.3rem 0.8rem',
    borderRadius: '1rem',
    fontSize: '0.75rem',
    fontWeight: '600',
    marginBottom: '0.75rem'
  };

  const portfolioTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.75rem'
  };

  const descriptionStyle = {
    color: '#64748b',
    fontSize: '0.9rem',
    lineHeight: '1.6',
    marginBottom: '1rem'
  };

  const techContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1rem'
  };

  const techBadgeStyle = {
    background: '#f1f5f9',
    color: '#475569',
    padding: '0.3rem 0.7rem',
    borderRadius: '0.375rem',
    fontSize: '0.8rem',
    fontWeight: '500'
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '1rem'
  };

  const viewButtonStyle = {
    flex: 1,
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1rem',
    borderRadius: '0.5rem',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const editButtonStyle = {
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1rem',
    borderRadius: '0.5rem',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const deleteButtonStyle = {
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1rem',
    borderRadius: '0.5rem',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem'
  };

  const modalStyle = {
    background: 'white',
    borderRadius: '1rem',
    padding: '2rem',
    width: '100%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    animation: 'slideIn 0.3s ease-out'
  };

  const modalTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '1.5rem'
  };

  const formGroupStyle = {
    marginBottom: '1.25rem'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '2px solid #e5e7eb',
    borderRadius: '0.5rem',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '100px',
    resize: 'vertical',
    fontFamily: 'inherit'
  };

  const modalButtonContainerStyle = {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem'
  };

  const submitButtonStyle = {
    flex: 1,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '0.875rem',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const cancelButtonStyle = {
    flex: 1,
    background: '#f1f5f9',
    color: '#475569',
    border: 'none',
    padding: '0.875rem',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const loadingContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '300px'
  };

  const spinnerStyle = {
    width: '50px',
    height: '50px',
    border: '4px solid #f1f5f9',
    borderTop: '4px solid #667eea',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  };

  const notificationStyle = (type) => ({
    position: 'fixed',
    top: '2rem',
    right: '2rem',
    background: type === 'success'
      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
      : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    color: 'white',
    padding: '1rem 1.5rem',
    borderRadius: '0.75rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    zIndex: 2000,
    animation: 'slideIn 0.3s ease-out',
    fontWeight: '600'
  });

  return (
    <>
      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }

          .portfolio-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
          }

          .portfolio-card:hover img {
            transform: scale(1.1);
          }

          .add-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          }

          .view-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
          }

          .edit-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          }

          .delete-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
          }

          .submit-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          }

          .cancel-button:hover {
            background: #e2e8f0;
          }

          input:focus, textarea:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          }

          @media (max-width: 768px) {
            .grid {
              grid-template-columns: 1fr !important;
              gap: 1rem !important;
            }
            .modal-content {
              margin: 0.5rem;
              max-width: calc(100% - 1rem) !important;
            }
          }

          @media (max-width: 640px) {
            .container-mobile {
              padding: 1rem !important;
            }
            .portfolio-card {
              margin-bottom: 0.5rem;
            }
            .modal-content {
              border-radius: 1rem !important;
            }
          }
        `}
      </style>

      <div style={containerStyle}>
        <div style={headerStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={titleStyle}>🎨 Portfolio Projects</h1>
              <p style={subtitleStyle}>Showcase your amazing work</p>
            </div>
            <button
              style={addButtonStyle}
              className="add-button"
              onClick={handleAddNew}
            >
              <span style={{ fontSize: '1.2rem' }}>+</span>
              Add New Portfolio
            </button>
          </div>
        </div>

        {loading ? (
          <div style={loadingContainerStyle}>
            <div style={spinnerStyle}></div>
          </div>
        ) : (
          <div style={gridStyle} className="grid">
            {portfolios.map((portfolio, index) => (
              <div
                key={portfolio.id}
                style={{ ...cardStyle, animationDelay: `${index * 0.1}s` }}
                className="portfolio-card"
              >
                <div style={imageContainerStyle}>
                  <img src={portfolio.image} alt={portfolio.title} style={imageStyle} />
                  {portfolio.featured && (
                    <div style={featuredBadgeStyle}>⭐ Featured</div>
                  )}
                </div>
                <div style={cardContentStyle}>
                  <div style={categoryBadgeStyle}>{portfolio.category}</div>
                  <h3 style={portfolioTitleStyle}>{portfolio.title}</h3>
                  <p style={descriptionStyle}>{portfolio.description}</p>

                  <div style={techContainerStyle}>
                    {portfolio.technologies.map((tech, idx) => (
                      <span key={idx} style={techBadgeStyle}>{tech}</span>
                    ))}
                  </div>

                  <div style={buttonContainerStyle}>
                    <button
                      style={viewButtonStyle}
                      className="view-button"
                      onClick={() => window.open(portfolio.projectLink, '_blank')}
                    >
                      🔗 View Project
                    </button>
                    {userPermissions.includes('edit_portfolios') && (
                      <button
                        style={editButtonStyle}
                        className="edit-button"
                        onClick={() => handleEdit(portfolio)}
                      >
                        ✏️ Edit
                      </button>
                    )}
                    {userPermissions.includes('delete_portfolios') && (
                      <button
                        style={deleteButtonStyle}
                        className="delete-button"
                        onClick={() => handleDelete(portfolio.id)}
                      >
                        🗑️ Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div style={modalOverlayStyle} onClick={() => setShowModal(false)}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
              <h2 style={modalTitleStyle}>
                {editingPortfolio ? 'Edit Portfolio' : 'Create New Portfolio'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>Project Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    style={inputStyle}
                    placeholder="E.g., E-Commerce Platform"
                    required
                  />
                </div>

                <div style={formGroupStyle}>
                  <label style={labelStyle}>Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    style={textareaStyle}
                    placeholder="Describe your project..."
                    required
                  />
                </div>

                <div style={formGroupStyle}>
                  <label style={labelStyle}>Image URL *</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    style={inputStyle}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>

                <div style={formGroupStyle}>
                  <label style={labelStyle}>Project Link *</label>
                  <input
                    type="url"
                    name="projectLink"
                    value={formData.projectLink}
                    onChange={handleInputChange}
                    style={inputStyle}
                    placeholder="https://your-project.com"
                    required
                  />
                </div>

                <div style={formGroupStyle}>
                  <label style={labelStyle}>Technologies (comma-separated) *</label>
                  <input
                    type="text"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleInputChange}
                    style={inputStyle}
                    placeholder="React, Node.js, MongoDB"
                    required
                  />
                </div>

                <div style={formGroupStyle}>
                  <label style={labelStyle}>Category *</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    style={inputStyle}
                    placeholder="E.g., Web Development"
                    required
                  />
                </div>

                <div style={modalButtonContainerStyle}>
                  <button type="submit" style={submitButtonStyle} className="submit-button">
                    {editingPortfolio ? 'Update Portfolio' : 'Create Portfolio'}
                  </button>
                  <button
                    type="button"
                    style={cancelButtonStyle}
                    className="cancel-button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {notification && (
          <div style={notificationStyle(notification.type)}>
            {notification.message}
          </div>
        )}
      </div>
    </>
  );
};

export default Portfolios;
