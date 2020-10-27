// react
import React from 'react';
import { Link } from 'react-router-dom';
import AboutUsBanner1 from './AboutUsBanner1';
import AboutUsBanner2 from './AboutUsBanner2';
import CardComponent from './CardComponent';


export default function Homepage() { 
    return(
        <div style={{"minHeight": "50vh" }} className="mt-5">
            <h1 className="text-center"> EVENTUP</h1>
            {/* <br/> <br/> <br/> <br/> */}
            {/* <Link to="/users/login">Login</Link>
            <br/>
            <Link to="/users/register">Register</Link>
            <br/>
            <Link to="/qrcode">View Dummy QR Code</Link>
            <br/>
            <Link to="/upload">Upload Image</Link> */}
            <br/> <br/> 
            <AboutUsBanner1 />
            <AboutUsBanner2 />
            <br /> <br /> <br /> <br />
            <h1 className="px-5 mx-5 heading1">ARTS</h1>
            <div className="row m-0" >                
                <div className="col-md-4">
                    <CardComponent 
                        ImageSrc="../../images/unsplash/arts/dan-cristian-padure-fssY0qIh0Qs-unsplash.jpg"
                        title="Art Freaks"
                        subtitle="Call for Artist"
                        text="Art Event"
                        link="www.google.com"
                    />
                </div>
                <div className="col-md-4">
                    <CardComponent 
                        ImageSrc="../../images/unsplash/arts/sema-martin-f1rPr-sKI1s-unsplash.jpg"
                        title="Art Freaks"
                        subtitle="Call for Artist"
                        text="Art Event"
                        link="www.google.com"
                    />
                </div>
                <div className="col-md-4">
                    <CardComponent 
                        ImageSrc="../../images/unsplash/arts/dan-cristian-padure-fssY0qIh0Qs-unsplash.jpg"
                        title="Art Freaks"
                        subtitle="Call for Artist"
                        text="Art Event"
                        link="www.google.com"
                    />
                </div>
            </div>
            <br /> <br /> <br /> <br />
            <div className="circle1"></div>

            <h1 className="px-5 mx-5 heading1">MUSIC</h1>
            <div className="row m-0" >                
                <div className="col-md-4">
                    <CardComponent 
                        ImageSrc="../../images/unsplash/music/austin-neill-hgO1wFPXl3I-unsplash.jpg"
                        title="Art Freaks"
                        subtitle="Call for Artist"
                        text="Art Event"
                        link="www.google.com"
                    />
                </div>
                <div className="col-md-4">
                    <CardComponent 
                        ImageSrc="../../images/unsplash/music/spencer-imbrock-JAHdPHMoaEA-unsplash.jpg"
                        title="Art Freaks"
                        subtitle="Call for Artist"
                        text="Art Event"
                        link="www.google.com"
                    />
                </div>
                <div className="col-md-4">
                    <CardComponent 
                        ImageSrc="../../images/unsplash/arts/dan-cristian-padure-fssY0qIh0Qs-unsplash.jpg"
                        title="Art Freaks"
                        subtitle="Call for Artist"
                        text="Art Event"
                        link="www.google.com"
                    />
                </div>
            </div>
            <br /> <br /> <br /> <br />

            <h1 className="px-5 mx-5 heading1">SCIENCE</h1>
            <div className="row m-0" >                
                <div className="col-md-4">
                    <CardComponent 
                        ImageSrc="../../images/unsplash/science/alex-kondratiev-H9t723yPjYI-unsplash.jpg"
                        title="Art Freaks"
                        subtitle="Call for Artist"
                        text="Art Event"
                        link="www.google.com"
                    />
                </div>
                <div className="col-md-4">
                    <CardComponent 
                        ImageSrc="../../images/unsplash/science/national-cancer-institute-L7en7Lb-Ovc-unsplash.jpg"
                        title="Art Freaks"
                        subtitle="Call for Artist"
                        text="Art Event"
                        link="www.google.com"
                    />
                </div>
                <div className="col-md-4">
                    <CardComponent 
                        ImageSrc="../../images/unsplash/arts/dan-cristian-padure-fssY0qIh0Qs-unsplash.jpg"
                        title="Art Freaks"
                        subtitle="Call for Artist"
                        text="Art Event"
                        link="www.google.com"
                    />
                </div>
            </div>
            <br /> <br /> <br /> <br />

            <h1 className="px-5 mx-5 heading1">HEALTH AND WELLNESS</h1>
            <div className="row m-0" >                
                <div className="col-md-4">
                    <CardComponent 
                        ImageSrc="../../images/unsplash/healthAndWellness/anastase-maragos-7kEpUPB8vNk-unsplash.jpg"
                        title="Art Freaks"
                        subtitle="Call for Artist"
                        text="Art Event"
                        link="www.google.com"
                    />
                </div>
                <div className="col-md-4">
                    <CardComponent 
                        ImageSrc="../../images/unsplash/healthAndWellness/kike-vega-F2qh3yjz6Jk-unsplash.jpg"
                        title="Art Freaks"
                        subtitle="Call for Artist"
                        text="Art Event"
                        link="www.google.com"
                    />
                </div>
                <div className="col-md-4">
                    <CardComponent 
                        ImageSrc="../../images/unsplash/arts/dan-cristian-padure-fssY0qIh0Qs-unsplash.jpg"
                        title="Art Freaks"
                        subtitle="Call for Artist"
                        text="Art Event"
                        link="www.google.com"
                    />
                </div>
            </div>
            <br /> <br /> <br /> <br />

        </div>
    );
}