import React from 'react';
import PartyImage from '../../images/unsplash/miguel-teirlinck-WLlW03JZGBE-unsplash.jpg';
import SvgImage from '../../images/svg/4DA8DA.svg';

function AboutUsBanner1(props){
  return(
    <div className='row m-0' >
      <img  src={SvgImage} alt='SvgImage' className='TopSvg'/>
      
      <div className='col-md-6 lightestBlueBackground pt-5 text-white'>
        {/* <h1 className='px-5 mx-5 heading1'>EventUp</h1> */}
        <h2 className='px-lg-5 mx-lg-5 heading2'>Organize Events Hastle Free</h2>
        <p className='px-lg-5 mx-lg-5 para1'>EventUp is an open source initiative website where you can choose to attend an event (either physically or virtually) based on your interest .
          Get your attendance marked digitally by scanning a QR code.
        </p>
      </div>
      <div className='col-md-6 lightestBlueBackground p-2'>
        <img  src={PartyImage} alt='PartyImage' className='PartyImage'/>
      </div>
      <img  src={SvgImage} alt='SvgImage' className='BottomSvg' />
    </div>
  )
}

export default AboutUsBanner1