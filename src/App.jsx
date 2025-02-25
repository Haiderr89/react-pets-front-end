// src/App.jsx

import { useState, useEffect } from 'react';
import * as petService from './services/petService';
import PetList from './components/PetList';
import PetDetails from './components/PetDetails';
import PetForm from './components/PetForm';
import './App.css'

const App = () => {
  const [petList, setPetList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);


  // Create a new useEffect
  useEffect(()=>{
    // create a new async function
    const fetchPets =async()=>{
      try {
          // call on the index function
        const pets = await petService.index();
        if(pets.error){
          throw new Error(pets.error)
      }
        // Set petList state to the returned pets data
        setPetList(pets)

      } catch (error) {
        console.log(error);
      }
    }
  // invoke the function
fetchPets();

    // add an empty dependency array to the `useEffect` hook.
  },[])

    // Add the following:
  const updateSelected = (pet) => {
    setSelected(pet)
  }

  const handleFormView = (pet) => {
    if (!pet.name) setSelected(null);
    setIsFormOpen(!isFormOpen);
  };


  const handleAddPet = async (formData) => {
    try {
      const newPet = await petService.create(formData);
  
      if (newPet.error) {
        throw new Error(newPet.error);
      }
  
      setPetList([newPet, ...petList]);
      setIsFormOpen(false);
    } catch (error) {
      // Log the error to the console
      console.log(error);
    }
  };

// src/App.jsx

const handleUpdatePet = async (formData, petId) => {
  try {
    const updatedPet = await petService.updatePet(formData, petId);

    // handle potential errors
    if (updatedPet.error) {
      throw new Error(updatedPet.error);
    }

    const updatedPetList = petList.map((pet) =>{
      // If the id of the current pet is not the same as the updated pet's id, return the existing pet. If the id's match, instead return the updated pet.
      // return pet._id !== updatedPet._id ? pet : updatedPet
      if(pet._id === updatedPet._id){
        console.log(updatedPet)
        return updatedPet
      }

      return pet 
    });
    
    console.log(updatedPetList)

    // Set petList state to this updated array
    setPetList(updatedPetList);
    // If we don't set selected to the updated pet object, the details page will reference outdated data until the page reloads.
    setSelected(updatedPet);
    setIsFormOpen(false);
  } catch (error) {
    console.log(error);
  }
};

const handleRemovePet = async (petId) => {
  try {
    const response = await petService.deletePet(petId);

    if (response.error) {
      throw new Error(response.error);
    }

    const newPetList = petList.filter((pet) => pet._id !== petId)
    setPetList(newPetList)
    setSelected(null)

  } catch (error) {
    console.log(error);
  }
};

return (
  <>
    <PetList
      petList={petList}
      updateSelected={updateSelected}
      handleFormView={handleFormView}
      isFormOpen={isFormOpen}
      handleUpdatePet={handleUpdatePet}
    />

{
  isFormOpen ? (
    <PetForm handleAddPet={handleAddPet} selected={selected} handleUpdatePet={handleUpdatePet}/>
  ) : (
    <PetDetails selected={selected} 
    handleFormView={handleFormView} 
    handleUpdatePet={handleUpdatePet}  
    handleRemovePet={handleRemovePet}/>
  )
}
  </>
);

};

export default App;