// react
import React from 'react';
import QRCode from 'qrcode.react';

export default function Showqrcode() {
 
  return(
    <div>
      <h1> Scan The QR Code</h1>
      <br/><br/>
      <QRCode value='https://aman-codes.github.io/' renderAs='svg' style={{height: '300', width: '300', marginLeft: '40%'}}/>
      <br/> <br/><br/><br/><br/>
    </div>  
  );
}