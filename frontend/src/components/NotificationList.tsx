import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";
import Navbar from "./Navbar";

function NotificationList() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [notificationInfo, setNotificationInfo] = useState({
    naslov: "",
    datum: "2023-04-17",
    tekst: "",
    vazno: false
  })
  const checkAdmin = () => {
    if (userInfo.userType == "admin") {
      return true;
    } else {
      return false;
    }
  };
  const [notifications, setNotifications]=useState([])
  const [newNotification, setNewNotification] = useState(false)

  useEffect(()=>{
    axios.get("http://localhost:3001/obavijesti").then(res=>setNotifications(res.data))
  },[])

  function addNotification(event){
    event.preventDefault()
    setNewNotification(false)
    axios.post("http://localhost:3001/obavijesti", notificationInfo).then((rez) => {
      axios
        .get("http://localhost:3001/obavijesti")
        .then((rez) => setNotifications(rez.data));
    });
  }
  function handleChange(event){
    setNotificationInfo({ ...notificationInfo, [event.target.id]: event.target.value });
  }
  function handleDelete(id){
    axios
      .delete(`http://localhost:3001/obavijesti/${id}`)
      .then((rez) =>
        axios
          .get("http://localhost:3001/obavijesti")
          .then((res) => setNotifications(res.data))
      );
  }

  return (
    <div>
      <Navbar admin={checkAdmin}/>
      <div className="container">
        {checkAdmin()?(
        <button onClick={()=>setNewNotification(true)}>Nova Obavijest</button>
        ):(<></>)}
        {newNotification?
          (<form onSubmit={addNotification}>
            <label htmlFor="naslov">Naslov:</label>
            <input id="naslov" onChange={handleChange}></input>
            <label htmlFor="tekst">Tekst:</label>
            <input id="tekst" onChange={handleChange}></input>
            <label htmlFor="vazno">Važno</label>
            <input id="vazno" type="checkbox" onChange={handleChange}></input>
            <button>Spremi</button>
          </form>):(<></>)
        }
        <h1>Obavijesti:</h1>
        <div className="container">
          {
            notifications.map((notification)=>(
              <Notification admin={checkAdmin} important={notification.vazno} naslov={notification.naslov} delete={()=>handleDelete(notification.id)} tekst={notification.tekst} datum={notification.datum}/>
            ))
          }
        </div>
      </div>
    </div>
  );
}
export default NotificationList;
