import React, { useEffect, useState } from 'react';
import './DogCard.css';
import { FaTrash } from 'react-icons/fa';
import DeleteDogPopup from '../DeleteDogPopup/DeleteDogPopup';

function DogCard({ dog, setChosenDog, setReadMore, setShowDogDetails, setDogs, user }) {
    
    const { _id, name, breed, gender, training, img, reserved } = dog;
    const [submitDeleteDog, setSubmitDeleteDog] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [reservedForUser, setReservedForUser] = useState(false);

    function handleClick(e) {
        if (e.target.id === "seeMoreBtn") {
            setReadMore(e.target.dataset.id);
            setShowDogDetails(true);
        } else if (e.target.id === "adoptBtn") {
            setChosenDog(e.target.dataset.id);
        }
    }
    
    useEffect(
       () => {
            if (submitDeleteDog) {
                fetch("/api/dogs/delete_dog", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: _id })
                })
                .then(res => res.json())
                .then(dogs => {
                    setDogs(dogs.body)
                })
            }
            return () => setSubmitDeleteDog(false);
       },
       [submitDeleteDog]
    )

    useEffect(
        () => {
            if (user.loggedIn && user.reservedDogID === _id) { 
                setReservedForUser(true);
            } else {
                setReservedForUser(false);
            }
        },
        [user]
    )

    return (
        <>  
            {deletePopup && <DeleteDogPopup setDeletePopup={setDeletePopup} setSubmitDeleteDog={setSubmitDeleteDog} name={name} />}
            <div className={`dogCard ${reserved ? "reserved" : "available"} ${reservedForUser ? "reservedForUser" : "notReservedForUser"}`}>
                <div className='img-div'>
                    {
                        reserved && 
                        <img src='/images/reserved.png' alt="" className='reserved-img'/>
                    }
                    <img src={img} alt="" />   
                </div>
                <div className='textDiv'>
                    <div className='dogNameDiv' >
                        <h4>{name}</h4>
                    </div>
                    <div>
                        <h4>Breed:</h4>
                        <h4>{breed}</h4>
                    </div>
                    <div>
                        <h4>Gender:</h4>
                        <h4>{gender}</h4>
                    </div>
                    <div>
                        <h4>Training:</h4>
                        <h4>{training}</h4>
                    </div>
                </div>
                <div className='dogCardButtons'>
                    <button data-id={_id} id='adoptBtn' onClick={handleClick} >Adopt</button>
                    <button data-id={_id} id='seeMoreBtn' onClick={handleClick} >See More</button>
                    {
                        (user.loggedIn && user.username === "admin") && 
                        <button data-id={_id} id='deleteBtn' onClick={() => setDeletePopup(true)} >
                            <FaTrash className='deleteIcon' />
                        </button>
                    }
                </div>
            </div>
        </>
    )
}

export default DogCard;