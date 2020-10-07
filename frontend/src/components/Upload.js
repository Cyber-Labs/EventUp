import React, {useState} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default function Upload () {

    const [values, setValues] = useState({
        inputImage: null,
        secure_url: null,
    });

    const {
        inputImage,
        secure_url
    } = values;

    const UploadImage = async e => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'eventup');
        const res = await fetch('https://api.cloudinary.com/v1_1/eventup/image/upload' , {
            method: 'POST',
            body: data
        })
        const file = await res.json();
        console.log(file);
    }

    const handleSelectedFile = e => {
        e.preventDefault();

        var fileInput = document.getElementById('file');   
        var filePath = fileInput.value;        
        // Allowing file type 
        var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;           
        if (!allowedExtensions.exec(filePath)) { 
            alert('Invalid file type\n Please choose from allowed extensions: .jpg, .jpeg, .png, .gif'); 
            fileInput.value = ''; 
            return false; 
        } 
        else {
            // Image preview 
            if (fileInput.files && fileInput.files[0]) { 
                var reader = new FileReader(); 
                reader.onload = function(e) { 
                    document.getElementById( 
                        'imagePreview').innerHTML =  
                        `<img src="${e.target.result}" width="200" height="200" class="img-circle mx-auto d-block" alt="Uploaded Image"/>`; 
                };                 
                reader.readAsDataURL(fileInput.files[0]); 
                setValues({
                    ...values,
                    inputImage: e.target.files[0]
                });
            }
        }        
    };

    const clickSubmit = event => {
        event.preventDefault();
        const data = new FormData();    
        data.append("file", inputImage );    
        data.append('upload_preset', 'eventup');        
        axios({
            method: 'POST',
            url: 'https://api.cloudinary.com/v1_1/eventup/image/upload',
            data: data
        })
            .then(response => {
                console.log('Successfully uploaded', response); 
                console.log('Url ', response.data.secure_url);   
                setValues({
                    ...values,
                    secure_url: response.data.secure_url
                });             
            })
            .catch(error => {
                console.log('Error in uploading', error);
            });
    };

    return (
        <div>
            <h1> Upload a file</h1>
            <input name="file" id="file" type="file" placeholder="Upload an image" onChange={handleSelectedFile}/>
            <br/> <br/>

            {/* Image Preview */}
            <div id="imagePreview"></div> 
            <br/> <br/>

            <button onClick={clickSubmit}>
                Upload Image
            </button>
            <br/> <br/>
            {
                secure_url ?
                (
                    <div>
                        The image url  is &emsp;
                        <a href = {secure_url}>
                            {secure_url}
                        </a>
                    </div>
                )
                :
                (
                    null
                )
            }
            <br/> <br/>
        </div>
    )
}