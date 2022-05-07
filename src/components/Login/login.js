import React, {useState} from 'react';
import axios from 'axios';
import { setUserSession } from '../../service/AuthService';
import {BrowserRouter, NavLink, Route, Switch} from "react-router-dom";
import "./login.scss";

const loginUrl = 'https://vj0owxzcge.execute-api.us-east-1.amazonaws.com/prod/login';


const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    const submitHandler = (event) => {
        event.preventDefault();
        if(username.trim() === '' || password.trim() === '')
        {
            setMessage("All fields are required");
            return;
        }
        setMessage(null);

        const requestConfig = {
            headers: {
                'x-api-key': 'T4qVraIt7M5NSlsETvhL8gGpmOCwx8oFhKpfJWc0',
            }
        }

        const requestBody = {
            username : username,
            password: password
        }

        axios.post(loginUrl, requestBody, requestConfig).then(response => {
            setUserSession(response.data.user, response.data.token);
            props.history.push('/');
        }).catch((error)=> {
            if (error.response.status === 401 || error.response.status === 403){
                setMessage(error.response.data.message);
            }
            else{
                setMessage("sorry... server is down!!! please try again later.")
            }
            
        })
      }
    return(
        <div>
            <div className="d-flex justify-content-center my-4">
                <NavLink exact to="/">
                    <img src={`/logo.png`} alt="ebook icons" width="48"/>
                </NavLink>
            </div>
            <form onSubmit={submitHandler}>
                <h5 className="text-center"> Sign In </h5>
                <div className="mt-4">
                    <label htmlFor="username" className="f-label d-inline-block">Username: </label>
                    <input className="d-inline-block mx-2" id="username" type="text" value={username} onChange={event => setUsername(event.target.value)}/>
                </div>
                <div className="mt-3">
                    <label htmlFor="password" className="f-label d-inline-block">Password: </label>
                    <input className="d-inline-block mx-2" type="password" value={password} onChange={event => setPassword(event.target.value)}/>
                </div>
                <div className="mt-5 text-center">
                    <input className="w-75" type="submit" value="Login"/>
                </div>
                
                <div className="mt-2 text-center">
                    <NavLink to="/register">New user? Create account.</NavLink>
                </div>
            </form>
            {message && <p className = "message">{message}</p>}
        </div>
    )
}

export default Login;