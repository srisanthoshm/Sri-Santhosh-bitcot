import React from 'react';
import { Eye, Trash2, Edit3, User } from 'lucide-react';

const ContactItem = ({ contact, index, onEdit, onView, onDelete }) => {
  const handleDelete = () => {
    onDelete(contact.id);
  };

  return (
    <div className="contact-item">
      <div className="contact-info">
        <span className="contact-index">{index}</span>
        
        <div className="contact-avatar">
          <User />
        </div>
        
        <div className="contact-details">
          <h3 className="contact-name">{contact.name}</h3>
          <p className="contact-mobile">{contact.mobile}</p>
        </div>
      </div>
      
      <div className="contact-actions">
        <button
          onClick={() => onView(contact)}
          className="action-button view"
          title="View contact"
        >
          <Eye />
        </button>
        
        <button
          onClick={handleDelete}
          className="action-button delete"
          title="Delete contact"
        >
          <Trash2 />
        </button>
        
        <button
          onClick={() => onEdit(contact)}
          className="action-button edit"
          title="Edit contact"
        >
          <Edit3 />
        </button>
      </div>
    </div>
  );
};

export default ContactItem;