import React, { useEffect, useState } from 'react';
import './AdminAddDog.css';
import { FaCheckCircle } from 'react-icons/fa';

function AdminAddDog({ setaddNewDog, setDogs }) {

    const [formData, setFormData] = useState(
        { nameInput: "", breedInput: "", genderInput: "", trainingInput: "", introductionInput: "" }
    )

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

    const [submit, setSubmit] = useState(false);

    useEffect(
        () => {
            if (submit && isFilePicked) {

                const newDogDetails = new FormData();
                newDogDetails.append("name", formData.nameInput);
                newDogDetails.append("breed", formData.breedInput);
                newDogDetails.append("gender", formData.genderInput);
                newDogDetails.append("training", formData.trainingInput);
                newDogDetails.append("introduction", formData.introductionInput);
                newDogDetails.append("img", `/images/${selectedFile.name}`);
                newDogDetails.append('file', selectedFile);

                fetch("http://127.0.0.1:9000/add_new_dog", {
                    method: "POST",
                    body: newDogDetails
                })
                .then(res => res.json())
                .then(dogs => {
                    setDogs(dogs);
                })
                setaddNewDog(false);
            }
            return () => {
                setSubmit(false)
                setIsFilePicked(false)
            }
        },
        [submit]
    )

    function cancelAddDog() {
        setaddNewDog(false)
    }

    return (
        
        <form className='adminAddDog' onSubmit={(e) => {
                e.preventDefault();
                setSubmit(true);
            }}>
         
            <h1>Add new doggo!</h1>
            <div>
                <label htmlFor="dogImage" className='custom-file-upload'>
                    Upload photo
                    {isFilePicked && <FaCheckCircle className='check'/>}
                </label>
                <input type="file" name="dogImage" id="dogImage" onChange={(e) => {
                    setSelectedFile(e.target.files[0]);
                    setIsFilePicked(true);
                }} required />
            </div>
            <div>
                <input type="text" placeholder='Name' name="nameInput" id="name" value={formData.nameInput} onChange={handleChange} required />
            </div>
            <div>
                <input type="text" name="breedInput" placeholder='Breed' id="breed" value={formData.breedInput} onChange={handleChange} required />
            </div>
            <div>
                <input type="text" name="genderInput" placeholder='Gender' id="gender" value={formData.genderInput} onChange={handleChange} required />
            </div>
            <div>
                <textarea name="trainingInput" id="training" placeholder='Training' cols="30" rows="5" value={formData.trainingInput} onChange={handleChange} required ></textarea>
            </div>
            <div>
                <textarea name="introductionInput" id="introduction" placeholder='Introduction' cols="50" rows="5" value={formData.introductionInput} onChange={handleChange} required ></textarea>
            </div>
            <div>
                <button className='submitNewDog'>Submit</button>
                <button className='cancelNewDog' type='button' onClick={cancelAddDog}>Cancel</button>
            </div>
        </form>
        
    )
}

export default AdminAddDog