import React, {useEffect, useState} from 'react'
import './FormSection.css'
import { FormSectionSubmit, NewOwnerForm } from '../../components';

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
                    <NewOwnerForm user={user} handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} />
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