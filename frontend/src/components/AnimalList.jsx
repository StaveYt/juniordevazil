import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimalCard from "./AnimalCard";
import Navbar from "./Navbar";
import Filter from "./Filter";

function AnimalList(props) {
  
  const [userRole, setUserRole] = useState(false);
  const [animals, setAnimals]=useState([])
  const [shownAnimals, setShownAnimals]=useState([])
  useEffect(()=>{
    console.log(localStorage.getItem("token"))
    axios.get("http://localhost:3000/animal/",{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(res=>{setAnimals(res.data);setShownAnimals(res.data)})
    axios.get("http://localhost:3000/user",{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(res=>{
      if(res.data.role == "admin") {setUserRole(true)}
      else {setUserRole(false)}
    })
  },[])
  
  return (
    <div>
      <Navbar admin={userRole}/>
      <div className="animal-list container">
        <Filter animals={animals} shownAnimals={shownAnimals} setShownAnimals={setShownAnimals}/>
        <div className="animal-container">
            {shownAnimals.map(animal=>(
            <AnimalCard key={animal._id} setAnimals={setAnimals} admin={userRole} animal={animal}/>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AnimalList;
