function Notification(props) {
  return (
    <div className={props.important?"notification-important":"notification"}>
      <div>
        <h3>{props.naslov}</h3>
        {props.important?(<h3>Važno</h3>):(<></>)}
        <h3>{props.datum}</h3>
      </div>
      <div>
        <p>{props.tekst}</p>
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