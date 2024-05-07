import axios from "axios";
function Notification(props) {

  return (
    <div className={props.important == "on"?"notification-important":"notification"}>
      <div>
        <h3>{props.title}</h3>
        {props.important=="on"?(<h3>Važno</h3>):(<></>)}
        <h3>{props.date}</h3>
      </div>
      <div>
        <p>{props.text}</p>
      </div>
      {props.admin ? (
        <button onClick={props.delete}>Izbriši</button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Notification