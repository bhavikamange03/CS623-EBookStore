import React from 'react'
import {getUser, resetUserSession} from '../service/AuthService';

const premiumContent = (props) => {
    const user = getUser();
    const name = user !== 'undefined' && user ? user.name:'';

    const logoutHandler=() => {
        resetUserSession();
        props.history.push('/login');
    }
    return (
        <div>

            Hello {name}! you have been loggined in!! Welcome
            <input type = "button" value = "Logout" onClick={logoutHandler}/>

        </div>
    )
}

export default premiumContent;