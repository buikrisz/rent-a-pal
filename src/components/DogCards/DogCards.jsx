import React, { useState } from 'react'
import AddNewCard from '../AddNewCard/AddNewCard';
import DogCard from '../DogCard/DogCard';
import DogDetails from '../DogDetails/DogDetails';
import './DogCards.css'

function DogCards({ dogs, setChosenDog, readMore, setReadMore, setaddNewDog, setDogs, user }) {

  const [dogDetails, setDogDetails] = useState(false);
  const selectedDog = dogs.find(dog => dog._id === readMore);

  return (
    <div className='dogCards'>
      {dogs.map(dog => <DogCard key={dog._id} id={dog._id} name={dog.name} breed={dog.breed} gender={dog.gender} training={dog.training} img={dog.img} reserved={dog.reserved} setChosenDog={setChosenDog} readMore={readMore} setReadMore={setReadMore} setDogDetails={setDogDetails} user={user} setDogs={setDogs} />)}
      {(user.loggedIn && user.username === "admin") && <AddNewCard setaddNewDog={setaddNewDog}/>}
      {dogDetails && <DogDetails chosenDogDetails={selectedDog} setDogDetails={setDogDetails} /> }
    </div>
  )
}

export default DogCards