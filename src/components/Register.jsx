import React,{useState} from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import {v4} from "uuid";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imagePublicId, setImagePublicId] = useState('');

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
          console.log(data);
          setImagePreview(data.public_id)
          setImagePublicId(data.secure_url);
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
        });
    }
  };
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateName = (name) => {
    return name.length >= 3;
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateConfirmPassword = (confirmPassword) => {
    return confirmPassword === password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error('Invalid email address.', {
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

    if (!validateName(name)) {
      toast.error('Name should be at least 3 characters long.', {
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

    if (!validatePassword(password)) {
      toast.error('Password should be at least 6 characters long.', {
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

    if (!validateConfirmPassword(confirmPassword)) {
      toast.error('Passwords do not match.', {
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

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          password,
          profilePic : setImagePublicId || "https://res.cloudinary.com/dnhslyteh/image/upload/v1692808859/male-profile-flat-blue-simple-icon-with-long-shadow_esfk41.jpg"
        }),
      });

      if (response.ok) {
        toast.success('Registration successful! You can now log in.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate('/login');
      } else {
        const data = await response.json();
        toast.error(data.message || 'Registration failed. Please try again.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error('An error occurred while registering. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
    }
  };
    return (
        <div className="container">
   <section className=" w-1/2 z-10">
     <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
       <div href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
         <img className="w-16 h-16 mr-2" src="favicon.png" alt="logo" />
         Webalar
       </div>
       <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-background-400 dark:border-gray-700">
         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
           <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
             Create account
           </h1>
           <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
           <div>
               <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Name *
               </label>
               <input type="text"  value={name}
            onChange={(e) => setName(e.target.value)} name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Aditya Sharma" required="" />
             </div>
             {/* <div>
               <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                 Last Name
               </label>
 <input
        type="file"
        accept="image/*"
        id="image"
        onChange={handleImageUpload}
      />
      {imagePreview && (
        <Image  cloudName="dnhslyteh" publicId={imagePublicId} width="150" height="150" />
      )}             </div> */}
       <div className="space-y-2">
      <label htmlhtmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Profile Image:
      </label>
      <div className="relative h-24 w-24 border rounded-md overflow-hidden">
        {imagePreview && (
          <Image
          cloudName="dnhslyteh"
            publicId={imagePublicId}
            width="150"
            height="150"
            className="object-cover w-full h-full"
          />
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        id="image"
        onChange={handleImageUpload}
        className="hidden"
      />
      <button
        type="button"
        className="w-full text-white bg-background-200 hover:bg-background-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        onClick={() => document.getElementById('image').click()}
      >
        Upload Image
      </button>
    </div>
             <div>
               <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                 Your email *
               </label>
               <input   value={email}
            onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
             </div>
             <div>
               <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                 Password *
               </label>
               <input  value={password}
            onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
             </div>
             <div>
               <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                 Confirm password *
               </label>
               <input value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
             </div>
             
             <button type="submit" className="w-full text-white bg-background-200 hover:bg-background-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
               Create an account
             </button>
             <p className="text-sm font-light text-gray-500 dark:text-gray-400">
               Already have an account?{" "}
               <NavLink to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
               Login 
                </NavLink>
             </p>
           </form>
         </div>
       </div>
     </div>
   </section>
   <div className="shape-blob"></div>
   <div className="shape-blob one"></div>
   <div className="shape-blob two"></div>
 </div>
    );
}

export default Register;
