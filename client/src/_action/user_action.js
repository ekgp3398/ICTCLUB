import axios from "axios";
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    NOTICE_POST,
    SCHOOL_POST,
    COMMENT_POST
} from './types'
export function loginUser(dataTosubmit) {

    const request = axios.post('/api/users/login', dataTosubmit)
        .then(response => response.data ) //서버에서 받은 data를 request에 저장

    return {
        //request를 reducer에 넘겨주는 작업
        type: LOGIN_USER,
        payload: request
    }
}
export function registerUser(dataTosubmit) {

    const request = axios.post('/api/users/register', dataTosubmit)
        .then(response => response.data ) //서버에서 받은 data를 request에 저장

    return {
        //request를 reducer에 넘겨주는 작업
        type: REGISTER_USER,
        payload: request
    }
}

export function auth() {
    
    const request = axios.get('/api/users/auth')
        .then(response => response.data ) //서버에서 받은 data를 request에 저장

    return {
        //request를 reducer에 넘겨주는 작업
        type: AUTH_USER,
        payload: request
    }
}

export function noticePost(dataTosubmit) {
    const request = axios.post(`/api/boards/board/:club/post`, dataTosubmit)
        .then(response => response.data ) //서버에서 받은 data를 request에 저장

    return {
        //request를 reducer에 넘겨주는 작업
        type: NOTICE_POST,
        payload: request
    }
}

export function commentPost(dataTosubmit) {
    const request = axios.post(`/api/boards/board/:club/view/:id/comment`, dataTosubmit)
        .then(response => response.data ) //서버에서 받은 data를 request에 저장
    return {
        //request를 reducer에 넘겨주는 작업
        type: COMMENT_POST,
        payload: request
    }
}

// export function schoolPost(dataTosubmit) {

//     const request = axios.post('/api/boards/school', dataTosubmit)
//         .then(response => response.data ) //서버에서 받은 data를 request에 저장

//     return {
//         //request를 reducer에 넘겨주는 작업
//         type: SCHOOL_POST,
//         payload: request
//     }
// }