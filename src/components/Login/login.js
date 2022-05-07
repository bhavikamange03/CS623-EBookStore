import React, {useState} from 'react';
import axios from 'axios';
import { setUserSession } from '../../service/AuthService';

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
            props.history.push('/premium-content')
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
            <form onSubmit={submitHandler}>
                <h5> Login </h5>
                username: <input type="text" value={username} onChange={event => setUsername(event.target.value)}/>
                password: <input type="password" value={password} onChange={event => setPassword(event.target.value)}/>
                <input type="submit" value="Login"/>
            </form>
            {message && <p className = "message">{message}</p>}
        </div>
    )
}

export default Login;