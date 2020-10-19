import React from 'react';
import { Link } from 'react-router-dom';

function Footer(props){
    return(
        <div className="footer">
            <div className="container">
<<<<<<< HEAD
                <div clasName="row justify-content-center">
                    <div clasName="col-auto">
                    <Link style={{ textDecoration: 'none' }} to="/users/events/create"><h3>Create your own event here...</h3></Link>
=======
                <div className="row justify-content-center">
                    <div className="col-auto">
                    <Link to="/users/events/create"><h3>Create your own event here...</h3></Link>
>>>>>>> 684424c8e771243ef3ffaf4a44776f734a558ace
                        <hr className="belowCreate"></hr>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-4 col-offset-4 col-sm-6">
                        <p>EventUp Logo</p>
                        <br></br>
                        <h3>Event Up</h3>
                    </div>
                    <div className="col-12 col-sm-6">
                        <Link style={{ textDecoration: 'none' }} to="/aboutus"><h4>About Us</h4></Link>
                        <hr></hr>
                        <p>EventUp is an open source initiative website to<br></br>
                         let you join an event happening near based on your interest.</p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-4 col-offset-4 col-sm-6">
                        <h6> Follow us at : </h6>
                            <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook fa-lg"></i></a>
                            <a className="btn btn-social-icon btn-instagram" href="http://www.instagram.com/"><i className="fa fa-instagram fa-lg"></i></a>
                            <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter fa-lg"></i></a>
                        
                    </div>
                    <div className="col-12 col-sm-6">
                        <h5>Contact Us : </h5>
                        <i className="fa fa-phone fa-lg"></i>  <a className="contact-link" href="tel:1234567899">   +91 1234567899</a><br></br>
                        <i className="fa fa-envelope fa"><a className="contact-link" href="mailto:help.eventup@gmail.com"> help.eventup@gmail.com</a></i>
                    </div>
                </div>
                <hr></hr>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <div className="text-center">
                            <p> Copyright &copy; 2020 EventUp</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    )
}

export default Footer