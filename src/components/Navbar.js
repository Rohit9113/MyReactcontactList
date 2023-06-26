import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        // Navigation bar with a dark background
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark py-2'>
            <div className='container-fluid'>
                {/* Application logo or title */}
                <Link to='/' className='navbar-brand ml-5'>MyContactList</Link>
            </div>
        </nav >
    )
}

export default Navbar
