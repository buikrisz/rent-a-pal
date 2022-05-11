import React, { useState } from 'react';
import './DogCards.css';
import AddNewCard from '../AddNewCard/AddNewCard';
import DogCard from '../DogCard/DogCard';
import DogDetails from '../DogDetails/DogDetails';

function DogCards({ dogs, setChosenDog, readMore, setReadMore, setaddNewDog, setDogs, user }) {
    const [showDogDetails, setShowDogDetails] = useState(false);
    const selectedDog = dogs.find(dog => dog._id === readMore);

    return (
        <div className='dogCards'>
            {
                dogs.map(dog => <DogCard key={dog._id} dog={dog} setChosenDog={setChosenDog} readMore={readMore} setReadMore={setReadMore} setShowDogDetails={setShowDogDetails} user={user} setDogs={setDogs} />)
            }
            {
                (user.loggedIn && user.username === "admin") && <AddNewCard setaddNewDog={setaddNewDog} />
            }
            {
                showDogDetails && <DogDetails chosenDogDetails={selectedDog} setShowDogDetails={setShowDogDetails} /> 
            }
        </div>
    )
}

export default DogCards;