import React, {useEffect} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    //LandingPage에 들어오자마자 useEffect 실행, get 서버로 보냄. then 서버에서 받은 애용 출력.
    useEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response))
    }, [])

    const onClickHandler = () => {
        axios.get(`/api/users/logout`)
        .then(response => {
            if(response.data.success){
                navigate('/login');
            } else {
                alert("로그아웃 실패")
            }
        })
    }

    return(
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <h2>main page</h2>
            <Link to = "/login"> 로그인 </Link>
            <Link to = "/register"> 회원가입 </Link>
            <button onClick={onClickHandler}> 
                로그아웃
            </button>
        </div>
    )
}

export default LandingPage