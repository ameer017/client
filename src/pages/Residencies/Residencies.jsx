import React, { useEffect, useLayoutEffect, useState } from "react";
import data from "../../utils/slider.json";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "./Residencies.css";
import { sliderSettings } from "../../utils/common";
import { useDispatch, useSelector } from "react-redux";
import { getProperties, reUpdateProperty } from "../../redux/features/property/propertySlice";
import { Link } from "react-router-dom";

const Residencies = () => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState("")
  
  
  const {isLoading, isSuccess, properties, property} = useSelector((state) => state.property)
  
  const initialState = {
    name: property?.name, 
    detail: property?.detail, 
    location: property?.location, 
    price: property?.price, 
    rooms: property?.rooms, 
    car_park: property?.car_park, 
    description: property?.description, 
    photo: property?.photo,
    isBooked: property?.isBooked
  }
  
  const [propertyData, setPropertyData] = useState(initialState)
  const [propertyImage, setPropertyImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = async (e) => {
    setPropertyImage(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  }
  useEffect(() => {
    dispatch(getProperties())
  }, [dispatch])

  useLayoutEffect(() => {
    if(property) {
      setPropertyData({
        ...propertyData,
        name: property?.name, 
        detail: property?.detail, 
        location: property?.location, 
        price: property?.price, 
        rooms: property?.rooms, 
        car_park: property?.car_park, 
        description: property?.description, 
        photo: property?.photo,
        isBooked: property?.isBooked
      })
    }
  }, [property])

  const cancelBooking = async () => {
    // await dispatch(reUpdateProperty(propertyData));
    dispatch(getProperties());
  };

  return (
    <div id="residencies" className="r-wrapper top">
      <div className="paddings innerWidth r-container">
        <div className="flexColStart r-head">
          <Link to='/'>Home</Link>
          <span className="primaryText">Popular Residencies</span>
        </div>
        
        <div className="flexCenter">
            {/* <Search value={search} onChange={(e) => {setSearch(e.target.value)}}/> */}
          </div>

        <Swiper {...sliderSettings}>
          <SlideNextButton />
          {/* slider */}
          
          {!isLoading && properties?.length === 0 ? 
            (
              <p>No Property found</p>
            ) 

            : 
            
            (
              <>

                {properties.map((property, i) => (
                  <SwiperSlide key={i}>
                    <div className="flexColStart r-card">
                      <img src={imagePreview === null ? property?.photo : imagePreview} alt="home" />

                      <span className="secondaryText r-price">
                        <span style={{ color: "orange" }}>$</span>
                        <span>{property?.price}</span>
                      </span>
                      <span className="primaryText">{property?.name}</span>
                      <span className="secondaryText">{property?.detail}</span>
                      <span className="secondaryText"> {property?.location}</span>
                      <span className="secondaryText">Rooms: {property?.rooms} || Car_Park: {property?.car_park}</span>
                      <span className="secondaryText">{property?.description}</span>

                      {property?.isBooked ? (
                          <button className="--btn --btn-danger" onClick={cancelBooking}>
                            Cancel Booking
                          </button>
                      )
                      :
                      (
                        <button className="--btn --btn-primary">
                          <Link to='/create-booking'>Book Residence</Link>
                        </button>

                      )}
                      
                    </div>
                  </SwiperSlide>
                ))}
              </>
            )}
        </Swiper>
      </div>
    </div>
  );
};

export default Residencies;

const SlideNextButton = () => {
  const swiper = useSwiper();
  return (
    <div className="flexCenter r-buttons">
      <button onClick={() => swiper.slidePrev()} className="r-prevButton">
        &lt;
      </button>
      <button onClick={() => swiper.slideNext()} className="r-nextButton">
        &gt;
      </button>
    </div>
  );
};
