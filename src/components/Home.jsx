import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import ContactCard from './ContactCard';
import Popup from './Popup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';
const Home = () => {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name'); // Default sorting by name
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedContact, setSelectedContact] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { logout,setuser,user } = useAuth();
 
  const getUser = async(id)=>
  {
      toast("Fetching User, Please wait!")
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/${id}`);
      setuser(response.data.user);
      //console.log(user);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }
  const getContacts = async(id)=>
  {
      toast("Fetching Contacts, Please wait!")
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/contact/allContacts`, {
        createdBy : id
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setContacts(response.data);
      //console.log(contacts);
    } catch (error) {
      console.error('Error fetching contact:', error);
    }
  }
  const handleEdit = (contact) => {
    //setEditingContact(contact);
    openPopup(contact);
  };
  const handleDelete = async (contactId) => {
      toast("Deleting Contact, Please wait!")
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/contact/delete/${contactId}`);
      const updatedContacts = contacts.filter(contact => contact._id !== contactId);
      setContacts(updatedContacts);
      toast.success("Contact Deleted!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error("Error deleting contact.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error("Error deleting contact:", error);
    }
  };
  const openPopup = (contact) => {
    setSelectedContact(contact);
    setIsPopupOpen(true);
  };
  const openCreatePopup = () => {
    setSelectedContact(null);
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setSelectedContact(null);
    setIsPopupOpen(false);
  };
    const handleSave = (editedContact) => {
        if (selectedContact) {
            toast("Updating Contact, Please wait!")
          // Edit existing contact
          axios.put(`${process.env.REACT_APP_API_URL}/contact/edit/${selectedContact._id}`, editedContact)
            .then(response => {
              //console.log(response.data);
              const updatedContacts = contacts.map(contact =>
                contact._id === response.data._id ? response.data : contact
              );
              toast.success("Contact Edited!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setContacts(updatedContacts);
            })
            .catch(error => {
              toast.error("Error editing contact.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              console.error("Error editing contact:", error);
            });
        } else {
            toast("Saving Contact, Please wait!")
          axios.post(`${process.env.REACT_APP_API_URL}/contact/create`, {...editedContact,createdBy: user._id})
            .then(response => {
              toast.success("Contact Created!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              console.log(response.data);
              setContacts([...contacts, response.data.contact]);
              //navigate('/')
            })
            .catch(error => {
              toast.error("Error creating contact.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              console.error("Error creating contact:", error);
            });
        }
        closePopup();
      };
    const contactsPerPage = 9;
  // const data = [
  //   {
  //     "id": 1,
  //     "name": "John Doe",
  //     "email": "john@example.com",
  //     "phoneNumber": "123-456-7890",
  //     "profilePic": "https://via.placeholder.com/150"
  //   },
  //   {
  //     "id": 2,
  //     "name": "Jane Smith",
  //     "email": "jane@example.com",
  //     "phoneNumber": "987-654-3210",
  //     "profilePic": "https://via.placeholder.com/150"
  //   },
  //   {
  //     "id": 3,
  //     "name": "Michael Johnson",
  //     "email": "michael@example.com",
  //     "phoneNumber": "555-123-4567",
  //     "profilePic": "https://via.placeholder.com/150"
  //   },
  //   {
  //     "id": 4,
  //     "name": "Emily Brown",
  //     "email": "emily@example.com",
  //     "phoneNumber": "444-555-6666",
  //     "profilePic": "https://via.placeholder.com/150"
  //   },
  //   {
  //     "id": 5,
  //     "name": "William Davis",
  //     "email": "william@example.com",
  //     "phoneNumber": "777-888-9999",
  //     "profilePic": "https://via.placeholder.com/150"
  //   },
  //   {
  //     "id": 6,
  //     "name": "Olivia Wilson",
  //     "email": "olivia@example.com",
  //     "phoneNumber": "222-333-4444",
  //     "profilePic": "https://via.placeholder.com/150"
  //   },
  //   {
  //     "id": 7,
  //     "name": "James Brown",
  //     "email": "james@example.com",
  //     "phoneNumber": "555-666-7777",
  //     "profilePic": "https://via.placeholder.com/150"
  //   },
  //   {
  //     "id": 8,
  //     "name": "Sophia Martinez",
  //     "email": "aophia@example.com",
  //     "phoneNumber": "888-999-0000",
  //     "profilePic": "https://via.placeholder.com/150"
  //   },
  //   {
  //     "id": 9,
  //     "name": "Liam Anderson",
  //     "email": "aiam@example.com",
  //     "phoneNumber": "111-222-3333",
  //     "profilePic": "https://via.placeholder.com/150"
  //   },
  //   {
  //     "id": 10,
  //     "name": "Ava Johnson",
  //     "email": "ava@example.com",
  //     "phoneNumber": "444-555-6666",
  //     "profilePic": "https://via.placeholder.com/150"
  //   },
  //   // ... Repeat for 40 more entries ...
  // ]
  
 
  
    const filteredContacts = contacts.filter(contact =>
     contact.name && contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
 
    const sortedContacts = [...filteredContacts].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'email') {
        return a.email.localeCompare(b.email);
      }
      return 0;
    });
  
    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = sortedContacts.slice(
      indexOfFirstContact,
      indexOfLastContact
    );
  
    const paginate = pageNumber => setCurrentPage(pageNumber);
    useEffect(() => {
      const id = localStorage.getItem('userId');
      if(id)
      {
        getUser(id)
        getContacts(id)
        //console.log(id);console.log(user);
      }
      else
      logout()
    }, []);
    return (
    <div className="container py-5">

        <div className='w-5/6 bg-slate-50 rounded-xl h-5/6 z-10 mt-16 mb-16 min-h-screen' >
            <Navbar user={user?user : null}></Navbar>
            <div className="w-5/6 mx-auto">
            <div className="flex justify-end mt-2">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={openCreatePopup}
          >
            Create New Contact
          </button>
         
        </div>
        <div className="flex justify-end mt-2">
      
          <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-md">
        Logout
      </button>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Contact List
        </h1>
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
          {/* Sort Buttons */}
          <div className="mb-4">
          <button
            className={`mr-2 ${
              sortBy === 'name' ? 'bg-blue-500 text-white' : 'text-blue-500'
            } px-4 py-2 rounded-md`}
            onClick={() => setSortBy('name')}
          >
            Sort by Name
          </button>
          <button
            className={`${
              sortBy === 'email' ? 'bg-blue-500 text-white' : 'text-blue-500'
            } px-4 py-2 rounded-md`}
            onClick={() => setSortBy('email')}
          >
            Sort by Email
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
          {currentContacts.map(contact => (
            <ContactCard
            key={contact._id}
            contact={contact}
            onSelect={() => {}}
            onEdit={() => handleEdit(contact)}
            onDelete={() => handleDelete(contact._id)}
            />
          ))}
        </div>
        {/* Pagination */}
        <div className="mt-4 flex justify-center">
          {Array.from({ length: Math.ceil(sortedContacts.length / contactsPerPage) }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-4 py-2 rounded-full ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-800'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        {isPopupOpen && (
        <Popup
          contact={selectedContact}
          onClose={closePopup}
          onSave={handleSave}
        />
      )}
      </div>
            
        </div>
   <div className="shape-blob"></div>
   <div className="shape-blob one"></div>
   <div className="shape-blob two"></div>
 </div>
    );
}

export default Home;
