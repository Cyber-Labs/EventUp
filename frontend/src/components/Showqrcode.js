// react
import React, { Fragment } from 'react';
import QRCode from 'qrcode.react';

export default function Showqrcode() {
 
    return(
        <React.Fragment>
            <div>
                <h1> Scan The QR Code</h1>
                <br/><br/>
                <QRCode value="https://aman-codes.github.io/" renderAs='svg' style={{height: "300", width: '300', marginLeft: '40%'}}/>
                <br/>
            </div>
        </React.Fragment>    
    );
}