import React from 'react';

const ContactCard = ({ contact, isSelected, onSelect, onEdit, onDelete }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md cursor-pointer ${
        isSelected ? 'border-2 border-blue-500' : ''
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between mb-2">
        <img
          src={contact.profilePic}
          alt={`${contact.name}'s Profile`}
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="text-sm text-gray-500">{contact.phoneNumber}</span>
      </div>
      <h3 className="text-md font-semibold text-gray-800 dark:text-white">
        {contact.name}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{contact.email}</p>
      {/* Buttons to open the popup */}
      <button
        className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md mr-2"
        onClick={(e) => {
          e.stopPropagation();
          onEdit(contact); // Pass the contact to the onEdit function
        }}
      >
        Edit
      </button>
      <button
        className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(contact.id); // Pass the contact's id to the onDelete function
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default ContactCard;
