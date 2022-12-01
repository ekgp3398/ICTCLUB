import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { loginUser } from 'C:/Users/dahye/Study/Project/ICTCLUB/client/src/_action/user_action.js';
import Auth from "../../../hoc/auth"

const LoginPage = (props) => {  
    const dispatch = useDispatch();
    
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        //작성된 Email, Password 제출
        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
        .then(response => {
            if(response.payload.loginSuccess){
                window.location.replace('/');
            } else {
                alert('Error')
            }
        })
    }

    return(
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '150px'}} >
            <form style={{ display: 'flex', flexDirection: 'column'}}
                onSubmit = {onSubmitHandler}
            >
                <h2>LOGIN</h2>
                <label>Email</label>
                <input type = "email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type = "password" value={Password} onChange ={onPasswordHandler}/>
                <br />
                <button type="submit">
                    Login
                </button>
                <p>Not a member? <a href="register">Register</a></p>
            </form>
        </div>
    )
}

export default Auth(LoginPage, false)