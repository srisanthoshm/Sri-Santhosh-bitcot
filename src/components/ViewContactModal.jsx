import React from 'react';
import Modal from './Modal';

const ViewContactModal = ({ isOpen, onClose, contact }) => {
  if (!contact) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Contact Details">
      <div className="contact-details">
        <div className="detail-row">
          <span className="detail-label">Name:</span>
          <span className="detail-value">{contact.name}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{contact.email}</span>
        </div>
        
        <div className="detail-row">
          <span className="detail-label">Number:</span>
          <span className="detail-value">{contact.mobile}</span>
        </div>
        
        {contact.address && (
          <div className="detail-row">
            <span className="detail-label">Address:</span>
            <span className="detail-value">{contact.address}</span>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ViewContactModal;