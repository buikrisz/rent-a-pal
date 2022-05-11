import React, { useEffect, useState } from 'react';
import './AdminAddDog.css';
import { FaCheckCircle } from 'react-icons/fa';

function AdminAddDog({ setaddNewDog, setDogs }) {
    const [formData, setFormData] = useState(
        { name: "", breed: "", gender: "", training: "", introduction: "" }
    );

    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

    const [submit, setSubmit] = useState(false);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmit(true);
    }

    useEffect(
        () => {
            if (submit && isFilePicked) {

                const newDogDetails = new FormData();
                newDogDetails.append("name", formData.name);
                newDogDetails.append("breed", formData.breed);
                newDogDetails.append("gender", formData.gender);
                newDogDetails.append("training", formData.training);
                newDogDetails.append("introduction", formData.introduction);
                newDogDetails.append("img", `/images/${selectedFile.name}`);
                newDogDetails.append('file', selectedFile);

                fetch("/api/dogs/add_new_dog", {
                    method: "POST",
                    body: newDogDetails
                })
                .then(res => res.json())
                .then(dogs => {
                    setDogs(dogs.body);
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
        <form className='adminAddDog' onSubmit={handleSubmit}>
            <h3>Add new doggo!</h3>
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
                <input type="text" placeholder='Name' name="name" id="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <input type="text" name="breed" placeholder='Breed' id="breed" value={formData.breed} onChange={handleChange} required />
            </div>
            <div>
                <input type="text" name="gender" placeholder='Gender' id="gender" value={formData.gender} onChange={handleChange} required />
            </div>
            <div>
                <textarea name="training" id="training" placeholder='Training' cols="30" rows="5" value={formData.training} onChange={handleChange} required ></textarea>
            </div>
            <div>
                <textarea name="introduction" id="introduction" placeholder='Introduction' cols="50" rows="5" value={formData.introduction} onChange={handleChange} required ></textarea>
            </div>
            <div>
                <button className='submitNewDog'>Submit</button>
                <button className='cancelNewDog' type='button' onClick={cancelAddDog}>Cancel</button>
            </div>
        </form>
    )
}

export default AdminAddDog;