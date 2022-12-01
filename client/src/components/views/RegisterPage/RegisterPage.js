import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { registerUser} from '../../../_action/user_action';
import { useNavigate } from 'react-router-dom';
import Auth from "../../../hoc/auth"

const RegisterPage = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if(Password !== ConfirmPassword) {
            return alert('비밀번호가 같지 않습니다.')
        }

        //작성된 Email, Name, Password 제출
        let body = {
            email: Email,
            name: Name,
            password: Password
        }

        dispatch(registerUser(body))
        .then(response => {
            console.log(response.payload)
            if(response.payload.emailSuccess) {
                if(response.payload.success){
                    navigate('/login');
                } else {
                    alert('Failed to sign up')
                }
            }
            else {
                alert('이미 가입된 이메일입니다.');
            }
            
        })
    }
    return(
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '150px'}} >
            <form style={{ display: 'flex', flexDirection: 'column'}}
                onSubmit = {onSubmitHandler}
            >
                <h2>Sign Up</h2>
                <label>Email</label>
                <input type = "email" value={Email} onChange={onEmailHandler}/>

                <label>Name</label>
                <input type = "text" value={Name} onChange ={onNameHandler}/>

                <label>Password</label>
                <input type = "password" value={Password} onChange={onPasswordHandler}/>

                <label>Confirm Password</label>
                <input type = "password" value={ConfirmPassword} onChange ={onConfirmPasswordHandler}/>
                <br />
                <button type="submit">
                    회원가입
                </button>
            </form>
        </div>
    )
}

export default Auth(RegisterPage, false)