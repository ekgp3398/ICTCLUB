import {Component} from 'react';
import './Footer.css';

class Footer extends Component {
    render(){
        return (
          <footer className = "footer">
            <div className = "contents">
                <p className = "title" > copyright@2022 </p>
            </div>
          </footer>
        )
      }
}

export default Footer;