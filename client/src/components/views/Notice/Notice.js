import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import Pagination from "../Board/Pagination";
import Loader from "../Loader/Loader";
import NoticeApi from '../../api/Notice.json';
import "./Notice.css";

const Notice = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  // useEffect(() => {
  //   setLoading(true);
  //   axios.get(`/api/boards/notice`).then((response) => {
  //     console.log(response.data);
  //     let copy = [...posts, ...response.data.posts];
  //     setPosts(copy);
  //     setLoading(false);
  //   });
  // }, []);

  return (
    <>
      {loading ? (
        <Loader type="spin"/>
      ) : (
        <div>
          <div className="board_wrap">
            <div className="board_title">
              <strong>공지사항</strong>
              <p>ICT융합공학부 공지사항</p>
            </div>
            <div className="board_list_wrap">
              <div className="board_list">
                <Table>
                  <thead>
                    <tr>
                      <th className="num">번호</th>
                      <th className="title">제목</th>
                      <th className="writer">글쓴이</th>
                      <th className="major">구분</th>
                      <th className="date">날짜</th>
                    </tr>
                  </thead>
                  <tbody>
                    {NoticeApi.slice(offset, offset + limit).map((item, index) => (
                      <tr key={index}>
                        <td className="num">{NoticeApi.length - index - offset}</td>
                        <td
                          className="title"
                          onClick={() => window.open("https://" + item.link)}
                        >
                          {item.title}
                        </td>
                        <td className="writer">{item.writer}</td>
                        <td className="major">{item.major}</td>
                        <td className="date">{item.date}</td>
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
          </div>
        </div>
      )}
    </>
  );
};

export default Notice;
