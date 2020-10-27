import React from 'react';
import { Link } from 'react-router-dom';
import SvgImage from '../images/svg/4169e1.svg';

function Footer(props){
    return(
        <React.Fragment>
        <img  src={SvgImage} alt="footerSvg" className="footerSvg" />
        <div className="footer">
            <div className="row justify-content-center m-0 text-center">
                <div className="col-md-3 offset-md-1 col-12">
                    <h6 className="justify-content-center" > Follow us at : </h6>
                    <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook fa-lg"></i></a>
                    <a className="btn btn-social-icon btn-instagram" href="http://www.instagram.com/"><i className="fa fa-instagram fa-lg"></i></a>
                    <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter fa-lg"></i></a>
                    <br /> <br/>
                </div>
                <div className="col-md-4 offset-md-3 col-12 ">
                    <h6 className="justify-content-center">Contact Us : </h6>
                    <i className="fa fa-phone fa-lg"></i><a className="contact-link" href="tel:1234567899">   +91 1234567899</a><br></br>
                    <i className="fa fa-envelope fa"><a className="contact-link" href="mailto:help.eventup@gmail.com"> help.eventup@gmail.com</a></i>
                </div>
            </div>
            <br />
            <div className="row justify-content-center m-0">
                <div className="col-auto">
                    <div className="text-center">
                        <p> Copyright &copy; 2020 EventUp</p>
                    </div>
                </div>
            </div>
        </div>   
        </React.Fragment> 
    )
}

export default Footer