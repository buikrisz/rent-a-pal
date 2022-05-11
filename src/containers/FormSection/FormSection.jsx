import React, {useEffect, useState} from 'react'
import './FormSection.css'
import { FormSectionSubmit } from '../../components';

function FormSection({ chosenDog, setDogs, user, setUser }) {
    const [formData, setFormData] = useState(
        {newOwnerName: "", newOwnerZip: "", newOwnerCity: "", newOwnerStreet: "", newOwnerPhone: "", newOwnerEmail: "", newOwnerMotivation: ""}
    )

    const [newOwnerSubmit, setNewOwnerSubmit] = useState(false);
    const [ordered, setOrdered] = useState(false);

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        setNewOwnerSubmit(true);
    }

    useEffect(
        () => {
            if (newOwnerSubmit && chosenDog) {
                const newOwnerDetails = {
                    name: formData.newOwnerName,
                    zip: formData.newOwnerZip,
                    city: formData.newOwnerCity,
                    street: formData.newOwnerStreet,
                    phone: formData.newOwnerPhone,
                    email: formData.newOwnerEmail,
                    motivation: formData.newOwnerMotivation,
                    chosenDogId: chosenDog._id,
                    chosenDogName: chosenDog.name,
                }
        
                fetch("/api/user/new_owner_info", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newOwnerDetails)
                })
                .then(res => res.json())
                .then(dogs => {
                    setUser({ ...user, reservedDogID: dogs.reservedDogID })
                    setDogs(dogs.body);
                    setOrdered(true); //test
                })
            }
            return () => setNewOwnerSubmit(false);
        },
        [newOwnerSubmit]
    )

    useEffect(
        () => {
        if (user.loggedIn) {
            setFormData({ ...formData, newOwnerName: user.username, newOwnerEmail: user.email })
        } 
        },
        [user]
    )

    return (
        <section id='formSection'>
            {   
                !ordered ? (
                <fieldset className="fieldset">
                    <h2>Please provide your contact information</h2>
                    <legend><img className="happydoggo" src="/images/doggo.png" alt=""/></legend>
                    <form className="form" onSubmit={handleSubmit}>    
                        {
                            user.loggedIn ?
                            <input type="text" name="newOwnerName" placeholder="Name" value={formData.newOwnerName} onChange={handleChange} required disabled /> : 
                            <input type="text" name="newOwnerName" placeholder="Name" value={formData.newOwnerName} onChange={handleChange} required />
                        }    
                        <div>
                            <input type="text" name="newOwnerZip" placeholder="ZIP" value={formData.newOwnerZip} onChange={handleChange} required />
                            <input type="text" name="newOwnerCity" placeholder="City" value={formData.newOwnerCity} onChange={handleChange} required />
                        </div>
                        <input type="text" name="newOwnerStreet" placeholder="Street and number" value={formData.newOwnerStreet} onChange={handleChange} required />
                        <div>
                            <input type="text" name="newOwnerPhone" placeholder="06-30-000-000" value={formData.newOwnerPhone} onChange={handleChange} required />
                            {
                                user.loggedIn ? 
                                <input type="email" name="newOwnerEmail" placeholder="E-mail" value={formData.newOwnerEmail} onChange={handleChange} required disabled /> :
                                <input type="email" name="newOwnerEmail" placeholder="E-mail" value={formData.newOwnerEmail} onChange={handleChange} required />

                            }
                        </div>
                        <textarea rows="2" cols="60" maxLength="1000" placeholder="Tell us why you would be a great owner of this puppy" name="newOwnerMotivation" value={formData.newOwnerMotivation} onChange={handleChange} required />
                        <button className="submitBtn">Order your pal!</button>
                    </form>
                </fieldset>) :
                <FormSectionSubmit />
            }
            {
                (chosenDog && !ordered) && 
                    (<fieldset className="fieldSetChosenDog">
                        <legend align="left" className="dogNameLegend">{chosenDog.name}</legend>
                        <img src={chosenDog.img} alt=""/>
                        <div>
                            <h5>Breed: </h5>
                            <p>{chosenDog.breed}</p>
                        </div>
                        <div>
                            <h5>Gender:</h5>
                            <p>{chosenDog.gender}</p>
                        </div>
                        <div>
                            <h5>Training:</h5>
                            <p>{chosenDog.training}</p>
                        </div>
                        <div>
                            <h5>Introduction:</h5>
                            <p>{chosenDog.introduction}</p>
                        </div>
                    </fieldset>)
                }
        </section>
    )
}

export default FormSection;