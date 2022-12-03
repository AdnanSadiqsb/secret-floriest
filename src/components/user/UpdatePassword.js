import React ,{useState, Fragment, useEffect} from 'react'
import './updatePAssword.css'
import Loader from '../layout/loader/Loader'
import {useDispatch, useSelector} from 'react-redux'
import {clearErrors, updatePassword} from '../../actions/userAction'
import {useAlert} from 'react-alert'
import {useNavigate} from 'react-router-dom'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
import MeatData from '../layout/MeatData'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import LockIcon  from '@material-ui/icons/Lock'
import  VpnKeyIcon  from '@material-ui/icons/VpnKey'
function UpdatePassword() {
    const dispatch = useDispatch()
    const alert=useAlert()
    const navigate=useNavigate()
    const [oldPassword,setOldPassword]=useState("")
    const [newPassword,setNewPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const {loading, error, isUpdated}= useSelector(state=>state.profile)
    const updatePasswordSubmit=(e)=>{
        e.preventDefault()
        const myFrom= new FormData()
        myFrom.set("oldPassword",oldPassword)
        myFrom.set("newPassword",newPassword)
        myFrom.set("confirmPassword",confirmPassword)
        dispatch(updatePassword(myFrom))
    }

    useEffect(()=>{

         
            if(error){
                alert.error(error)
                dispatch(clearErrors)
            }
            if(isUpdated)
            {
                alert.success("Passowrd updated Successfully")
                navigate('/account')
                dispatch({type:UPDATE_PASSWORD_RESET})
                
            }
    
        },[error, dispatch, alert, isUpdated, navigate])

  return (
    <Fragment>
       
    <MeatData title={`change password`}/>
{loading?<Loader/>:
(
<div className="updatePasswordContainer">
    <div className="updatePasswordBox">
        <h2 className='updatePasswordHeading'>Update Password</h2>
        <form  className="updatePasswordForm" encType="multipart/form-data" onSubmit={updatePasswordSubmit}>
        
            <div className="updatePasswordPAssword">
                <VpnKeyIcon/>
                <input type="password" name="password" placeholder='old Password' required value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} />
            </div>
            <div className="updatePAssword">
                <LockOpenIcon/>
                <input type="password" name="password" placeholder='new Password' required value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
            </div>
            <div className="updatePAssword">
                <LockIcon/>
                <input type="password" name="password" placeholder='confirm Password' required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
            </div>
            <input className='updatePasswordBtn' type="submit" value={"change Password"} />
        </form>
    </div>
</div>

)}
</Fragment>
  )
}

export default UpdatePassword
