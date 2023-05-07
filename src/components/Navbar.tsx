import { useNavigate } from "react-router-dom";

function Navbar(){
  const navigate = useNavigate();
  function logOut() {
    localStorage.setItem("userLogged", false);
    console.log();
    navigate("/login");
  }
  return(<nav className="nav-holder">
  <h2>Azil za životinje</h2>

  <ul className="nav-stranice">
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
    <button
      onClick={() => {
        navigate("/dashboard");
      }}
    >
      <li>Admin opcije</li>
    </button>
    <button
      onClick={() => {
        navigate("/add");
      }}
    >
      <li>Dodaj</li>
    </button>
    <button onClick={logOut}>Odjava</button>
  </ul>
</nav>)
}
export default Navbar