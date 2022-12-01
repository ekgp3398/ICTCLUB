import {Component } from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MainPage from "../views/MainPage/MainPage";
import LoginPage from "../views/LoginPage/LoginPage";
import RegisterPage from "../views/RegisterPage/RegisterPage";
import Board from "../views/Board/Board";
import Post from "../views/Post/Post";
import View from "../views/View/View";
import Edit from "../views/Edit/Edit";
import Notice from '../views/Notice/Notice';
import Schedule from '../views/Schedule/Schedule';
import './Body.css';

class Body extends Component {
    render(){
        return (
          <div>
            <Router>
                <div className = "layout">
                <Routes>
                    <Route path="/" element={<MainPage />}/>
                    <Route path="/login" element={<LoginPage />}/>
                    <Route path="/register" element={<RegisterPage />}/>
                    <Route exact path="/Notice" element={<Notice />}/>
                    <Route exact path="/Schedule" element={<Schedule />}/>
                    <Route exact path="/board/:club" element={<Board />}/>
                    <Route exact path="/board/:club/Post" element={<Post />}/>
                    <Route exact path="/board/:club/view/:id" element={<View />}/>
                    <Route exact path="/board/:club/edit/:id" element={<Edit />}/>
                </Routes>
                </div>
            </Router>
          </div>
        )
      }
}

export default Body;