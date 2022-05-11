import React, {useState} from 'react'
import DogCards from '../DogCards/DogCards'
import './DogSelector.css'
import AdminAddDog from '../AdminAddDog/AdminAddDog';


function DogSelector({ dogs, setChosenDog, readMore, setReadMore, setDogs, user }) {
  const [addNewDog, setaddNewDog] = useState(false);

  return (
    <section id='dogSelectorSection'>
        <DogCards dogs={dogs} setChosenDog={setChosenDog} readMore={readMore} setReadMore={setReadMore} user={user} setaddNewDog={setaddNewDog} setDogs={setDogs} />
        {addNewDog && <AdminAddDog setaddNewDog={setaddNewDog} setDogs={setDogs} />}
    </section>
  )
}

export default DogSelector