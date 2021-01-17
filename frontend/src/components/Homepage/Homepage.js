// react
import React, { useEffect } from 'react';
import AboutUsBanner1 from './AboutUsBanner1';
import AboutUsBanner2 from './AboutUsBanner2';
import CardComponent from './CardComponent';
import { Button } from 'reactstrap';
import AOS from 'aos';


export default function Homepage() { 
  useEffect(() => {
    AOS.init({
      duration : 2000
    });
  }, []);

  return(
    <div style={{'minHeight': '50vh' }} className='mt-5'>
      <div className='text-center'>
      <h1 className='title'> EventUp</h1>
      <h2 className='sub-title'>Discover the events you are interested in...</h2><br />
      <Button color='primary' className='rounded-btn'>Read More</Button>{' '}
      </div>
      
      {/* <br/> <br/> <br/> <br/> */}
      {/* <Link to='/users/login'>Login</Link>
      <br/>
      <Link to='/users/register'>Register</Link>
      <br/>
      <Link to='/qrcode'>View Dummy QR Code</Link>
      <br/>
      <Link to='/upload'>Upload Image</Link> */}
      <br/> <br/> 
      <AboutUsBanner1 />
      <AboutUsBanner2 />
      <br /> <br /> <br /> <br />
      <h1 className='px-5 mx-5 heading1' data-aos='fade-right'><span className='underline'>ARTS</span></h1> <br />
      <div className='row m-0 blue-card-bg'>
        <div className='col-md-4 p-5 p-md-2'>
          <CardComponent 
            ImageSrc='../../images/unsplash/arts/dan-cristian-padure-fssY0qIh0Qs-unsplash.jpg'
            title='Art Freaks'
            text='Art Event'
            link='#'
          />
        </div>
        <div className='col-md-4 p-5 p-md-2'>
          <CardComponent 
            ImageSrc='../../images/unsplash/arts/sema-martin-f1rPr-sKI1s-unsplash.jpg'
            title='Art Freaks'
            text='Art Event'
            link='#'
          />
        </div>
        <div className='col-md-4 p-5 p-md-2'>
          <CardComponent 
            ImageSrc='../../images/unsplash/arts/dan-cristian-padure-fssY0qIh0Qs-unsplash.jpg'
            title='Art Freaks'
            text='Art Event'
            link='#'
          />
        </div>
      </div>
      <br /> <br /> <br /> <br />
      <h1 className='px-5 mx-5 heading1' data-aos='fade-left'><span className='underline'>MUSIC</span></h1> <br />
      <div className='row m-0 yellow-card-bg' >
        <div className='col-md-4 p-5 p-md-2'>
          <CardComponent 
            ImageSrc='../../images/unsplash/music/austin-neill-hgO1wFPXl3I-unsplash.jpg'
            title='Art Freaks'
            text='Art Event'
            link='#'
          />
        </div>
        <div className='col-md-4 p-5 p-md-2'>
          <CardComponent 
            ImageSrc='../../images/unsplash/music/spencer-imbrock-JAHdPHMoaEA-unsplash.jpg'
            title='Art Freaks'
            text='Art Event'
            link='#'
          />
        </div>
        <div className='col-md-4 p-5 p-md-2'>
          <CardComponent 
            ImageSrc='../../images/unsplash/arts/dan-cristian-padure-fssY0qIh0Qs-unsplash.jpg'
            title='Art Freaks'
            text='Art Event'
            link='#'
          />
        </div>
      </div>
      <br /> <br /> <br /> <br />

      <h1 className='px-5 mx-5 heading1' data-aos='fade-right'><span className='underline'>SCIENCE</span></h1> <br />
      <div className='row m-0 blue-card-bg' >
        <div className='col-md-4 p-5 p-md-2'>
          <CardComponent 
            ImageSrc='../../images/unsplash/science/alex-kondratiev-H9t723yPjYI-unsplash.jpg'
            title='Art Freaks'
            text='Art Event'
            link='#'
          />
        </div>
        <div className='col-md-4 p-5 p-md-2'>
          <CardComponent 
            ImageSrc='../../images/unsplash/science/national-cancer-institute-L7en7Lb-Ovc-unsplash.jpg'
            title='Art Freaks'
            text='Art Event'
            link='#'
          />
        </div>
        <div className='col-md-4 p-5 p-md-2'>
          <CardComponent 
            ImageSrc='../../images/unsplash/arts/dan-cristian-padure-fssY0qIh0Qs-unsplash.jpg'
            title='Art Freaks'
            text='Art Event'
            link='#'
          />
        </div>
      </div>
      <br /> <br /> <br /> <br />

      <h1 className='px-5 mx-5 heading1' data-aos='fade-left'><span className='underline'>HEALTH AND WELLNESS</span></h1> <br />
      <div className='row m-0 yellow-card-bg' >
        <div className='col-md-4 p-5 p-md-2'>
          <CardComponent 
            ImageSrc='../../images/unsplash/healthAndWellness/anastase-maragos-7kEpUPB8vNk-unsplash.jpg'
            title='Art Freaks'
            text='Art Event'
            link='#'
          />
        </div>
        <div className='col-md-4 p-5 p-md-2'>
          <CardComponent 
            ImageSrc='../../images/unsplash/healthAndWellness/kike-vega-F2qh3yjz6Jk-unsplash.jpg'
            title='Art Freaks'
            text='Art Event'
            link='#'
          />
        </div>
        <div className='col-md-4 p-5 p-md-2'>
          <CardComponent 
            ImageSrc='../../images/unsplash/arts/dan-cristian-padure-fssY0qIh0Qs-unsplash.jpg'
            title='Art Freaks'
            text='Art Event'
            link='#'
          />
        </div>
      </div>
      <br /> <br /> <br /> <br />

    </div>
  );
}