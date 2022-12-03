import React, {Fragment} from 'react'
import MeatData from '../layout/MeatData'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import Loader from '../layout/loader/Loader'
import './profile.css'
function Profile() {
    const navigate=useNavigate()
    const {loading,user, isAuthenciate} =useSelector(state=>state.user)


    useEffect(()=>{
        if(isAuthenciate===false)
        {
            navigate('/login')
        }
        
    },[isAuthenciate,user, loading, navigate])

  return (

    <Fragment>
        {loading? <Loader/>:
            <Fragment>
            <MeatData title={`${user.name}'s profile`}/>
            <div className="profileConatiner">
                <div>
                    <h1>My Profile</h1>
                    <img src={user.avatar.url} alt="" />
                    <Link to='/me/update'>Edit Profile</Link>
    
                </div>
                <div>

                <div>
                    <h4>Full Name</h4>
                    <p>{user.name}</p>
                    
                </div>
                <div>
                    <h4>Email</h4>
                    <p>{user.email}</p>
                    
                </div>  <div>
                    <h4>Joined At</h4>
                    <p>{String( user.createdAt).substring(0,10)}</p>
                    
                </div>
                <div>
                    <Link to='/orders'>My Orders</Link>
                    <Link to='/password/update'>Change Password</Link>
                </div>
                </div>
            </div>
        </Fragment>
        }
    </Fragment>
  )
}

export default Profile
