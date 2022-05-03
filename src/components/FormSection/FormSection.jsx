import React, {useEffect, useState} from 'react'
import './FormSection.css'
import FormSectionSubmit from '../FormSectionSubmit/FormSectionSubmit';

function FormSection({chosenDog, setDogs}) {

  const [formData, setFormData] = useState(
    {newOwnerName: "", newOwnerZip: "", newOwnerCity: "", newOwnerStreet: "", newOwnerPhone: "", newOwnerEmail: "", newOwnerMotivation: ""}
  )

  function handleChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const [newOwnerSubmit, setNewOwnerSubmit] = useState(false);

  const [ordered, setOrdered] = useState(false);

  useEffect(
    () => {
        if (newOwnerSubmit && chosenDog) {
            const newOwnerDetails = {
                ...formData,
                chosenDogId: chosenDog.id,
                chosenDogName: chosenDog.name,
            }
    
            fetch("http://127.0.0.1:9000/new_owner_info", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newOwnerDetails)
            })
            .then(res => res.json())
            .then(dogs => {
              setDogs(dogs);
            })
            setOrdered(true);
        }
        return setNewOwnerSubmit(false);
    },
    [newOwnerSubmit]
)
 

  return (
    <section id='formSection'>
      {!ordered && (
      <fieldset className="fieldset">
        <h2>Please provide your contact information</h2>
        <legend><img className="happydoggo" src="/images/doggo.png" alt=""/></legend>
        <form className="form" onSubmit={(e) => {
            e.preventDefault();
            setNewOwnerSubmit(true);
        }}>        
          <input type="text" name="newOwnerName" placeholder="Name" value={formData.newOwnerName} onChange={handleChange} />
          <span>
            <input type="text" name="newOwnerZip" placeholder="ZIP" value={formData.newOwnerZip} onChange={handleChange} />
            <input type="text" name="newOwnerCity" placeholder="City" value={formData.newOwnerCity} onChange={handleChange} />
          </span>
          <input type="text" name="newOwnerStreet" placeholder="Street and number" value={formData.newOwnerStreet} onChange={handleChange} />
          <span>
            <input type="text" name="newOwnerPhone" placeholder="06-30-000-000" value={formData.newOwnerPhone} onChange={handleChange} />
            <input type="email" name="newOwnerEmail" placeholder="E-mail" value={formData.newOwnerEmail} onChange={handleChange} />
          </span>
          <textarea rows="2" cols="60" maxLength="1000" placeholder="Tell us why you would be a great owner of this puppy" name="newOwnerMotivation" value={formData.newOwnerMotivation} onChange={handleChange} />
          <button className="submitBtn">Order your pal!</button>
        </form>
      </fieldset>)}
      {chosenDog && !ordered && (
        <fieldset className="fieldSetChosenDog">
          <legend align="left" className="dogNameLegend">{chosenDog.name}</legend>
          <img src={chosenDog.img} alt=""/>

          <div className="chosenDogInfos">
            <h5>Breed: </h5>
            <p>{chosenDog.breed}</p>
          </div>

          <div className="chosenDogInfos">
            <h5>Gender:</h5>
            <p>{chosenDog.gender}</p>
          </div>

          <div className="chosenDogInfos">
            <h5>Training:</h5>
            <p>{chosenDog.training}</p>
          </div>

          <div className="chosenDogInfos">
            <h5>Introduction:</h5>
            <p>{chosenDog.introduction}</p>
          </div>
        </fieldset>
      )}
      {ordered && <FormSectionSubmit />}
    </section>
  )
}

export default FormSection;