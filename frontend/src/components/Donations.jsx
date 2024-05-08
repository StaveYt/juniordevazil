import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Donations() {
  const navigate = useNavigate();
  const [newDonation, setNewDonation] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [donationInfo, setDonationInfo] = useState({
    category: "",
    type: "hrana",
    value: 0,
    desc: "",
  });
  const [donations, setDonations] = useState([]);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (userInfo.role == "admin") {
      setDonationInfo({ ...donationInfo, category: "trazi" });
      setAdmin(true);
    } else {
      setDonationInfo({ ...donationInfo, category: "nudi" });
      setAdmin(false);
    }
    axios
      .get("http://localhost:3000/donation",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setDonations(res.data));
  }, []);

  function addDonation(event) {
    event.preventDefault();
    setNewDonation(false);
    axios.post("http://localhost:3000/donation", donationInfo,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      axios
        .get("http://localhost:3000/donation",{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => setDonations(res.data));
    });
  }
  function handleChange(event) {
    setDonationInfo({ ...donationInfo, [event.target.id]: event.target.value });
  }
  function deleteDonation(id) {
    axios
      .delete(`http://localhost:3000/donation/${id}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((rez) =>
        axios
          .get("http://localhost:3000/donation"),{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
          .then((res) => setDonations(res.data))
      );
  }
  function handleDonated(id) {
    axios
      .patch(`http://localhost:3000/donation/${id}`,{ category: "donirano" },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) =>
        axios
          .get("http://localhost:3000/donation",{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => setDonations(res.data))
      );
  }
  function handleRepeat(id) {
    axios
      .patch(`http://localhost:3000/donation/${id}`, { category: "trazi" })
      .then((res) =>
        axios
          .get("http://localhost:3000/donation",{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => setDonations(res.data))
      );
  }
  function handleAccepted(id) {
    axios
      .patch(`http://localhost:3000/donation/${id}`,{ category: "donirano" },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) =>
        axios
          .get("http://localhost:3000/donation",{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
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
              <label htmlFor="type">Izaberite tip donacije</label>
              <select onChange={handleChange} id="type" required>
                <option>Hrana</option>
                <option>Igračke</option>
                <option>Ostalo</option>
              </select>
              <label htmlFor="value">Unesite vrijednost donacije</label>
              <input
                onChange={handleChange}
                id="value"
                type="number"
                required
              ></input>
              <label htmlFor="desc">Dodajte opis donacije</label>
              <input onChange={handleChange} id="desc" required></input>
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
              donation.category == "trazi" ? (
                <tr key={donation._id}>
                  <td>{donation.type}</td>
                  <td>{donation.value}</td>
                  <td>{donation.desc}</td>
                  <td>
                    {admin ? (
                      <>
                        <button onClick={()=>handleDonated(donation._id)}>Donirano</button>
                        <button onClick={() => deleteDonation(donation._id)}>
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
              donation.category == "nudi" ? (
                <tr key={donation._id}>
                  <td>{donation.type}</td>
                  <td>{donation.value}</td>
                  <td>{donation.desc}</td>
                  <td>
                    {admin ? (
                      <>
                        <button onClick={()=>handleAccepted(donation._id)}>Prihvati</button>
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
              donation.category == "donirano" ? (
                <tr key={donation._id}>
                  <td>{donation.type}</td>
                  <td>{donation.value}</td>
                  <td>{donation.desc}</td>
                  <td>
                    {admin ? (
                      <>
                        <button onClick={()=>handleRepeat(donation._id)}>Ponovi</button>
                        <button onClick={() => deleteDonation(donation._id)}>
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
