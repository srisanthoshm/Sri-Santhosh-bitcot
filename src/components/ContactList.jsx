import React, { useState } from 'react';
import { Plus, Loader2, Search } from 'lucide-react';


import ContactItem from './ContactItem';
import SearchBar from './SearchBar';
import AddContactModal from './AddContactModal';
import EditContactModal from './EditContactModal';
import ViewContactModal from './ViewContactModal';
import { useContacts } from '../hooks/UseContacts';

const ContactList = () => {
  const {
    contacts,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    addContact,
    updateContact,
    deleteContact,
  } = useContacts();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setIsEditModalOpen(true);
  };

  const handleView = (contact) => {
    setSelectedContact(contact);
    setIsViewModalOpen(true);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleDelete = (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      deleteContact(contactId);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <Loader2 className="loading-spinner" />
          <span className="loading-text">Loading contacts...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <p className="error-title">Error loading contacts</p>
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="main-container">
        {/* Header */}
        <div className="header">
          <div className="header-content">
            <h1 className="header-title">All Contacts</h1>
            <div className="contact-count">{contacts.length}</div>
          </div>
          <div className="header-actions">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="add-button"
              title="Search Contacts"
            >
              <Search />
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="add-button"
              title="Add Contact"
            >
              <Plus />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="search-container">
            <SearchBar onSearch={handleSearch} />
          </div>
        )}

        {/* Contact List */}
        <div className="contact-list">
          {contacts.length === 0 ? (
            <div className="empty-state">
              {searchTerm ? 'No contacts found matching your search.' : 'No contacts available.'}
            </div>
          ) : (
            <div>
              {contacts.map((contact, index) => (
                <ContactItem
                  key={contact.id}
                  contact={contact}
                  index={index + 1}
                  onEdit={handleEdit}
                  onView={handleView}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddContactModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddContact={addContact}
      />
      
      <EditContactModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        contact={selectedContact}
        onUpdateContact={updateContact}
      />
      
      <ViewContactModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        contact={selectedContact}
      />
    </div>
  );
};

export default ContactList;