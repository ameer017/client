import React, { useEffect, useState } from 'react'
import './List.css'
import { FaTrashAlt } from 'react-icons/fa'
// import ChangeRole from '../../components/changeRole/ChangeRole'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from 'react-confirm-alert'
// import Search from '../search/Search'
import { deleteProperty, getProperties } from '../../redux/features/property/propertySlice'
import PageMenu from '../../components/pageMenu/PageMenu'


const PropertyList = () => {
    const dispatch = useDispatch()

    const [search, setSearch] = useState("")

    const {isLoading, isSuccess, property, properties} = useSelector((state) => state.property)


    useEffect(() => {
        dispatch(getProperties())

    }, [dispatch]);

    const removeProperty = async (id) => {
        await dispatch(deleteProperty(id));
        dispatch(getProperties());
    };

    const confirmDelete = (id) => {
        confirmAlert({
          title: "Delete This property",
          message: "Are you sure to do delete this property?",
          buttons: [
            {
              label: "Delete",
              onClick: () => removeProperty(id),
            },
            {
              label: "Cancel",
              onClick: () => alert("Click No"),
            },
          ],
        });
      };

    //   useEffect(() => {
    //     dispatch(FILTER_PROPERTIES({ property, search}))
    //   }, [dispatch, property, search])


  return (
    <section className='top'>
        <div className='container'>
            {/* <Menu/> */}
            <PageMenu/>
            <div className='list'>
                <div className='table'>

                    <div className='--flex-between'>
                        <span>
                            <h3>All Properties</h3>
                        </span>
                        <span>
                            {/* <Search value={search} onChange={(e) => {
                                setSearch(e.target.value)
                            }}/> */}
                        </span>
                    </div>

                        {!isLoading && properties?.length === 0 ? 
                        (
                            <p>No Property found</p>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>s/n</th>
                                        <th>Name</th>
                                        <th>Location</th>
{/* 
                                        <th>Change Role</th> */}
                                        <th>Price</th>
                                        <th>isBooked</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {properties?.map((property, index) => {

                                        const {_id, name, location, price, isBooked} = property;

                                        return (

                                            <tr key={_id}>
                                                <td>{index + 1}</td>
                                                <td>{name}</td>
                                                <td>{location}</td>
                                                <td>$ {price}</td>
                                                
                                                <td>
                                                    {/* <ChangeRole _id={_id} email={email}/> */}
                                                    {property.isBooked ? 'Yes' : 'No'}
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

export default PropertyList