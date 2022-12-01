import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Edit.css'

const Edit = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [Title, setTitle] = useState("")
    const [Content, setContent] = useState("")

    useEffect(() => {
        axios.get(`/api/boards/board/${params.club}/view/${params.id}`)
        .then(response =>{
            setTitle(response.data.title)
            setContent(response.data.content)
        }
        )
    }, [])

    const onTitleHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const onContentHandler = (event) => {
        setContent(event.currentTarget.value)
    }

    const onEditHandler = (event) => {
        event.preventDefault();
        
        let body = {
            //id: params.id,
            title: Title,
            content: Content,
        }
        console.log(body);
        if(!body.title) { alert("글 제목을 입력해주세요."); }
        else if(!body.content) { alert("글 내용을 입력해주세요."); }
        else {
            axios.put(`/api/boards/board/${params.club}/edit/${params.id}`, body)
            .then(response => {
                console.log(response.data);
                navigate(`/board/${params.club}/view/${params.id}`)
            })
            .catch((e) => console.log('error'));
        }
        
    }
    const onClickHandler = () => {
        navigate(`/board/${params.club}/view/${params.id}`)
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
                            <dd><input types = "text" defaultValue = {Title} onChange = {onTitleHandler}/></dd>
                        </dl>
                    </div>
                    <div className = "cont">
                        <textarea defaultValue = {Content} onChange = {onContentHandler} />
                    </div>
                </div>
            </div>   
            <div className = "bt_wrap">
                <Button variant="outline-dark" onClick={onEditHandler} >수정</Button>
                <Button variant="outline-dark" onClick={onClickHandler} >취소</Button>
            </div>
        </div>
    )
}

export default Edit;