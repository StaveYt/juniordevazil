import { useState } from "react";
import axios from "axios";
import AnimalEdit from "./AnimalEdit";
function AnimalCard(props) {
  const [animal, setAnimal] = useState(props.animal);
  const [edit, setEdit] = useState(false);

  function handleAdopt() {
    axios
      .patch(`http://localhost:3001/zivotinje/${animal.id}`, { udomljen: true })
      .then((res) =>
        axios
          .get("http://localhost:3001/zivotinje")
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
            <img className="card-img" src={animal.slika} />
            <div>
              <p>Ime: {animal.ime}</p>
              <p>Vrsta: {animal.vrsta}</p>
              <p>Godine: {animal.godine}</p>
              <p>Posljednji pregled: {animal.pregled}</p>
              <p>Status: {animal.udomljen ? "Udomljen" : "Nije Udomljen"}</p>
              <p>Čip: {animal.cip ? "Ima" : "Nema"}</p>
            </div>
          </div>
          <div className="card-desc">
            <h3>Opis:</h3>
            <p>{animal.opis}</p>
          </div>
          <div className="card-controls">
            {!animal.udomljen ? (
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
