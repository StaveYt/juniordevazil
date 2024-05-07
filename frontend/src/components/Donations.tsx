import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Donations(props) {
  const navigate = useNavigate();
  const [newDonation, setNewDonation] = useState(false);
  const [category, setCategory] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [donationInfo, setDonationInfo] = useState({
    kategorija: "",
    tip: "",
    vrijednost: 0,
    opis: "",
  });
  const [donations, setDonations] = useState([]);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (userInfo.userType == "admin") {
      setDonationInfo({ ...donationInfo, kategorija: "trazi" });
      setAdmin(true);
    } else {
      setDonationInfo({ ...donationInfo, kategorija: "nudi" });
      setAdmin(false);
    }
    axios
      .get("http://localhost:3001/donacije")
      .then((res) => setDonations(res.data));
  }, []);

  function addDonation(event) {
    event.preventDefault();
    setNewDonation(false);
    axios.post("http://localhost:3001/donacije", donationInfo).then((rez) => {
      axios
        .get("http://localhost:3001/donacije")
        .then((rez) => setDonations(rez.data));
    });
  }
  function handleChange(event) {
    setDonationInfo({ ...donationInfo, [event.target.id]: event.target.value });
  }
  function deleteDonation(id) {
    axios
      .delete(`http://localhost:3001/donacije/${id}`)
      .then((rez) =>
        axios
          .get("http://localhost:3001/donacije")
          .then((res) => setDonations(res.data))
      );
  }
  function handleDonated(id) {
    axios
      .patch(`http://localhost:3001/donacije/${id}`, { kategorija: "donirano" })
      .then((res) =>
        axios
          .get("http://localhost:3001/donacije")
          .then((res) => setDonations(res.data))
      );
  }
  function handleRepeat(id) {
    axios
      .patch(`http://localhost:3001/donacije/${id}`, { kategorija: "trazi" })
      .then((res) =>
        axios
          .get("http://localhost:3001/donacije")
          .then((res) => setDonations(res.data))
      );
  }
  function handleAccepted(id) {
    axios
      .patch(`http://localhost:3001/donacije/${id}`, { kategorija: "donirano" })
      .then((res) =>
        axios
          .get("http://localhost:3001/donacije")
          .then((res) => setDonations(res.data))
      );
  }

  return (
    <div>
      <Navbar admin={admin}/>
      <div className="container">
        <button onClick={() => setNewDonation(true)}>Nova Donacija</button>
        {newDonation ? (
          <div>
            <form onSubmit={addDonation}>
              <label htmlFor="tip">Izaberite tip donacije</label>
              <select onChange={handleChange} id="tip" required>
                <option>Hrana</option>
                <option>Igračke</option>
                <option>Ostalo</option>
              </select>
              <label htmlFor="vrijednost">Izaberite vrijednost donacije</label>
              <input
                onChange={handleChange}
                id="vrijednost"
                type="number"
                required
              ></input>
              <label htmlFor="opis">Dodajte opis donacije</label>
              <input onChange={handleChange} id="opis" required></input>
              <button>{admin ? "Dodaj Traženo" : "Dodaj Donaciju"}</button>
            </form>
          </div>
        ) : (
          <></>
        )}
        <h1>Traži se</h1>
        <table>
          <thead>
            <th>Tip</th>
            <th>Vrijednost</th>
            <th>Opis</th>
            <th></th>
          </thead>
          <tbody>
            {donations.map((donation) =>
              donation.kategorija == "trazi" ? (
                <tr key={donation.id}>
                  <td>{donation.tip}</td>
                  <td>{donation.vrijednost}</td>
                  <td>{donation.opis}</td>
                  <td>
                    {admin ? (
                      <>
                        <button onClick={()=>handleDonated(donation.id)}>Donirano</button>
                        <button onClick={() => deleteDonation(donation.id)}>
                          Izbriši
                        </button>
                      </>
                    ) : (
                      <button onClick={handleDonated}>Doniraj</button>
                    )}
                  </td>
                </tr>
              ) : (
                <></>
              )
            )}
          </tbody>
        </table>
        <h1>Nudi se</h1>
        <table>
          <thead>
            <th>Tip</th>
            <th>Vrijednost</th>
            <th>Opis</th>
            <th></th>
          </thead>
          <tbody>
            {donations.map((donation) =>
              donation.kategorija == "nudi" ? (
                <tr key={donation.id}>
                  <td>{donation.tip}</td>
                  <td>{donation.vrijednost}</td>
                  <td>{donation.opis}</td>
                  <td>
                    {admin ? (
                      <>
                        <button onClick={()=>handleAccepted(donation.id)}>Prihvati</button>
                      </>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              ) : (
                <></>
              )
            )}
          </tbody>
        </table>
        <h1>Donirano</h1>
        <table>
          <thead>
            <th>Tip</th>
            <th>Vrijednost</th>
            <th>Opis</th>
            <th></th>
          </thead>
          <tbody>
            {donations.map((donation) =>
              donation.kategorija == "donirano" ? (
                <tr key={donation.id}>
                  <td>{donation.tip}</td>
                  <td>{donation.vrijednost}</td>
                  <td>{donation.opis}</td>
                  <td>
                    {admin ? (
                      <>
                        <button onClick={()=>handleRepeat(donation.id)}>Ponovi</button>
                        <button onClick={() => deleteDonation(donation.id)}>
                          Izbriši
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              ) : (
                <></>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Donations;
