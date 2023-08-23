import React, { useState } from 'react';

const Popup = ({ contact, onClose, onSave }) => {
  const [editedContact, setEditedContact] = useState({ ...contact });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedContact);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-opacity-50 bg-gray-800">
      <div className="bg-white rounded-lg p-6 w-80">
        <h2 className="text-xl font-semibold mb-4">
          {contact ? 'Edit Contact' : 'Create New Contact'}
        </h2>
        <div className="flex items-center mb-4">
          {
            contact ? 
            (<img
              src={editedContact.profilePic}
              alt={`${editedContact.name}'s Profile`}
              className="w-12 h-12 rounded-full object-cover mr-4"
            />):
            (<button><img className="w-12 h-12 rounded-full object-cover mr-4" src="https://img.icons8.com/external-global-made-by-made/50/external-Uplaod-ui-and-ux-global-made-by-made.png" alt="external-Uplaod-ui-and-ux-global-made-by-made"/></button>)
          }
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={editedContact.name}
              onChange={handleInputChange}
              className="mt-1 p-2 rounded-md border border-gray-300 w-full"
            />
          </div>
        </div>

        <label className="block text-sm font-medium text-gray-600 mt-2">
          Email
        </label>
        <input
          type="text"
          name="email"
          value={editedContact.email}
          onChange={handleInputChange}
          className="mt-1 p-2 rounded-md border border-gray-300 w-full"
        />

        <label className="block text-sm font-medium text-gray-600 mt-2">
          Phone
        </label>
        <input
          type="text"
          name="phoneNumber"
          value={editedContact.phoneNumber}
          onChange={handleInputChange}
          className="mt-1 p-2 rounded-md border border-gray-300 w-full"
        />

        <div className="mt-4 flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
