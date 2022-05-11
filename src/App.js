import React, {useState, useEffect} from 'react';
import './App.css';
import { DogSelector, FormSection, LandingSection } from './containers';

function App() {
  const [dogs, setDogs] = useState([]);
  const [chosenDog, setChosenDog] = useState(null);
  const [readMore, setReadMore] = useState(null);
  const [chosenDogInfo, setChosenDogInfo] = useState(null);

  const [tryLogin, setTryLogin] = useState(false);
  const [user, setUser] = useState({
    loggedIn: false,
    admin: false,
    username: "",
    email: "",
    reservedDogID: null,
  });

  useEffect(
    () => {
      fetch("/api/dogs")
      .then(res => res.json())
      .then(dogsData => {
        setDogs(dogsData.body);
      });

      fetch("/api/user/validate_session")
      .then(res => res.json())
      .then(data => {

        const { username, reservedDogID, email, message } = data;

        if (message === "Authenticated") {
          username === "admin" ? setUser({ loggedIn: true, admin: true, username, email, reservedDogID }) : setUser({ loggedIn: true, admin: false, username, email, reservedDogID })
        }
      })
    },
    []
  )

  useEffect(
    () => {
      const selectedDog = dogs.find(dog => dog._id === chosenDog);
      chosenDog && setChosenDogInfo(selectedDog);
    },
    [chosenDog]
  )

  return (
    <div className="App">
      <LandingSection user={user} setUser={setUser} tryLogin={tryLogin} setTryLogin={setTryLogin} />
      <DogSelector dogs={dogs} setChosenDog={setChosenDog} readMore={readMore} setReadMore={setReadMore} user={user} setDogs={setDogs} />
      <FormSection chosenDog={chosenDogInfo} setDogs={setDogs} user={user} setUser={setUser} />
    </div>
  );
}

export default App;
