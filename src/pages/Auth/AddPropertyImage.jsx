import React, {useEffect, useLayoutEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import './Auth.css'

import { toast } from 'react-toastify';
import { getProperty, updateProperty } from '../../redux/features/property/propertySlice';
import { Link, useNavigate } from 'react-router-dom';

// const cloud_name = process.env.REACT_APP_CLOUD_NAME;
// const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
    const cloud_name = 'dc0ypir1g';
  const upload_preset = 'uvqakqra';

const AddPropertyImage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {isLoading, isSuccess, property} = useSelector((state) => state.property)

    const initialState = {
        photo: property?.photo || "",
    };

    const [propertyInfo, setPropertyInfo] = useState(initialState)
    const [uploadedPropertyImage, setUploadedPropertyImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);


    useEffect(() => {
        dispatch(getProperty())
    }, [dispatch])

    const handleImageChange = (e) => {
        setUploadedPropertyImage(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]))
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setPropertyInfo({...propertyInfo, [name]: value})
    }

    const saveProfile = async (e) => {
        e.preventDefault();

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

            // save profile to mongo DB
            const userData = {
                photo: uploadedPropertyImage ? imageURL : propertyInfo.photo
            }
            dispatch(updateProperty(userData))
            
            toast.success("Image Uploaded")
        } catch (error) {
            toast.error(error.message)
        }
      };

      useLayoutEffect(() => {
        if(property) {
            setPropertyInfo({
                ...propertyInfo, 
                photo: property.photo,
            })
        }
      }, [property])

      useEffect(() => {
        if(isSuccess) {
            navigate('/')
        }
      }, [navigate])

  return (
    <>
        <div className='form__action'>
            
            <h2>Add Property Image</h2>

                    {!isLoading && property && (

                        <>
                            <div>
                                <div className='image__prev'>
                                    <img src={imagePreview === null ?  property?.photo : imagePreview} alt=''/>   
                                </div>
                            </div>

                            <form onSubmit={saveProfile}>
                                <p>
                                    <input type='file' accept='image/*' name='image' onChange={handleImageChange}/>
                                </p>
                                
                                <button className='--btn --btn-primary --btn-block'>Add Property Photo</button>
                                <Link to='/'>-Home-</Link>
                            </form>
                        </>
                    )}
            </div>

    </>
  )
};

 

export default AddPropertyImage