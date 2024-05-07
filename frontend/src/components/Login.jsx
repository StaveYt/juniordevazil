import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";
import { collection, query, where, getDocs } from "firebase/firestore"; 
import {db} from '../firebase.js';

function Login() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const onSubmit = (data) => {
        axios.post("http://localhost:3000/user/login", data).then(res=>{
            localStorage.setItem("token", `${res.data.token}`)
            navigate("/")
        })
        
    }

    return (
    <div className="container">
        <nav className="nav-holder-login">
            <h2>Azil za životinje</h2>
        </nav>
    
        <h4>Ulogiraj se</h4>
        <div className="form-holder">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Vaš kontakt email</label> <br />
                <input className="inputEmail" type="email" name="email" required {...register("email")} /> <br />
                <label htmlFor="">Vaša lozinka</label> <br />
                <input type="password" className="inputEmail" {...register("password")} required/> <br />
                <button type="submit">Ulogiraj se</button> <br /> <br />
                
                <button onClick={() => {navigate('/register')}}>Nemaš račun? Napravi ga!</button>
            </form>
        </div>
    </div>
    );
}

export default Login