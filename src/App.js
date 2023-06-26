import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from 'react-router-dom';

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import { useDispatch } from "react-redux";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch data from the API and dispatch the action to store the contacts
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await response.json();
                const contacts = data.map(contact => ({
                    id: contact.id,
                    name: contact.name,
                    number: contact.phone,
                    email: contact.email
                }));
                dispatch({ type: 'FETCH_CONTACTS', payload: contacts });
            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, [dispatch]);

    return (
        <div className="App">
            <ToastContainer />
            <Navbar />
            <Routes>
                {/* Define the routes for different components */}
                <Route path="/" element={<Home />} /> {/* Home component */}
                <Route path="/add" element={<AddContact />} /> {/* AddContact component */}
                <Route path="/edit/:id" element={<EditContact />} /> {/* EditContact component */}
            </Routes>
        </div>
    );
}

export default App;
