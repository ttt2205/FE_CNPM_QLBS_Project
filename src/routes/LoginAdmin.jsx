import React from "react";
import "../assets/scss/loginadmin.scss";
import { login } from "../services/authServices";
import { toast } from 'react-toastify';

const LoginAdmin = ({setUser}) => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        //REST API respone
        const response = await login(email, password);
        console.log(response)
        //toast 
        if (response.status === 200) {
            toast.success(response.message);
            setUser(response.username);
            window.localStorage.setItem("email", email);
            window.localStorage.setItem("password", password);
        } else {
            toast.error(response.message);
        }
    }

    return (
        <>  
            <main className="form-signin">
                <form onSubmit={handleSubmit}>
                    <img className="mb-4" src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating mb-2">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="email"/>
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password"/>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                    <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
                </form>
            </main>
        </>
    );
}

export default LoginAdmin;