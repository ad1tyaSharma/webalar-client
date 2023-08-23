import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
const urls = [1,1,]
  const handleLogin = () => {
    // Logic to handle login
    login();
    navigate('/');
  };

  return (
  <div class="container">
   <section class=" w-1/2 z-10">
     <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
       <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
         <img class="w-16 h-16 mr-2" src="favicon.png" alt="logo" />
         Webalar
       </a>
       <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-background-400 dark:border-gray-700">
         <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
           <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
             Sign In
           </h1>
           <form class="space-y-4 md:space-y-6" action="#">
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
             
             
             <button onClick={handleLogin} type="submit" class="w-full text-white bg-background-200 hover:bg-background-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
               Log in
             </button>
             <p class="text-sm font-light text-gray-500 dark:text-gray-400">
               Don't have an account?{" "}
               <NavLink to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
               Sign up
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

export default Login;


  