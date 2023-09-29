import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import './Auth.css'
import { RESET, createBooking } from '../../redux/features/booking/bookingSlice'
import { updateProperty } from '../../redux/features/property/propertySlice'

const initialState = {
    name: '',
    bookingEmail: '',
    phone: '',
    from: '',
    time: ''
}


const BookVisit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialState);
    const {name,  phone, from, time, bookingEmail} = formData

    const {loading, success, message, error} = useSelector((state) => state.booking)

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value});
    }


  const bookVisit = async(e) => {
    e.preventDefault()

    // if(!name  || !phone || !from || !time) {
    //   return toast.error("All fields are required")
    // }

    const bookingData = {
        name,  phone, from, time
    }
    
    await dispatch(createBooking(bookingData))
    await dispatch(updateProperty())
  }
  useEffect(() => {
    if(success){
      navigate('/booking-success')
    }

    dispatch(RESET())
  }, [ success, dispatch, navigate])


  return (
    <div>
        <form className='form__action' >
            <p className="title">Book Visit.</p>

            <div className='flex'>
                
                <input  value={name} placeholder="e.g John Doe" name='name' type="text" className="input" onChange={handleInputChange}/>
                
                <input  name='bookingEmail' placeholder="yourname@gmail.com" type="rmail" className="input" onChange={handleInputChange} value={bookingEmail}/>
                
                <input  name='phone' placeholder="phone Number" type="text" className="input" onChange={handleInputChange} value={phone}/>
                

                <label >Duration</label>

                <div className='flex__item'>
                    <input  name='from' placeholder="" type="date" className="input" onChange={handleInputChange} value={from}/>

                    <input  name='time' placeholder="" type="time" className="input" onChange={handleInputChange} value={time}/>
                </div>

            </div>
                
            <button className="submit" onClick={bookVisit}>Book Visit</button>
            
            <Link to='/'>-Home-</Link>
               
        </form>

    </div>
  )
}

export default BookVisit