import { useState } from "react"
import Navbar from "./Navbar"

function Add(){
  const [animal, setAnimal] = useState({
    ime: "",
    vrsta: "",
    cip: false,
    godine: 0,
    opis: true,
    pregled: "",
    udomljen: false,
    slika:""
  })

  function handleChange(){

  }
  function addAnimal(){

  }
  return(
    <div>
      <Navbar/>
      <form>
        <h1>Unos nove životinje</h1>
        <div>
          <div>
            <div>
              <label htmlFor="ime">Ime:</label>
              <input id="ime" onChange={handleChange}></input>
            </div>
            <div>
              <label>Vrsta</label>
              <div>
                <label htmlFor="pas">Pas</label>
                <input checked={animal.vrsta==="pas"} id="pas" type={"radio"} radioGroup="vrsta" onChange={handleChange}></input>
              </div>
              <div>
                <label htmlFor="macka">Mačka</label>
                <input id="macka" checked={animal.vrsta==="macka"} type={"radio"} radioGroup="vrsta" onChange={handleChange}></input>
              </div>
              <div>
                <label htmlFor="ostalo">Ostalo</label>
                <input id="osatlo" checked={animal.vrsta==="ostalo"} type={"radio"} radioGroup="vrsta" onChange={handleChange}></input>
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