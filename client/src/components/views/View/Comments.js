import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { auth } from "../../../_action/user_action";
import axios from "axios";
import "./Comments.css";

const Comments = () => {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    axios
      .get(`/api/boards/board/${params.club}/view/${params.id}/comment`)
      .then((response) => {
        console.log(response.data);
        let copy = [...posts, ...response.data];
        setPosts(copy);
      });

    dispatch(auth()).then((response) => {
      setValue(response.payload.name);
    });
  }, []);

  const onDeleteHandler = (_id) => {
    console.log("삭제하려는 댓글의 _id: ", _id);
    axios
      .delete(
        `/api/boards/board/${params.club}/delete/${params.id}/comment/${_id}`,
        _id
      )
      .then(window.location.reload());
  };

  return (
    <div className="comment_list_container">
      {posts.map((item, index) => (
        <ul key={index}>
          <div className="comment_list_top">
            <li className="comment_writer_name">{item.writer_name}</li>
            <li className="comment_writeDate">{item.writeDate.substring(0, 10) +" " + item.writeDate.substring(11, 16)}</li>
            <li>
              {item.writer_name === value ? (
                <Button
                  type="button"
                  variant="outline_dark"
                  className="comment_delete"
                  onClick={() => {
                    onDeleteHandler(item._id);
                  }}
                >
                  <img
                    style={{ width: "15px", display: "block" }}
                    className="delete_img"
                    src="https://cdn-icons-png.flaticon.com/512/657/657059.png"
                  />
                </Button>
              ) : (
                <Button variant="outline_dark" className="comment_delete">
                  <img
                    style={{ width: "15px", display: "none" }}
                    className="delete_img"
                    src="https://cdn-icons-png.flaticon.com/512/657/657059.png"
                  />
                </Button>
              )}
            </li>
          </div>
          <div className="comment_list_content">
            <li>{item.contents}</li>
          </div>
        </ul>
      ))}
    </div>
  );
};

export default Comments;
