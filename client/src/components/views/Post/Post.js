import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'
import { noticePost } from '../../../_action/user_action';
import { useNavigate, useParams } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import './Post.css'
import Auth from "../../../hoc/auth"
import { auth } from '../../../_action/user_action';



const Post = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [Title, setTitle] = useState("")
    const [Content, setContent] = useState("")
    const [Writer, setWriter] = useState("")
    const [NoticeToken, setNoticeToken] = useState("")

    const onTitleHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const onContentHandler = (event) => {
        setContent(event.currentTarget.value)
        dispatch(auth()).
        then(response => {
            setWriter(response.payload.name);
        })
        setNoticeToken(Math.random().toString(36).substr(2,11));
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log(params.club);
        let body = {
            club: params.club,
            writer: Writer,
            title: Title,
            content: Content,
            noticeToken: NoticeToken
        }
        
        if(!body.title) { alert("글 제목을 입력해주세요."); }
        else if(!body.content) { alert("글 내용을 입력해주세요."); }
        else {
            dispatch(noticePost(body))
            .then(response => {
            console.log(response.payload)
            if(response.payload.postSuccess) {
                console.log(body);
                navigate(`/board/${params.club}`);
            }
            else {
                alert('작성 실패');
            }
        })
        }
    }

    const onClickCancel = () => {
        navigate(`/board/${params.club}`);
    }

    return (
        <div className = "board_wrap">
            <div className = "board_title">
                <strong>{params.club}</strong>
                <p>소프트웨어 동아리 {params.club} 커뮤니티</p>
            </div>
            <div className = "board_write_wrap">
                <div className = "board_write">
                    <div className = "title">
                        <dl>
                            <dt>제목</dt>
                            <dd><input types = "text" placeholder='제목 입력' onChange = {onTitleHandler}/></dd>
                        </dl>
                    </div>
                    <div className = "cont">
                        <textarea placeholder='내용 입력' onChange = {onContentHandler}></textarea>
                    </div>
                </div>
            </div>   
            <div className = "bt_wrap">
                <Button variant="outline-dark" onClick={onSubmitHandler} >등록</Button>
                <Button variant="outline-dark" onClick={onClickCancel} >취소</Button>
            </div>
        </div>
    )
}

export default Auth(Post, true);