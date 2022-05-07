import React, {useState} from 'react';
import axios from 'axios';

const registerUrl = 'https://vj0owxzcge.execute-api.us-east-1.amazonaws.com/prod/register';

const Register = () => {
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
            setMessage('Registration Successful!')
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
            <form onSubmit={submitHandler}>
                <h5> Register </h5>
                name: <input type="text" value={name} onChange={event => setName(event.target.value)}/>
                email: <input type="text" value={email} onChange={event => setEmail(event.target.value)}/>
                username: <input type="text" value={username} onChange={event => setUsername(event.target.value)}/>
                password: <input type="password" value={password} onChange={event => setPassword(event.target.value)}/>
                <input type="submit" value="Register"/>
            </form>
            {message && <p className = "message">{message}</p>}
        </div>
    )
}

export default Register;