import React, { useEffect, useState } from 'react'
import './List.css'
import { FaTrashAlt } from 'react-icons/fa'
// import ChangeRole from '../../components/changeRole/ChangeRole'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from 'react-confirm-alert'
import { deleteBooking, getBookings } from '../../redux/features/booking/bookingSlice'
import PageMenu from '../../components/pageMenu/PageMenu'


const BookingList = () => {
    const dispatch = useDispatch()

    const [search, setSearch] = useState("")

    const {loading, success, booking, bookings} = useSelector((state) => state.booking)


    // const filteredBookings = useSelector(selectFilteredBookings)

    useEffect(() => {
        dispatch(getBookings())

    }, [dispatch]);

    const removeBooking = async (id) => {
        await dispatch(deleteBooking(id));
        dispatch(getBookings());
    };

    const confirmDelete = (id) => {
        confirmAlert({
          title: "Delete This Booking",
          message: "Are you sure to do delete this Booking?",
          buttons: [
            {
              label: "Delete",
              onClick: () => removeBooking(id),
            },
            {
              label: "Cancel",
              onClick: () => alert("Click No"),
            },
          ],
        });
      };

    //   useEffect(() => {
    //     dispatch(FILTER_BOOKINGS({ booking, search}))
    //   }, [dispatch, booking, search])


  return (
    <section className='top'>
        <div className='container'>
            <PageMenu/>

            <div className='list'>
                <div className='table'>

                    <div className='--flex-between'>
                        <span>
                            <h3>All Bookings</h3>
                        </span>
                        <span>
                            {/* <SearchBookings value={search} onChange={(e) => {
                                setSearch(e.target.value)
                            }}/> */}
                        </span>
                    </div>

                        {!loading && bookings?.length === 0 ? 
                        (
                            <p>No Booking info found</p>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>s/n</th>
                                        <th>Name</th>
                                        <th>Phone</th>
{/* 
                                        <th>Change Role</th> */}
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {bookings?.map((booking, index) => {

                                        const {_id, name, phone} = booking;

                                        return (

                                            <tr key={_id}>
                                                <td>{index + 1}</td>
                                                <td>{name}</td>
                                                <td>{phone}</td>
                                                
                                                <td>
                                                    {/* <ChangeRole _id={_id} email={email}/> */}
                                                </td>
                                                <td>
                                                    <span>
                                                        <FaTrashAlt size={28} color='red' onClick= {() => confirmDelete(_id)}/>
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                         )}
                </div>
            </div>


        </div>
    </section>
  )
}

export default BookingList