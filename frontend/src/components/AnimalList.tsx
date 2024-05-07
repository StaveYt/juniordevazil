import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimalCard from "./AnimalCard";
import Navbar from "./Navbar";
import Filter from "./Filter";

function AnimalList(props) {
  
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [animals, setAnimals]=useState([])
  const [shownAnimals, setShownAnimals]=useState([])
  const checkAdmin = () => {
    if (userInfo.userType == "admin") {
      return true;
    } else {
      return false;
    }
  };
  useEffect(()=>{
    axios.get("http://localhost:3001/zivotinje").then(res=>{setAnimals(res.data);setShownAnimals(res.data)})
  },[])
  
  return (
    <div>
      <Navbar admin={checkAdmin}/>
      <div className="animal-list container">
        <Filter animals={animals} shownAnimals={shownAnimals} setShownAnimals={setShownAnimals}/>
        <div className="animal-container">
            {shownAnimals.map(animal=>(
            <AnimalCard key={animal.id} setAnimals={setAnimals} admin={checkAdmin} animal={animal}/>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AnimalList;
