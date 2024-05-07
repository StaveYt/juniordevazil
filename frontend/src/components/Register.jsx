import axios from "axios"
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from 'react-router-dom';

function Login() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    function onSubmit(data){
        axios.post("http://localhost:3000/user/register", data).then(res=>{
            localStorage.setItem("token", `${res.data.token}`)
        })
        navigate("/")
    };

    return (
    <div className="container">
        <nav className="nav-holder-login">
            <h2>Azil za životinje</h2>
        </nav>
    
        <h4>Registriraj se</h4>
        <div className="form-holder">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="username">Vaše ime</label> <br />
                <input className="inputEmail" type="text" name="username" {...register("username", { required: true})} /> <br />
                <label htmlFor="dob">Vaš datum rodenja</label> <br />
                <input className="inputEmail" type="date" name="dob" {...register("dob", { required: true})} /> <br />
                <label htmlFor="email">Vaš kontakt email</label> <br />
                <input className="inputEmail" type="email" name="email" {...register("email", { required: true})} /> <br />
                <label htmlFor="password">Vaša lozinka</label> <br />
                <input className="inputEmail" type="password" name="password" {...register("password", { required: true})} /> <br />

                <label htmlFor="role">Odaberi tip korisnika: /samo za demo/</label> <br />
                <select name="role" id="role"{...register("role")}>
                    <option value="user">Korisnik</option>
                    <option value="admin">Administrator</option>
                </select> <br /> <br />
                <button type="submit">Registriraj se</button> <br /> <br />
                
                <button onClick={() => {navigate('/login')}}>Imaš račun? Ulogiraj se!</button>
            </form>
        </div>
    </div>
    );
}

export default Login