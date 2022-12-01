import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { commentPost } from '../../../_action/user_action';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { auth } from "../../../_action/user_action";
import Comments from "./Comments";
import "./View.css";

const View = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();

  const [value, setValue] = useState("");

  const [Title, setTitle] = useState("");
  const [Writer, setWriter] = useState("");
  const [WriteDate, setWriteDate] = useState("");
  const [Content, setContent] = useState("");

  const [Club, setClub] = useState("");
  const [Id, setId] = useState("");
  const [CommentContents, setCommentContents] = useState("");
  const [CommentWriterId, setCommentWriterId] = useState("");
  const [CommentWriterName, setCommentWriterName] = useState("");

  const onClickHandler = () => {
    navigate(`/board/${params.club}`);
  };

  const onEditHandler = () => {
    navigate(`/board/${params.club}/edit/${params.id}`);
  };

  const onDeleteHandler = () => {
    axios
      .delete(`/api/boards/board/${params.club}/delete/${params.id}`, params.id)
      .then(navigate(`/board/${params.club}`));
  };

  const onCommentHandler = (event) => {
    setCommentContents(event.currentTarget.value);
    console.log(event.currentTarget.value);
  };

  const CommentSubmit = (event) => {
    event.preventDefault();

    let body = {
      post_id: params.id,
      writer_id: CommentWriterId,
      writer_name: CommentWriterName,
      contents: CommentContents,
    };

    if (!body.contents) {
      alert("글 내용을 입력해주세요.");
    } else {
      dispatch(commentPost(body)).then((response) => {
        if (response.payload.postSuccess) {
          window.location.reload();
        } else {
          alert("작성 실패");
        }
      });
    }
  };

  useEffect(() => {
    axios
      .get(`/api/boards/board/${params.club}/view/${params.id}`)
      .then((response) => {
        setTitle(response.data.title);
        setWriter(response.data.writer);
        setWriteDate(response.data.writeDate);
        setContent(response.data.content);
      });

    dispatch(auth()).then((response) => {
      setValue(response.payload.name);
      setCommentWriterId(response.payload._id);
      setCommentWriterName(response.payload.name);
    });
    console.log(params.id, params.club);
    setClub(params.club);
    setId(params.id);
  }, []);

  return (
    <div className="board_wrap">
      <div className="board_title">
        <strong>{params.club}</strong>
        <p>소프트웨어 동아리 {params.club} 커뮤니티</p>
      </div>
      <div className="board_view_wrap">
        <div className="board_view">
          <div className="title">{Title}</div>
          <div className="info">
            <dl>
              <dt>글쓴이</dt>
              <dd>{Writer}</dd>
            </dl>
            <dl>
              <dt>작성일</dt>
              <dd>{WriteDate.substring(0, 10)}</dd>
            </dl>
          </div>
          <div className="cont">{Content}</div>
        </div>
      </div>
      <div className="comment_container">
        <strong>COMMENTS</strong>
        <div className="comment_list">
          <Comments />
        </div>
        <div className="comment_wrapper">
          <div className="comment_content">
            <textarea
              placeholder="내용을 입력하세요."
              onChange={onCommentHandler}
            />
          </div>
          <div className="comment_btn">
            <Button
              type="submit"
              variant="outline_dark"
              onClick={CommentSubmit}
            >
              <img
                className="submit_img"
                src="https://cdn-icons-png.flaticon.com/512/786/786205.png"
              />
            </Button>
          </div>
        </div>
      </div>
      <div className="view_btn_wrap">
        <div className="bt_wrap">
          {!(value === Writer) ? (
            <>
              <Button variant="outline-dark" onClick={onClickHandler}>
                목록
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline-dark" onClick={onClickHandler}>
                목록
              </Button>
              <Button variant="outline-dark" onClick={onEditHandler}>
                수정
              </Button>
              <Button variant="outline-dark" onClick={onDeleteHandler}>
                삭제
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default View;
