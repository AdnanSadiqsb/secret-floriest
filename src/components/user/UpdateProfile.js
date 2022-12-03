import React ,{useState, Fragment, useEffect} from 'react'
import './updateProfile.css'
import Loader from '../layout/loader/Loader'
import  MailOutlineIcon  from '@material-ui/icons/MailOutline'
import FaceIcon from '@material-ui/icons/Face'
import {useDispatch, useSelector} from 'react-redux'
import {clearErrors, updateProfile, loadUser} from '../../actions/userAction'
import {useAlert} from 'react-alert'
import {useNavigate} from 'react-router-dom'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'
import MeatData from '../layout/MeatData'
function UpdateProfile() {
    const dispatch = useDispatch()
    const alert=useAlert()
    const navigate=useNavigate()
    const {user} =useSelector(state=>state.user)
    const [name,setName]=useState("")
    const [email, setEmail]=useState("")
    const [avatar, setAvatar]=useState("")
    const [avatarPreview, setAvatarPreview]=useState('/Profile.jpg')
    const {loading, error, isUpdated}= useSelector(state=>state.profile)
    const updatePRofileSubmit=(e)=>{
        e.preventDefault()
        const myFrom= new FormData()
        myFrom.set("name",name)
        myFrom.set("email",email)
        myFrom.set("avatar",avatar)
        dispatch(updateProfile(myFrom))
    }
    const updatePRofileDataChange=(e)=>{
       
            const reader= new FileReader();
            reader.onload=()=>{
                if(reader.readyState===2)
            {
                setAvatarPreview(reader.result);
                setAvatar(reader.result)
            }
            }
            reader.readAsDataURL(e.target.files[0])

        }
    useEffect(()=>{

            if(user)
            {
               
                setName(user.name)
                setEmail(user.email)
                setAvatarPreview(user.avatar.url)
            }
            if(error){
                alert.error(error)
                dispatch(clearErrors)
            }
            if(isUpdated)
            {
                alert.success("Profile Updated Successfully")
                dispatch(loadUser())
                navigate('/account')
                dispatch({type:UPDATE_PROFILE_RESET})
                
            }
    
        },[error, dispatch, alert, isUpdated, navigate,user ])

  return (
    <Fragment>
       
        <MeatData title={`${user.name}'s profile Update`}/>
    {loading?<Loader/>:
    (
    <div className="updateProfileContainer">
    <div className="updateProfileBox">
        <h2 className='updateProfileHeading'>Update Profile</h2>
    <form  className="updateProfileForm" encType="multipart/form-data" onSubmit={updatePRofileSubmit}>
             <div className="updateProfileName">
                  <FaceIcon/>
                  <input type="text" name="name" placeholder='Name' required value={name} onChange={(e)=>setName(e.target.value)} />

              </div> 
              <div className='updateProfileEmail'>
                  <MailOutlineIcon/>
                  <input type="email" name="email" placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)} />

              </div>
             
              <div className="updatePRofileImage">
                  <img src={avatarPreview} alt="Avtar Preview" />
                  <input type="file" name="avatar" accept='image/*' onChange={updatePRofileDataChange} />
              </div>
              <input className='updateProfileBtn' type="submit" value={"update Profile"} />




          </form>

    </div>
    </div>

    )}
    </Fragment>
    )
}

export default UpdateProfile
