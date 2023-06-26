import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {

    const contacts = useSelector(state => state); // Get the contacts from the Redux store

    const dispatch = useDispatch(); // Dispatch actions to update the Redux store

    const deleteContact = (id) => {
        dispatch({ type: 'DELETE_CONTACT', payload: id }); // Dispatch the DELETE_CONTACT action with the contact id as payload
        toast.success('Contact deleted successfully!'); // Display a success toast message
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12 my-5 text-center'>
                    <Link to='/add' className='btn btn-outline-dark'>Add Contact</Link> {/* Link to the AddContact component */}
                </div>
                <div className='col-md-10 mx-auto'>
                    <table className='table table-hover'>
                        <thead className='text-white bg-info text-center'>
                            <tr>
                                <th scope='col'>List</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>Number</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                contacts.map((contact, id) => (
                                    <tr key={id}>
                                        <td>{id + 1}</td>
                                        <td>{contact.name}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.number}</td>
                                        <td>
                                            <Link to={`/edit/${contact.id}`} className='btn btn-small btn-primary me-2'>Edit</Link> {/* Link to the EditContact component */}
                                            <button type='button' onClick={() => deleteContact(contact.id)} className='btn btn-small btn-danger'>Delete</button> {/* Button to delete the contact */}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Home;
