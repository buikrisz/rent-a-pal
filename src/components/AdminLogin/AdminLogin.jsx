import React, { useEffect, useState } from 'react';
import './AdminLogin.css';
import { FaTimes } from 'react-icons/fa';

function AdminLogin({ setTryLogin, user, setUser}) {
    const [userNameAdmin, setUserNameAdmin] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [invalidUserPass, setInvalidUserPass] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [logout, setLogout] = useState(false);

    const [register, setRegister] = useState(false); 

    function cancelLogin() {
        setTryLogin(false);
    }

    useEffect(
        () => {
            const url = register ? "/api/user/register" : "/api/user/login";
            const body = register ? { email: userEmail, username: userNameAdmin, password: userPassword } : { username: userNameAdmin, password: userPassword }

            submitted && fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const { username, reservedDogID, email, message } = data;
                if (message === "Authenticated") {
                    setInvalidUserPass(false);
                    setTryLogin(false);

                    username === "admin" ? setUser({ loggedIn: true, admin: true, username, email, reservedDogID }) : setUser({ loggedIn: true, admin: false, username, email, reservedDogID })

                } else if(data.message === "Invalid credentials") {
                    setInvalidUserPass(true);
                }

                //successful registration: message: success, back to login
                //failed registration: message: email exists
                //
            })

            return () => setSubmitted(false)
        },
        [submitted]
    )

    useEffect(
        () => {
            logout && fetch("/api/user/logout", {
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

            return () => setLogout(false);
        },
        [logout]
    )

  return (
    <>
        {!user.loggedIn ? (
            <form className='adminLogin' onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
            }}>
                {register && <div>
                    <h3>E-mail:</h3>
                    <input type="email" name="email" value={userEmail} id="email" onChange={(e) => setUserEmail(e.target.value)} />
                </div>}
                <div>
                    <h3>Username:</h3>
                    <input type="text" name="username" value={userNameAdmin} id="username" onChange={(e) => setUserNameAdmin(e.target.value)} />
                    {invalidUserPass && <FaTimes className="invalid" />}
                </div>
                <div>
                    <h3>Password:</h3>
                    <input type="password" name="password" value={userPassword} id="password" onChange={(e) => setUserPassword(e.target.value)} />
                    {invalidUserPass && <FaTimes className="invalid" />}
                </div>
                <div className='buttonDiv'>
                    <div>
                        <button className='login'>{register ? "Sign up" : "Login"}</button>
                        <button type='button' className='cancel' onClick={cancelLogin}>Cancel</button>
                    </div>
                {   
                    !register ?
                    <p>If you don't have an account, click here to <span onClick={() => setRegister(!register)}>sign up</span></p> : 
                    <p>If you have an account, click here to <span onClick={() => setRegister(!register)}>sign in</span></p> 
                }
                </div>
            </form>
        ) : (
            <button className='adminLogout' onClick={() => setLogout(true)}>Logout</button>
        )}
    </>
  )
}

export default AdminLogin