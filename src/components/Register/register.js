import React, {useState} from 'react';
import axios from 'axios';
import { NavLink} from "react-router-dom";
import { setUserSession } from '../../service/AuthService';

const registerUrl = 'https://vj0owxzcge.execute-api.us-east-1.amazonaws.com/prod/register';

const Register = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        if(username.trim() === '' || email.trim() === '' || password.trim() === ''|| name.trim() === '')
        {
            setMessage("All fields are required");
            return;
        }
        setMessage(null);
        const requestConfig = {
            headers: {
                'x-api-key': 'T4qVraIt7M5NSlsETvhL8gGpmOCwx8oFhKpfJWc0',
                // 'Access-Control-Allow-Origin': "*",
            }
        }

        const requestBody = {
            username : username,
            email: email,
            name: name,
            password: password,
            "role" : "user"
        }

        axios.post(registerUrl, requestBody, requestConfig).then(response => {
            setUserSession(response.data.user, response.data.token);
            props.history.push('/');
        }).catch(error =>{
            if(error.response.status === 401){
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
                <h5 className="text-center"> Create new account </h5>

                <div className="mt-4">
                    <label htmlFor="name" className="f-label d-inline-block">Name: </label>
                    <input className="d-inline-block mx-2" id="name" type="text" value={name} onChange={event => setName(event.target.value)}/>
                </div>
                <div className="mt-3">
                    <label htmlFor="email" className="f-label d-inline-block">Email: </label>
                    <input className="d-inline-block mx-2" id="email" type="text" value={email} onChange={event => setEmail(event.target.value)}/>
                </div>
                <div className="mt-3">
                    <label htmlFor="username" className="f-label d-inline-block">username: </label>
                    <input className="d-inline-block mx-2" id="username" type="text" value={username} onChange={event => setUsername(event.target.value)}/>
                </div>
                <div className="mt-3">
                    <label htmlFor="password" className="f-label d-inline-block">password: </label>
                    <input className="d-inline-block mx-2" type="password" value={password} onChange={event => setPassword(event.target.value)}/>
                </div>
                <div className="mt-5 text-center">
                    <input className="w-75" type="submit" value="Create account"/>
                </div>
                <div className="mt-2 text-center">
                    <NavLink to="/login">Already have a account? Sign In</NavLink>
                </div>
                
            </form>
            {message && <p className = "message">{message}</p>}
        </div>
    )
}

export default Register;