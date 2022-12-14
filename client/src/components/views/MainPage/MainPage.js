import {Component} from 'react';
import Auth from "../../../hoc/auth"
import Carousel from "../Carousel/Carousel"
import Notice from "../NoticeMain/NoticeMain"
import Schedule from "../ScheduleMain/ScheduleMain"
import './MainPage.css'

class MainPage extends Component {
    render(){
        return (
          <div className = "main_container">
            <div className = "row">
              <div className = "col">
                <Carousel />
              </div>
            </div>
            <br />
            <br />
            <div className = "row">
              <div className = "col-sm-12 col-md-6 col-lg-6">
                <Notice/>
              </div>
              <div className = "col-sm-12 col-md-6 col-lg-6">
                <Schedule />
              </div>
            </div>
          </div>
        )
      }
}

export default Auth(MainPage, null);