import React, { useState, useEffect } from 'react';

const ContactForm = ({ 
  initialData, 
  onSubmit, 
  onCancel, 
  submitButtonText 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    mobile: '',
  });
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        mobile: initialData.mobile,
        address: initialData.address || '',
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      mobile: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const mobileRegex = /^\d{10}$/;
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!mobileRegex.test(formData.mobile.replace(/\D/g, ''))) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        name: formData.name.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile.replace(/\D/g, ''),
        address: formData.address.trim(),
      });

      setFormData({ name: '', email: '', mobile: '', address: '' });
      setErrors({ name: '', email: '', mobile: '' });
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', mobile: '', address: '' });
    setErrors({ name: '', email: '', mobile: '' });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Enter Your Name"
          className={`form-input ${errors.name ? 'error' : ''}`}
        />
        {errors.name && <p className="form-error">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Enter Your Email"
          className={`form-input ${errors.email ? 'error' : ''}`}
        />
        {errors.email && <p className="form-error">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="mobile" className="form-label">
          PhoneNumber:
        </label>
        <input
          type="tel"
          id="mobile"
          value={formData.mobile}
          onChange={(e) => handleInputChange('mobile', e.target.value)}
          placeholder="Enter Your Phone Number"
          className={`form-input ${errors.mobile ? 'error' : ''}`}
        />
        {errors.mobile && <p className="form-error">{errors.mobile}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="address" className="form-label">
          Address:
        </label>
        <input
          type="text"
          id="address"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          placeholder="Enter your Address"
          className="form-input"
        />
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="form-button primary"
        >
          {submitButtonText}
        </button>
        
        <button
          type="button"
          onClick={handleReset}
          className="form-button secondary"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default ContactForm;