import { useState } from "react";
import axios from "axios";
import AnimalEdit from "./AnimalEdit";
function AnimalCard(props) {
  const [animal, setAnimal] = useState(props.animal);
  const [edit, setEdit] = useState(false);

  function handleAdopt() {
    axios
      .patch(`http://localhost:3000/animal/${animal._id}`, { adopted: true },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) =>
        axios
          .get("http://localhost:3000/animal",{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => props.setAnimals(res.data))
      );
  }
  function handleEdit() {
    setEdit(true)
  }

  return ( 
    <div
      className={edit?"editcard":animal.udomljen ? "card-udomljen" : "card-neudomljen"}
    >
      {edit ? (
        <AnimalEdit setAnimals={props.setAnimals} setEdit={setEdit} animal={animal} />
      ) : (
        <>
          <div className="card-info">
            <img className="card-img" src={animal.img} />
            <div>
              <p>Ime: {animal.name}</p>
              <p>Vrsta: {animal.type}</p>
              <p>Godine: {animal.age}</p>
              <p>Posljednji pregled: {animal.appoint}</p>
              <p>Status: {animal.adopted ? "Udomljen" : "Nije Udomljen"}</p>
              <p>Čip: {animal.cip ? "Ima" : "Nema"}</p>
            </div>
          </div>
          <div className="card-desc">
            <h3>Opis:</h3>
            <p>{animal.desc}</p>
          </div>
          <div className="card-controls">
            {!animal.adopted ? (
              <button onClick={handleAdopt}>Udomi</button>
            ) : (
              <></>
            )} 
            {props.admin ? <button onClick={handleEdit}>Uredi</button> : <></>}
          </div>
        </>
      )}
    </div>
  );
}

export default AnimalCard;
