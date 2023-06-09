import { useState } from "react"
import Navbar from "./Navbar"
import axios from "axios";

function Add(){
  const [animalDef, setAnimalDef] = useState({
    ime: "",
    vrsta: "",
    cip: false,
    godine: 0,
    opis: true,
    pregled: "",
    udomljen: false,
    slika:""
  })
  const [animal, setAnimal] = useState({...animalDef})
  

  function handleChange(event){
    if(event.target.id=="slika"){
      const file = event.target.files[0];
      const filePath = URL.createObjectURL(file);
      setAnimal({...animal,[event.target.id]:filePath});
    } else{
      setAnimal({ ...animal, [event.target.id]: event.target.value });
    }
  }
  function addAnimal(event){
    event.preventDefault();
    axios.post("http://localhost:3001/zivotinje", animal).then((rez) => {
      alert("Dodano")
      setAnimal({...animalDef});
    });
  }
  return(
    <div>
      <Navbar admin={true}/>
      <form onSubmit={addAnimal} className="container">
        <h1>Unos nove životinje</h1>
        <div>
          <div>
            <div>
            <label htmlFor="slika">Izaberite sliku</label>
            <input type={"file"} onChange={handleChange} id="slika"></input>
              </div>
            
            <div>
              <label htmlFor="ime">Ime:</label>
              <input id="ime" onChange={handleChange}></input>
            </div>
            <div>
              <label>Vrsta</label>
              <div>
                <label htmlFor="pas">Pas</label>
                <input checked={animal.vrsta==="pas"} name="pas" value="pas" id="vrsta" type={"radio"} radioGroup="vrsta" onChange={handleChange}></input>
              </div>
              <div>
                <label htmlFor="macka">Mačka</label>
                <input id="vrsta" checked={animal.vrsta==="macka"} value="macka" name="macka" type={"radio"} radioGroup="vrsta" onChange={handleChange}></input>
              </div>
              <div>
                <label htmlFor="ostalo">Ostalo</label>
                <input id="vrsta" checked={animal.vrsta==="ostalo"} value="ostalo" name="ostalo" type={"radio"} radioGroup="vrsta" onChange={handleChange}></input>
              </div>
            </div>
            <div>
              <label htmlFor="godine">Godine:</label>
              <input required id="godine" type={"number"} onChange={handleChange}></input>
            </div>
            <div>
              <label htmlFor="opis">Opis:</label>
              <input id="opis" onChange={handleChange}></input>
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="cip">Čipiran</label>
              <input id="cip" type={"checkbox"} onChange={handleChange}></input>
            </div>
            <div>
              <label htmlFor="pregled">Pregled:</label>
              <input id="pregled" type={"date"} onChange={handleChange}></input>
            </div>
          </div>
        </div>
        <button>Spremi</button>
      </form>
    </div>
  )
}
export default Add