import React from 'react';

function NewOwnerForm({ user, handleChange, handleSubmit, formData }) {
  return (
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
  )
}

export default NewOwnerForm;