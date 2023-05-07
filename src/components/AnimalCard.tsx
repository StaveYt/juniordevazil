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
      className={animal.udomljen ? "kartica-udomljen" : "kartica-neudomljen"}
    >
      {edit ? (
        <AnimalEdit setEdit={setEdit} animal={animal} />
      ) : (
        <>
          <div>
            <img src={animal.slika} />
            <div>
              <h6>Ime: {animal.ime}</h6>
              <h6>Vrsta: {animal.vrsta}</h6>
              <h6>Godine: {animal.godine}</h6>
              <h6>Posljednji pregled: {animal.pregled}</h6>
              <h6>Status: {animal.udomljen ? "Udomljen" : "Nije Udomljen"}</h6>
              <h6>Čip: {animal.cip ? "Ima" : "Nema"}</h6>
            </div>
          </div>
          <div>
            <h6>Opis:</h6>
            <p>{animal.opis}</p>
          </div>
          <div>
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
