import React, { useState, useEffect } from 'react';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    image: '',
    content: '',
    rating: 5,
    company: ''
  });

  // Simulated user permissions (in real app, this would come from auth context)
  const userPermissions = ['view_testimonials', 'create_testimonials', 'edit_testimonials', 'delete_testimonials'];

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockTestimonials = [
        {
          id: 1,
          name: 'Sarah Johnson',
          designation: 'CEO',
          company: 'TechCorp Inc.',
          image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
          content: 'Working with this team has been an absolute game-changer for our business. Their professionalism and expertise exceeded all expectations. Highly recommended!',
          rating: 5,
          featured: true
        },
        {
          id: 2,
          name: 'Michael Chen',
          designation: 'CTO',
          company: 'Innovation Labs',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
          content: 'Exceptional service and outstanding results. The team delivered beyond what we thought was possible. A truly transformative experience for our organization.',
          rating: 5,
          featured: true
        },
        {
          id: 3,
          name: 'Emily Rodriguez',
          designation: 'Product Manager',
          company: 'StartupHub',
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
          content: 'The attention to detail and commitment to excellence is remarkable. They understood our vision and brought it to life perfectly.',
          rating: 5,
          featured: false
        },
        {
          id: 4,
          name: 'David Kim',
          designation: 'Founder',
          company: 'Digital Dreams',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
          content: 'From start to finish, the process was smooth and efficient. The team was responsive, creative, and delivered exactly what we needed.',
          rating: 4,
          featured: false
        },
        {
          id: 5,
          name: 'Jessica Thompson',
          designation: 'Marketing Director',
          company: 'Brand Builders',
          image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop',
          content: 'Outstanding work! The quality and speed of delivery were impressive. Our campaign results exceeded all KPIs thanks to their expertise.',
          rating: 5,
          featured: true
        },
        {
          id: 6,
          name: 'Alex Martinez',
          designation: 'Operations Manager',
          company: 'Efficiency Co.',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
          content: 'Great collaboration and excellent communication throughout the project. The final product speaks for itself - truly world-class.',
          rating: 5,
          featured: false
        }
      ];
      setTestimonials(mockTestimonials);
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

    if (editingTestimonial) {
      // Update existing testimonial
      setTestimonials(testimonials.map(testimonial =>
        testimonial.id === editingTestimonial.id
          ? { ...testimonial, ...formData, rating: parseInt(formData.rating) }
          : testimonial
      ));
      showNotification('Testimonial updated successfully!', 'success');
    } else {
      // Create new testimonial
      const newTestimonial = {
        id: testimonials.length + 1,
        ...formData,
        rating: parseInt(formData.rating),
        featured: false
      };
      setTestimonials([...testimonials, newTestimonial]);
      showNotification('Testimonial created successfully!', 'success');
    }

    setShowModal(false);
    setEditingTestimonial(null);
    setFormData({
      name: '',
      designation: '',
      image: '',
      content: '',
      rating: 5,
      company: ''
    });
  };

  const handleEdit = (testimonial) => {
    if (!userPermissions.includes('edit_testimonials')) {
      showNotification('You do not have permission to edit testimonials', 'error');
      return;
    }

    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      designation: testimonial.designation,
      image: testimonial.image,
      content: testimonial.content,
      rating: testimonial.rating,
      company: testimonial.company
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (!userPermissions.includes('delete_testimonials')) {
      showNotification('You do not have permission to delete testimonials', 'error');
      return;
    }

    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
      showNotification('Testimonial deleted successfully!', 'success');
    }
  };

  const handleAddNew = () => {
    if (!userPermissions.includes('create_testimonials')) {
      showNotification('You do not have permission to create testimonials', 'error');
      return;
    }

    setEditingTestimonial(null);
    setFormData({
      name: '',
      designation: '',
      image: '',
      content: '',
      rating: 5,
      company: ''
    });
    setShowModal(true);
  };

  const renderStars = (rating) => {
    return (
      <div style={{ display: 'flex', gap: '0.25rem' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              color: star <= rating ? '#fbbf24' : '#e5e7eb',
              fontSize: '1rem'
            }}
          >
            ★
          </span>
        ))}
      </div>
    );
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
    padding: '1.75rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease',
    animation: 'slideIn 0.5s ease-out'
  };

  const cardHeaderStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    marginBottom: '1.25rem'
  };

  const avatarStyle = {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #f1f5f9',
    flexShrink: 0
  };

  const userInfoStyle = {
    flex: 1
  };

  const nameStyle = {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.25rem'
  };

  const designationStyle = {
    fontSize: '0.85rem',
    color: '#64748b',
    marginBottom: '0.5rem'
  };

  const companyBadgeStyle = {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '0.25rem 0.7rem',
    borderRadius: '1rem',
    fontSize: '0.75rem',
    fontWeight: '600'
  };

  const featuredBadgeStyle = {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    color: 'white',
    padding: '0.25rem 0.7rem',
    borderRadius: '1rem',
    fontSize: '0.7rem',
    fontWeight: '600',
    marginLeft: '0.5rem'
  };

  const quoteStyle = {
    fontSize: '0.9rem',
    color: '#475569',
    lineHeight: '1.7',
    marginBottom: '1.25rem',
    fontStyle: 'italic',
    position: 'relative',
    paddingLeft: '1rem',
    borderLeft: '3px solid #667eea'
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '1rem'
  };

  const editButtonStyle = {
    flex: 1,
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
    flex: 1,
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
    minHeight: '120px',
    resize: 'vertical',
    fontFamily: 'inherit'
  };

  const ratingContainerStyle = {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '0.5rem'
  };

  const starButtonStyle = (isActive) => ({
    background: 'none',
    border: 'none',
    fontSize: '2rem',
    cursor: 'pointer',
    color: isActive ? '#fbbf24' : '#e5e7eb',
    transition: 'all 0.2s ease',
    padding: 0
  });

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

          .testimonial-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
          }

          .add-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
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

          .star-button:hover {
            transform: scale(1.2);
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
            .testimonial-card {
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
              <h1 style={titleStyle}>💬 Client Testimonials</h1>
              <p style={subtitleStyle}>What our clients say about us</p>
            </div>
            <button
              style={addButtonStyle}
              className="add-button"
              onClick={handleAddNew}
            >
              <span style={{ fontSize: '1.2rem' }}>+</span>
              Add Testimonial
            </button>
          </div>
        </div>

        {loading ? (
          <div style={loadingContainerStyle}>
            <div style={spinnerStyle}></div>
          </div>
        ) : (
          <div style={gridStyle} className="grid">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                style={{ ...cardStyle, animationDelay: `${index * 0.1}s` }}
                className="testimonial-card"
              >
                <div style={cardHeaderStyle}>
                  <img src={testimonial.image} alt={testimonial.name} style={avatarStyle} />
                  <div style={userInfoStyle}>
                    <h3 style={nameStyle}>{testimonial.name}</h3>
                    <p style={designationStyle}>{testimonial.designation}</p>
                    <div>
                      <span style={companyBadgeStyle}>{testimonial.company}</span>
                      {testimonial.featured && (
                        <span style={featuredBadgeStyle}>⭐ Featured</span>
                      )}
                    </div>
                  </div>
                </div>

                <div style={quoteStyle}>
                  "{testimonial.content}"
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  {renderStars(testimonial.rating)}
                </div>

                <div style={buttonContainerStyle}>
                  {userPermissions.includes('edit_testimonials') && (
                    <button
                      style={editButtonStyle}
                      className="edit-button"
                      onClick={() => handleEdit(testimonial)}
                    >
                      ✏️ Edit
                    </button>
                  )}
                  {userPermissions.includes('delete_testimonials') && (
                    <button
                      style={deleteButtonStyle}
                      className="delete-button"
                      onClick={() => handleDelete(testimonial.id)}
                    >
                      🗑️ Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div style={modalOverlayStyle} onClick={() => setShowModal(false)}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
              <h2 style={modalTitleStyle}>
                {editingTestimonial ? 'Edit Testimonial' : 'Create New Testimonial'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>Client Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={inputStyle}
                    placeholder="E.g., John Doe"
                    required
                  />
                </div>

                <div style={formGroupStyle}>
                  <label style={labelStyle}>Designation *</label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    style={inputStyle}
                    placeholder="E.g., CEO"
                    required
                  />
                </div>

                <div style={formGroupStyle}>
                  <label style={labelStyle}>Company *</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    style={inputStyle}
                    placeholder="E.g., TechCorp Inc."
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
                  <label style={labelStyle}>Rating *</label>
                  <div style={ratingContainerStyle}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        style={starButtonStyle(star <= formData.rating)}
                        className="star-button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div style={formGroupStyle}>
                  <label style={labelStyle}>Testimonial Content *</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    style={textareaStyle}
                    placeholder="Write the testimonial content..."
                    required
                  />
                </div>

                <div style={modalButtonContainerStyle}>
                  <button type="submit" style={submitButtonStyle} className="submit-button">
                    {editingTestimonial ? 'Update Testimonial' : 'Create Testimonial'}
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

export default Testimonials;
