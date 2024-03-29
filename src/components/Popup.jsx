import React, { useState } from 'react';
import { Image } from 'cloudinary-react';
import {v4} from "uuid";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Popup = ({ contact, onClose, onSave }) => {
  const [editedContact, setEditedContact] = useState({ ...contact });
  const [uploadedImage, setUploadedImage] = useState('');
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateName = (name) => {
    return name.length >= 3;
  };
  function validatePhoneNumber(phoneNumber) {
    // Remove any non-digit characters from the input
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
  
    // Define a regular expression pattern for a typical phone number
    const phoneNumberPattern = /^\d{10}$/;
  
    // Test the input against the pattern
    return phoneNumberPattern.test(cleanPhoneNumber);
  }
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

      toast("Uploading Image, Please wait!")
      // Upload the image to Cloudinary
      fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`, {
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

  const handleSave =async () => {
    if (uploadedImage) {
      //console.log(1);
     await setEditedContact((prevContact) => ({
        ...prevContact,
        profilePic: uploadedImage,
      }));
      //console.log(editedContact);

      
    }
    else {
      //console.log(0);
      setEditedContact((prevContact) => ({
        ...prevContact,
        profilePic: "https://res.cloudinary.com/dnhslyteh/image/upload/v1692808859/male-profile-flat-blue-simple-icon-with-long-shadow_esfk41.jpg",
      }));
    }
    if(!validateEmail(editedContact.email))
    {
      toast.error('Invalid email address.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return
    }
    if(!validatePhoneNumber(editedContact.phoneNumber))
    {
      toast.error('Invalid phone number.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if(!validateName(editedContact.name))
    {
      toast.error('Invalid name.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
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
