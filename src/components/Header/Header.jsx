import React from 'react';
import './Header.css';
import Login from '../Login/Login';
import { FaRegUser, FaCheckSquare } from 'react-icons/fa';

function Header({ user, setUser, tryLogin, setTryLogin}) {
    
    return (
        <header>
            <img src="/images/logo.png" alt="Logo" id="logoinheader" />
            <nav>
            <a href='#dogSelectorSection'>Puppies</a>
            <a href='#formSection'>Book a puppy</a>
            <a href='#'>About us</a>
            </nav>  
            {tryLogin && <Login setTryLogin={setTryLogin} user={user} setUser={setUser} />}
            <button className='adminBtn' onClick={() => {
                setTryLogin(!tryLogin)
                }}>
                <FaRegUser className='loginIcon'/>
                {user.loggedIn && <FaCheckSquare className='loggedInIcon' />}
            </button> 
        </header>
    )
}

export default Header;