import React from 'react'
import { Jumbotron, Button} from 'reactstrap'
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import img1 from './shared/images/choose1.jpg';
import img3 from './shared/images/meet1.jpg';
import img2 from './shared/images/explore1.jpg';


const About = () => {
  return(
    <React.Fragment>
    <div className = 'intro'>
      <div className='container jumbo'>
      <Jumbotron style={{background:'none'}}>
        <h1 className='display-3' style={{fontSize:'45px'}}>Event Up</h1>
        <p className='lead'>Eventup is a platform for finding and taking part in various events.People use eventup to join new events,learn new things,explore various ields,get out of their comfort zones,and pursue their passions,together.</p>
        <hr className='my-2' />
        <p className='lead'>
        <Link to='/users/register'><Button className='introJoin' color='primary'>Join Eventup</Button></Link>           
        </p>
      </Jumbotron>
      </div>
    </div>

    <div className='working'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h2 className='headWork'>How it works</h2>
          </div>
        </div>
      <Carousel>
        <Carousel.Item>
          <img
          className='d-block w-100'
          src={img1}
          alt='First slide'
          />
          <Carousel.Caption>
          <h3>Choose what you're into</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
          className='d-block w-100'
          src={img3}
          alt='Third slide'
          />

          <Carousel.Caption>
          <h3>Meet people around you who share your passion</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
          className='d-block w-100'
          src={img2}
          alt='Third slide'
          />

          <Carousel.Caption>
          <h3>Explore new fields and enhance your skills</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </div>
    </div>

    <div className='twoOptions'>
      <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <h2 className='optionHead' style={{textAlign: 'center'}}>Want to do more of what you love? </h2>
        </div> 
      </div>
      <div className='row'>
        <div className='col-12 col-md-6 options'>
        <h4><i className='fa fa-search fa-lg'>   </i>    Discover Events</h4>
        <p>See who's hosting local events for all the things you love.</p>
        <Link style={{ textDecoration: 'none' }} to='/users/register'><h4>Join Eventup</h4></Link>
        </div>
        <div className='col-12 col-md-6 options'>
        <h4><i className='fa fa-plus-square fa-lg'>   </i>  Create an event</h4>
        <p>Create yout own eventup group and draw a community of millions.</p>
        <Link style={{ textDecoration: 'none' }} to='/events/create'><h4>Create an event</h4></Link>
        </div>
      </div>
      </div>
    </div>

    <div className='follow'>
      <div className='container'>
      <div className='row'>
          <div className='col-12 followText'>
            <h3>Follow Eventup</h3>
          </div>
      </div>
      <div className='container follow-box'>
        <div className='box'>
        <a className='btn btn-social-icon btn-facebook' href='http://www.facebook.com/profile.php?id='><i className='fa fa-facebook fa-3x'></i></a>
        <p>Facebook</p>
        </div>
        <div className='box'>
        <a className='btn btn-social-icon btn-twitter' href='http://twitter.com/'><i className='fa fa-twitter fa-3x'></i></a>
        <p>Twitter</p>
        </div>
        <div className='box'>
        <a className='btn btn-social-icon btn-instagram' href='http://www.instagram.com/'><i className='fa fa-instagram fa-3x'></i></a>
        <p>Instagram</p>
        </div>
        <div className='box'>
        <a className='btn btn-social-icon btn-youtube' href='http://www.facebook.com/profile.php?id='><i className='fa fa-youtube fa-3x'></i></a>
        <p>Youtube</p>
        </div>
      </div>
      </div> 
    </div>  
    </React.Fragment>
  )
}

export default About