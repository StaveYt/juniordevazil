
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from 'react-router-dom';

import { collection, addDoc, query, where, getDocs } from "firebase/firestore"; 
import {db} from '../firebase.js';

 function Login() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data);
        registerUser(data);
    };

    const registerUser = async (data) => {

        try {
            const isDuplicateUser = await checkForDuplicateUser(data);
            if(!isDuplicateUser) {
                await addUser(data);
                const userInfo = JSON.stringify(data);
    
                localStorage.setItem("userLogged", true);
                localStorage.setItem("userInfo", userInfo);
                navigate('/');
            } else {
                console.error("Korisnički email je već zauzet.")
            }
        } catch (error) {
            console.error(error);
        }
    }

    const checkForDuplicateUser = async (data) => {
        console.log(data.userEmail);
        const q = query(collection(db, "Users"), where("userEmail", "==", data.userEmail));

        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.empty);
        if(querySnapshot.empty) {
            return false; // user does not exist
        } else {
            return true; // user exists
        }
    }

     const addUser = (data) => {
        addDoc(collection(db, "Users"), data);          
    }


    return (
    <div className="container">
        <nav className="nav-holder-login">
            <h2>Azil za životinje</h2>
        </nav>
    
        <h4>Registriraj se</h4>
        <div className="form-holder">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="userEmail">Vaše ime</label> <br />
                <input className="inputEmail" type="text" name="userName" {...register("userName", { required: true})} /> <br />
                <label htmlFor="userDob">Vaša dob</label> <br />
                <input className="inputEmail" type="date" name="userDob" {...register("userDob", { required: true})} /> <br />
                <label htmlFor="userEmail">Vaš kontakt email</label> <br />
                <input className="inputEmail" type="email" name="userEmail" {...register("userEmail", { required: true})} /> <br />
                <label htmlFor="">Vaša lozinka</label> <br />
                <input className="inputEmail" type="password" {...register("userPassword", { required: true})} /> <br />

                <label htmlFor="userType">Odaberi tip korisnika: /samo za demo/</label> <br />
                <select name="userType" id="userType"{...register("userType")}>
                    <option value="user">Korisnik</option>
                    <option value="admin">Administrator</option>
                </select> <br /> <br />
                <button type="sub   mit">Registriraj se</button> <br /> <br />
                
                <button onClick={() => {navigate('/login')}}>Imaš račun? Ulogiraj se!</button>
            </form>
        </div>
    </div>
    );
}

export default Login