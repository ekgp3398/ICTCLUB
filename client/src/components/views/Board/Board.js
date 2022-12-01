import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import Pagination from "./Pagination";
import "./Board.css";

const Board = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  

  useEffect(() => {
    axios.get(`/api/boards/board/${params.club}`).then((response) => {
      let copy = [...posts, ...response.data.posts];
      setPosts(copy);
    });
  }, []);

  const onClickHandler = () => {
    navigate(`/board/${params.club}/post`);
}

  return (
    <div className="board_wrap">
      <div className="board_title">
        <strong>{params.club}</strong>
        <p>소프트웨어 동아리 {params.club} 커뮤니티</p>
      </div>
      <div className="board_list_wrap">
        <div className="board_list">
          <Table>
            <thead>
              <tr>
                <th className="num">번호</th>
                <th className="title">제목</th>
                <th className="writer">글쓴이</th>
                <th className="date">작성일</th>
              </tr>
            </thead>
            <tbody>
              {posts.slice(offset, offset + limit).map((item, index) => (
                <tr key={index}>
                  <td className="num">{posts.length - index - offset}</td>
                  <td className="title">
                    <NavLink to={`/board/${params.club}/view/${item._id}`}>
                      {item.title}
                    </NavLink>
                  </td>
                  <td className="writer">{item.writer}</td>
                  <td className="date">{item.writeDate.substring(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <div className="board_page">
        <Pagination
          total={posts.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </div>
      <div className="bt_wrap">
        <Button variant="outline-dark" onClick = {onClickHandler}>
          작성
        </Button>
      </div>
    </div>
  );
};

export default Board;
