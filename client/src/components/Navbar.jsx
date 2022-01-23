import React from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <div>
        <nav className="navbar">
            <ul>
                <div>
                    
                    <Link to="/" className="navbar-items">Home</Link>
                    
                    <li className="navbar-items">About</li>
                    
                </div>
                <div>
                    
                    <Link to="/login" className="navbar-items">Login</Link>
                    
                    <Link to="/signup" className="navbar-items">Sign Up</Link>
                    
                </div>
            </ul>
        </nav>
    </div>
    )
}

export default Navbar
