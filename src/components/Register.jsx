import React,{useState} from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/register', {
        email,
        password,
      });

      // Registration successful
      toast.success('Registration successful!!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
    } catch (error) {
      // Registration failed
      toast.error('Registration failed. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      console.error('Login error:', error);
    }
  };
    return (
        <div class="container">
   <section class=" w-1/2 z-10">
     <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
       <div href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
         <img class="w-16 h-16 mr-2" src="favicon.png" alt="logo" />
         Webalar
       </div>
       <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-background-400 dark:border-gray-700">
         <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
           <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
             Create account
           </h1>
           <form class="space-y-4 md:space-y-6" action="#">
           <div>
               <label for="firstName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                 First Name
               </label>
               <input type="text" name="firstName" id="firstName" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Aditya" required="" />
             </div>
             <div>
               <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                 Last Name
               </label>
               <input type="text" name="lastName" id="lastName" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Sharma" required="" />
             </div>
             <div>
               <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                 Your email
               </label>
               <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
             </div>
             <div>
               <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                 Password
               </label>
               <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
             </div>
             <div>
               <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                 Confirm password
               </label>
               <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
             </div>
             
             <button type="submit" class="w-full text-white bg-background-200 hover:bg-background-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
               Create an account
             </button>
             <p class="text-sm font-light text-gray-500 dark:text-gray-400">
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
   <div class="shape-blob"></div>
   <div class="shape-blob one"></div>
   <div class="shape-blob two"></div>
 </div>
    );
}

export default Register;
