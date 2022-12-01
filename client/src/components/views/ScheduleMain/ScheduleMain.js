import { useEffect, useState } from "react";
import { Table, Button} from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ScheduleApi from '../../api/Schedule.json';

const ScheduleMain = () => {
    const navigate = useNavigate();
    
    const [month, setMonth] = useState(Number(new Date().getMonth()+1));
    const [posts, setPost] = useState([]);

    // useEffect(() => {
    //     axios.get(`/api/boards/schedule`)
    //     .then(response =>{
    //         console.log(response.data[0]);
    //         let copy = [...posts, ...response.data];
    //         setPost(copy);
    //     })
    // }, [])

    return (
        <div className = "notice_main">
            <div className = "Tableheader">
            <Navbar>
            <Container>
                <Navbar.Brand className = "HeaderTitle">학사일정</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <Button variant="outline-dark" size="sm" onClick = {() => navigate('./schedule')}> + </Button>
                </Navbar.Text>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            </div>
            <Table>
                    <thead>
                        <tr>
                            <th className = "date">날짜</th>
                            <th className = "content">일정내용</th>
                        </tr>
                    </thead>
                    <tbody>
                    {ScheduleApi.filter((item) => item.month === month).map((item, index) => (
                            <tr key= {index} >
                                <td className = "date">
                                    {item.date}
                                </td>
                                <td className = "content">
                                    {item.content}
                                </td>
                            </tr>
                            ))}
                    </tbody>
                </Table>
        </div>
    )
}

export default ScheduleMain;