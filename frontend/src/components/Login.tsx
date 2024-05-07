import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from 'react-router-dom';

import { collection, query, where, getDocs } from "firebase/firestore"; 
import {db} from '../firebase.js';

function Login() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const onSubmit = (data) => {
        console.log(data);
        checkUser(data);
    }

    const checkUser = async (data) => {
        const q = query(collection(db, "Users"), where("userEmail", "==", data.userEmail), where("userPassword", "==", data.userPassword));

        const querySnapshot = await getDocs(q);
        if(querySnapshot.empty) {
            console.error("Upisane informacije nisu validne.");
        } else {
            const userInfo = JSON.stringify(querySnapshot.docs[0].data());

            localStorage.setItem("userLogged", true);
            localStorage.setItem("userInfo", userInfo);

            navigate("/");
        }
    }
    return (
    <div className="container">
        <nav className="nav-holder-login">
            <h2>Azil za životinje</h2>
        </nav>
    
        <h4>Ulogiraj se</h4>
        <div className="form-holder">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="userEmail">Vaš kontakt email</label> <br />
                <input className="inputEmail" type="email" name="userEmail" required {...register("userEmail")} /> <br />
                <label htmlFor="">Vaša lozinka</label> <br />
                <input className="inputEmail" {...register("userPassword")} required/> <br />
                <button type="submit">Ulogiraj se</button> <br /> <br />
                
                <button onClick={() => {navigate('/register')}}>Nemaš račun? Napravi ga!</button>
            </form>
        </div>
    </div>
    );
}

export default Login