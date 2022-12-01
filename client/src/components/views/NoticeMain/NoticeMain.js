import { useEffect, useState } from "react";
import { Table, Button} from "react-bootstrap";
import './NoticeMain.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import NoticeApi from '../../api/NoticeMain.json';
import Navbar from 'react-bootstrap/Navbar';

const NoticeMain = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    // useEffect(() => {
    //     axios.get(`/api/boards/notice`)
    //     .then(response =>{
    //         console.log(response.data.mainPosts);
    //         let copy = [...posts, ...response.data.mainPosts];
    //         setPosts(copy);
    //     })
    // }, [])

    return (
        <div className = "notice_main">
            <div className = "Tableheader">
            <Navbar>
            <Container>
                <Navbar.Brand className = "HeaderTitle">공지사항</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <Button variant="outline-dark" size="sm" onClick = {() => navigate('./notice')}> + </Button>
                </Navbar.Text>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th className = "major_main">구분</th>
                        <th className = "title_main">제목</th>
                    </tr>
                </thead>
                <tbody>
                    {NoticeApi.map((item, index) => (
                    <tr key= {index} >
                        <td className = "major_main">
                            {item.major}
                        </td>
                        <td className = "title_main" onClick={() => window.open('https://' + item.link)}>
                            {item.title}
                        </td>
                    </tr>
                    ))}
               </tbody>
            </Table>
            {/* { loading ? <Loader type="spin" /> :
                <Table>
                        <thead>
                            <tr>
                                <th className = "major_main">구분</th>
                                <th className = "title_main">제목</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((item, index) => (
                            <tr key= {index} >
                                    <td className = "major_main">
                                        {item.major}
                                    </td>
                                    <td className = "title_main" onClick={() => window.open('https://' + item.link)}>
                                        {item.title}
                                    </td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
            } */}
            
        </div>
    )
}

export default NoticeMain