import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditContact = () => {
    // State variables for name, email, and number
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');

    // Get the 'id' parameter from the URL
    const { id } = useParams();

    // Access the 'contacts' state from Redux store
    const contacts = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Find the current contact based on the 'id' parameter
    const currentContact = contacts.find(contact => contact.id === parseInt(id));

    // Populate the form fields with current contact data when it changes
    useEffect(() => {
        if (currentContact) {
            setName(currentContact.name);
            setEmail(currentContact.email);
            setNumber(currentContact.number);
        }
    }, [currentContact]);

    // Handle form submission
    const handleSubmit = e => {
        e.preventDefault();

        // Check if the email or number already exist for other contacts
        const checkEmail = contacts.find(
            contact => contact.id !== parseInt(id) && contact.email === email
        );
        const checkNumber = contacts.find(
            contact =>
                contact.id !== parseInt(id) && contact.number === parseInt(number)
        );

        // Validate that all fields are filled
        if (!email || !number || !name) {
            return toast.warning('Please fill in all fields!');
        }

        // Show error toast if the email already exists
        if (checkEmail) {
            return toast.error('This email already exists!');
        }

        // Show error toast if the number already exists
        if (checkNumber) {
            return toast.error('This number already exists!');
        }

        // Create an updated contact object
        const data = {
            id: parseInt(id),
            name,
            email,
            number
        };

        // Dispatch an action to update the contact in the Redux store
        dispatch({ type: 'UPDATE_CONTACT', payload: data });

        // Show success toast and navigate to home page
        toast.success('Contact updated successfully!');
        navigate('/');
    };

    return (
        <div className='container'>
            {currentContact ? (
                // Display form to edit the contact
                <>
                    <h1 className='display-3 text-center fw-bold'>
                        Edit Contact {id}
                    </h1>
                    <div className='row'>
                        <div className='col-md-6 shadow mx-auto p-5'>
                            <form className='text-center' onSubmit={handleSubmit}>
                                <div className='form-group mb-3'>
                                    <input
                                        type='text'
                                        placeholder='Name'
                                        className='form-control'
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </div>
                                <div className='form-group mb-3'>
                                    <input
                                        type='email'
                                        placeholder='Email'
                                        className='form-control'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className='form-group mb-3'>
                                    <input
                                        type='number'
                                        placeholder='Phone Number'
                                        className='form-control'
                                        value={number}
                                        onChange={e => setNumber(e.target.value)}
                                    />
                                </div>
                                <div className='form-group mb-3'>
                                    <input
                                        type='submit'
                                        value='Update Contact'
                                        className='btn btn-dark'
                                    />
                                    <Link to='/' className='btn btn-danger ms-3'>
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            ) : (
                // Display error message if the contact does not exist
                <h1 className='display-3 my-5 text-center fw-bold'>
                    Contact with id {id} does not exist!
                </h1>
            )}
        </div>
    );
};

export default EditContact;
