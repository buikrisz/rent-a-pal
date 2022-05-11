import React from 'react';
import './LandingSection.css';
import { ActionButton, Header, Icon } from '../../components';

function LandingSection({ user, setUser, tryLogin, setTryLogin }) {
  return (
    <section id='landingPageSection'>
      <Header user={user} setUser={setUser} tryLogin={tryLogin} setTryLogin={setTryLogin} />
      <div className='content'>
          <h1>Rent-A-Pal</h1>
          <h3>Bring the WOOF under your ROOF!</h3>
          <p>Feeling lonely? <br /> Nobody cares about you? <br /> You are one sad excuse of a human being? <br /><strong>Say no more! </strong><br /> Rent-A-Pal brings you cool and amazing doggos all over the world! <br /> Our puppers are trained so you don't have to feel lonely anymore!</p>
        <div className='buttons'>
          <a href="#dogSelectorSection">
            <ActionButton color="blue" text="Find a pal" />
          </a> 
          <ActionButton color="white" text="Donation" />
        </div>
      </div>
        <div className='icons'>
          <Icon text="Breed" imgSrc="/images/icon_breed.png" />
          <Icon text="Feed" imgSrc="/images/icon_food.png" />
          <Icon text="Train" imgSrc="/images/icon_training.png" />
          <Icon text="Groom" imgSrc="/images/icon_grooming.png" />
          <Icon text="Sit?" imgSrc="/images/icon_size.png" />
        </div>
    </section>
  )
}

export default LandingSection;