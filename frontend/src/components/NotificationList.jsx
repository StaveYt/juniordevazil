import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";
import Navbar from "./Navbar";

function NotificationList() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(false);
  const [notificationInfo, setNotificationInfo] = useState({
    title: "",
    date: "2023-04-17",
    text: "",
    important: false
  })

  const [notifications, setNotifications]=useState([])
  const [newNotification, setNewNotification] = useState(false)

  useEffect(()=>{
    axios.get("http://localhost:3000/notification",{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(res=>setNotifications(res.data))
    axios.get("http://localhost:3000/user",{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(res=>{
      if(res.data.role == "admin") {setUserRole(true)}
      else {setUserRole(false)}
    })
  },[])

  function addNotification(event){
    event.preventDefault()
    setNewNotification(false)
    axios.post("http://localhost:3000/notification", notificationInfo,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((rez) => {
      axios
        .get("http://localhost:3000/notification",{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((rez) => setNotifications(rez.data));
    });
  }
  function handleChange(event){
    setNotificationInfo({ ...notificationInfo, [event.target.id]: event.target.value });
  }
  function handleDelete(id){
    axios
      .delete(`http://localhost:3000/notification/${id}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((rez) =>
        axios
          .get("http://localhost:3000/notification",{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => setNotifications(res.data))
      );
  }

  return (
    <div>
      <Navbar admin={userRole}/>
      <div className="container">
        {userRole?(
        <button onClick={()=>setNewNotification(true)}>Nova Obavijest</button>
        ):(<></>)}
        {newNotification?
          (<form onSubmit={addNotification}>
            <label htmlFor="title">Naslov:</label>
            <input id="title" onChange={handleChange}></input>
            <label htmlFor="text">Tekst:</label>
            <input id="text" onChange={handleChange}></input>
            <label htmlFor="important">Važno</label>
            <input id="important" type="checkbox" onChange={handleChange}></input>
            <button>Spremi</button>
          </form>):(<></>)
        }
        <h1>Obavijesti:</h1>
        <div className="container">
          {
            notifications.map((notification)=>(
              <Notification admin={userRole} id={notification._id} important={notification.important} title={notification.title} delete={()=>handleDelete(notification._id)} text={notification.text} date={notification.date}/>
            ))
          }
        </div>
      </div>
    </div>
  );
}
export default NotificationList;
