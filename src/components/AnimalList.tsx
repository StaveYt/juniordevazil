import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimalCard from "./AnimalCard";
import Navbar from "./Navbar";
function AnimalList(props) {
  
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [animals, setAnimals]=useState([]) 

  const checkAdmin = () => {
    if (userInfo.userType == "admin") {
      return true;
    } else {
      return false;
    }
  };
  useEffect(()=>{
    axios.get("http://localhost:3001/zivotinje").then(res=>setAnimals(res.data))
  },[])
  
  return (
    <div>
      <Navbar/>
      <div className="container">
        <div>
            <h3>Filter:</h3>
            <div>
                <input id="svi" type="radio" radioGroup="filter"></input>
                <label htmlFor="svi">Svi</label>
            </div>
            <div>
                <input id="udomljen" type="radio" radioGroup="filter"></input>
                <label htmlFor="udomljen">Udomljen</label>
            </div>
            <div>
                <input id="nijeUdomljen" type="radio" radioGroup="filter"></input>
                <label htmlFor="nijeUdomljen">Nije udomljen</label>
            </div>
            <h3>Vrsta:</h3>
            <div>
                <input id="sve" type="radio" radioGroup="type"></input>
                <label htmlFor="sve">Sve</label>
            </div>
            <div>
                <input id="mačka" type="radio" radioGroup="type"></input>
                <label htmlFor="mačka">Mačka</label>
            </div>
            <div>
                <input id="pas" type="radio" radioGroup="type"></input>
                <label htmlFor="pas">Pas</label>
            </div>
        </div>
        <div>
            {animals.map(animal=>(
            <AnimalCard setAnimals={setAnimals} admin={checkAdmin} animal={animal}/>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AnimalList;
