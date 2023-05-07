import { useState } from "react"

function AnimalEdit(props){
  const [animal, setAnimal] = useState({
    ime: props.animal.ime,
    vrsta: props.animal.vrsta,
    cip: props.animal.cip,
    godine: props.animal.godine,
    opis: props.animal.opis,
    pregled: props.animal.pregled,
    udomljen: props.animal.udomljen,
    slika:props.animal.slika
  })

  function handleChange(){

  }
  function handleDelete(){

  }
  function editAnimal(event){
    event.preventDefault()
    props.setEdit(false)
  }

  return(
    <>
      <form onSubmit={editAnimal}>
      <h1>Unos nove životinje</h1>
        <div>
          <div>
            <div>
              <label htmlFor="ime">Ime:</label>
              <input id="ime" value={animal.ime} onChange={handleChange}></input>
            </div>
            <div>
              <label>Vrsta</label>
              <div>
                <label htmlFor="pas">Pas</label>
                <input id="pas" checked={animal.vrsta==="pas"} type={"radio"} radioGroup="vrsta" onChange={handleChange}></input>
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
              <input value={animal.godine} required id="godine" type={"number"} onChange={handleChange}></input>
            </div>
            <div>
              <label htmlFor="opis">Opis:</label>
              <input id="opis" value={animal.opis} onChange={handleChange}></input>
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="cip">Čipiran</label>
              <input id="cip" value={animal.cip} type={"checkbox"} onChange={handleChange}></input>
            </div>
            <div>
              <label htmlFor="pregled">Pregled:</label>
              <input id="pregled" value={animal.pregled} type={"date"} onChange={handleChange}></input>
            </div>
          </div>
        </div>
        <button>Spremi</button>
      </form>
    </>
  )
}
export default AnimalEdit