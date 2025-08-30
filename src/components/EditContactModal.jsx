import React from 'react';
import Modal from './Modal';
import ContactForm from './ContactForm';

const EditContactModal = ({ 
  isOpen, 
  onClose, 
  contact, 
  onUpdateContact 
}) => {
  const handleSubmit = (contactData) => {
    if (contact) {
      onUpdateContact({ ...contactData, id: contact.id });
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Contact">
      <ContactForm
        initialData={contact}
        onSubmit={handleSubmit}
        onCancel={onClose}
        submitButtonText="Update"
      />
    </Modal>
  );
};

export default EditContactModal;