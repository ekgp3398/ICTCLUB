import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../_action/user_action';
import { useNavigate } from 'react-router-dom';


export default function (SpecificComponent, option, adminRoute = null) {
    
    // option 
    // null => 아무나 출입이 가능한 페이지
    // true => 로그인한 유저만 출입이 가능한 페이지
    // false => 로그인한 유저는 출입이 불가능한 페이지

    function AuthenticationCheck(props) {
        const navigate = useNavigate();
        const dispatch = useDispatch();
        
        useEffect(() => {
            //action 이름을 auth로 지정, user_action, types, user_reducer에 추가
            dispatch(auth()).then(response => { // backend에서 가져온 정보가 response에 들어있음.
                console.log(response)

                //로그인 하지 않은 상태
                if(!response.payload.isAuth) {
                    if(option) {
                        navigate('/login');
                    }
                } else {
                    //로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin){
                        navigate('/');
                    } else {
                        if (option === false){
                            navigate('/');
                        }
                    }
                }
            }) 

        }, [])

        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}
