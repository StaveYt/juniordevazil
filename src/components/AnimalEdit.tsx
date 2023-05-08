import axios from "axios";
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

  function handleChange(event){
    let value = event.target.value

    if(value =="on"){
      if(event.target.id=="udomljen"){
        value= !animal.udomljen
      } else if (event.target.id=="cip"){
        value=!animal.cip
      }
    }
    if(event.target.id=="slika"){
      const file = event.target.files[0];
      const filePath = URL.createObjectURL(file);
      setAnimal({...animal,[event.target.id]:filePath});
    } else{
      console.log(value)
      setAnimal({ ...animal, [event.target.id]: value });
    }
    
  }
  function handleDelete(id){
    axios
      .delete(`http://localhost:3001/zivotinje/${id}`)
      .then((rez) =>
        axios
          .get("http://localhost:3001/zivotinje")
          .then((res) => {props.setAnimals(res.data); props.setEdit(false)})
      );
  }
  function editAnimal(event){
    event.preventDefault()
    
    axios.put(`http://localhost:3001/zivotinje/${props.animal.id}`, animal).then((rez) => {
      axios
        .get("http://localhost:3001/zivotinje")
        .then((rez) => {props.setAnimals(rez.data); props.setEdit(false)});
    });
  }

  return(
    <>
      <form className="editcard" onSubmit={editAnimal}>
      <h3>Uređivanje životinje</h3>
        <div>
          <div>
            <div>
            <label htmlFor="slika">Izaberite sliku</label>
            <input type={"file"} id="slika"></input>
            </div>
            
            <div>
              <label htmlFor="ime">Ime:</label>
              <input id="ime" value={animal.ime} onChange={handleChange}></input>
            </div>
            <div className="typesel">
              <label>Vrsta: </label>
              <div>
                <label htmlFor="pas">Pas</label>
                <input id="vrsta" name="pas" value="pas" checked={animal.vrsta==="pas"} type={"radio"} radioGroup="vrsta" onChange={handleChange}></input>
              </div>
              <div>
                <label htmlFor="macka">Mačka</label>
                <input id="vrsta" name="macka" value="macka" checked={animal.vrsta==="macka"} type={"radio"} radioGroup="vrsta" onChange={handleChange}></input>
              </div>
              <div>
                <label htmlFor="ostalo">Ostalo</label>
                <input id="vrsta" name="ostalo" value="ostalo" checked={animal.vrsta==="ostalo"} type={"radio"} radioGroup="vrsta" onChange={handleChange}></input>
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
              <input id="cip" checked={animal.cip} type={"checkbox"} onChange={handleChange}></input>
            </div>
            <div>
              <label htmlFor="pregled">Pregled:</label>
              <input id="pregled" value={animal.pregled} type={"date"} onChange={handleChange}></input>
            </div>
            <div>
              <label htmlFor="udomljen">Udomljen:</label>
              <input id="udomljen" checked={animal.udomljen} type={"checkbox"} onChange={handleChange}></input>
            </div>
          </div>
        </div>
        <button type="submit">Spremi</button>
        <button type="button" onClick={()=>handleDelete(props.animal.id)}>Izbriši</button>
      </form>
    </>
  )
}
export default AnimalEdit