import React from 'react';
import Modal from './Modal';
import ContactForm from './ContactForm';

const AddContactModal = ({ isOpen, onClose, onAddContact }) => {
  const handleSubmit = (contactData) => {
    onAddContact(contactData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Contact">
      <ContactForm
        onSubmit={handleSubmit}
        onCancel={onClose}
        submitButtonText="Submit"
      />
    </Modal>
  );
};

export default AddContactModal;