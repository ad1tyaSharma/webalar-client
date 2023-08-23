import React, { useState } from 'react';
import { Image } from 'cloudinary-react';
import {v4} from "uuid";
const Popup = ({ contact, onClose, onSave }) => {
  const [editedContact, setEditedContact] = useState({ ...contact });
  const [uploadedImage, setUploadedImage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('public_id', `weblar-contacts/${v4()}`);
      formData.append('upload_preset', 'webalar-assignment');

      
      // Upload the image to Cloudinary
      fetch('https://api.cloudinary.com/v1_1/dnhslyteh/image/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          
          setUploadedImage(data.secure_url);
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
        });
    }
  };

  const handleSave = () => {
    if (uploadedImage) {
      setEditedContact((prevContact) => ({
        ...prevContact,
        profilePic: uploadedImage,
      }));
    }

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
            (<><label htmlFor="profilePic" className="cursor-pointer">
            <Image
              cloudName="dnhslyteh"
              publicId={uploadedImage || 'https://res.cloudinary.com/dnhslyteh/image/upload/v1692808798/cloud_upload_file_storage_upload_icon-1320190558968694328_jdsitl.png'|| "https://res.cloudinary.com/dnhslyteh/image/upload/v1692808859/male-profile-flat-blue-simple-icon-with-long-shadow_esfk41.jpg"}
              width="48"
              height="48"
              crop="fill"
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
          </label>
          <input
            type="file"
            id="profilePic"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          /></>)
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
