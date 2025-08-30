import { useState, useEffect } from 'react';

const STORAGE_KEY = 'contacts_data';

// Helper functions for localStorage
const saveToStorage = (contacts) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  } catch (error) {
    console.error('Failed to save contacts to localStorage:', error);
  }
};

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to load contacts from localStorage:', error);
    return null;
  }
};

export const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch contacts from API
  const fetchContacts = async () => {
    // First check if we have contacts in localStorage
    const storedContacts = loadFromStorage();
    if (storedContacts && storedContacts.length > 0) {
      setContacts(storedContacts);
      return;
    }

    // If no stored contacts, fetch from API
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://raw.githubusercontent.com/BitcotDev/fresher-machin-test/main/json/sample.json');
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const data = await response.json();
      setContacts(data);
      saveToStorage(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  // Add new contact
  const addContact = (contactData) => {
    const newContact = {
      ...contactData,
      id: Math.max(...contacts.map(c => c.id), 0) + 1,
    };
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    saveToStorage(updatedContacts);
  };

  // Update existing contact
  const updateContact = (updatedContact) => {
    const updatedContacts = contacts.map(contact => 
        contact.id === updatedContact.id ? updatedContact : contact
    );
    setContacts(updatedContacts);
    saveToStorage(updatedContacts);
  };

  // Delete contact
  const deleteContact = (contactId) => {
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    setContacts(updatedContacts);
    saveToStorage(updatedContacts);
  };

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.mobile.includes(searchTerm)
  );

  useEffect(() => {
    fetchContacts();
  }, []);

  return {
    contacts: filteredContacts,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    addContact,
    updateContact,
    deleteContact,
  };
};