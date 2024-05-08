import { useState } from "react"
import Navbar from "./Navbar"
import axios from "axios";

function Add(){
  const [animalDef, setAnimalDef] = useState({
    name: "",
    type: "",
    cip: false,
    age: 0,
    desc: true,
    appoint: "",
    adopted: false,
    img:""
  })
  const [animal, setAnimal] = useState({...animalDef})
  

  function handleChange(event){
    if(event.target.id=="img"){
      const file = event.target.files[0];
      const filePath = URL.createObjectURL(file);
      setAnimal({...animal,[event.target.id]:filePath});
    } else{
      setAnimal({ ...animal, [event.target.id]: event.target.value });
    }
  }
  function addAnimal(event){
    event.preventDefault();
    axios.post("http://localhost:3000/animal", animal,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((rez) => {
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
            <label htmlFor="img">Izaberite sliku</label>
            <input type={"file"} onChange={handleChange} id="img"></input>
              </div>
            
            <div>
              <label htmlFor="name">Ime:</label>
              <input id="name" onChange={handleChange}></input>
            </div>
            <div>
              <label>Vrsta</label>
              <div>
                <label htmlFor="pas">Pas</label>
                <input checked={animal.type==="pas"} name="pas" value="pas" id="type" type={"radio"} radioGroup="type" onChange={handleChange}></input>
              </div>
              <div>
                <label htmlFor="macka">Mačka</label>
                <input id="type" checked={animal.type==="macka"} value="macka" name="macka" type={"radio"} radioGroup="type" onChange={handleChange}></input>
              </div>
              <div>
                <label htmlFor="ostalo">Ostalo</label>
                <input id="type" checked={animal.type==="ostalo"} value="ostalo" name="ostalo" type={"radio"} radioGroup="type" onChange={handleChange}></input>
              </div>
            </div>
            <div>
              <label htmlFor="age">Godine:</label>
              <input required id="age" type={"number"} onChange={handleChange}></input>
            </div>
            <div>
              <label htmlFor="desc">Opis:</label>
              <input id="desc" onChange={handleChange}></input>
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