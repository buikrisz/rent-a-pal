import React, {useState, useEffect} from 'react';
import './App.css';
import DogSelector from './components/DogSelector/DogSelector';
import FormSection from './components/FormSection/FormSection';
import LandingSection from './components/LandingSection/LandingSection';
import AdminLogin from './components/AdminLogin/AdminLogin';
import { FaRegUser, FaCheckSquare } from 'react-icons/fa';

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
        console.log(data);
        const { username, reservedDogID, email, message } = data;
        console.log("reserved", reservedDogID);
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
      <button className='adminBtn' onClick={() => {
          setTryLogin(!tryLogin)
        }}>
        <FaRegUser className='loginIcon'/>
        {user.loggedIn && <FaCheckSquare className='loggedInIcon' />}
      </button>
      <LandingSection />
      <DogSelector dogs={dogs} setChosenDog={setChosenDog} readMore={readMore} setReadMore={setReadMore} user={user} setDogs={setDogs} />
      <FormSection chosenDog={chosenDogInfo} setDogs={setDogs} user={user} setUser={setUser} />
      {tryLogin && <AdminLogin setTryLogin={setTryLogin} user={user} setUser={setUser} />}
    </div>
  );
}

export default App;
