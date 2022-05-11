import React, { useEffect, useState } from 'react';
import './Login.css';
import { FaTimes } from 'react-icons/fa';

function AdminLogin({ setTryLogin, user, setUser}) {
    const [loginData, setLoginData] = useState({ email: '', username: '', password: '' });

    const [invalidCredentials, setInvalidCredentials] = useState(false);

    const [submitted, setSubmitted] = useState(false);
    const [logoutSubmitted, setLogoutSubmitted] = useState(false);
    const [registration, setRegistration] = useState(false); 

    function cancelLogin() {
        setTryLogin(false);
    }

    function handleChange(e) {
        setLoginData({...loginData, [e.target.name]: e.target.value});
    }

    useEffect(
        () => {
            const url = registration ? "/api/user/register" : "/api/user/login";
            const body = registration ? { email: loginData.email, username: loginData.username, password: loginData.password } : { username: loginData.username, password: loginData.password }

            submitted && fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(data => {
                const { username, reservedDogID, email, message } = data;
                if (message === "Authenticated") {
                    setInvalidCredentials(false);
                    setTryLogin(false);

                    username === "admin" ? setUser({ loggedIn: true, admin: true, username, email, reservedDogID }) : setUser({ loggedIn: true, admin: false, username, email, reservedDogID });

                } else if (data.message === "Successful registration") {
                    setRegistration(false);
                    setInvalidCredentials(false);
                    setLoginData({ email: '', username: '', password: '' });

                } else if (data.status === 409) {
                    setInvalidCredentials(true);
                }
                //successful registration: message: success
            })

            return () => setSubmitted(false);
        },
        [submitted]
    )

    useEffect(
        () => {
            logoutSubmitted && fetch("/api/user/logout", {
                method: "POST"
            })
            .then(res => res.json())
            .then(data => {
                console.log(data.message);
                if (data.message === "Logout successful") {
                    setUser({ loggedIn: false, admin: false, username: "", reservedDogID: null })
                    setTryLogin(false);
                }
            })

            return () => setLogoutSubmitted(false);
        },
        [logoutSubmitted]
    )

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
    }

    return (
        <>
            {
                !user.loggedIn ? 
                (<form className='adminLogin' onSubmit={handleSubmit}>
                    {
                        registration && 
                        <div>
                            <h3>E-mail:</h3>
                            <input type="email" name="email" value={loginData.email} id="email" onChange={handleChange} />
                            {invalidCredentials && <FaTimes className="invalid" />}
                        </div>
                    }
                    <div>
                        <h3>Username:</h3>
                        <input type="text" name="username" value={loginData.username} id="username" onChange={handleChange} />
                        {invalidCredentials && <FaTimes className="invalid" />}
                    </div>
                    <div>
                        <h3>Password:</h3>
                        <input type="password" name="password" value={loginData.password} id="password" onChange={handleChange} />
                        {invalidCredentials && <FaTimes className="invalid" />}
                    </div>
                    <div className='buttonDiv'>
                        <div>
                            <button className='login'>{registration ? "Sign up" : "Login"}</button>
                            <button type='button' className='cancel' onClick={cancelLogin}>Cancel</button>
                        </div>
                    {   
                        !registration ?
                        <p>If you don't have an account, click here to <span onClick={() => setRegistration(!registration)}>sign up</span></p> : 
                        <p>If you have an account, click here to <span onClick={() => setRegistration(!registration)}>sign in</span></p> 
                    }
                    </div>
                </form>) : 
                (<button className='adminLogout' onClick={() => setLogoutSubmitted(true)}>Logout</button>)
            }
        </>
    )
}

export default AdminLogin;