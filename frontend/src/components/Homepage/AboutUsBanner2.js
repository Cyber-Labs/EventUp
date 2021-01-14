import React from 'react';
import ConferenceImage from '../../images/unsplash/teemu-paananen-bzdhc5b3Bxs-unsplash.jpg';


function AboutUsBanner2(props){
  return(
    <div className='row m-0' >   
      <div className='col-md-6 p-5'>
        <img  src={ConferenceImage} alt='PartyImage' className='PartyImage'/>
      </div>     
      <div className='col-md-6 p-5'>
        <h2 className='px-5 mx-5 heading2'>Create Impactful Virtual Experiences For Any Event</h2>
        <p className='px-5 mx-5 para1'>
          Virtual meeting is now the new normal. <br />
          Reach the full potential of audience engagement with world class experiences.
        </p>
      </div>
      
    </div>
  )
}

export default AboutUsBanner2