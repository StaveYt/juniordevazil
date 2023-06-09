import { useState } from "react";

function Filter(props) {
  const [selAdopted, setSelAdopted] = useState("svi");
  const [selType, setSelType] = useState("svi");
 function handleFilterType(event) {
     setSelType(event.target.value);
    handleFilter(event.target.value, selAdopted);
  }
 function handleFilterAdopt(event) {
     setSelAdopted(event.target.value);
    handleFilter(selType, event.target.value);
  }
 function handleFilter(type, adopted) {
    props.setShownAnimals(
      props.animals.filter((animal) => {
        if (animal.vrsta == type || type == "svi") {
          if (
            adopted == "svi" ||
            (adopted == "udomljen" && animal.udomljen) ||
            (adopted == "nijeUdomljen" && !animal.udomljen)
          ) {
            return true;
          }
        } else {
          return false;
        }
      })
    );
  }
  return (
    <div className="filter">
      <h3>Filter:</h3>
      <div>
        <input
          onChange={handleFilterAdopt}
          id="svi"
          checked={selAdopted == "svi"}
          value={"svi"}
          type="radio"
          radioGroup="filter"
        ></input>
        <label htmlFor="svi">Svi</label>
      </div>
      <div>
        <input
          onChange={handleFilterAdopt}
          id="udomljen"
          value="udomljen"
          checked={selAdopted == "udomljen"}
          type="radio"
          radioGroup="filter"
        ></input>
        <label htmlFor="udomljen">Udomljen</label>
      </div>
      <div>
        <input
          onChange={handleFilterAdopt}
          id="nijeUdomljen"
          value="nijeUdomljen"
          checked={selAdopted == "nijeUdomljen"}
          type="radio"
          radioGroup="filter"
        ></input>
        <label htmlFor="nijeUdomljen">Nije udomljen</label>
      </div>
      <h3>Vrsta:</h3>
      <div>
        <input
          onChange={handleFilterType}
          id="sve"
          type="radio"
          value="svi"
          checked={selType == "svi"}
          radioGroup="type"
        ></input>
        <label htmlFor="sve">Sve</label>
      </div>
      <div>
        <input
          onChange={handleFilterType}
          id="macka"
          value="mačka"
          type="radio"
          checked={selType == "mačka"}
          radioGroup="type"
        ></input>
        <label htmlFor="macka">Mačka</label>
      </div>
      <div>
        <input
          onChange={handleFilterType}
          id="pas"
          value="pas"
          type="radio"
          checked={selType == "pas"}
          radioGroup="type"
        ></input>
        <label htmlFor="pas">Pas</label>
      </div>
    </div>
  );
}
export default Filter;
