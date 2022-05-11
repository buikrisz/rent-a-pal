import React, { useState } from 'react';
import './DogSelector.css';
import { DogCards, AdminAddDog } from '../../components';

function DogSelector({ dogs, setChosenDog, readMore, setReadMore, setDogs, user }) {
  const [addNewDog, setaddNewDog] = useState(false);

  return (
    <section id='dogSelectorSection'>
        <DogCards dogs={dogs} setChosenDog={setChosenDog} readMore={readMore} setReadMore={setReadMore} user={user} setaddNewDog={setaddNewDog} setDogs={setDogs} />
        {addNewDog && <AdminAddDog setaddNewDog={setaddNewDog} setDogs={setDogs} />}
    </section>
  )
}

export default DogSelector;