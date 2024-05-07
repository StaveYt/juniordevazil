import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar(props) {
  const navigate = useNavigate();
  function logOut() {
    localStorage.setItem("token", null);
    navigate("/login");
  }
  return (
    <nav className="navbar">
      <h2>Azil za životinje</h2>

      <ul className="navbar-controls">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <li>Popis</li>
        </button>
        <button
          onClick={() => {
            navigate("/donations");
          }}
        >
          <li>Donacije</li>
        </button>
        <button
          onClick={() => {
            navigate("/notifications");
          }}
        >
          <li>Obavijesti</li>
        </button>
        {props.admin ? (
          <>
            <button
              onClick={() => {
                navigate("/add");
              }}
            >
              <li>Dodaj</li>
            </button>
          </>
        ) : (
          <></>
        )}
        <button onClick={logOut}>Odjava</button>
      </ul>
    </nav>
  );
}
export default Navbar;
