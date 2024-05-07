import axios from "axios";
import { useState } from "react"

function AnimalEdit(props){
  const [animal, setAnimal] = useState({
    name: props.animal.name,
    type: props.animal.type,
    cip: props.animal.cip,
    age: props.animal.age,
    desc: props.animal.desc,
    appoint: props.animal.appoint,
    adopted: props.animal.adopted,
    img:props.animal.img
  })

  function handleChange(event){
    let value = event.target.value

    if(value =="on"){
      if(event.target.id=="adopted"){
        value= !animal.adopted
      } else if (event.target.id=="cip"){
        value=!animal.cip
      }
    }
    if(event.target.id=="img"){
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
      .delete(`http://localhost:3000/animals/${id}`)
      .then((rez) =>
        axios
          .get("http://localhost:3000/animals")
          .then((res) => {props.setAnimals(res.data); props.setEdit(false)})
      );
  }
  function editAnimal(event){
    event.preventDefault()
    
    axios.put(`http://localhost:3000/animals/${props.animal._id}`, animal).then((rez) => {
      axios
        .get("http://localhost:3000/animals")
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
            <label htmlFor="img">Izaberite sliku</label>
            <input type={"file"} id="img"></input>
            </div>
            
            <div>
              <label htmlFor="name">Ime:</label>
              <input id="name" value={animal.name} onChange={handleChange}></input>
            </div>
            <div className="typesel">
              <label>Vrsta: </label>
              <div>
                <label htmlFor="pas">Pas</label>
                <input id="type" name="pas" value="pas" checked={animal.type==="pas"} type={"radio"} radioGroup="type" onChange={handleChange}></input>
              </div>
              <div>
                <label htmlFor="macka">Mačka</label>
                <input id="type" name="macka" value="macka" checked={animal.type==="macka"} type={"radio"} radioGroup="type" onChange={handleChange}></input>
              </div>
              <div>
                <label htmlFor="ostalo">Ostalo</label>
                <input id="type" name="ostalo" value="ostalo" checked={animal.type==="ostalo"} type={"radio"} radioGroup="type" onChange={handleChange}></input>
              </div>
            </div>
            <div>
              <label htmlFor="age">Godine:</label>
              <input value={animal.age} required id="age" type={"number"} onChange={handleChange}></input>
            </div>
            <div>
              <label htmlFor="desc">Opis:</label>
              <input id="desc" value={animal.desc} onChange={handleChange}></input>
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="cip">Čipiran</label>
              <input id="cip" checked={animal.cip} type={"checkbox"} onChange={handleChange}></input>
            </div>
            <div>
              <label htmlFor="appoint">Pregled:</label>
              <input id="appoint" value={animal.appoint} type={"date"} onChange={handleChange}></input>
            </div>
            <div>
              <label htmlFor="adopted">Udomljen:</label>
              <input id="adopted" checked={animal.adopted} type={"checkbox"} onChange={handleChange}></input>
            </div>
          </div>
        </div>
        <button type="submit">Spremi</button>
        <button type="button" onClick={()=>handleDelete(props.animal._id)}>Izbriši</button>
      </form>
    </>
  )
}
export default AnimalEdit