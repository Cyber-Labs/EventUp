import React, { useState } from 'react';
import axios from 'axios';
import { isAuth, getCookie} from '../../shared/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const CreateEvent = () => {
  
    const [values, setValues] = useState({
        name: '',
        about:'', 
        date:'',
        isPaid: 'free',
        price: 0,
        isPublic: 'public',
        inputImage: null,
        buttonText: 'Create',
    });

    const { 
        name, 
        about, 
        date,
        isPaid,
        price,
        isPublic,
        inputImage,
        buttonText,
    } = values;

    const token = getCookie('token');

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

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
                        `<img src='${e.target.result}' width='200' height='200' class='img-circle mx-auto d-block' alt='Uploaded Image'/>`; 
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
        setValues({ ...values, buttonText: 'Creating' });
        const data = new FormData();    
        data.append('file', inputImage );    
        data.append('upload_preset', 'eventup');  

        axios({
            method: 'POST',
            url: 'https://api.cloudinary.com/v1_1/eventup/image/upload',
            data: data
        })
            .then(response => {
                console.log('Successfully uploaded', response); 
                console.log('Url ', response.data.secure_url);
                return response.data.secure_url
            })
            .then(response => {
                axios({
                    method: 'POST',
                    url: `${process.env.REACT_APP_API}/events`,
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    data: {
                        'name': name,
                        'about': about,
                        'date': date,
                        'isPaid': isPaid,
                        'price': price,
                        'isPublic': isPublic,
                        'creator': isAuth()._id,
                        'secureUrl': response
                    }
                })
                    .then(response => {
                        console.log('Successfully created the event ', response);
                        setValues({ 
                            ...values, 
                            name: '',
                            about:'', 
                            date:'',
                            isPaid: 'free',
                            price: 0,
                            isPublic: 'public',
                            creator: isAuth()._id ,
                            buttonText: 'Created',
                            inputImage: null,
                            secureUrl: null,
                        });
                        toast.success('Successfully created the event');
                    })
                    .catch(error => {
                        console.log('Error in creating new event ', error);
                        setValues({ ...values, buttonText: 'Create' });
                        toast.error(error.response.data.error);
                    });
        
            })
            .catch(error => {
                console.log('Error in uploading ', error);
            });


    };

    const CreateEventForm = () => (
        <form encType='multipart/form-data' id='CreateEventForm'> 
            <div className='form-group'>
                <label className='labelCenter'>Event Name</label>
                <input 
                    onChange={handleChange('name')} 
                    value={name} 
                    placeholder='Enter Event Name' 
                    type='text' 
                    className='form-control mx-auto' 
                />
            </div>

            <div className='form-group'>
                <label className='labelCenter'>About Event</label>
                <textarea  
                    onChange={handleChange('about')} 
                    value={about}
                    placeholder='Enter Event Details' 
                    type='text' 
                    className='form-control mx-auto' 
                    rows='5'
                />
            </div>

            <div className='form-group'>
                <label className='labelCenter'>Event Date</label>
                <input 
                    onChange={handleChange('date')} 
                    value={date} 
                    type='date' 
                    className='form-control mx-auto' 
                />
            </div>

            <div className='form-group'>
                <p className='labelCenter'>Is the event paid/ free ? </p>
                <div className='labelCenter'>
                    <input
                        type='radio'
                        id='paid'
                        value='paid'
                        checked={isPaid === 'paid'}
                        onChange={handleChange('isPaid')}    
                    />
                    <label htmlFor='paid'> Paid</label>&emsp;

                    <input
                        type='radio'
                        id='free'
                        value='free'
                        checked={isPaid === 'free'}
                        onChange={handleChange('isPaid')} 
                    />
                    <label htmlFor='free'> Free</label>&emsp;                    
                </div>            
            </div>

            <div className='form-group'>
                <p className='labelCenter'>Is the event public/ private ? </p>
                <div className='labelCenter'>
                    <input
                        type='radio'
                        id='public'
                        value='public'
                        checked={isPublic === 'public'}
                        onChange={handleChange('isPublic')}    
                    />
                    <label htmlFor='public'> Public</label>&emsp;

                    <input
                        type='radio'
                        id='private'
                        value='private'
                        checked={isPublic === 'private'}
                        onChange={handleChange('isPublic')} 
                    />
                    <label htmlFor='private'> Private</label>&emsp;                    
                </div>            
            </div>

            <div className='form-group'>
                <label className='labelCenter'>Event Price</label>
                <input 
                    onChange={handleChange('price')} 
                    value={price}
                    placeholder='Enter Event Price'
                    type='number' 
                    className='form-control mx-auto' 
                />
            </div>
            <label for="file-upload" class="custom-file-upload btn btn-primary rounded-button">
              <i class="fa fa-cloud-upload"></i> Upload Image
            </label>
            <input type='file'
              id='file'
              className='form-control mx-auto border-0'
              onChange={handleSelectedFile}  
            /> 
            {/* Image Preview */}
            <div id='imagePreview'></div> 
            <br/>

            <div className='text-center'>
                <button className='btn btn-primary FormSubmit' onClick={clickSubmit} >
                    {buttonText}
                </button>
            </div>
        </form>
    );

    return (
        <React.Fragment>
            <div className='row'>
                <ToastContainer />
                <div className='col-md-9 mx-auto my-4 '>
                    <div className='card card-body' id='signupForm'>
                        <h3 className='text-center mb-3'>
                        Create New Event
                        </h3>                        
                        {CreateEventForm()}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CreateEvent;