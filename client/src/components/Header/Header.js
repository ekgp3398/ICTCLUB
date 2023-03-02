import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.css'

import { useDispatch } from 'react-redux';
import { auth } from '../../_action/user_action';

import axios from 'axios'

const Header = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(auth()).then(response =>{
      setValue(!response.payload.isAuth);
    })
  },[value])

  const onClickHandler = () => {
    axios.get(`/api/users/logout`)
    .then(response => {
        if(response.data.success){
            alert('로그아웃 성공')
        } else {
            alert("로그아웃 실패")
        }
    })
  }

  return (
    <div className = "Header">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">ICT CLUB</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Software" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/board/MAWS">MAWS</NavDropdown.Item>
                <NavDropdown.Item href="/BOARD/AUNAE">AUNAE</NavDropdown.Item>
                <NavDropdown.Item href="/BOARD/KIS">KIS</NavDropdown.Item>
                <NavDropdown.Item href="/BOARD/CELL">CELL</NavDropdown.Item>
                <NavDropdown.Item href="/BOARD/NETAPP">NETAPP</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="VR" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/BOARD/CAVE">CAVE</NavDropdown.Item>
                <NavDropdown.Item href="/BOARD/MOTIV">Motiv</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="IoT" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/BOARD/ISL">ISL</NavDropdown.Item>
                <NavDropdown.Item href="/BOARD/VENTURE">MCL</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/notice">공지사항</Nav.Link>
              <Nav.Link href="/schedule">학사일정</Nav.Link>
            </Nav>
          { value ? (
            <>
              <Nav>
                <Nav.Link href="/login">Sign in</Nav.Link>
              </Nav>
            </>
          ): (
            <>
              {/* <Nav >
                <Nav.Link href="/">My Page</Nav.Link>
              </Nav> */}
              <Nav >
                <Nav.Link href="/" onClick={onClickHandler}>logout</Nav.Link>
              </Nav>
            </>
          )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </div>
  );
}

export default Header;