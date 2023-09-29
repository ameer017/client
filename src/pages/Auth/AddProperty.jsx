import React, { useEffect, useState } from 'react'
import { RESET, createProperty} from '../../redux/features/property/propertySlice';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux';
import './Auth.css'

const cloud_name = 'dc0ypir1g';
const upload_preset = 'uvqakqra';

const initialState = {
    name : '',
     location : '',
     price : '',
     rooms : '',
     description : '',
     bathroom : '',
     car_park : '',
     propertyEmail: '',
     photo: ''
};


const AddProperty = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialState);
    const [uploadedPropertyImage, setUploadedPropertyImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const {name, location, price, rooms, description, bathroom, car_park, propertyEmail} = formData;

    const {isLoading, isSuccess, property} = useSelector((state) => state.property)

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value});
    }

    const handleImageChange = (e) => {
        setUploadedPropertyImage(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]))
    }

    const newProperty = async (e) => {
        e.preventDefault()

        if (
            !name || 
            !location || 
            !price || 
            !rooms || 
            !description || 
            !bathroom || 
            !car_park ||
            !propertyEmail
        ) {
            return toast.error ("Please fill in all the required fields.");
        };

        let imageURL;
        try {
            if(uploadedPropertyImage !== null && (
                uploadedPropertyImage.type === 'image/jpeg' || 
                uploadedPropertyImage.type === 'image/jpg' || 
                uploadedPropertyImage.type === 'image/png' 
            )) {
                const image = new FormData()
                image.append('file', uploadedPropertyImage)
                image.append('cloud_name', cloud_name)
                image.append('upload_preset', upload_preset)

                // save image to cloudinary

                const response = await fetch(
                    "https://api.cloudinary.com/v1_1/dc0ypir1g/image/upload",
                    {method: 'post', body: image}
                );

                const imgData = await response.json()
                    console.log(imgData)

                imageURL = imgData.url.toString()


            }

            const propertyData = {
                name, 
                location, 
                price, 
                rooms, 
                description, 
                bathroom, 
                car_park, 
                propertyEmail,
                photo: uploadedPropertyImage ? imageURL : formData.photo
            }
    
            await dispatch(createProperty(propertyData))
            
            toast.success("Image Uploaded")
        } catch (error) {
            toast.error(error.message)
        }
    }

    // useEffect(() => {
    //     if(!isLoading && isSuccess){
    //       navigate('/property-success')
    //     }
    //     dispatch(RESET())
    // }, [isLoading, isSuccess, dispatch, navigate])


  return (
    <div>
        <form className='form__action'>
            <p className="title">Add New Property.</p>

            <div className='flex'>
                <input  name='name' placeholder="Type of property e.g Bungalow" type="text" className="input" onChange={handleInputChange} value={name}/>

                <input  name='propertyEmail' placeholder="yourname@gmail.com" type="email" className="input" onChange={handleInputChange} value={propertyEmail}/>

                <input  name='location' placeholder="Location" type="text" className="input" onChange={handleInputChange} value={location}/>

                <input  name='price' placeholder="price" type="text" className="input" onChange={handleInputChange} value={price}/>

                <input  name='rooms' placeholder="number of rooms" type="number" className="input" onChange={handleInputChange} value={rooms}/>

                <input  name='bathroom' placeholder="Number of Bathroom" type="number" className="input" onChange={handleInputChange} value={bathroom}/>

                <input  name='car_park' placeholder="Number of Car Park" type="number" className="input" onChange={handleInputChange} value={car_park}/>


                <textarea  placeholder="description of the house" name='description' type="text" className="input" rows='4' onChange={handleInputChange} value={description}/>

                <div className='image__prev'>
                    <img src={imagePreview === null ?  property?.photo : imagePreview} alt=''/>   
                </div>

                <p>
                    <input type='file' accept='image/*' name='image' onChange={handleImageChange}/>
                </p>
            </div>
                
            <button className="submit" onClick={newProperty}>Add Property</button>

            <Link to='/'><p style={{textAlign: 'center'}}> - Home - </p></Link>
        </form>

    </div>
  )
}

export default AddProperty